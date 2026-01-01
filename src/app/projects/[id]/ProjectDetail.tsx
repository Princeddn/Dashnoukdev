"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectStatus, ProjectType, Project } from "@/types";
import { Github, ExternalLink, ArrowLeft, Calendar, Lightbulb, Hammer, Rocket, Play, Pause } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function getStatusBadge(status: ProjectStatus) {
  const variants = {
    idea: { label: "Idée", variant: "outline" as const, icon: Lightbulb, color: "text-yellow-600" },
    building: { label: "En construction", variant: "default" as const, icon: Hammer, color: "text-blue-600" },
    mvp: { label: "MVP", variant: "default" as const, icon: Rocket, color: "text-purple-600" },
    production: { label: "Production", variant: "default" as const, icon: Play, color: "text-green-600" },
    paused: { label: "Pause", variant: "secondary" as const, icon: Pause, color: "text-gray-600" },
  };

  const config = variants[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}

function getTypeLabel(type: ProjectType) {
  const labels = {
    web: "Application Web",
    mobile: "Application Mobile",
    software: "Software",
    automation: "Automation",
  };
  return labels[type];
}

export function ProjectDetail({ id }: { id: string }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .is('deleted_at', null)
          .single();

        if (data) {
          setProject(data as Project);
        } else {
          router.push('/projects');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </Button>
        </Link>

        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {getStatusBadge(project.status)}
            <Badge variant="secondary">{getTypeLabel(project.type)}</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3">{project.name}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          {project.github_url && (
            <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                Voir sur GitHub
              </Button>
            </Link>
          )}
          {project.app_url && (
            <Link href={project.app_url} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Visiter l'application
              </Button>
            </Link>
          )}
        </div>

        <div className="space-y-6">
          {/* Stack technique */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Stack Technique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Date de création</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(project.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {project.github_url && (
                <div className="flex items-start gap-3">
                  <Github className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Dépôt GitHub</p>
                    <Link
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {project.github_url}
                    </Link>
                  </div>
                </div>
              )}

              {project.app_url && (
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">URL de l'application</p>
                    <Link
                      href={project.app_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {project.app_url}
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
