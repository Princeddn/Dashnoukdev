# 🔥 Nouk Prince – HQ / Dashboard & Project Launcher  
**SPECIFICATION TECHNIQUE – VERSION 1**

---

## 1️⃣ Contexte & Objectif

Cette application est mon **QG personnel**, accessible via mon domaine principal.  
Elle doit me permettre de centraliser et piloter :

- ma présentation personnelle
- mes compétences
- mes objectifs (annuels et mensuels)
- mes projets (web, mobile, software, automations…)
- certaines informations GitHub
- un futur module qui m’aide à lancer de nouveaux projets avec l’IA

L’application doit être :

- claire
- dynamique
- bien structurée
- évolutive
- pédagogique (l’IA doit m’apprendre ce qu’elle fait)

---

## 2️⃣ Stack obligatoire

### Frontend
- Next.js (App Router, version récente)
- React
- TypeScript strict
- TailwindCSS
- ShadCN UI (ou équivalent) pour une UI propre

### Backend / Data
- Supabase :
  - Base PostgreSQL
  - Auth
  - (plus tard possible : Edge Functions)

### Qualité & Code
- ESLint activé
- `"strict": true` obligatoire dans TypeScript
- Interdiction d’utiliser `any`
- Architecture claire et propre
- Code lisible et maintenable

---

## 3️⃣ Fonctionnalités – Phase 1 (Dashboard)

### 🧑‍🚀 Section Profil / Hero
Contient :
- Photo (placeholder accepté)
- Nom
- Phrase d’accueil : **“Welcome in my world”**
- Boutons rapides :
  - GitHub
  - LinkedIn

---

### 🎯 Objectifs
Deux blocs distincts :
- **Objectifs annuels**
- **Objectifs mensuels**

Chaque objectif contient :
- `id`
- `title`
- `scope` (year | month)
- `status` :
  - `todo`
  - `in_progress`
  - `done`

---

### 🧠 Compétences
Affichage dans 3 colonnes distinctes :

1️⃣ Compétences acquises  
2️⃣ Compétences en cours d’acquisition  
3️⃣ Compétences à acquérir  

Chaque compétence :
- `id`
- `name`
- `level` :
  - `acquired`
  - `learning`
  - `target`
- `category` (ex: dev, IoT, business)

---

### 🛠️ Outils maîtrisés
Affichage sous forme de badges

Exemples :
- Next.js
- Supabase
- API
- Scraping
- MQTT
- LoRaWAN
- GitHub
- etc.

---

### 🚀 Mes projets
Affichage sous forme de cartes modernes.

Chaque projet contient :
- `id`
- `name`
- `type` :
  - `web`
  - `mobile`
  - `software`
  - `automation`
- `status` :
  - `idea`
  - `building`
  - `mvp`
  - `production`
  - `paused`
- `stack` (array)
- `github_url` (optionnel)
- `app_url` (optionnel)
- `description`
- `created_at`

---

### 👥 Rôles utilisateurs

#### 👤 Visiteur
- Accès lecture uniquement
- Pas besoin de login

#### 👑 Admin (moi)
- Auth via Supabase
- Peut :
  - Ajouter / modifier projets
  - Modifier objectifs
  - Modifier compétences

---

## 4️⃣ Pages & Routing

### `/`
Dashboard principal contenant :
- Profil
- Objectifs
- Compétences
- Outils
- Projets

---

### `/projects`
- liste complète des projets
- filtres :
  - par type
  - par statut

---

### `/projects/[id]`
Page détail d’un projet :
- informations complètes
- description
- status
- stack
- liens
- historique simple

---

### `/login`
- Login admin uniquement
- Pas d’inscription publique

---

## 5️⃣ Schéma Base de Données – Supabase

### `projects`
| field       | type       |
|------------|------------|
| id         | uuid       |
| name       | text       |
| type       | text       |
| status     | text       |
| stack      | text[]     |
| github_url | text       |
| app_url    | text       |
| description| text       |
| created_at | timestamp  |
| deleted_at | timestamp nullable |

---

### `skills`
| field      | type       |
|------------|------------|
| id         | uuid       |
| name       | text       |
| level      | text (`acquired | learning | target`) |
| category   | text       |
| created_at | timestamp  |

---

### `goals`
| field      | type       |
|------------|------------|
| id         | uuid       |
| title      | text       |
| scope      | text (`year | month`) |
| status     | text (`todo | in_progress | done`) |
| year       | int nullable |
| month      | int nullable |
| created_at | timestamp |

---

## 6️⃣ Règles importantes

- Interface simple et lisible
- Code clair
- Architecture structurée
- Pas d’inventions de techno
- Développement étape par étape
- Pas de génération massive inutile

---

## 7️⃣ Connexion GitHub (Phase 1.5 – non obligatoire MVP)

Objectif futur :
- récupérer certains repos
- afficher :
  - stars
  - last update
  - quelques informations clés

Via GitHub API + Token perso (lecture seule).

---

## 8️⃣ Phase 2 – 🔥 AI Project Launcher

Plus tard ajout d’une section :

### 🧠 AI Project Launcher
Objectifs :
- cadrer une idée
- générer structure projet
- proposer stack
- créer checklist
- éventuellement :
  - créer auto une entrée dans `projects`
  - passer statut de `idea` → `building`

Pour l’instant :
👉 seulement prévoir un bouton placeholder **“Coming soon”**

---

## 9️⃣ Roadmap claire

### ✅ Phase 1 — MVP
- Dashboard
- Projets
- Compétences
- Objectifs
- Auth Admin
- CRUD Admin simple

---

### ▶️ Phase 2
- GitHub Integration

---

### ▶️ Phase 3
- AI Project Launcher

---

## 🔟 Mode Prof / Documentation pédagogique (OBLIGATOIRE)

Objectif :  
👉 L’IA doit m’apprendre ce qu’elle fait, comme un professeur.

### 📚 Règles pédagogiques

1️⃣ Pour chaque grande étape, l’IA doit créer un fichier dans :
/docs/learn/

2️⃣ Les fichiers doivent être numérotés, par exemple :
00_overview.md
01_setup_projet.md
02_structure_dossiers.md
03_dashboard_page.md
04_projets_crud.md
05_objectifs_skills.md
06_auth_admin.md
07_github_integration.md
08_ai_project_launcher.md


3️⃣ Chaque fichier doit expliquer :
- le but de la fonctionnalité
- les fichiers concernés
- la logique étape par étape
- le code important (avec explications)
- ce que je dois retenir
- petits exercices d’apprentissage

4️⃣ Style attendu :
- en français
- clair
- pédagogique
- comme un prof humain
- pas trop académique
- simple, concret, utile

---

## 🔒 Non négociable

- TypeScript strict
- Architecture propre
- Code fiable
- Lecture agréable
- Documentation pédagogique respectée
- Respect total de cette SPEC
