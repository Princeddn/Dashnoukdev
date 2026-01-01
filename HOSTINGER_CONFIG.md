# Configuration Hostinger - Guide Rapide

Ce fichier contient toutes les informations nécessaires pour configurer le déploiement Git sur Hostinger.

## 📋 Configuration Git Hostinger

### Repository
- **URL** : `https://github.com/Princeddn/Dashnoukdev`
- **Branche** : `main`

### Commandes de Build
```bash
npm install
npm run build
```

### Dossier de sortie
```
out
```

### Version Node.js
```
18.x ou supérieure
```

## 🔐 Variables d'environnement requises

À configurer dans le panneau Hostinger :

| Variable | Description | Où la trouver |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase | Dashboard Supabase > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique anonyme | Dashboard Supabase > Settings > API > anon public |

## 🚀 Étapes de configuration (Résumé)

### Option 1 : Via l'interface Git Hostinger

1. Panneau Hostinger > Git/GitHub
2. Connecter GitHub
3. Sélectionner repository : `Princeddn/Dashnoukdev`
4. Branche : `main`
5. Build command : `npm install && npm run build`
6. Output directory : `out`
7. Ajouter les variables d'environnement
8. Déployer !

### Option 2 : Upload manuel du dossier `out/`

Si Git n'est pas disponible sur votre plan :

1. Exécutez localement : `npm run build`
2. Le dossier `out/` sera créé
3. Uploadez tout le contenu de `out/` vers `public_html/` via FTP
4. Assurez-vous que `.htaccess` est aussi uploadé

## 📁 Structure après déploiement

```
public_html/
├── _next/           (fichiers Next.js)
├── projects/        (pages des projets)
├── .htaccess        (configuration Apache)
├── index.html       (page d'accueil)
├── projects.html    (page liste projets)
└── 404.html         (page d'erreur)
```

## ✅ Vérification post-déploiement

- [ ] Site accessible en HTTPS
- [ ] Navigation entre les pages fonctionne
- [ ] Données Supabase s'affichent
- [ ] Aucune erreur 404
- [ ] SSL activé

## 🆘 En cas de problème

### Build échoue
- Vérifiez que Node.js 18+ est configuré
- Vérifiez les logs de build
- Testez `npm run build` en local

### Données Supabase ne s'affichent pas
- Vérifiez les variables d'environnement
- Consultez la console navigateur (F12)
- Vérifiez que les données sont bien dans Supabase

### Routes ne fonctionnent pas (404)
- Vérifiez que `.htaccess` est bien déployé
- Vérifiez que `mod_rewrite` est activé

## 📚 Documentation complète

Pour plus de détails, consultez :
- [Guide déploiement Git](./docs/deployment-hostinger-git.md)
- [Guide déploiement FTP](./docs/deployment-hostinger.md)
- [Configuration base de données](./docs/database-setup.md)

## 🔄 Workflow après configuration

```bash
# Développement local
git add .
git commit -m "Mes changements"
git push origin main

# Hostinger déploie automatiquement !
```

C'est tout ! Votre site sera automatiquement mis à jour à chaque push sur GitHub.
