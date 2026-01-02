#!/bin/bash

# Script pour déployer vers Hostinger via FTP
# Usage: ./deploy-to-hostinger.sh

echo "Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Build successful!"
echo ""
echo "Next steps:"
echo "1. Compress the 'out' folder as a ZIP file"
echo "2. Upload to Hostinger via File Manager"
echo "3. Extract in public_html"
echo ""
echo "Or use this command to create a ZIP:"
echo "  cd out && zip -r ../dashnoukdev-deploy.zip . && cd .."
