"use client";

import type { Project, ProjectStatus, ProjectType } from "@/types";
import { Github, ExternalLink, Lightbulb, Hammer, Rocket, Play, Pause, Folder } from "lucide-react";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
  limit?: number;
}

function getStatusBadge(status: ProjectStatus) {
  const configs = {
    idea: {
      label: "Idée",
      icon: Lightbulb,
      className: "bg-apple-purple/10 text-apple-purple"
    },
    building: {
      label: "En construction",
      icon: Hammer,
      className: "bg-apple-blue/10 text-apple-blue"
    },
    mvp: {
      label: "MVP",
      icon: Rocket,
      className: "bg-apple-orange/10 text-apple-orange"
    },
    production: {
      label: "Production",
      icon: Play,
      className: "bg-apple-green/10 text-apple-green"
    },
    paused: {
      label: "Pause",
      icon: Pause,
      className: "bg-apple-gray-100 text-apple-gray-400"
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-apple-sm text-xs font-semibold ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
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
    <section className="py-20 bg-gradient-to-br from-apple-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-14 h-14 rounded-apple bg-gradient-to-br from-apple-orange to-apple-purple flex items-center justify-center">
                <Folder className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-900 mb-4">
              Mes Projets
            </h2>
            <p className="text-xl text-apple-gray-400">
              Découvrez mes réalisations et projets en cours
            </p>
          </div>
          {limit && projects.length > limit && (
            <Link href="/projects">
              <div className="px-6 py-3 bg-apple-blue text-white rounded-apple hover:bg-apple-blue/90 transition-all duration-300 shadow-apple-medium font-semibold">
                Tous les projets ({projects.length})
              </div>
            </Link>
          )}
        </div>

        {displayedProjects.length === 0 ? (
          <div className="text-center">
            <p className="text-apple-gray-400 text-lg">Aucun projet pour le moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card rounded-apple-lg shadow-apple-medium hover:shadow-apple-strong transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-apple-gray-200/50">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      {getStatusBadge(project.status)}
                      <span className="px-3 py-1 bg-apple-gray-100 text-apple-gray-400 rounded-apple-sm text-xs font-semibold">
                        {getTypeLabel(project.type)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-apple-gray-900 mb-2 line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-apple-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Stack */}
                  <div className="p-6 flex-1">
                    <p className="text-xs font-semibold text-apple-gray-400 mb-3">
                      Stack technique
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-apple-blue/5 text-apple-blue border border-apple-blue/20 rounded-apple-sm text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="px-3 py-1 bg-apple-purple/5 text-apple-purple border border-apple-purple/20 rounded-apple-sm text-xs font-medium">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 flex gap-2">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <div className="w-full text-center px-4 py-2 bg-apple-blue text-white rounded-apple hover:bg-apple-blue/90 transition-all duration-300 font-semibold text-sm shadow-apple-subtle">
                        Détails
                      </div>
                    </Link>
                    {project.github_url && (
                      <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <div className="px-4 py-2 border-2 border-apple-gray-200 hover:border-apple-blue hover:bg-apple-gray-50 rounded-apple transition-all duration-300 flex items-center justify-center">
                          <Github className="w-4 h-4 text-apple-gray-900" />
                        </div>
                      </Link>
                    )}
                    {project.app_url && (
                      <Link href={project.app_url} target="_blank" rel="noopener noreferrer">
                        <div className="px-4 py-2 border-2 border-apple-gray-200 hover:border-apple-purple hover:bg-apple-gray-50 rounded-apple transition-all duration-300 flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-apple-gray-900" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
