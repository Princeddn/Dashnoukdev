# 🎨 Dashboard Frontend – Composants et Pages

## 🎯 Objectif de cette étape

Créer l'interface utilisateur complète du dashboard avec :
- Section Hero (profil)
- Section Objectifs (annuels et mensuels)
- Section Compétences (3 colonnes)
- Section Outils maîtrisés
- Section Projets
- Page liste des projets avec filtres
- Page détails d'un projet

## 📦 Composants créés

### 1. `HeroSection.tsx`

**Localisation** : `src/components/HeroSection.tsx`

**Description** : Section d'accueil avec photo (placeholder), nom, phrase d'accueil et liens sociaux.

**Code clé** :
```tsx
<div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60">
  NP
</div>
```

**Concepts** :
- Utilise un gradient Tailwind pour le placeholder de photo
- Liens externes avec `target="_blank"` et `rel="noopener noreferrer"` (sécurité)
- Icônes Lucide React (Github, Linkedin)

### 2. `GoalsSection.tsx`

**Localisation** : `src/components/GoalsSection.tsx`

**Description** : Affiche les objectifs annuels et mensuels avec leur statut.

**Concepts importants** :
- **"use client"** : Composant client-side (nécessaire pour l'interactivité)
- **Filtrage de données** : Sépare year vs month avec `filter()`
- **Icônes dynamiques** : Fonction `getStatusIcon()` qui retourne un composant selon le statut

**Code clé** :
```tsx
const yearlyGoals = goals.filter((g) => g.scope === "year");
const monthlyGoals = goals.filter((g) => g.scope === "month");
```

**Statuts possibles** :
- `todo` : Cercle gris → À faire
- `in_progress` : Horloge bleue → En cours
- `done` : Checkmark vert → Terminé

### 3. `SkillsSection.tsx`

**Localisation** : `src/components/SkillsSection.tsx`

**Description** : Affiche les compétences en 3 colonnes avec code couleur.

**Organisation** :
1. **Colonne verte** : Compétences acquises
2. **Colonne bleue** : Compétences en apprentissage
3. **Colonne orange** : Compétences à acquérir

**Code clé** :
```tsx
const acquiredSkills = skills.filter((s) => s.level === "acquired");
const learningSkills = skills.filter((s) => s.level === "learning");
const targetSkills = skills.filter((s) => s.level === "target");
```

**Design** :
- Utilise `bg-green-50 dark:bg-green-950/30` pour la compatibilité dark mode
- Bordures colorées avec `border-green-200 dark:border-green-900`

### 4. `ToolsSection.tsx`

**Localisation** : `src/components/ToolsSection.tsx`

**Description** : Affiche les outils maîtrisés sous forme de badges.

**Simplicité** :
- Juste une liste de strings
- Pas de filtrage complexe
- Effet hover avec transition

**Code clé** :
```tsx
<Badge className="hover:bg-primary hover:text-primary-foreground transition">
  {tool}
</Badge>
```

### 5. `ProjectsSection.tsx`

**Localisation** : `src/components/ProjectsSection.tsx`

**Description** : Affiche les projets sous forme de cartes modernes.

**Fonctionnalités** :
- Limite optionnelle avec `limit` prop
- Lien "Voir tous" si plus de projets que la limite
- Cards avec hover effect
- Badges de statut avec icônes
- Stack technique (affiche max 3, +N pour le reste)

**Code clé** :
```tsx
{project.stack.slice(0, 3).map((tech, i) => (
  <Badge key={i} variant="outline">{tech}</Badge>
))}
{project.stack.length > 3 && (
  <Badge variant="outline">+{project.stack.length - 3}</Badge>
)}
```

## 📄 Pages créées

### 1. Page d'accueil `/` (page.tsx)

**Localisation** : `src/app/page.tsx`

**Description** : Dashboard principal assemblant toutes les sections.

**Structure** :
```tsx
<main>
  <HeroSection />
  <GoalsSection goals={demoGoals} />
  <SkillsSection skills={demoSkills} />
  <ToolsSection tools={demoTools} />
  <ProjectsSection projects={demoProjects} limit={6} />
</main>
```

**Concepts** :
- Import de données de démo depuis `@/lib/demo-data`
- Limite de 6 projets sur la page d'accueil
- Chaque section reçoit ses données via props

### 2. Page `/projects` (liste)

**Localisation** : `src/app/projects/page.tsx`

**Description** : Liste complète avec filtres par type et statut.

**Fonctionnalités** :
- **Filtres dynamiques** : Type (web, mobile, software, automation)
- **Filtres de statut** : idea, building, mvp, production, paused
- **État local** : `useState` pour gérer les filtres sélectionnés
- **Filtrage en temps réel** : Recalcul à chaque changement de filtre

**Code clé** :
```tsx
const filteredProjects = demoProjects.filter((project) => {
  const typeMatch = selectedType === "all" || project.type === selectedType;
  const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
  return typeMatch && statusMatch;
});
```

**Concepts** :
- **"use client"** obligatoire (useState)
- Double filtrage AND (type ET statut)
- Boutons dynamiques avec variant conditionnel

### 3. Page `/projects/[id]` (détails)

**Localisation** : `src/app/projects/[id]/page.tsx`

**Description** : Page détaillée d'un projet spécifique.

**Routing dynamique** :
- `[id]` dans le nom du dossier = paramètre dynamique
- Next.js crée automatiquement les routes
- Accès via `params.id`

**Code clé** :
```tsx
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = demoProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound(); // Redirige vers 404
  }

  return (...)
}
```

**Sections** :
1. **Navigation** : Bouton retour vers /projects
2. **En-tête** : Badges de statut/type + titre + description
3. **Actions** : Liens GitHub et app (si disponibles)
4. **Stack technique** : Tous les outils utilisés
5. **Informations** : Date de création, liens

## 📊 Données de démonstration

### Fichier: `src/lib/demo-data.ts`

Contient des exemples de données pour tester l'interface sans Supabase :

```typescript
export const demoProjects: Project[] = [...]
export const demoSkills: Skill[] = [...]
export const demoGoals: Goal[] = [...]
export const demoTools: Tool[] = [...]
```

**Pourquoi c'est utile ?**
1. Permet de développer le frontend avant le backend
2. Facilite les tests et le debug
3. Donne un exemple de structure de données

**Plus tard** : On remplacera ces données par des appels à Supabase.

## 🎨 Composants UI (ShadCN)

### Card

Utilisé partout pour encadrer les sections.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu principal
  </CardContent>
  <CardFooter>
    Actions (boutons, etc.)
  </CardFooter>
</Card>
```

### Badge

Pour afficher des labels, tags, statuts.

```tsx
<Badge variant="default">Texte</Badge>
<Badge variant="outline">Texte</Badge>
<Badge variant="secondary">Texte</Badge>
```

### Button

Boutons avec différents styles.

```tsx
<Button variant="default">Primaire</Button>
<Button variant="outline">Secondaire</Button>
<Button variant="ghost">Fantôme</Button>
<Button size="sm">Petit</Button>
<Button size="lg">Grand</Button>
```

## 🧠 Concepts TypeScript utilisés

### 1. Props typées strictement

```tsx
interface GoalsSectionProps {
  goals: Goal[];
}

export function GoalsSection({ goals }: GoalsSectionProps) {
  // TypeScript sait que 'goals' est un tableau de Goal
}
```

**Avantages** :
- Auto-complétion dans l'éditeur
- Erreurs détectées avant l'exécution
- Documentation intégrée

### 2. Union types pour variants

```tsx
type ProjectStatus = "idea" | "building" | "mvp" | "production" | "paused";
```

**Avantages** :
- Impossible d'utiliser une valeur invalide
- TypeScript te force à gérer tous les cas
- Auto-complétion des valeurs possibles

### 3. Type narrowing avec filter

```tsx
const yearlyGoals = goals.filter((g) => g.scope === "year");
// TypeScript sait que yearlyGoals contient des Goal avec scope = "year"
```

## 🎓 Ce que tu dois retenir

### Patterns React modernes

1. **Composants fonctionnels** : Plus de classes, que des fonctions
2. **Props drilling** : Passer les données de parent à enfant
3. **Client vs Server components** :
   - Server (par défaut) : Rendu côté serveur, pas de useState
   - Client ("use client") : Interactivité, useState, événements

### Organisation du code

```
src/
├── app/              # Pages (routing automatique)
│   ├── page.tsx      # Route "/"
│   └── projects/     # Route "/projects"
├── components/       # Composants réutilisables
│   ├── ui/           # Composants UI basiques (ShadCN)
│   └── *Section.tsx  # Sections du dashboard
├── lib/              # Utilitaires
└── types/            # Types TypeScript
```

### Workflow de développement

1. Créer les types TypeScript
2. Créer des données de démo
3. Créer les composants avec ces données
4. Assembler les composants dans les pages
5. Plus tard : connecter à Supabase

## 📝 Petit exercice

Essaie de créer un nouveau composant `StatsSection.tsx` qui affiche :
- Nombre total de projets
- Nombre de projets en production
- Nombre de compétences acquises

<details>
<summary>Solution</summary>

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project, Skill } from "@/types";

interface StatsSectionProps {
  projects: Project[];
  skills: Skill[];
}

export function StatsSection({ projects, skills }: StatsSectionProps) {
  const totalProjects = projects.length;
  const productionProjects = projects.filter(p => p.status === "production").length;
  const acquiredSkills = skills.filter(s => s.level === "acquired").length;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Statistiques</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold">
                {totalProjects}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Projets totaux</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-green-600">
                {productionProjects}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">En production</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-blue-600">
                {acquiredSkills}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Compétences maîtrisées</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
```
</details>

## ➡️ Prochaines étapes

Maintenant que le frontend est prêt avec des données de démo, il faut :
1. Configurer l'authentification admin avec Supabase
2. Créer les formulaires CRUD pour gérer les données
3. Connecter le frontend à Supabase pour des données réelles
4. Protéger les routes admin

**Dashboard frontend terminé ! On passe à l'authentification 🔐**
