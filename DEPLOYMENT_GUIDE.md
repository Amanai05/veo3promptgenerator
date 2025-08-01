# 🚀 Veo3 Prompt Generator - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository connected to Vercel
- ✅ Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- ✅ OpenRouter API key from [OpenRouter](https://openrouter.ai/keys)

## 🔧 Local Development Setup

### Step 1: Environment Variables
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your actual API keys
nano .env.local
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

## 🌐 Vercel Deployment Setup

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 2: Add Environment Variables
1. Go to **Project Settings** → **Environment Variables**
2. Add these variables for **ALL environments** (Production, Preview, Development):

```
Name: GEMINI_API_KEY
Value: your_actual_gemini_api_key
Environment: Production, Preview, Development
```

```
Name: OPENROUTER_API_KEY
Value: your_actual_openrouter_api_key
Environment: Production, Preview, Development
```

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://your-project-name.vercel.app
Environment: Production, Preview, Development
```

### Step 3: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. Test your live site

## 🔍 Troubleshooting

### Issue: "Environment Variable references Secret which does not exist"
**Solution**: 
- Remove any `vercel.json` environment variable configurations
- Add variables directly in Vercel dashboard
- Redeploy without build cache

### Issue: Build Fails
**Solution**:
- Check build logs for specific errors
- Verify all environment variables are set
- Ensure Node.js version compatibility

### Issue: API Calls Fail
**Solution**:
- Verify API keys are correct
- Check environment variables are set for all environments
- Test API keys manually

## 📱 Testing After Deployment

### Test These URLs:
- **Homepage**: `https://your-domain.vercel.app/`
- **Veo3 Prompt Generator**: `https://your-domain.vercel.app/veo3-prompt-generator`
- **Video Script Generator**: `https://your-domain.vercel.app/video-script-generator`
- **Video to Prompt**: `https://your-domain.vercel.app/video-to-prompt`
- **Transcription**: `https://your-domain.vercel.app/transcription`

### Verify Features:
- ✅ Theme toggle (Light/Dark/System)
- ✅ Loading animations
- ✅ Chat Mode functionality
- ✅ Advanced Mode functionality
- ✅ API calls working

## 🔄 Force Redeploy

If changes aren't deploying:
```bash
# Add a new commit
echo "# Force redeploy - $(date)" >> README.md
git add README.md
git commit -m "🔄 Force Vercel redeployment - $(date)"
git push origin main
```

Or manually trigger in Vercel dashboard:
1. Go to **Deployments** tab
2. Click **"Deploy"**
3. Select **"Deploy without Build Cache"**

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test API keys manually
4. Clear build cache and redeploy

---

**Happy Deploying! 🚀** 