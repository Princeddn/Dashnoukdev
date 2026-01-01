# Déploiement Hostinger avec GitHub Actions

Ce guide explique comment déployer automatiquement sur Hostinger en utilisant GitHub Actions.

## Pourquoi cette méthode ?

Hostinger clone le repository mais ne build pas automatiquement les projets Node.js. Avec GitHub Actions :
- ✅ Le build se fait automatiquement sur GitHub
- ✅ Une branche `gh-pages` contient uniquement les fichiers HTML/CSS/JS buildés
- ✅ Hostinger déploie cette branche directement
- ✅ Aucune configuration serveur nécessaire

## Configuration en 3 étapes

### Étape 1 : Configurer les secrets GitHub

1. Allez sur votre repository GitHub : https://github.com/Princeddn/Dashnoukdev

2. Cliquez sur **Settings** (en haut à droite)

3. Dans le menu de gauche : **Secrets and variables** > **Actions**

4. Cliquez sur **New repository secret**

5. Ajoutez ces 2 secrets :

   **Secret 1 :**
   - Name : `NEXT_PUBLIC_SUPABASE_URL`
   - Value : Votre URL Supabase (ex: `https://xxxxx.supabase.co`)

   **Secret 2 :**
   - Name : `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value : Votre clé anonyme Supabase

### Étape 2 : Déclencher le premier build

1. Une fois les secrets ajoutés, allez dans **Actions** (en haut du repository)

2. Vous verrez le workflow "Build and Deploy to Hostinger"

3. Cliquez dessus, puis **Run workflow** > **Run workflow**

4. Attendez que le build se termine (environ 1-2 minutes)

5. Une fois terminé, une nouvelle branche `gh-pages` sera créée avec les fichiers buildés

### Étape 3 : Reconfigurer Hostinger

Retournez sur Hostinger et modifiez la configuration Git :

**Ancienne configuration :**
```
Dépôt : https://github.com/Princeddn/Dashnoukdev.git
Branche : main
```

**Nouvelle configuration :**
```
Dépôt : https://github.com/Princeddn/Dashnoukdev.git
Branche : gh-pages
Chemin d'installation : (laisser vide)
```

Ou si Hostinger utilise SSH :
```
Dépôt : git@github.com:Princeddn/Dashnoukdev.git
Branche : gh-pages
Chemin d'installation : (laisser vide)
```

### Étape 4 : Redéployer sur Hostinger

1. Dans le panneau Hostinger Git, cliquez sur **Pull** ou **Redéployer**

2. Hostinger va maintenant récupérer la branche `gh-pages` qui contient les fichiers buildés

3. Votre site sera en ligne ! 🎉

## Comment ça marche ?

```
┌─────────────────────────────────────────────────────────┐
│  Vous : git push origin main                            │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  GitHub Actions :                                        │
│  1. Installe Node.js                                    │
│  2. Installe les dépendances (npm ci)                   │
│  3. Build le projet (npm run build)                     │
│  4. Pousse le contenu de out/ vers branche gh-pages     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Hostinger :                                             │
│  Pull la branche gh-pages (fichiers HTML déjà buildés)  │
│  Déploie dans public_html/                              │
└─────────────────────────────────────────────────────────┘
                        ↓
              Votre site est en ligne !
```

## Workflow de développement

Une fois configuré, votre workflow sera super simple :

```bash
# 1. Développez localement
git add .
git commit -m "Mes modifications"

# 2. Poussez sur GitHub
git push origin main

# 3. GitHub Actions build automatiquement
# (regardez dans l'onglet Actions pour suivre le build)

# 4. Une fois le build terminé (1-2 min),
#    Hostinger peut être configuré pour pull automatiquement
#    ou vous cliquez sur "Pull" dans le panneau Hostinger

# 5. Votre site est mis à jour ! 🎉
```

## Vérifier que tout fonctionne

### Vérifier le build GitHub Actions

1. Allez dans **Actions** sur GitHub
2. Le workflow doit être ✅ vert
3. Cliquez dessus pour voir les logs

### Vérifier la branche gh-pages

1. Sur GitHub, cliquez sur le sélecteur de branche (où il y a "main")
2. Vous devriez voir la branche **gh-pages**
3. Cette branche contient uniquement les fichiers HTML/CSS/JS

### Vérifier le déploiement Hostinger

1. Connectez-vous via FTP ou File Manager Hostinger
2. Dans `public_html/`, vous devriez voir :
   - `index.html`
   - `projects.html`
   - Dossier `_next/`
   - `.htaccess`
   - etc.

## Activer le pull automatique (optionnel)

Si Hostinger le permet, configurez le pull automatique :

1. Dans la config Git Hostinger, cherchez "Auto deploy" ou "Webhook"
2. Activez-le
3. Chaque fois que gh-pages est mise à jour, Hostinger déploie automatiquement

## Dépannage

### Le workflow GitHub Actions échoue

**Erreur : "NEXT_PUBLIC_SUPABASE_URL is not set"**
- Vérifiez que les secrets sont bien configurés dans GitHub
- Les noms doivent être exactement : `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Erreur de build**
- Vérifiez les logs dans Actions > [votre workflow]
- Testez `npm run build` en local pour reproduire l'erreur

### La branche gh-pages n'est pas créée

- Vérifiez que le workflow s'est terminé avec succès (✅)
- Attendez quelques secondes puis rafraîchissez la page
- Vérifiez les permissions : Settings > Actions > General > Workflow permissions

### Hostinger ne déploie pas correctement

**Vérifiez la branche configurée**
- Elle doit être `gh-pages`, pas `main`

**Vérifiez le chemin d'installation**
- Il doit être vide (pour déployer dans public_html)

**Logs Hostinger montrent "already up to date"**
- C'est normal si aucun changement n'a été fait
- Faites un nouveau push pour tester

## Avantages de cette méthode

✅ **Automatique** : Push → Build → Deploy
✅ **Rapide** : Build sur GitHub (serveurs puissants)
✅ **Gratuit** : GitHub Actions gratuit pour repos publics
✅ **Sécurisé** : Secrets stockés dans GitHub
✅ **Simple** : Hostinger reçoit des fichiers déjà buildés

## Coûts

- **GitHub Actions** : Gratuit pour repositories publics (2000 minutes/mois)
- **Hostinger** : Votre plan actuel (aucun surcoût)

## Alternative : Build manuel

Si vous préférez ne pas utiliser GitHub Actions :

```bash
# Localement
npm run build

# Créer une branche gh-pages manuellement
git checkout --orphan gh-pages
cp -r out/* .
git add .
git commit -m "Deploy"
git push origin gh-pages

# Reconfigurer Hostinger sur branche gh-pages
```

Mais GitHub Actions est plus pratique car automatique !

## Support

En cas de problème :
1. Vérifiez les logs GitHub Actions
2. Vérifiez les logs Hostinger
3. Consultez ce guide
4. Contactez le support Hostinger si nécessaire
