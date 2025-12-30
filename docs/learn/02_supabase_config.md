# 🗄️ Configuration Supabase – Base de données et API

## 🎯 Objectif de cette étape

Mettre en place la base de données PostgreSQL avec Supabase pour stocker :
- Tes projets
- Tes compétences
- Tes objectifs

## 🤔 C'est quoi Supabase ?

Supabase est un **Backend-as-a-Service** (BaaS). En gros, au lieu de coder ton propre backend, Supabase te donne :

1. **Une base de données PostgreSQL** hébergée dans le cloud
2. **Des APIs REST automatiques** pour tes tables
3. **Un système d'authentification** prêt à l'emploi
4. **Du storage** pour les fichiers (images, etc.)
5. **Un dashboard** pour gérer tout ça visuellement

**Pourquoi c'est génial ?**
Tu n'as pas besoin de créer un serveur backend, des routes API, gérer la sécurité, etc. Tout est automatique !

## 📊 Le schéma de base de données

### Table: `projects`

Stocke tous tes projets (web, mobile, software, automations).

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (auto-généré) |
| `name` | TEXT | Nom du projet |
| `type` | TEXT | Type : web, mobile, software, automation |
| `status` | TEXT | Statut : idea, building, mvp, production, paused |
| `stack` | TEXT[] | Tableau de technos (ex: ["Next.js", "Supabase"]) |
| `github_url` | TEXT | Lien GitHub (optionnel) |
| `app_url` | TEXT | Lien vers l'app (optionnel) |
| `description` | TEXT | Description du projet |
| `created_at` | TIMESTAMP | Date de création |
| `deleted_at` | TIMESTAMP | Date de suppression (soft delete) |

**Concept important : Soft Delete**
Au lieu de supprimer vraiment un projet, on met une date dans `deleted_at`. Comme ça, tu peux le récupérer plus tard si besoin.

### Table: `skills`

Tes compétences organisées en 3 niveaux.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `name` | TEXT | Nom de la compétence (ex: "TypeScript") |
| `level` | TEXT | Niveau : acquired, learning, target |
| `category` | TEXT | Catégorie (ex: "dev", "IoT", "business") |
| `created_at` | TIMESTAMP | Date de création |

**Les 3 niveaux :**
- `acquired` : Tu maîtrises
- `learning` : Tu es en train d'apprendre
- `target` : Tu veux apprendre

### Table: `goals`

Tes objectifs annuels et mensuels.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `title` | TEXT | Titre de l'objectif |
| `scope` | TEXT | Portée : year ou month |
| `status` | TEXT | Statut : todo, in_progress, done |
| `year` | INTEGER | Année (optionnel) |
| `month` | INTEGER | Mois 1-12 (optionnel) |
| `created_at` | TIMESTAMP | Date de création |

## 🔐 Row Level Security (RLS)

Supabase utilise un système de sécurité au niveau des lignes appelé **RLS**.

### Qu'est-ce que c'est ?

Imagine que chaque ligne de ta table a des règles qui définissent qui peut :
- La lire (SELECT)
- La créer (INSERT)
- La modifier (UPDATE)
- La supprimer (DELETE)

### Nos policies actuelles

```sql
-- Lecture publique pour tout le monde
CREATE POLICY "Public read access on projects" ON projects
  FOR SELECT USING (deleted_at IS NULL);
```

Cette policy dit :
- **Tout le monde** peut lire (`SELECT`) les projets
- **MAIS** seulement ceux qui ne sont pas supprimés (`deleted_at IS NULL`)

Pour l'instant, on a activé seulement la lecture publique. Plus tard, on ajoutera des policies pour que seul l'admin puisse créer/modifier/supprimer.

## 📝 Le fichier de migration

### Pourquoi un fichier SQL ?

Le fichier `supabase/migrations/001_initial_schema.sql` contient toutes les commandes SQL pour créer les tables.

