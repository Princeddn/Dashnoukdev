"use client";

import { useState, useEffect } from "react";
import { AdminProtected } from "@/components/AdminProtected";
import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Project, ProjectType, ProjectStatus } from "@/types";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  return (
    <AdminProtected>
      <AdminContent />
    </AdminProtected>
  );
}

function AdminContent() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "web" as ProjectType,
    status: "idea" as ProjectStatus,
    description: "",
    stack: "",
    github_url: "",
    app_url: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (data) setProjects(data as Project[]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const projectData = {
      name: formData.name,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean),
      github_url: formData.github_url || null,
      app_url: formData.app_url || null,
    };

    try {
      if (editingProject) {
        // Update
        await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
      } else {
        // Create
        await supabase
          .from('projects')
          .insert([projectData]);
      }

      // Reset form
      setFormData({
        name: "",
        type: "web",
        status: "idea",
        description: "",
        stack: "",
        github_url: "",
        app_url: "",
      });
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Erreur lors de la sauvegarde');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      await supabase
        .from('projects')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Erreur lors de la suppression');
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormData({
      name: project.name,
      type: project.type,
      status: project.status,
      description: project.description,
      stack: project.stack.join(', '),
      github_url: project.github_url || '',
      app_url: project.app_url || '',
    });
    setShowForm(true);
  }

  function cancelEdit() {
    setEditingProject(null);
    setFormData({
      name: "",
      type: "web",
      status: "idea",
      description: "",
      stack: "",
      github_url: "",
      app_url: "",
    });
    setShowForm(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin - Nouk Prince HQ</h1>
            <p className="text-sm text-muted-foreground">Gérez votre contenu</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Projets ({projects.length})</h2>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            {showForm ? "Annuler" : "Nouveau projet"}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingProject ? "Modifier le projet" : "Nouveau projet"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du projet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <select
                      id="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      required
                    >
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="software">Software</option>
                      <option value="automation">Automation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Statut *</Label>
                    <select
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      required
                    >
                      <option value="idea">Idée</option>
                      <option value="building">En construction</option>
                      <option value="mvp">MVP</option>
                      <option value="production">Production</option>
                      <option value="paused">Pause</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stack">Stack (séparé par des virgules) *</Label>
                    <Input
                      id="stack"
                      placeholder="Next.js, TypeScript, Supabase"
                      value={formData.stack}
                      onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github_url">URL GitHub</Label>
                    <Input
                      id="github_url"
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.github_url}
                      onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app_url">URL App</Label>
                    <Input
                      id="app_url"
                      type="url"
                      placeholder="https://..."
                      value={formData.app_url}
                      onChange={(e) => setFormData({ ...formData, app_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingProject ? "Mettre à jour" : "Créer"}
                  </Button>
                  {editingProject && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Annuler
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge variant="secondary">{project.type}</Badge>
                      <Badge>{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.stack.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {projects.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Aucun projet. Créez-en un !</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
