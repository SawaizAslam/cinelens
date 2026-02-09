# Vercel Deployment Guide for Cazem

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your code pushed to GitHub

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/SawaizAslam/cazem.git

# Push to main branch
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - What's your project's name? **cazem**
   - In which directory is your code located? **./**
   - Want to override settings? **No**

4. **Set Environment Variables:**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```
   Paste your Gemini API key when prompted.
   
   ```bash
   vercel env add VITE_TMDB_API_KEY
   ```
   Paste your TMDB API key when prompted.
   
   ```bash
   vercel env add VITE_TMDB_BEARER_TOKEN
   ```
   Paste your TMDB bearer token when prompted.

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/new
   - Click "Import Project"

2. **Import from GitHub:**
   - Select your GitHub repository: `SawaizAslam/cazem`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - `VITE_GEMINI_API_KEY` = `your_gemini_api_key`
   - `VITE_TMDB_API_KEY` = `your_tmdb_api_key`
   - `VITE_TMDB_BEARER_TOKEN` = `your_tmdb_bearer_token`

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)

## Step 3: Verify Deployment

Once deployed, Vercel will provide you with a URL like:
- `https://cazem.vercel.app`
- `https://cazem-username.vercel.app`

Test the following:
1. ✅ Upload a movie scene image
2. ✅ Type a movie dialogue
3. ✅ Check if TMDB posters load
4. ✅ Verify recommendations appear
5. ✅ Test GitHub link in navbar

## Step 4: Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node version compatibility
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Make sure variable names start with `VITE_`
- Redeploy after adding variables
- Check that variables are set for "Production" environment

### API Errors in Production
- Open browser console on live site
- Check if API keys are properly loaded
- Verify CORS settings if needed

## Automatic Deployments

Every time you push to GitHub:
- Vercel automatically builds and deploys
- Preview deployments for pull requests
- Production deployment for main branch

## Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

## Success! 🎉

Your Cazem app is now live and accessible worldwide!
