#!/bin/bash

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Load configurations
if [ -f "$SCRIPT_DIR/.deploy.conf" ]; then
    source "$SCRIPT_DIR/.deploy.conf"
else
    echo "Error: .deploy.conf not found in $SCRIPT_DIR!"
    exit 1
fi

echo "🚀 Starting Frontend Deployment to $DEPLOY_HOST..."

# Ensure target directory exists on server
ssh $DEPLOY_USER@$DEPLOY_HOST "mkdir -p $DEPLOY_PATH"

# Sync files to server
# --exclude: don't send heavy or unnecessary files
rsync -avz --progress \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.quasar' \
    --exclude='dist' \
    --exclude='.deploy.conf' \
    ./ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH

echo "🐳 Restarting Quasar SSR Containers on Server..."

# Execute docker command on server
ssh $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_PATH && docker compose up -d --build"

echo "✅ Frontend Deployment Finished!"
