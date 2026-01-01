"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectStatus, ProjectType, Project } from "@/types";
import { Github, ExternalLink, Lightbulb, Hammer, Rocket, Play, Pause, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function getStatusBadge(status: ProjectStatus) {
  const variants = {
    idea: { label: "Idée", variant: "outline" as const, icon: Lightbulb },
    building: { label: "En construction", variant: "default" as const, icon: Hammer },
    mvp: { label: "MVP", variant: "default" as const, icon: Rocket },
    production: { label: "Production", variant: "default" as const, icon: Play },
    paused: { label: "Pause", variant: "secondary" as const, icon: Pause },
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
    web: "Web",
    mobile: "Mobile",
    software: "Software",
    automation: "Automation",
  };
  return labels[type];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<ProjectType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all");

  useEffect(() => {
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

    fetchProjects();
  }, []);

  // Filtrer les projets
  const filteredProjects = projects.filter((project) => {
    const typeMatch = selectedType === "all" || project.type === selectedType;
    const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const types: (ProjectType | "all")[] = ["all", "web", "mobile", "software", "automation"];
  const statuses: (ProjectStatus | "all")[] = ["all", "idea", "building", "mvp", "production", "paused"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Tous mes projets</h1>
          <p className="text-muted-foreground">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} trouvé{filteredProjects.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-8 space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Filtrer par type</p>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type === "all" ? "Tous" : getTypeLabel(type)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Filtrer par statut</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
              >
                Tous
              </Button>
              {statuses.filter(s => s !== "all").map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                >
                  {getStatusBadge(status as ProjectStatus).props.children[1]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des projets */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Aucun projet ne correspond aux filtres sélectionnés
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="flex flex-col hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {getStatusBadge(project.status)}
                    <Badge variant="secondary" className="text-xs">
                      {getTypeLabel(project.type)}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Stack</p>
                      <div className="flex flex-wrap gap-1">
                        {project.stack.map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Link href={`/projects/${project.id}`} className="flex-1">
                    <Button variant="default" className="w-full" size="sm">
                      Détails
                    </Button>
                  </Link>
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                  {project.app_url && (
                    <Link href={project.app_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
