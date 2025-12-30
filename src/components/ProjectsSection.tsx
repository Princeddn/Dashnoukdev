import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project, ProjectStatus, ProjectType } from "@/types";
import { Github, ExternalLink, Lightbulb, Hammer, Rocket, Play, Pause } from "lucide-react";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
  limit?: number;
}

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

export function ProjectsSection({ projects, limit }: ProjectsSectionProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Mes projets</h2>
          {limit && projects.length > limit && (
            <Link href="/projects">
              <Button variant="outline">
                Voir tous les projets ({projects.length})
              </Button>
            </Link>
          )}
        </div>

        {displayedProjects.length === 0 ? (
          <p className="text-muted-foreground">Aucun projet pour le moment</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
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
                        {project.stack.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.stack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.stack.length - 3}
                          </Badge>
                        )}
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
    </section>
  );
}
