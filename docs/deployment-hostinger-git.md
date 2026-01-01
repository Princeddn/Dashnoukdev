# Déploiement automatique via Git sur Hostinger

Ce guide explique comment configurer le déploiement automatique depuis GitHub vers Hostinger.

## Prérequis

- Compte Hostinger (Premium ou Business)
- Repository GitHub : https://github.com/Princeddn/Dashnoukdev
- Accès au panneau Hostinger

## Avantages du déploiement Git

- ✅ Déploiement automatique à chaque push sur GitHub
- ✅ Pas besoin d'uploader manuellement via FTP
- ✅ Historique des déploiements
- ✅ Rollback facile en cas de problème

## Configuration sur Hostinger

### Étape 1 : Activer Git sur Hostinger

1. **Connectez-vous au panneau Hostinger**
   - Allez sur [https://hpanel.hostinger.com](https://hpanel.hostinger.com)

2. **Naviguez vers Git**
   - Dans le menu, cherchez "Git" ou "GitHub"
   - Cliquez sur "Créer un nouveau dépôt" ou "Connect to GitHub"

### Étape 2 : Connecter GitHub

1. **Autoriser Hostinger**
   - Cliquez sur "Connect GitHub Account"
   - Autorisez Hostinger à accéder à vos repositories

2. **Sélectionner le repository**
   - Repository : `Princeddn/Dashnoukdev`
   - Branche : `main`

### Étape 3 : Configuration du build

Dans la configuration Git de Hostinger, configurez :

**Commandes de build :**
```bash
npm install
npm run build
```

**Dossier de sortie :**
```
out
```

**Dossier public :**
```
public_html
```

**Variables d'environnement :**
Ajoutez vos variables Supabase :
- `NEXT_PUBLIC_SUPABASE_URL` : votre URL Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : votre clé anonyme Supabase

### Étape 4 : Configuration avancée (optionnel)

Si Hostinger le supporte, créez un fichier de configuration :

**.hostinger.yml** (si supporté)
```yaml
build:
  command: npm run build
  output: out
  install: npm install
environment:
  NODE_VERSION: 18
```

## Alternative : Utiliser Git via SSH

Si Hostinger ne supporte pas l'intégration GitHub directe, vous pouvez utiliser Git via SSH :

### 1. Configurer SSH sur Hostinger

```bash
# Sur votre machine locale
ssh-keygen -t rsa -b 4096 -C "votre@email.com"

# Copier la clé publique
cat ~/.ssh/id_rsa.pub
```

Ajoutez cette clé SSH dans :
- GitHub : Settings > SSH and GPG keys
- Hostinger : Panneau > SSH Access

### 2. Cloner le repository sur Hostinger

Connectez-vous via SSH à Hostinger :

```bash
ssh votre-utilisateur@votre-domaine.com
```

Puis clonez votre repository :

```bash
cd domains/votre-domaine.com/public_html
git clone git@github.com:Princeddn/Dashnoukdev.git .
```

### 3. Configurer le déploiement automatique

Créez un script de déploiement sur le serveur :

```bash
#!/bin/bash
# deploy-server.sh

cd /home/votre-utilisateur/domains/votre-domaine.com/public_html

# Pull les dernières modifications
git pull origin main

# Installer les dépendances
npm install

# Builder le projet
npm run build

# Copier les fichiers buildés dans le dossier public
rsync -av --delete out/ ../public_html/

echo "Déploiement terminé !"
```

### 4. Webhook GitHub (Avancé)

Pour un déploiement automatique à chaque push :

1. Créez un endpoint PHP sur votre serveur :

```php
<?php
// webhook.php
$secret = 'votre-secret-webhook';

$headers = getallheaders();
$signature = $headers['X-Hub-Signature-256'] ?? '';

$payload = file_get_contents('php://input');
$calculated = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (hash_equals($signature, $calculated)) {
    exec('/path/to/deploy-server.sh > /dev/null 2>&1 &');
    echo "Deployment triggered";
} else {
    http_response_code(403);
    echo "Invalid signature";
}
?>
```

2. Configurez le webhook sur GitHub :
   - Repository > Settings > Webhooks
   - Payload URL : `https://votre-domaine.com/webhook.php`
   - Secret : votre secret
   - Events : Just the push event

## Méthode Simple : Hostinger Premium/Business avec Node.js

Si vous avez un plan Premium/Business avec Node.js :

### 1. Configuration Node.js

Dans le panneau Hostinger :
- Allez dans "Node.js"
- Créez une nouvelle application
- Version Node.js : 18.x ou supérieure

### 2. Configuration de l'application

**Run command :**
```bash
npm start
```

**Environment variables :**
```
NEXT_PUBLIC_SUPABASE_URL=votre-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé
```

### 3. Modifier package.json

Assurez-vous que votre `package.json` contient :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  }
}
```

## Vérification du déploiement

Après le déploiement :

1. **Vérifiez les logs**
   - Dans le panneau Hostinger, consultez les logs de déploiement
   - Cherchez les erreurs éventuelles

2. **Testez votre site**
   - Visitez `https://votre-domaine.com`
   - Testez la navigation
   - Vérifiez que les données Supabase s'affichent

3. **Vérifiez SSL**
   - Assurez-vous que SSL est activé
   - Le site devrait être accessible en HTTPS

## Workflow de déploiement

Une fois configuré, votre workflow sera :

1. **Développement local**
   ```bash
   git add .
   git commit -m "Mon changement"
   git push origin main
   ```

2. **Déploiement automatique**
   - Hostinger détecte le push
   - Lance le build automatiquement
   - Déploie la nouvelle version

3. **Vérification**
   - Visitez votre site
   - Vérifiez les changements

## Dépannage

### Build échoue

- Vérifiez les logs dans le panneau Hostinger
- Assurez-vous que les variables d'environnement sont configurées
- Vérifiez que `npm run build` fonctionne localement

### Variables d'environnement manquantes

- Ajoutez-les dans le panneau Hostinger
- Redéployez l'application

### Fichiers non mis à jour

- Videz le cache du navigateur
- Vérifiez que le déploiement s'est bien terminé
- Consultez les logs de déploiement

## Structure finale

Votre setup devrait ressembler à :

```
GitHub (Princeddn/Dashnoukdev)
    ↓ (push)
Hostinger Git Integration
    ↓ (build: npm install && npm run build)
Dossier out/
    ↓ (deploy)
public_html/
    ↓
Votre site en ligne !
```

## Coûts

- **Hostinger Premium** : ~3-5€/mois (avec Git)
- **Hostinger Business** : ~6-8€/mois (avec Node.js)
- **GitHub** : Gratuit pour repositories publics

## Support

Si vous rencontrez des problèmes :
1. Consultez la documentation Hostinger Git
2. Contactez le support Hostinger (chat 24/7)
3. Vérifiez les logs de build dans le panneau

## Prochaines étapes

1. Configurez l'intégration Git sur Hostinger
2. Testez le premier déploiement
3. Configurez les variables d'environnement
4. Profitez du déploiement automatique !
