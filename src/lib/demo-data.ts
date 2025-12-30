import type { Project, Skill, Goal, Tool } from "@/types";

// Données de démonstration pour les projets
export const demoProjects: Project[] = [
  {
    id: "1",
    name: "Dashnouk Dev",
    type: "web",
    status: "building",
    stack: ["Next.js", "Supabase", "TypeScript", "TailwindCSS"],
    github_url: "https://github.com/Princeddn/dashnoukdev",
    app_url: null,
    description: "Mon quartier général personnel - Dashboard et lanceur de projets avec IA",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "2",
    name: "IoT Dashboard",
    type: "software",
    status: "production",
    stack: ["React", "Node.js", "MQTT", "LoRaWAN"],
    github_url: null,
    app_url: "https://iot-dashboard.example.com",
    description: "Tableau de bord pour gérer des capteurs IoT en temps réel",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "3",
    name: "Mobile App E-commerce",
    type: "mobile",
    status: "mvp",
    stack: ["React Native", "Firebase", "Stripe"],
    github_url: null,
    app_url: null,
    description: "Application mobile de e-commerce avec paiement intégré",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
];

// Données de démonstration pour les compétences
export const demoSkills: Skill[] = [
  // Acquises
  { id: "1", name: "Next.js", level: "acquired", category: "dev", created_at: new Date().toISOString() },
  { id: "2", name: "TypeScript", level: "acquired", category: "dev", created_at: new Date().toISOString() },
  { id: "3", name: "Supabase", level: "acquired", category: "dev", created_at: new Date().toISOString() },
  { id: "4", name: "TailwindCSS", level: "acquired", category: "dev", created_at: new Date().toISOString() },
  { id: "5", name: "React", level: "acquired", category: "dev", created_at: new Date().toISOString() },
  // En apprentissage
  { id: "6", name: "LoRaWAN", level: "learning", category: "IoT", created_at: new Date().toISOString() },
  { id: "7", name: "MQTT", level: "learning", category: "IoT", created_at: new Date().toISOString() },
  { id: "8", name: "Python ML", level: "learning", category: "dev", created_at: new Date().toISOString() },
  // À acquérir
  { id: "9", name: "Rust", level: "target", category: "dev", created_at: new Date().toISOString() },
  { id: "10", name: "Kubernetes", level: "target", category: "dev", created_at: new Date().toISOString() },
  { id: "11", name: "Marketing Digital", level: "target", category: "business", created_at: new Date().toISOString() },
];

// Données de démonstration pour les objectifs
export const demoGoals: Goal[] = [
  // Objectifs annuels
  {
    id: "1",
    title: "Lancer 3 projets en production",
    scope: "year",
    status: "in_progress",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Maîtriser l'architecture cloud",
    scope: "year",
    status: "todo",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Contribuer à 5 projets open-source",
    scope: "year",
    status: "todo",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },
  // Objectifs mensuels
  {
    id: "4",
    title: "Terminer le Dashboard personnel",
    scope: "month",
    status: "in_progress",
    year: 2025,
    month: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Apprendre les bases de LoRaWAN",
    scope: "month",
    status: "done",
    year: 2025,
    month: 12,
    created_at: new Date().toISOString(),
  },
];

// Données de démonstration pour les outils
export const demoTools: Tool[] = [
  "Next.js",
  "Supabase",
  "API REST",
  "Web Scraping",
  "MQTT",
  "LoRaWAN",
  "GitHub",
  "Docker",
  "Vercel",
  "PostgreSQL",
  "React",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "Python",
];
