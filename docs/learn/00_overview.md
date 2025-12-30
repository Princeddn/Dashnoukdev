# 📚 Vue d'ensemble du projet – Nouk Prince HQ

## 🎯 Objectif du projet

Bienvenue dans ton projet **Nouk Prince HQ** ! C'est ton quartier général personnel, un dashboard qui centralise :

- Ta présentation professionnelle
- Tes compétences (acquises, en cours, et à acquérir)
- Tes objectifs (annuels et mensuels)
- Tous tes projets (web, mobile, software, automations)
- Plus tard : intégration GitHub et un lanceur de projets avec IA

## 🏗️ Architecture du projet

### Stack technique

**Frontend :**
- **Next.js** (App Router) : Framework React moderne avec rendu côté serveur
- **React** : Bibliothèque pour créer l'interface utilisateur
- **TypeScript strict** : Pour un code sûr et maintenable
- **TailwindCSS** : Framework CSS utilitaire pour le style
- **ShadCN UI** : Composants UI modernes et accessibles

**Backend & Data :**
- **Supabase** : Backend-as-a-Service qui fournit :
  - Base de données PostgreSQL
  - Authentification
  - API REST automatique

### Pourquoi cette stack ?

1. **Next.js** : C'est le standard moderne pour créer des applications React performantes. L'App Router permet une navigation fluide et un rendu optimisé.

2. **TypeScript strict** : Le mode strict t'oblige à être précis dans ton code. Pas de `any`, pas de valeurs nulles non gérées. Ça évite 90% des bugs.

3. **TailwindCSS** : Au lieu d'écrire du CSS personnalisé, tu utilises des classes utilitaires. C'est plus rapide et plus cohérent.

4. **Supabase** : Tu n'as pas besoin de créer un backend de zéro. Supabase te donne une base de données, une authentification, et des APIs automatiquement.

## 📊 Les trois tables principales

### 1. `projects` (Tes projets)
Stocke tous tes projets avec leur statut, stack technique, liens GitHub/app, etc.

### 2. `skills` (Tes compétences)
Organisées en 3 catégories :
- Acquises (tu maîtrises)
- En cours d'acquisition (tu apprends)
- À acquérir (tes objectifs)

### 3. `goals` (Tes objectifs)
Objectifs annuels et mensuels avec leur statut (todo, en cours, done)

## 🎭 Les deux rôles utilisateurs

### 👤 Visiteur
- Peut voir tout le contenu (mode lecture)
- Pas besoin de se connecter
- C'est pour présenter ton travail au monde

### 👑 Admin (toi)
- Doit se connecter via Supabase Auth
- Peut créer, modifier, supprimer :
  - Projets
  - Objectifs
  - Compétences

## 📄 Les pages principales

| Route | Description |
|-------|-------------|
| `/` | Dashboard principal avec toutes les sections |
| `/projects` | Liste complète des projets avec filtres |
| `/projects/[id]` | Page de détail d'un projet spécifique |
| `/login` | Page de connexion admin |

## 🗺️ Roadmap du développement

### ✅ Phase 1 – MVP (ce qu'on va faire maintenant)
1. Setup du projet Next.js
2. Configuration de Supabase
3. Création des tables
4. Dashboard avec toutes les sections
5. Pages projets
6. Authentification admin
7. CRUD pour gérer le contenu

### ▶️ Phase 2 (plus tard)
- Intégration avec l'API GitHub
- Affichage des repos, stars, dernière mise à jour

### ▶️ Phase 3 (futur)
- AI Project Launcher : une IA qui t'aide à cadrer et lancer de nouveaux projets

## 🎓 Ce que tu vas apprendre

À travers ce projet, tu vas comprendre :

1. **Architecture moderne d'application web**
   - Comment structurer un projet Next.js
   - Comment organiser tes composants React
   - Comment gérer le routing

2. **TypeScript strict**
   - Définir des types précis
   - Éviter les erreurs à la compilation
   - Créer un code maintenable

3. **Base de données relationnelle**
   - Concevoir un schéma de données
   - Faire des requêtes
   - Gérer les relations entre tables

4. **Authentification & Autorisation**
   - Différencier visiteur et admin
   - Protéger les routes sensibles
   - Gérer les sessions utilisateur

5. **CRUD operations**
   - Create : créer de nouvelles entrées
   - Read : lire et afficher les données
   - Update : modifier des entrées existantes
   - Delete : supprimer des entrées

## 📐 Principes de code

Ce projet suit des règles strictes :

✅ **Code propre** : Lisible, bien organisé, bien nommé
✅ **TypeScript strict** : Pas de `any`, types explicites partout
✅ **Architecture claire** : Dossiers logiques, séparation des responsabilités
✅ **Pas de sur-ingénierie** : On fait simple et efficace
✅ **Évolutif** : On peut ajouter des features facilement plus tard

## 🚀 C'est parti !

Dans les prochains fichiers de documentation, on va :
1. Setup le projet étape par étape
2. Créer la structure des dossiers
3. Configurer Supabase
4. Développer chaque section du dashboard
5. Implémenter l'authentification
6. Créer les interfaces d'admin

Chaque étape sera expliquée en détail, comme un cours particulier.

**Prêt à construire ton QG ? Let's go ! 🔥**
