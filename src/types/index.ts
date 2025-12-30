// Types pour les projets
export type ProjectType = "web" | "mobile" | "software" | "automation";

export type ProjectStatus =
  | "idea"
  | "building"
  | "mvp"
  | "production"
  | "paused";

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  stack: string[];
  github_url: string | null;
  app_url: string | null;
  description: string;
  created_at: string;
  deleted_at: string | null;
}

// Types pour les compétences
export type SkillLevel = "acquired" | "learning" | "target";

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: string;
  created_at: string;
}

// Types pour les objectifs
export type GoalScope = "year" | "month";

export type GoalStatus = "todo" | "in_progress" | "done";

export interface Goal {
  id: string;
  title: string;
  scope: GoalScope;
  status: GoalStatus;
  year: number | null;
  month: number | null;
  created_at: string;
}

// Type pour les outils (simple liste de strings)
export type Tool = string;
