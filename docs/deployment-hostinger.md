# Guide de déploiement sur Hostinger

Ce guide explique comment déployer votre application Next.js Dashnouk Dev sur Hostinger.

## Prérequis

- Un compte Hostinger (Hébergement Web ou Premium)
- Accès FTP à votre hébergement
- Votre application configurée avec Supabase

## Option recommandée : Export statique

Votre application est maintenant configurée pour être exportée en site statique. C'est l'option la plus simple et la moins chère sur Hostinger.

### Étape 1 : Configuration de l'environnement

Créez un fichier `.env.local` avec vos variables Supabase :

```bash
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### Étape 2 : Build de production

Exécutez les commandes suivantes pour générer le site statique :

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Créer le build statique
npm run build
```

Cela créera un dossier `out/` contenant tous les fichiers statiques de votre application.

### Étape 3 : Préparer les fichiers pour l'upload

Les fichiers à uploader se trouvent dans le dossier `out/`. Vous aurez également besoin du fichier `.htaccess` qui est dans `public/`.

Structure des fichiers à uploader :
```
out/
├── _next/
├── index.html
├── projects.html
├── projects/
└── ...autres fichiers...
public/.htaccess (à copier dans out/)
```

### Étape 4 : Upload sur Hostinger

#### Via FTP (FileZilla recommandé)

1. **Téléchargez FileZilla** : [https://filezilla-project.org](https://filezilla-project.org)

2. **Récupérez vos identifiants FTP** :
   - Connectez-vous à votre panneau Hostinger
   - Allez dans "Fichiers" → "Gestionnaire de fichiers" ou "FTP"
   - Notez : Hôte, Nom d'utilisateur, Mot de passe

3. **Connectez-vous via FileZilla** :
   - Hôte : `ftp.votredomaine.com` ou l'IP fournie
   - Nom d'utilisateur : votre nom d'utilisateur FTP
   - Mot de passe : votre mot de passe FTP
   - Port : 21

4. **Uploadez les fichiers** :
   - Naviguez vers le dossier `public_html/` sur le serveur
   - Supprimez tous les fichiers existants (sauf .htaccess si vous en avez un important)
   - Uploadez TOUT le contenu du dossier `out/` dans `public_html/`
   - Copiez le fichier `.htaccess` de `public/` vers `public_html/`

#### Via le Gestionnaire de fichiers Hostinger

1. Connectez-vous à votre panneau Hostinger
2. Allez dans "Fichiers" → "Gestionnaire de fichiers"
3. Naviguez vers `public_html/`
4. Créez une archive ZIP de votre dossier `out/` sur votre ordinateur
5. Uploadez le ZIP via le gestionnaire
6. Extrayez le contenu dans `public_html/`
7. Uploadez séparément le fichier `.htaccess`

### Étape 5 : Configuration du domaine

1. Dans le panneau Hostinger, allez dans "Domaines"
2. Assurez-vous que votre domaine pointe vers le dossier `public_html/`
3. Si vous utilisez un sous-domaine, créez-le et pointez-le vers `public_html/`

### Étape 6 : Configuration SSL (HTTPS)

1. Dans le panneau Hostinger, allez dans "SSL"
2. Activez le SSL gratuit Let's Encrypt pour votre domaine
3. Attendez quelques minutes que le certificat soit généré
4. Votre site sera accessible en HTTPS

### Étape 7 : Vérification

Visitez votre site :
- `http://votredomaine.com` → devrait rediriger vers HTTPS
- `https://votredomaine.com` → votre dashboard devrait s'afficher
- Testez la navigation entre les pages
- Vérifiez que les données Supabase s'affichent correctement

## Mise à jour du site

Pour mettre à jour votre site :

1. Modifiez votre code localement
2. Exécutez `npm run build`
3. Uploadez le nouveau contenu du dossier `out/` vers `public_html/`
4. Effacez le cache de votre navigateur si nécessaire

## Script de déploiement automatique

Pour automatiser le déploiement, vous pouvez créer un script :

### Windows (deploy.bat)
```batch
@echo off
echo Building...
npm run build
echo.
echo Build complete! Files are in the 'out' folder
echo Upload the contents of 'out' folder to public_html on Hostinger
pause
```

### Mac/Linux (deploy.sh)
```bash
#!/bin/bash
echo "Building..."
npm run build
echo ""
echo "Build complete! Files are in the 'out' folder"
echo "Upload the contents of 'out' folder to public_html on Hostinger"
```

## Dépannage

### Problème : Les routes ne fonctionnent pas (404)

- Vérifiez que le fichier `.htaccess` est bien uploadé dans `public_html/`
- Vérifiez que le module `mod_rewrite` est activé sur votre serveur

### Problème : Les données Supabase ne s'affichent pas

- Vérifiez que vos variables d'environnement Supabase sont correctes
- Les variables doivent commencer par `NEXT_PUBLIC_` pour être accessibles côté client
- Vérifiez dans la console du navigateur s'il y a des erreurs

### Problème : Le site est lent

- Activez la compression Gzip (déjà configurée dans .htaccess)
- Activez le cache (déjà configuré dans .htaccess)
- Optimisez vos images
- Considérez l'utilisation d'un CDN

### Problème : Erreurs de build

- Vérifiez qu'il n'y a pas d'erreurs TypeScript : `npm run build`
- Assurez-vous que toutes les dépendances sont installées : `npm install`
- Vérifiez les logs de build pour identifier le problème

## Alternative : Déploiement avec GitHub Actions (Avancé)

Si vous voulez automatiser complètement le déploiement :

1. Configurez un accès FTP dans les secrets GitHub
2. Utilisez une action GitHub pour builder et déployer automatiquement
3. Chaque push sur la branche `main` déclenchera un déploiement

## Coûts Hostinger

- Hébergement Premium : ~2-4€/mois
- SSL gratuit inclus
- Bande passante illimitée
- Parfait pour votre dashboard personnel

## Support

Si vous rencontrez des problèmes :
1. Consultez la documentation Hostinger
2. Contactez le support Hostinger (excellent support 24/7)
3. Vérifiez les logs d'erreur dans le panneau Hostinger

## Prochaines étapes

Une fois déployé :
- Configurez Google Analytics (optionnel)
- Configurez un monitoring (UptimeRobot gratuit)
- Mettez en place des sauvegardes régulières
- Optimisez les performances avec PageSpeed Insights
