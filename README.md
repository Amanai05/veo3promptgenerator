# veo3promptgenerator

AI-powered prompt generation from images and videos using Gemini 2.5 Pro with OpenRouter fallback.

## 🚀 Features

- **Dual API System**: Primary Gemini API with automatic OpenRouter fallback
- **Real AI Integration**: No boilerplate responses, all dynamic AI processing
- **Credit Management**: Handles API credit limits gracefully
- **Responsive Design**: Perfect on all devices with overflow protection
- **SEO Optimized**: Complete meta tags, sitemap, and schema markup
- **Analytics Ready**: GTM and Facebook Pixel integration

## 🔧 Setup Instructions

### 1. Environment Variables

#### For Local Development
Create a `.env.local` file in the root directory:

\`\`\`bash
# Primary API (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# Fallback API (Required for reliability)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: SEO and Tracking
GOOGLE_SITE_VERIFICATION=your_google_verification_code
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id
\`\`\`

#### For Vercel Deployment
1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add these required variables:**
   - `GEMINI_API_KEY` = your actual Gemini API key
   - `OPENROUTER_API_KEY` = your actual OpenRouter API key
   - `NEXT_PUBLIC_SITE_URL` = your Vercel deployment URL
4. **Select all environments** (Production, Preview, Development)
5. **Click "Save"**
6. **Redeploy your project**

**Note**: Vercel will now automatically detect these required environment variables and prompt you to configure them during deployment.

### 2. Get API Keys

#### Gemini API Key (Primary)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy to your `.env.local` file

#### OpenRouter API Key (Fallback)
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up and go to API Keys section
3. Create a new API key
4. **Important**: Add credits to your OpenRouter account to avoid 402 errors
5. Copy the key to your `.env.local` file

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

## 🔄 API Fallback System

The system uses a sophisticated fallback mechanism:

1. **Primary**: Gemini 2.5 Flash (direct API) - Fast and efficient
2. **Fallback**: OpenRouter Gemini 2.5 Flash - Automatic switchover on failure
3. **Error Handling**: Graceful degradation with user notifications
4. **Credit Management**: Detects and handles credit limit issues

### Token Limits (Optimized for Credits)
- **Gemini Direct**: 1500 tokens max
- **OpenRouter**: 1200 tokens max (to stay within credit limits)

## 🛠️ API Endpoints

- `POST /api/analyze-image` - Analyze images with AI fallback
- `POST /api/analyze-video` - Analyze videos with AI fallback  
- `POST /api/transcribe-audio` - Transcribe audio with AI fallback
- `POST /api/chat-prompt` - Interactive chat with AI fallback

## 🎯 Key Improvements

### ✅ Fixed Issues
1. **API Reliability**: Automatic fallback system prevents failures
2. **Credit Handling**: Graceful handling of OpenRouter credit limits
3. **Chat Overflow**: Messages stay within container boundaries
4. **Real AI**: No more boilerplate responses, all dynamic
5. **Responsive Design**: Perfect on all screen sizes
6. **Error Messages**: Clear user feedback for all error states

### 🔧 Error Handling
- **402 Credit Errors**: Shows upgrade link and disables chat
- **Rate Limits**: Automatic fallback to secondary API
- **Network Issues**: Retry logic with user feedback
- **File Size**: Validation with clear error messages

## 📊 Analytics & SEO

### SEO Features
- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Complete meta tags and OpenGraph
- Schema.org structured data
- Google Search Console ready

### Analytics Integration
- **Google Tag Manager**: Set `NEXT_PUBLIC_GTM_ID`
- **Facebook Pixel**: Set `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
- **Google Verification**: Set `GOOGLE_SITE_VERIFICATION`

## 🚨 Troubleshooting

### OpenRouter 402 Error
\`\`\`
OpenRouter API requires more credits
\`\`\`
**Solution**: Visit [OpenRouter Credits](https://openrouter.ai/settings/credits) and add credits to your account.

### Gemini Rate Limit
\`\`\`
Gemini API error: 429
\`\`\`
**Solution**: System automatically falls back to OpenRouter. No action needed.

### Chat Not Working
1. Check both API keys are set correctly
2. Ensure OpenRouter account has sufficient credits
3. Check console for detailed error messages

## 🔒 Security Features

- API keys never exposed to client
- Server-side processing only
- Input validation and sanitization
- File size and type validation
- CORS protection
- Error handling without exposing sensitive data

## 🚀 Production Deployment

1. Set all environment variables in your hosting platform
2. Ensure `NEXT_PUBLIC_SITE_URL` matches your domain
3. Add credits to OpenRouter account
4. Test both API endpoints work
5. Submit sitemap to Google Search Console

## 📈 Performance

- **Lighthouse Score**: Optimized for 95+ score
- **Token Efficiency**: Reduced limits to prevent credit issues
- **Caching**: Conversation history stored locally
- **Lazy Loading**: Components load on demand
- **Error Recovery**: Graceful fallback prevents crashes

The system is now production-ready with enterprise-grade reliability and comprehensive error handling!
