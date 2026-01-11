# Deploying Frontend to Firebase Hosting

## Prerequisites
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

## Initial Setup

### 1. Initialize Firebase in your project
```bash
cd frontend
firebase init hosting
```

When prompted:
- **Select "Use an existing project"** or create a new one
- **Public directory**: `build`
- **Configure as single-page app**: `Yes`
- **Set up automatic builds**: `No` (or `Yes` if you want GitHub Actions)
- **File build/index.html already exists. Overwrite?**: `No`

### 2. Update .firebaserc
Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase project ID.

## Environment Variables

### For Production
The `.env.production` file is already configured with your Vercel backend URL:
```
REACT_APP_API_URL=https://proshop-backend-brown.vercel.app
```

### For Local Development
The `.env.development` file uses:
```
REACT_APP_API_URL=http://localhost:5001
```

You can also set environment variables in Firebase Hosting:
1. Go to Firebase Console → Your Project → Hosting
2. Add environment variables in the hosting settings

## Deployment Steps

### 1. Build the React app
```bash
npm run build
```

### 2. Deploy to Firebase
```bash
firebase deploy --only hosting
```

### 3. Preview before deploying (optional)
```bash
firebase serve
```
This will serve your built app locally at `http://localhost:5000`

## Continuous Deployment (Optional)

### Using GitHub Actions
Create `.github/workflows/firebase-deploy.yml`:
```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm install && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-firebase-project-id
```

## Important Notes

1. **Backend URL**: Make sure your backend is deployed to Vercel and the URL in `.env.production` is correct.

2. **CORS**: Ensure your Vercel backend has the Firebase frontend URL in the `FRONTEND_URL` environment variable.

3. **Build**: Always run `npm run build` before deploying to ensure the latest changes are included.

4. **Cache**: Firebase automatically caches static assets. Clear browser cache if you see old versions.

## Troubleshooting

### Build fails
- Check Node version (should be 16+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript/ESLint errors

### API calls fail after deployment
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings on your Vercel backend
- Verify backend is deployed and accessible

### Routing issues (404 on refresh)
- Ensure `firebase.json` has the rewrite rule for `**` → `/index.html`
- This is already configured in the provided `firebase.json`

## Firebase Console
After deployment, you can:
- View your site: Firebase Console → Hosting
- View deployment history
- Rollback to previous versions
- Set up custom domains
