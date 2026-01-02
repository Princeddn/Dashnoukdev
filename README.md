# Nouk Prince HQ

Mon quartier général personnel - Dashboard & Project Launcher

## Stack Technique

- **Frontend**: Next.js 16 (App Router), React, TypeScript strict
- **Styling**: TailwindCSS, ShadCN UI
- **Backend/Data**: Supabase (PostgreSQL + Auth)
- **Qualité**: ESLint, TypeScript strict mode

## Installation

### 1. Cloner et installer les dépendances

```bash
npm install
```

### 2. Configurer Supabase

1. Créer un compte sur [Supabase](https://supabase.com)
2. Créer un nouveau projet
3. Copier le fichier `.env.example` vers `.env.local`

```bash
cp .env.example .env.local
```

4. Remplir les variables dans `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL` : URL de votre projet Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme (anon/public)

### 3. Créer les tables dans Supabase

1. Aller dans l'onglet **SQL Editor** de votre projet Supabase
2. Copier et exécuter le contenu de `supabase/migrations/001_initial_schema.sql`

Cela va créer 3 tables :
- `projects` : Tous vos projets
- `skills` : Vos compétences
- `goals` : Vos objectifs

### 4. Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Build le projet pour la production
- `npm start` : Lance le serveur de production
- `npm run lint` : Vérifie la qualité du code.

## Structure du projet

```
Dashnoukdev/
├── docs/learn/          # Documentation pédagogique
├── public/              # Fichiers statiques
├── src/
│   ├── app/             # Pages (App Router)
│   ├── components/      # Composants React
│   │   └── ui/          # Composants UI (ShadCN)
│   ├── lib/             # Utilitaires
│   └── types/           # Types TypeScript
├── supabase/
│   └── migrations/      # Scripts SQL
└── ...
```

## Fonctionnalités Phase 1 (MVP)

- [ ] Dashboard principal avec sections :
  - [ ] Profil / Hero
  - [ ] Objectifs (annuels et mensuels)
  - [ ] Compétences (3 colonnes)
  - [ ] Outils maîtrisés
  - [ ] Mes projets
- [ ] Page liste des projets avec filtres
- [ ] Page détails d'un projet
- [ ] Authentification admin
- [ ] CRUD admin (projets, objectifs, compétences)

## Documentation

Toute la documentation pédagogique se trouve dans `docs/learn/` :
- `00_overview.md` : Vue d'ensemble du projet
- `01_setup_projet.md` : Explication du setup technique
- (Plus de docs à venir...)

## Roadmap

### Phase 1 - MVP (En cours)
Dashboard, Projets, Compétences, Objectifs, Auth Admin

### Phase 2
Intégration GitHub (repos, stars, last update)

### Phase 3
AI Project Launcher (aide à cadrer et lancer des projets)

## Licence

Projet personnel - Nouk Prince
