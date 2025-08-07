# 🚀 **DEPLOYMENT GUIDE - Veo3 Prompt Generator**

## ✅ **DOMAIN FIXES COMPLETED**

All domain references have been updated from `veo3promptgenerator.com` to `veo3promptgenerator.online`:

### **Files Updated:**
- ✅ `app/page.tsx` - Homepage metadata and structured data
- ✅ `app/layout.tsx` - Global metadata and canonical URLs
- ✅ `app/sitemap.ts` - Sitemap URLs
- ✅ `app/robots.ts` - Robots.txt URLs
- ✅ `app/veo3-prompt-generator/page.tsx` - Page structured data
- ✅ `app/veo3-prompt-generator/layout.tsx` - Page metadata and canonical
- ✅ `test-seo-configuration.js` - Test configuration

### **SEO Elements Fixed:**
- ✅ **Canonical URLs**: All pages now use `https://veo3promptgenerator.online`
- ✅ **Sitemap**: All URLs use correct domain
- ✅ **Structured Data**: All JSON-LD schemas use correct domain
- ✅ **Open Graph**: All social media tags use correct domain
- ✅ **Twitter Cards**: All Twitter meta tags use correct domain

---

## 📋 **STEP 1: DEPLOY TO GITHUB**

### **1.1 Commit Changes**
```bash
git add .
git commit -m "🔧 Fix domain references to veo3promptgenerator.online

- Update all canonical URLs to use correct domain
- Fix sitemap.xml URLs to match production domain
- Update structured data and meta tags
- Resolve Google Search Console sitemap errors
- Ensure SEO consistency across all pages"
```

### **1.2 Push to GitHub**
```bash
git push origin main
```

---

## 🔧 **STEP 2: SETUP VERCEL ENVIRONMENT VARIABLES**

### **2.1 Access Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Login to your account
3. Select your `veo3promptgenerator` project

### **2.2 Add Environment Variables**

Navigate to **Settings → Environment Variables** and add:

#### **Multi-API Key System:**
```
GEMINI_API_KEY_1=your_first_gemini_api_key
GEMINI_API_KEY_2=your_second_gemini_api_key  
GEMINI_API_KEY_3=your_third_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

#### **Production URL:**
```
NEXT_PUBLIC_SITE_URL=https://veo3promptgenerator.online
```

#### **Legacy Key (for backward compatibility):**
```
GEMINI_API_KEY=your_primary_gemini_api_key
```

### **2.3 Environment Variable Priority Order:**
1. **GEMINI_API_KEY_1** (Primary - Most reliable)
2. **GEMINI_API_KEY_2** (Secondary - Backup)
3. **GEMINI_API_KEY_3** (Tertiary - Emergency backup)
4. **OPENROUTER_API_KEY** (Final fallback)

---

## 🌐 **STEP 3: VERIFY PRODUCTION DEPLOYMENT**

### **3.1 Test Production URLs**
After deployment, verify these URLs work:

- ✅ **Homepage**: `https://veo3promptgenerator.online`
- ✅ **Veo3 Generator**: `https://veo3promptgenerator.online/veo3-prompt-generator`
- ✅ **Video Script**: `https://veo3promptgenerator.online/video-script-generator`
- ✅ **Sitemap**: `https://veo3promptgenerator.online/sitemap.xml`
- ✅ **Robots**: `https://veo3promptgenerator.online/robots.txt`

### **3.2 Test API Endpoints**
```bash
# Test Veo3 Prompt Generator
curl -X POST "https://veo3promptgenerator.online/api/simple-veo3-prompt/json" \
  -H "Content-Type: application/json" \
  -d '{"input": "A beautiful sunset over mountains", "dialogueSetting": "no"}'

# Test Video Script Generator  
curl -X POST "https://veo3promptgenerator.online/api/generate-video-script" \
  -H "Content-Type: application/json" \
  -d '{"videoTopic": "How to make coffee", "audience": "Coffee lovers", "scriptLength": "2-3 minutes"}'
```

---

## 🔍 **STEP 4: GOOGLE SEARCH CONSOLE VERIFICATION**

### **4.1 Submit Updated Sitemap**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your `veo3promptgenerator.online` property
3. Navigate to **Sitemaps**
4. Submit: `https://veo3promptgenerator.online/sitemap.xml`

### **4.2 Verify Canonical URLs**
All pages should now show correct canonical URLs:
- ✅ Homepage: `https://veo3promptgenerator.online`
- ✅ Veo3 Page: `https://veo3promptgenerator.online/veo3-prompt-generator`

---

## 🎯 **STEP 5: FINAL VERIFICATION CHECKLIST**

### **✅ Domain Consistency**
- [ ] All canonical URLs use `.online` domain
- [ ] Sitemap contains only `.online` URLs
- [ ] Structured data uses correct domain
- [ ] Social media meta tags use correct domain

### **✅ Multi-API System**
- [ ] All 4 API keys configured in Vercel
- [ ] Fallback system working (Gemini 1 → 2 → 3 → OpenRouter)
- [ ] API endpoints responding correctly

### **✅ SEO Optimization**
- [ ] Meta titles and descriptions optimized
- [ ] Open Graph tags configured
- [ ] Twitter Cards configured
- [ ] Structured data (JSON-LD) implemented
- [ ] Robots.txt properly configured
- [ ] Sitemap.xml includes all pages

### **✅ Functionality**
- [ ] Veo3 Prompt Generator working
- [ ] Video Script Generator working
- [ ] Advanced mode working
- [ ] Chat mode working
- [ ] Multi-format output working (JSON/Paragraph)

---

## 🚨 **IMPORTANT NOTES**

### **Domain Fix Summary:**
- **Before**: URLs used `veo3promptgenerator.com` (causing Google Search Console errors)
- **After**: URLs use `veo3promptgenerator.online` (correct production domain)

### **SEO Benefits:**
- ✅ Resolves Google Search Console sitemap errors
- ✅ Improves search engine indexing
- ✅ Consistent canonical URLs
- ✅ Better social media sharing

### **API System Benefits:**
- ✅ High availability with 4 API keys
- ✅ Automatic fallback on failures
- ✅ Cost optimization across providers
- ✅ Robust error handling

---

## 📞 **SUPPORT**

If you encounter any issues during deployment:

1. **Check Vercel logs** for deployment errors
2. **Verify environment variables** are correctly set
3. **Test API endpoints** to ensure multi-API system works
4. **Monitor Google Search Console** for sitemap status

**Your website is now ready for production deployment! 🎉** 