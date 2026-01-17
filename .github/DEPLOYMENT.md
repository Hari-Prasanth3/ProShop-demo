# CI/CD Deployment Guide

This repository uses GitHub Actions for automated deployment to Firebase (Frontend) and Vercel (Backend).

## Workflows

### 1. Frontend - Firebase Deployment
**File:** `.github/workflows/frontend-firebase.yml`

- **Triggers:** 
  - Push to `main` or `master` branch with changes in `frontend/` directory
  - Manual trigger via GitHub Actions UI

- **Steps:**
  1. Checkout code
  2. Setup Node.js 18
  3. Install dependencies
  4. Build React app
  5. Deploy to Firebase Hosting

### 2. Backend - Vercel Deployment
**File:** `.github/workflows/backend-vercel.yml`

- **Triggers:**
  - Push to `main` or `master` branch with changes in `backend/` directory
  - Manual trigger via GitHub Actions UI

- **Steps:**
  1. Checkout code
  2. Setup Node.js 18
  3. Install Vercel CLI
  4. Pull Vercel environment
  5. Build project
  6. Deploy to Vercel production

## Required GitHub Secrets

### For Firebase Deployment

1. **FIREBASE_TOKEN**
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login:ci`
   - This will open your browser and generate a token
   - Copy the token that's displayed in the terminal
   - Add as secret `FIREBASE_TOKEN` in GitHub repository settings
   - **Note:** The token will look like: `1//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### For Vercel Deployment

#### Method 1: Using Vercel CLI (Recommended)

1. **VERCEL_TOKEN**
   - Install Vercel CLI: `npm install -g vercel`
   - Login: `vercel login`
   - Generate token: `vercel whoami` (shows your account)
   - Go to: https://vercel.com/account/tokens
   - Click "Create Token"
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token
   - Add as secret `VERCEL_TOKEN` in GitHub repository settings

2. **VERCEL_ORG_ID**
   - Run: `vercel link` in your backend directory
   - Or check: `cat backend/.vercel/project.json` (if exists)
   - Look for `orgId` field
   - **Alternative:** Go to Vercel Dashboard → Settings → General → Team ID
   - Add as secret `VERCEL_ORG_ID` in GitHub repository settings

3. **VERCEL_PROJECT_ID**
   - Run: `vercel link` in your backend directory
   - Or check: `cat backend/.vercel/project.json` (if exists)
   - Look for `projectId` field
   - **Alternative:** Go to your Vercel project → Settings → General → Project ID
   - Add as secret `VERCEL_PROJECT_ID` in GitHub repository settings

#### Method 2: Quick Setup Script

Run these commands in your backend directory:

```bash
cd backend

# Install Vercel CLI if not already installed
npm install -g vercel

# Login to Vercel
vercel login

# Link your project (this will create .vercel/project.json)
vercel link

# Check the generated file
cat .vercel/project.json
```

The `.vercel/project.json` file will contain both `orgId` and `projectId`.

## Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact name and value

## Manual Deployment

### Frontend (Firebase)
```bash
cd frontend
npm run build
firebase deploy
```

### Backend (Vercel)
```bash
cd backend
vercel --prod
```

## Workflow Status

You can check the status of deployments in the **Actions** tab of your GitHub repository.
