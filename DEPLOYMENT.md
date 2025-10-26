# Rubberflex SaaS - Deployment Guide

## Overview

This guide explains how to deploy the Rubberflex SaaS application with PostgreSQL database on Vercel (frontend) and Railway (backend).

## Architecture

- **Frontend**: React + TypeScript deployed on Vercel
- **Backend**: Node.js + Express + PostgreSQL deployed on Railway
- **Database**: PostgreSQL (provided by Railway)

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (for local development)
- Vercel account (free tier)
- Railway account (free tier)

## Local Development Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Setup Local PostgreSQL Database

#### Windows:
```bash
# Install PostgreSQL from https://www.postgresql.org/download/windows/
# Start PostgreSQL service
# Create database
createdb rubberflex

# Initialize database schema
npm run init-db
```

#### macOS (with Homebrew):
```bash
# Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb rubberflex

# Initialize database schema
cd backend
npm run init-db
```

#### Linux (Ubuntu/Debian):
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb rubberflex

# Initialize database schema
cd backend
npm run init-db
```

### 3. Configure Environment Variables

Create `backend/.env`:
```env
DATABASE_URL=postgresql://localhost:5432/rubberflex
JWT_SECRET=rubberflex-secret-key-change-in-production-2024
NODE_ENV=development
PORT=3000
```

### 4. Start Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
npm run dev
```

Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Admin Login: Use `admin@rubberflex.tn` / `admin123`

## Production Deployment

### Phase 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the `rubberflex` repository

3. **Add PostgreSQL Database**
   - Click "+ New" in Railway dashboard
   - Select "PostgreSQL"
   - Railway will automatically provide `DATABASE_URL`

4. **Configure Environment Variables**
   - In Railway project settings, add:
     - `DATABASE_URL` (auto-provided by PostgreSQL service)
     - `JWT_SECRET` (generate: `openssl rand -base64 32`)
     - `NODE_ENV=production`
     - `PORT` (Railway will set this automatically)

5. **Deploy Backend**
   - Railway will auto-detect Node.js
   - The build will run `npm install`
   - Start command: `npm start` (runs `node src/server-simple.js`)

6. **Initialize Database**
   - In Railway dashboard, go to your PostgreSQL service
   - Click "Connect" to get connection details
   - Run initialization command locally (after setting DATABASE_URL):
     ```bash
     DATABASE_URL="postgresql://..." npm run init-db
     ```
   - Or use Railway CLI: `railway run npm run init-db`

7. **Get Backend URL**
   - Note your Railway backend URL (e.g., `https://your-app.up.railway.app`)

### Phase 2: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   - In Vercel project settings, add:
     - `VITE_API_URL`: Your Railway backend URL

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your production URL (e.g., `https://your-app.vercel.app`)

### Phase 3: Update CORS Configuration

1. **Update Backend CORS**
   - Edit `backend/src/server-simple.js`
   - Add your Vercel domain to `allowedOrigins`:
     ```javascript
     const allowedOrigins = [
       'http://localhost:5173',
       'https://your-app.vercel.app'
     ];
     ```
   - Redeploy backend on Railway

2. **Update Frontend if Needed**
   - Vercel will automatically redeploy with the new environment variable

### Phase 4: Final Testing

1. Visit your Vercel URL
2. Submit contact form (creates demande)
3. Login to admin at `https://your-app.vercel.app/admin`
4. Verify all CRUD operations
5. Test PDF generation
6. Check analytics tracking

## Environment Variables Reference

### Backend (Railway)
- `DATABASE_URL`: PostgreSQL connection string (auto-provided)
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (production)
- `PORT`: Server port (auto-provided)

### Frontend (Vercel)
- `VITE_API_URL`: Backend API URL

## Free Tier Limits

### Vercel Free Tier
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Perfect for landing page traffic

### Railway Free Tier
- $5 credit/month
- 500 MB RAM
- Automatic deployments
- PostgreSQL included
- Good for starting out

## Database Backup & Restore

### Backup
```bash
# Create backup
pg_dump -U postgres rubberflex > backup.sql

# Or using Railway CLI
railway run pg_dump -h $PGHOST -U $PGUSER $PGDATABASE > backup.sql
```

### Restore
```bash
# Restore backup
psql -U postgres rubberflex < backup.sql
```

## Troubleshooting

### Database Connection Issues
- Check `DATABASE_URL` is set correctly
- Ensure PostgreSQL service is running
- Verify firewall rules

### CORS Errors
- Add your frontend domain to backend `allowedOrigins`
- Check backend is using HTTPS in production
- Verify environment variable `VITE_API_URL` is set

### Build Failures
- Check Node.js version compatibility (18+)
- Review build logs in Railway/Vercel
- Ensure all environment variables are set

### PDF Generation Issues
- Verify `pdfkit` dependency is installed
- Check server logs for errors
- Ensure proper content-type headers

## Monitoring

### Railway Logs
```bash
# View real-time logs
railway logs
```

### Vercel Logs
- Go to Vercel dashboard
- Click "Deployments"
- Click on latest deployment
- View "Build Logs" and "Runtime Logs"

## Scaling Considerations

When your app grows beyond free tier:
1. Upgrade Railway to Hobby plan ($20/month)
2. Add more RAM and resources
3. Implement database connection pooling
4. Add CDN for static assets
5. Implement caching (Redis)
6. Add monitoring (Sentry, LogRocket)

## Support

For issues or questions:
- Backend: Check Railway logs
- Frontend: Check Vercel logs
- Database: Use Railway PostgreSQL dashboard
- General: Review deployment logs

## Next Steps

1. **Custom Domain**: Add your domain in Vercel settings
2. **SSL Certificates**: Automatic with Vercel/Railway
3. **Monitoring**: Add error tracking (Sentry)
4. **Analytics**: Set up better analytics
5. **Backups**: Configure automated database backups
