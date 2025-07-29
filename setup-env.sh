#!/bin/bash

echo "🔧 Veo3 Prompt Generator - Environment Setup"
echo "============================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file already exists"
else
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# AI Service API Keys
# Get your Gemini API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Get your OpenRouter API key from: https://openrouter.ai/keys
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Site URL (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
    echo "✅ .env.local file created"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Get your Gemini API key from: https://makersuite.google.com/app/apikey"
echo "2. Get your OpenRouter API key from: https://openrouter.ai/keys"
echo "3. Edit .env.local and replace the placeholder values with your actual API keys"
echo "4. Restart your development server: npm run dev"
echo ""
echo "💡 You only need ONE of these API keys for the system to work:"
echo "   - Gemini API (recommended, free tier available)"
echo "   - OpenRouter API (fallback, requires credits)"
echo ""
echo "🚀 After setting up the API keys, your Veo3 Prompt Generator will work!" 