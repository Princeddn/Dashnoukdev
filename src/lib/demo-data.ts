import type { Project, Skill, Goal, Tool } from "@/types";

// Projets réels de Prince Noukounwoui
export const demoProjects: Project[] = [
  {
    id: "1",
    name: "LoRaWAN Plug and Play",
    type: "software",
    status: "production",
    stack: ["Python", "LoRaWAN", "Chirpstack", "IoT", "Linux", "Cloud", "SSH"],
    github_url: "https://princeddn.github.io/chirp-api/",
    app_url: "https://princeddn.github.io/chirp-api/",
    description: "Bibliothèque Python pour décoder les trames LoRaWAN. Extraction automatique des informations des capteurs (fabricant, modèle, données mesurées) et reconnaissance des capteurs par analyse des trames.",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "2",
    name: "Mini station météo Arduino",
    type: "automation",
    status: "production",
    stack: ["Arduino", "IoT", "Capteurs", "LCD", "C++"],
    github_url: null,
    app_url: null,
    description: "Mini station météo avec Arduino, intégrant des capteurs pour mesurer la vitesse du vent (anémomètre) et les précipitations (pluviomètre). Affichage en temps réel sur écran LCD.",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "3",
    name: "Logiciel dimensionnement photovoltaïque",
    type: "software",
    status: "building",
    stack: ["Python", "Interface graphique", "Énergie", "Photovoltaïque"],
    github_url: "https://github.com/prince-noukounwoui/pv-dimensioning-tool",
    app_url: "https://pv-tool-docs.readthedocs.io",
    description: "Logiciel complet pour le dimensionnement des systèmes photovoltaïques. Calcul de la taille optimale des installations solaires en fonction des besoins énergétiques, de l'irradiation solaire et des contraintes techniques.",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "4",
    name: "Progiciel dimensionnement réseau BT",
    type: "software",
    status: "production",
    stack: ["VBA Excel", "Électrique", "Interface graphique", "Dimensionnement"],
    github_url: null,
    app_url: null,
    description: "Logiciel pour le dimensionnement des réseaux électriques basse tension. Calcul des sections de câbles, chutes de tension et dimensionnement des équipements de protection.",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "5",
    name: "Dashnouk Dev",
    type: "web",
    status: "building",
    stack: ["Next.js", "Supabase", "TypeScript", "TailwindCSS"],
    github_url: "https://github.com/Princeddn/Dashnoukdev",
    app_url: null,
    description: "Mon quartier général personnel - Dashboard et lanceur de projets avec IA. Centralise mes projets, compétences et objectifs professionnels.",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
];

// Compétences réelles de Prince Noukounwoui
export const demoSkills: Skill[] = [
  // Acquises - Compétences maîtrisées
  { id: "1", name: "Python", level: "acquired", category: "Développement", created_at: new Date().toISOString() },
  { id: "2", name: "JavaScript", level: "acquired", category: "Développement", created_at: new Date().toISOString() },
  { id: "3", name: "LoRaWAN", level: "acquired", category: "IoT", created_at: new Date().toISOString() },
  { id: "4", name: "Zigbee", level: "acquired", category: "IoT", created_at: new Date().toISOString() },
  { id: "5", name: "GTB/GTC", level: "acquired", category: "Bâtiment", created_at: new Date().toISOString() },
  { id: "6", name: "Analyse de données IoT", level: "acquired", category: "IoT", created_at: new Date().toISOString() },
  { id: "7", name: "Maintenance photovoltaïque", level: "acquired", category: "Énergie", created_at: new Date().toISOString() },
  { id: "8", name: "Électrotechnique", level: "acquired", category: "Électrique", created_at: new Date().toISOString() },
  { id: "9", name: "QGIS / ArcGIS", level: "acquired", category: "Cartographie", created_at: new Date().toISOString() },
  { id: "10", name: "Arduino", level: "acquired", category: "IoT", created_at: new Date().toISOString() },

  // En apprentissage
  { id: "11", name: "KNX", level: "learning", category: "Bâtiment", created_at: new Date().toISOString() },
  { id: "12", name: "Next.js", level: "learning", category: "Développement", created_at: new Date().toISOString() },
  { id: "13", name: "TypeScript", level: "learning", category: "Développement", created_at: new Date().toISOString() },
  { id: "14", name: "Cloud Computing", level: "learning", category: "Infrastructure", created_at: new Date().toISOString() },
  { id: "15", name: "Jeedom", level: "learning", category: "Domotique", created_at: new Date().toISOString() },

  // À acquérir
  { id: "16", name: "Machine Learning", level: "target", category: "IA", created_at: new Date().toISOString() },
  { id: "17", name: "Kubernetes", level: "target", category: "Infrastructure", created_at: new Date().toISOString() },
  { id: "18", name: "React Native", level: "target", category: "Mobile", created_at: new Date().toISOString() },
];

// Objectifs réels de Prince Noukounwoui
export const demoGoals: Goal[] = [
  // Objectifs annuels 2025
  {
    id: "1",
    title: "Valider mon Master 2 IDBCI",
    scope: "year",
    status: "in_progress",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Maîtriser KNX sur Jeedom",
    scope: "year",
    status: "in_progress",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Finaliser le logiciel de dimensionnement PV",
    scope: "year",
    status: "in_progress",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Contribuer à 3 projets open-source IoT",
    scope: "year",
    status: "todo",
    year: 2025,
    month: null,
    created_at: new Date().toISOString(),
  },

  // Objectifs 2026
  {
    id: "5",
    title: "Obtenir une certification KNX",
    scope: "year",
    status: "todo",
    year: 2026,
    month: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Créer une startup dans l'IoT/Smart Building",
    scope: "year",
    status: "todo",
    year: 2026,
    month: null,
    created_at: new Date().toISOString(),
  },

  // Objectifs mensuels - Décembre 2025
  {
    id: "7",
    title: "Terminer Dashnouk Dev",
    scope: "month",
    status: "in_progress",
    year: 2025,
    month: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Créer 5 dashboards énergétiques pour Jeedom",
    scope: "month",
    status: "in_progress",
    year: 2025,
    month: 12,
    created_at: new Date().toISOString(),
  },

  // Objectifs mensuels - Janvier 2026
  {
    id: "9",
    title: "Apprendre les bases du Machine Learning",
    scope: "month",
    status: "todo",
    year: 2026,
    month: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Rédiger mon mémoire de Master",
    scope: "month",
    status: "todo",
    year: 2026,
    month: 1,
    created_at: new Date().toISOString(),
  },
];

// Outils et technologies maîtrisés par Prince Noukounwoui
export const demoTools: Tool[] = [
  // Développement
  "Python",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
  "TailwindCSS",
  "VBA Excel",
  "Arduino IDE",

  // IoT & Smart Building
  "Zigbee",
  "LoRaWAN",
  "Chirpstack",
  "Jeedom",
  "KNX",
  "GTB/GTC",
  "MQTT",

  // Énergie
  "Victron Energy",
  "VRM",
  "Photovoltaïque",

  // Infrastructure & Cloud
  "Linux",
  "SSH",
  "Cloud",
  "GitHub",
  "Bases de données",

  // Cartographie & SIG
  "QGIS",
  "ArcGIS",
  "GPS",

  // Hardware
  "Arduino",
  "Capteurs IoT",
  "Électronique",
];
