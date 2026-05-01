#!/bin/bash

# --- Knot Notes Full Deployment Script ---

# 1. Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Full Deployment for Knot Notes...${NC}"

# 2. Build the application
echo -e "${BLUE}Step 1: Building the application...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed. Deployment aborted."
    exit 1
fi

# 3. Deploy to Firebase
echo -e "${BLUE}Step 2: Deploying to Firebase Hosting...${NC}"
npx firebase-tools deploy
if [ $? -ne 0 ]; then
    echo "Firebase deployment failed. Aborting Git push."
    exit 1
fi

# 4. Git Operations
echo -e "${BLUE}Step 3: Pushing to GitHub...${NC}"
read -p "Enter commit message: " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deployment at $(date)"
fi

git add .
git commit -m "$commit_msg"
git push origin main

echo -e "${GREEN}Successfully deployed and pushed to GitHub! 🚀${NC}"
echo -e "${GREEN}Live at: https://knot-0551.web.app${NC}"
