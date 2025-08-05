# 🚀 Vercel Deployment Guide for Veo3 Prompt Generator

## 📋 Prerequisites
- GitHub repository: `https://github.com/Amanai05/veo3promptgenerator`
- Vercel account (free tier available)
- API keys for Gemini and OpenRouter

## 🔧 Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository: `Amanai05/veo3promptgenerator`
5. Select the repository and click "Deploy"

### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🔑 Step 2: Environment Variables Setup

### Required Environment Variables for Vercel:

Navigate to your Vercel project dashboard → Settings → Environment Variables

Add these variables:

#### **Primary API Keys (Required)**
```
GEMINI_API_KEY_1=your_gemini_api_key_1_here
GEMINI_API_KEY_2=your_gemini_api_key_2_here  
GEMINI_API_KEY_3=your_gemini_api_key_3_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

#### **Legacy Support (Optional)**
```
GEMINI_API_KEY=your_primary_gemini_key_here
```

#### **Site Configuration**
```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 🔄 Environment Variable Priority Order:
1. **GEMINI_API_KEY_1** (Primary - Most Reliable)
2. **GEMINI_API_KEY_2** (Secondary - Backup)
3. **GEMINI_API_KEY_3** (Tertiary - Emergency Backup)
4. **OPENROUTER_API_KEY** (Final Fallback)

## 🌐 Step 3: Custom Domain Setup (Optional)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

## 📊 Step 4: Verify Deployment

### Test Your APIs:
```bash
# Test Simple JSON API
curl -X POST "https://your-domain.vercel.app/api/simple-veo3-prompt/json" \
  -H "Content-Type: application/json" \
  -d '{"input": "A beautiful sunset", "dialogueSetting": "no"}'

# Test Video Script API
curl -X POST "https://your-domain.vercel.app/api/generate-video-script" \
  -H "Content-Type: application/json" \
  -d '{"videoTopic": "How to make coffee", "audience": "Coffee lovers", "scriptLength": "2 minutes", "scriptStyle": "Educational"}'
```

## 🔍 Step 5: Monitor and Optimize

### Vercel Analytics:
- Enable Vercel Analytics in your project
- Monitor API usage and performance
- Set up alerts for errors

### API Usage Monitoring:
- Monitor your API key usage
- Set up billing alerts
- Track performance metrics

## 🛠️ Troubleshooting

### Common Issues:

1. **API Errors (402/429)**
   - Check API key validity
   - Verify billing status
   - Monitor usage limits

2. **Environment Variables Not Working**
   - Ensure variables are set for Production environment
   - Redeploy after adding variables
   - Check variable names (case-sensitive)

3. **Build Errors**
   - Check Vercel build logs
   - Verify TypeScript compilation
   - Ensure all dependencies are in package.json

## 📈 Performance Optimization

### Vercel Settings:
- Enable Edge Functions for faster API responses
- Use Vercel's CDN for static assets
- Enable automatic deployments from GitHub

### API Optimization:
- Implement caching for repeated requests
- Use rate limiting to prevent abuse
- Monitor and optimize API response times

## 🔒 Security Best Practices

1. **API Key Security**
   - Never commit API keys to GitHub
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **Rate Limiting**
   - Implement request rate limiting
   - Monitor for abuse patterns
   - Set up alerts for unusual activity

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test APIs individually
4. Monitor API key usage and billing

## 🎉 Success Checklist

- [ ] Repository deployed to Vercel
- [ ] Environment variables configured
- [ ] APIs tested and working
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Monitoring set up
- [ ] Performance optimized

Your Veo3 Prompt Generator is now production-ready! 🚀 