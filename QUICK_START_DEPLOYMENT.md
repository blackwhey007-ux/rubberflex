# Quick Start - Deploy to Production

## 🚀 Deploy Your Rubberflex SaaS in 10 Minutes

### Step 1: Install PostgreSQL Locally (Optional for Testing)

You can skip local setup and go directly to Railway deployment.

#### If you want local testing first:

**Windows:**
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Install and start the service
3. Create database: `createdb rubberflex`
4. Run: `cd backend && npm run init-db`

**macOS:**
```bash
brew install postgresql
brew services start postgresql
createdb rubberflex
cd backend && npm run init-db
```

### Step 2: Deploy Backend to Railway (5 minutes)

1. **Go to** https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your repository
5. **Add PostgreSQL** service (Railway will auto-provide DATABASE_URL)
6. **Environment Variables:**
   - `DATABASE_URL` - Auto-provided
   - `JWT_SECRET` - Generate with: `openssl rand -base64 32`
   - `NODE_ENV=production`
   - `PORT` - Auto-provided
7. **Initialize Database:**
   - Use Railway CLI: `railway run npm run init-db`
   - Or locally: Set `DATABASE_URL` and run `npm run init-db`
8. **Get Backend URL** from Railway dashboard

### Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Go to** https://vercel.com
2. **Sign up** with GitHub
3. **Add New Project** → Import your repository
4. **Environment Variables:**
   - `VITE_API_URL` = Your Railway backend URL
5. **Deploy** - Vercel auto-detects Vite
6. **Get Frontend URL** from Vercel dashboard

### Step 4: Connect Services

1. **Update Backend CORS** in `backend/src/server-simple.js`:
   ```javascript
   const allowedOrigins = [
     'http://localhost:5173',
     'https://your-frontend.vercel.app'
   ];
   ```

2. **Redeploy Backend** on Railway

3. **Update Frontend** - Vercel auto-redeploys

### Step 5: Test Production

1. Visit your Vercel URL
2. Submit contact form
3. Login at `/admin` (admin@rubberflex.tn / admin123)
4. Test all features

## ✅ That's It!

Your app is now live on:
- Frontend: https://your-app.vercel.app
- Backend: https://your-app.up.railway.app

## 📊 Current Status

- ✅ PostgreSQL schema created
- ✅ Database initialization script ready
- ✅ Backend configured for Railway
- ✅ Frontend configured for Vercel
- ✅ Environment variables setup
- ✅ Deployment documentation created

## ⚠️ Important Notes

1. **PostgreSQL Required** - Install locally for testing, or use Railway's PostgreSQL
2. **Environment Variables** - Must be set in production
3. **CORS** - Update backend CORS with your Vercel domain
4. **Database Init** - Run `npm run init-db` after adding PostgreSQL

## 🆘 Troubleshooting

**PostgreSQL not running locally:**
- Skip local testing and deploy directly to Railway
- Railway provides PostgreSQL automatically

**Database initialization errors:**
- Check DATABASE_URL is correct
- Ensure PostgreSQL is accessible
- Verify firewall/network settings

**CORS errors:**
- Add frontend domain to backend allowedOrigins
- Verify HTTPS is used in production
- Check environment variables

## 📚 More Info

See `DEPLOYMENT.md` for detailed instructions.

## 🎯 Next Steps

1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Update CORS configuration
4. Test production environment
5. Add custom domain (optional)

