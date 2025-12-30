# 📦 Setup du projet – Next.js + TypeScript + TailwindCSS

## 🎯 Objectif de cette étape

Créer la base technique du projet avec :
- Next.js 16 (App Router)
- TypeScript en mode strict
- TailwindCSS pour le style
- ESLint pour la qualité du code

## 📁 Structure créée

```
Dashnoukdev/
├── docs/
│   └── learn/           # Documentation pédagogique
├── public/              # Fichiers statiques (images, etc.)
├── src/
│   ├── app/             # Pages et routing (App Router)
│   │   ├── globals.css  # Styles globaux avec Tailwind
│   │   ├── layout.tsx   # Layout racine
│   │   └── page.tsx     # Page d'accueil
│   ├── components/      # Composants React réutilisables
│   ├── lib/             # Utilitaires et helpers
│   └── types/           # Types TypeScript globaux
├── .eslintrc.json       # Configuration ESLint
├── .gitignore           # Fichiers à ignorer par Git
├── next.config.ts       # Configuration Next.js
├── package.json         # Dépendances et scripts
├── postcss.config.mjs   # Configuration PostCSS
├── tailwind.config.ts   # Configuration TailwindCSS
└── tsconfig.json        # Configuration TypeScript
```

## 🔧 Fichiers de configuration importants

### 1. `tsconfig.json` - TypeScript strict

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    // ... autres options strictes
  }
}
```

**Ce que ça signifie :**
- `strict: true` : Active tous les modes stricts de TypeScript
- `noImplicitAny: true` : Interdit d'utiliser `any` implicitement
- `strictNullChecks: true` : Force à gérer les valeurs `null` et `undefined`

**Pourquoi c'est important :**
Le mode strict t'oblige à être précis. Ça évite 90% des bugs avant même de lancer le code.

### 2. `tailwind.config.ts` - Configuration TailwindCSS

```typescript
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

**Ce que ça fait :**
- `content` : Indique à Tailwind où chercher les classes CSS utilisées
- `theme` : Permet de personnaliser les couleurs, tailles, etc.
- `plugins` : Pour ajouter des plugins Tailwind (on en ajoutera plus tard)

### 3. `next.config.ts` - Configuration Next.js

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
};
```

**Ce que ça fait :**
- `reactStrictMode: true` : Active le mode strict de React pour détecter les problèmes potentiels

### 4. `package.json` - Scripts disponibles

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Les commandes :**
- `npm run dev` : Lance le serveur de développement (http://localhost:3000)
- `npm run build` : Compile le projet pour la production
- `npm run start` : Lance le serveur de production
- `npm run lint` : Vérifie la qualité du code avec ESLint

## 🎨 Structure App Router de Next.js

### Le dossier `src/app/`

Next.js utilise le système **App Router** où :
- Chaque dossier dans `app/` devient une route
- Les fichiers spéciaux ont des rôles précis :
  - `layout.tsx` : Layout partagé entre plusieurs pages
  - `page.tsx` : Contenu de la page
  - `loading.tsx` : État de chargement
  - `error.tsx` : Gestion des erreurs

### Exemple de routing :

```
src/app/
├── page.tsx              → Route "/"
├── projects/
│   ├── page.tsx          → Route "/projects"
│   └── [id]/
│       └── page.tsx      → Route "/projects/123"
└── login/
    └── page.tsx          → Route "/login"
```

## 🎨 TailwindCSS - Les bases

### Qu'est-ce que Tailwind ?

Au lieu d'écrire du CSS traditionnel :
```css
/* Style traditionnel */
.my-button {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

Avec Tailwind, tu utilises des classes utilitaires :
```tsx
<button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
  Mon bouton
</button>
```

### Classes Tailwind les plus utilisées :

| Classe | Effet |
|--------|-------|
| `flex` | Display flex |
| `items-center` | Align items center |
| `justify-between` | Justify content space-between |
| `text-xl` | Font size 1.25rem |
| `font-bold` | Font weight bold |
| `text-gray-600` | Couleur grise |
| `bg-white` | Fond blanc |
| `p-4` | Padding 1rem |
| `m-4` | Margin 1rem |
| `rounded-lg` | Border radius large |

### Le fichier `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ces 3 lignes importent :
- `base` : Reset CSS et styles de base
- `components` : Classes de composants (boutons, cards, etc.)
- `utilities` : Classes utilitaires (flex, text-xl, etc.)

## 🧠 TypeScript strict - Exemples pratiques

### ❌ Code interdit en mode strict

```typescript
// ERREUR : any implicite
function getUser(id) {  // ❌ 'id' a le type 'any' implicite
  return fetch(`/api/users/${id}`);
}

// ERREUR : null non géré
let name: string = null;  // ❌ Type 'null' n'est pas assignable à 'string'
```

### ✅ Code correct en mode strict

```typescript
// ✅ Type explicite
function getUser(id: string): Promise<Response> {
  return fetch(`/api/users/${id}`);
}

// ✅ null géré explicitement
let name: string | null = null;
```

## 🚀 Lancer le projet

### Commande de développement

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

### Vérifier que tout fonctionne

1. Va sur http://localhost:3000
2. Tu devrais voir : "Nouk Prince HQ" avec "Welcome in my world"
3. Le hot reload est actif : modifie `src/app/page.tsx` et la page se rafraîchit automatiquement

## 🎓 Ce que tu dois retenir

### Concepts clés

1. **App Router** : Le routing se fait via la structure des dossiers dans `src/app/`
2. **TypeScript strict** : Tous les types doivent être explicites, pas de `any`
3. **TailwindCSS** : Utilise des classes utilitaires au lieu de CSS personnalisé
4. **Composants Server** : Par défaut, les composants sont rendus côté serveur

### Avantages de cette stack

- **Next.js** : SEO optimisé, performance, routing automatique
- **TypeScript** : Moins de bugs, meilleur auto-complétion
- **TailwindCSS** : Développement rapide, design cohérent
- **ESLint** : Détecte les erreurs avant l'exécution

## 📝 Petit exercice

Pour tester ta compréhension, modifie `src/app/page.tsx` :

1. Change le titre "Nouk Prince HQ" en ajoutant un emoji
2. Ajoute un bouton avec les classes Tailwind :
   - Fond bleu (`bg-blue-500`)
   - Texte blanc (`text-white`)
   - Padding (`px-6 py-3`)
   - Arrondi (`rounded-lg`)

<details>
<summary>Solution</summary>

```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🔥 Nouk Prince HQ</h1>
        <p className="text-xl text-gray-600 mb-6">Welcome in my world</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Découvrir mes projets
        </button>
      </div>
    </div>
  );
}
```
</details>

## ➡️ Prochaine étape

Maintenant que le projet est configuré, on va :
1. Installer ShadCN UI pour avoir des composants modernes
2. Configurer Supabase pour la base de données
3. Créer les types TypeScript pour nos données

**Setup terminé ! On passe à la suite 🚀**