**Avantages :**
1. **Reproductible** : Tu peux recréer la même structure ailleurs
2. **Versionné** : Tu peux tracker les changements dans Git
3. **Documentation** : Le SQL explique exactement la structure

### Structure du fichier

```sql
-- 1. Active l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crée les tables
CREATE TABLE IF NOT EXISTS projects (...);
CREATE TABLE IF NOT EXISTS skills (...);
CREATE TABLE IF NOT EXISTS goals (...);

-- 3. Ajoute des index pour la performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- 4. Active la sécurité RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 5. Définit les policies
CREATE POLICY "Public read access" ...
```

## 💻 Le client Supabase

### Fichier: `src/lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Ce que ça fait :**
- Crée une instance du client Supabase
- Utilise les variables d'environnement pour la config
- Export `supabase` pour l'utiliser partout dans ton app

### Variables d'environnement

Fichier `.env.local` (à créer) :
```
NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta-clé-publique
```

**Pourquoi `NEXT_PUBLIC_` ?**
Next.js expose seulement les variables qui commencent par `NEXT_PUBLIC_` au frontend. Les autres restent côté serveur.

**Pourquoi "anon key" ?**
C'est la clé publique. Elle est safe à exposer car les permissions sont gérées par RLS.

## 🔧 Comment utiliser le client Supabase

### Exemple : Récupérer tous les projets

```typescript
import { supabase } from "@/lib/supabase";

async function getProjects() {
  const { data, error } = await supabase
    .from("projects")  // La table
    .select("*")       // Sélectionner toutes les colonnes
    .is("deleted_at", null)  // Seulement les non-supprimés
    .order("created_at", { ascending: false });  // Trier par date

  if (error) {
    console.error("Erreur:", error);
    return [];
  }

  return data;
}
```

**Comment ça marche ?**
1. `from("projects")` : Cible la table projects
2. `select("*")` : Récupère toutes les colonnes
3. `is("deleted_at", null)` : Filtre (WHERE deleted_at IS NULL)
4. `order()` : Trie les résultats
5. Retourne `{ data, error }` : Si erreur, data est null. Sinon error est null.

### Exemple : Créer un projet

```typescript
async function createProject(project: {
  name: string;
  type: string;
  status: string;
  description: string;
  stack: string[];
}) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()  // Retourne l'objet créé
    .single(); // Retourne un seul objet au lieu d'un tableau

  if (error) {
    console.error("Erreur:", error);
    return null;
  }

  return data;
}
```

## 🎓 Ce que tu dois retenir

### Concepts clés

1. **Supabase = PostgreSQL + API auto** : Pas besoin de coder le backend
2. **RLS (Row Level Security)** : Sécurité au niveau de chaque ligne
3. **Soft Delete** : On ne supprime pas vraiment, on marque comme supprimé
4. **Client Supabase** : Interface pour communiquer avec la DB
5. **Variables d'env** : Config sensible hors du code

### Workflow typique

1. **Créer la structure** : Fichier SQL de migration
2. **Configurer le client** : `src/lib/supabase.ts`
3. **Requêter les données** : `supabase.from("table").select()`
4. **Gérer les erreurs** : Toujours checker `error`

## 📝 Petit exercice

Pour tester ta compréhension, crée une fonction qui :
1. Récupère toutes les compétences (`skills`)
2. Filtre seulement celles de niveau `acquired`
3. Les trie par nom alphabétiquement

<details>
<summary>Solution</summary>

```typescript
import { supabase } from "@/lib/supabase";

async function getAcquiredSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("level", "acquired")
    .order("name", { ascending: true });

  if (error) {
    console.error("Erreur:", error);
    return [];
  }

  return data;
}
```
</details>

## ➡️ Prochaine étape

Maintenant qu'on a la base de données prête, on va :
1. Créer les composants du Dashboard
2. Afficher les données de Supabase
3. Commencer par la section Hero/Profil

**Supabase configuré ! On passe au développement du Dashboard 🚀**
