#!/bin/bash

echo "🚀 Setting up Veo3 Prompt Generator Environment"
echo "================================================"

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Create .env.local from template
echo "📝 Creating .env.local file..."
cat > .env.local << 'EOF'
# Required API Keys for Veo3 Prompt Generator
# Get your Gemini API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Get your OpenRouter API key from: https://openrouter.ai/keys
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Your Vercel deployment URL (will be auto-filled)
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
EOF

echo "✅ .env.local created successfully!"
echo ""
echo "🔑 NEXT STEPS:"
echo "1. Get your Gemini API key from: https://makersuite.google.com/app/apikey"
echo "2. Get your OpenRouter API key from: https://openrouter.ai/keys"
echo "3. Replace the placeholder values in .env.local with your actual API keys"
echo "4. Restart your development server: npm run dev"
echo ""
echo "💡 TIP: The AI service will work with either API key, but having both provides better reliability."
echo "   - Gemini API: Free tier available, good for testing"
echo "   - OpenRouter API: Multiple AI models, requires credits"
echo ""
echo "🎯 Once configured, your Veo3 prompt generator will process inputs through real AI models!" 