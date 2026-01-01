#!/bin/bash

# Script de déploiement pour Hostinger
# Ce script génère le build statique de votre application

echo "╔════════════════════════════════════════════╗"
echo "║   Déploiement Dashnouk Dev - Hostinger    ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez-le depuis https://nodejs.org"
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé."
    exit 1
fi

echo "✓ Node.js et npm sont installés"
echo ""

# Vérifier que .env.local existe
if [ ! -f .env.local ]; then
    echo "⚠️  Attention : Le fichier .env.local n'existe pas"
    echo "   Créez-le à partir de .env.example et ajoutez vos clés Supabase"
    echo ""
    read -p "Voulez-vous continuer quand même ? (o/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Oo]$ ]]; then
        exit 1
    fi
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi
echo "✓ Dépendances installées"
echo ""

# Lancer le build
echo "🏗️  Génération du build statique..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi
echo "✓ Build généré avec succès"
echo ""

# Copier .htaccess dans out/
echo "📋 Copie du fichier .htaccess..."
if [ -f public/.htaccess ]; then
    cp public/.htaccess out/.htaccess
    echo "✓ Fichier .htaccess copié dans out/"
else
    echo "⚠️  Fichier .htaccess non trouvé dans public/"
fi
echo ""

# Instructions finales
echo "╔════════════════════════════════════════════╗"
echo "║            Build terminé ! ✓               ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "📁 Les fichiers sont prêts dans le dossier 'out/'"
echo ""
echo "Prochaines étapes :"
echo "1. Connectez-vous à votre FTP Hostinger"
echo "2. Naviguez vers le dossier public_html/"
echo "3. Uploadez TOUT le contenu du dossier 'out/'"
echo "4. Vérifiez que le fichier .htaccess est bien uploadé"
echo "5. Visitez votre site !"
echo ""
echo "Besoin d'aide ? Consultez docs/deployment-hostinger.md"
echo ""
