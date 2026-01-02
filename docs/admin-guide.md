# Guide d'utilisation de la page Admin

## 🎯 Accès à l'admin

**URL** : https://noukdev.com/admin/login

## 🔐 Première connexion

### 1. Créer votre compte admin dans Supabase

1. **Allez sur** : https://app.supabase.com
2. **Sélectionnez votre projet**
3. **Authentication** → **Users**
4. **Add user** → **Create new user**
5. Remplissez :
   - **Email** : `prince@noukdev.com` (ou votre email)
   - **Password** : Un mot de passe fort
   - **Auto Confirm User** : ✅ Coché
6. **Create user**

⚠️ **Notez bien votre email et mot de passe !**

### 2. Exécuter la migration SQL

1. **SQL Editor** → **New Query**
2. **Copiez** tout le contenu de `supabase/migrations/003_create_experiences_and_auth.sql`
3. **Collez** et **Run**

Cela configure :
- ✅ Table `experiences` pour vos expériences professionnelles
- ✅ Permissions RLS pour l'admin
- ✅ 2 expériences d'exemple

## 📝 Utiliser l'admin

### Se connecter

1. Allez sur : **https://noukdev.com/admin/login**
2. Entrez votre **email** et **mot de passe**
3. Cliquez sur **"Se connecter"**

### Gérer les projets

#### ➕ Ajouter un projet

1. Cliquez sur **"Nouveau projet"**
2. Remplissez le formulaire :
   - **Nom** : Nom du projet *
   - **Type** : Web, Mobile, Software ou Automation *
   - **Statut** : Idée, En construction, MVP, Production ou Pause *
   - **Stack** : Technologies séparées par des virgules (ex: `Next.js, TypeScript, Supabase`)
   - **Description** : Description complète du projet *
   - **URL GitHub** : Lien vers le repo (optionnel)
   - **URL App** : Lien vers l'application (optionnel)
3. Cliquez sur **"Créer"**

#### ✏️ Modifier un projet

1. Cliquez sur l'icône **Crayon (Edit)** du projet
2. Modifiez les champs
3. Cliquez sur **"Mettre à jour"**

#### 🗑️ Supprimer un projet

1. Cliquez sur l'icône **Poubelle (Delete)** du projet
2. Confirmez la suppression

**Note** : La suppression est "soft" - le projet est marqué comme supprimé mais reste dans la base de données.

### 🚪 Se déconnecter

Cliquez sur **"Déconnexion"** en haut à droite.

## 🔒 Sécurité

### Protection des routes

- ✅ Seuls les utilisateurs authentifiés peuvent accéder à `/admin`
- ✅ Redirection automatique vers `/admin/login` si non connecté
- ✅ Session persistante (vous restez connecté)

### Row Level Security (RLS)

Toutes les tables sont protégées par RLS :

**Lecture (SELECT)** :
- ✅ Public : Tout le monde peut lire les données non supprimées

**Écriture (INSERT/UPDATE/DELETE)** :
- ✅ Admin seulement : Seuls les utilisateurs authentifiés peuvent modifier

## 🎨 Fonctionnalités actuelles

### ✅ Implémenté

- Login / Logout
- Gestion complète des **Projets** (CRUD)
- Protection des routes
- Interface responsive
- Validation des formulaires

### 🚧 À venir (vous pouvez étendre)

Pour ajouter la gestion d'autres contenus, vous pouvez créer des sections similaires pour :

- **Compétences** (Skills)
- **Objectifs** (Goals)
- **Expériences** (Experiences) - table déjà créée !

**Structure recommandée** : Créer des onglets ou sections séparées dans `/admin/page.tsx` pour chaque type de contenu.

## 🔧 Développement

### Ajouter de nouvelles fonctionnalités

Le code est dans :
- `src/app/admin/page.tsx` - Page admin principale
- `src/app/admin/login/page.tsx` - Page de login
- `src/components/AdminProtected.tsx` - Protection des routes
- `src/lib/auth.ts` - Fonctions d'authentification

### Ajouter la gestion d'autres contenus

Exemple pour ajouter la gestion des **Compétences** :

1. Créer un state similaire à `projects`
2. Créer un formulaire similaire au formulaire projet
3. Utiliser les mêmes fonctions CRUD adaptées à la table `skills`

## 📊 Voir les changements en direct

Après avoir ajouté/modifié des données dans l'admin :

1. **Allez sur votre site** : https://noukdev.com
2. **Actualisez** (F5 ou Ctrl+F5)
3. **Les nouvelles données apparaissent !** ✨

Pas besoin de redéployer - les données sont chargées en temps réel depuis Supabase.

## ❓ Dépannage

### Impossible de se connecter

- Vérifiez que le user existe dans Supabase > Authentication > Users
- Vérifiez que le mot de passe est correct
- Vérifiez que "Auto Confirm User" était coché à la création

### Impossible de créer/modifier des projets

- Vérifiez que vous êtes bien connecté
- Vérifiez que la migration SQL a bien été exécutée
- Vérifiez les RLS policies dans Supabase

### Les changements n'apparaissent pas sur le site

- Attendez quelques secondes
- Actualisez la page (Ctrl+F5)
- Vérifiez dans Supabase > Table Editor que les données sont bien là

## 🎯 Prochaines étapes recommandées

1. **Personnaliser l'interface** selon vos besoins
2. **Ajouter la gestion des Compétences, Objectifs et Expériences**
3. **Ajouter un éditeur rich-text** pour les descriptions
4. **Ajouter l'upload d'images** pour les projets
5. **Créer des dashboards** avec statistiques

Bonne gestion de contenu ! 🚀
