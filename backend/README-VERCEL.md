# Deploying Backend to Vercel

## Prerequisites
1. Make sure you have a Vercel account
2. Install Vercel CLI: `npm i -g vercel`

## Environment Variables
Set these in your Vercel project settings:

- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Your frontend URL (for CORS)
- `PAYPAL_CLIENT_ID` - PayPal client ID (if using PayPal)
- `NODE_ENV` - Set to `production`

## Deployment Steps

### Option 1: Using Vercel CLI
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Set Root Directory to `backend`
5. Add environment variables
6. Deploy

## Important Notes

### File Uploads
Vercel serverless functions have a read-only filesystem. The current implementation uses memory storage for uploads when running on Vercel. 

**For production, you should:**
- Integrate with a cloud storage service (AWS S3, Cloudinary, etc.)
- Update `backend/routes/uploadRoutes.js` to upload files to your chosen service
- Remove the memory storage fallback

### API Routes
All routes are prefixed with `/api/`:
- Products: `/api/products`
- Users: `/api/users`
- Orders: `/api/orders`
- Upload: `/api/upload`
- PayPal Config: `/api/config/paypal`
- Health Check: `/api/health`

### CORS
Make sure to set `FRONTEND_URL` environment variable to your frontend URL for CORS to work properly.
