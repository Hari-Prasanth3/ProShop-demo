# How to Get Vercel Credentials

## Quick Setup Guide

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open your browser to authenticate.

### Step 3: Get VERCEL_TOKEN

**Option A: Via Web Dashboard (Easiest)**
1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Give it a name (e.g., "GitHub Actions CI/CD")
4. Select expiration (or leave as "No expiration")
5. Click **"Create Token"**
6. **Copy the token immediately** (you won't see it again!)
7. Add as secret `VERCEL_TOKEN` in GitHub

**Option B: Via CLI**
```bash
vercel whoami
```
Then go to https://vercel.com/account/tokens to create a token.

### Step 4: Get VERCEL_ORG_ID and VERCEL_PROJECT_ID

**Method 1: Using vercel link (Recommended)**

```bash
cd backend
vercel link
```

This will:
- Ask you to select/create a project
- Create a `.vercel/project.json` file

Then check the file:
```bash
cat .vercel/project.json
```

You'll see something like:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

- `orgId` → Use as `VERCEL_ORG_ID`
- `projectId` → Use as `VERCEL_PROJECT_ID`

**Method 2: Via Web Dashboard**

1. **VERCEL_ORG_ID:**
   - Go to: https://vercel.com/teams
   - Click on your team/organization
   - The URL will be: `https://vercel.com/teams/[YOUR_ORG_ID]/...`
   - Or go to: Settings → General → Team ID

2. **VERCEL_PROJECT_ID:**
   - Go to your Vercel project dashboard
   - Click on your project (proshop-backend)
   - Go to: **Settings** → **General**
   - Scroll down to find **"Project ID"**
   - Copy the Project ID

### Step 5: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add each secret:
   - Name: `VERCEL_TOKEN`, Value: [your token]
   - Name: `VERCEL_ORG_ID`, Value: [your org ID]
   - Name: `VERCEL_PROJECT_ID`, Value: [your project ID]

## Verify Your Setup

After adding secrets, you can test the workflow:
1. Go to **Actions** tab in GitHub
2. Select **"Deploy Backend to Vercel"** workflow
3. Click **"Run workflow"** → **"Run workflow"** button
4. Check if it deploys successfully

## Troubleshooting

### If vercel link doesn't work:
```bash
# Make sure you're in the backend directory
cd backend

# Try linking again
vercel link

# If it asks to create a new project, say yes
# Then check the .vercel folder
ls -la .vercel/
cat .vercel/project.json
```

### If you can't find Project ID:
- Go to your Vercel project
- Settings → General
- Look for "Project ID" or "Project Name"
- The Project ID usually starts with `prj_`

### If you can't find Org ID:
- Check the URL when you're in Vercel dashboard
- It usually shows: `vercel.com/[org-id]/...`
- Or check: Settings → General → Team ID
