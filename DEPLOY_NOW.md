# 🚀 Deploy Your Landing Page to Vercel - 5 Minutes

## Step 1: Push to GitHub (2 minutes)

```bash
# Create GitHub repository first at https://github.com/new
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/rubberflex.git
git push -u origin master
```

## Step 2: Deploy to Vercel (3 minutes)

### Option A: Via Vercel Dashboard
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Select your `rubberflex repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables (Important!)

In Vercel dashboard → Project Settings → Environment Variables:

Add: `VITE_API_URL` = `http://localhost:3000`

(For now, this points to your local backend. Later, we'll update it to the Railway backend URL)

## Step 4: Access Your Live Site

Vercel will give you a URL like: `https://rubberflex.vercel.app`

Visit it to see your landing page live!

## 🎉 What Works Now

✅ Landing page is live on Vercel
✅ Contact form works (connects to local backend)
⚠️ Admin interface needs backend to be running locally

## Next Steps After Deployment

1. **Deploy backend to Railway** (see `DEPLOYMENT.md`)
2. **Update VITE_API_URL** in Vercel with Railway URL
3. **Add custom domain** (optional)
4. **Enable analytics** in Vercel dashboard

## Current Architecture

- **Frontend**: Deployed on Vercel (this deployment)
- **Backend**: Running locally on localhost:3000
- **Database**: PostgreSQL (setup ready in `backend/src/database/`)

## ⚠️ Important Note

The frontend will connect to `http://localhost:3000` for now. To make admin work in production:
1. Deploy backend to Railway first
2. Update VITE_API_URL in Vercel to your Railway URL
3. Redeploy frontend

## Troubleshooting

**Build errors?** Check Vercel logs
**Can't connect to backend?** Make sure backend is running locally or point to Railway URL
**Contact form not working?** Check backend is running and CORS is enabled
