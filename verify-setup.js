// Simple verification script for API key setup
// Run with: node verify-setup.js

console.log('=== Veo3 Prompt Generator Setup Verification ===\n');

// Check environment variables
const requiredVars = [
  'GEMINI_API_KEY_1',
  'GEMINI_API_KEY_2', 
  'GEMINI_API_KEY_3',
  'OPENROUTER_API_KEY'
];

console.log('Checking environment variables...');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== 'your_gemini_api_key_here' && value !== 'your_openrouter_api_key_here') {
    console.log(`✅ ${varName}: Configured`);
  } else {
    console.log(`❌ ${varName}: Not configured`);
  }
});

console.log('\n=== API Key Analysis ===');

// Check if keys are properly formatted
const geminiKey1 = process.env.GEMINI_API_KEY_1;
const geminiKey2 = process.env.GEMINI_API_KEY_2;
const geminiKey3 = process.env.GEMINI_API_KEY_3;
const openRouterKey = process.env.OPENROUTER_API_KEY;

if (geminiKey1 && geminiKey1.startsWith('AIza')) {
  console.log('✅ GEMINI_API_KEY_1: Valid format');
} else {
  console.log('❌ GEMINI_API_KEY_1: Invalid format or missing');
}

if (geminiKey2 && geminiKey2.startsWith('AIza')) {
  console.log('✅ GEMINI_API_KEY_2: Valid format');
} else {
  console.log('⚠️  GEMINI_API_KEY_2: Not configured (optional)');
}

if (geminiKey3 && geminiKey3.startsWith('AIza')) {
  console.log('✅ GEMINI_API_KEY_3: Valid format');
} else {
  console.log('⚠️  GEMINI_API_KEY_3: Not configured (optional)');
}

if (openRouterKey && openRouterKey.startsWith('sk-or-')) {
  console.log('✅ OPENROUTER_API_KEY: Valid format');
} else {
  console.log('⚠️  OPENROUTER_API_KEY: Not configured (optional)');
}

console.log('\n=== System Status ===');

// Count configured APIs
let geminiCount = 0;
if (geminiKey1 && geminiKey1.startsWith('AIza')) geminiCount++;
if (geminiKey2 && geminiKey2.startsWith('AIza')) geminiCount++;
if (geminiKey3 && geminiKey3.startsWith('AIza')) geminiCount++;

const openRouterAvailable = openRouterKey && openRouterKey.startsWith('sk-or-');

console.log(`Gemini APIs configured: ${geminiCount}`);
console.log(`OpenRouter API available: ${openRouterAvailable ? 'Yes' : 'No'}`);

if (geminiCount > 0 || openRouterAvailable) {
  console.log('\n✅ System is properly configured!');
  console.log('You can now test the Veo3 Prompt Generator.');
} else {
  console.log('\n❌ No API keys configured.');
  console.log('Please add at least one Gemini API key to .env.local');
}

console.log('\n=== Testing Instructions ===');
console.log('1. Start the development server: npm run dev');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Test both Simple and Advanced modes');
console.log('4. Check console logs for API fallback behavior');

console.log('\n=== Expected Behavior ===');
console.log('- Primary API (GEMINI_API_KEY_1) will be used first');
console.log('- If primary fails, secondary (GEMINI_API_KEY_2) will be used');
console.log('- If secondary fails, tertiary (GEMINI_API_KEY_3) will be used');
console.log('- If all Gemini APIs fail, OpenRouter will be used as final fallback');
console.log('- Console will show which API is being used and any fallbacks'); 