#!/usr/bin/env node

/**
 * Production Environment Setup Verification Script
 * Run this after setting up environment variables in Vercel
 */

console.log('🔧 Veo3 Prompt Generator - Production Environment Setup');
console.log('=====================================================\n');

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);

// Check required environment variables
const requiredVars = [
  'GEMINI_API_KEY_1',
  'GEMINI_API_KEY_2', 
  'GEMINI_API_KEY_3',
  'OPENROUTER_API_KEY'
];

console.log('\n📋 Checking Required Environment Variables:');
let missingVars = [];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    missingVars.push(varName);
  }
});

// Check optional variables
console.log('\n📋 Checking Optional Environment Variables:');
const optionalVars = [
  'GEMINI_API_KEY',
  'NEXT_PUBLIC_SITE_URL'
];

optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`⚠️  ${varName}: Not set (optional)`);
  }
});

// Summary
console.log('\n📊 Summary:');
if (missingVars.length === 0) {
  console.log('✅ All required environment variables are set!');
  console.log('🚀 Your application is ready for production.');
} else {
  console.log(`❌ Missing ${missingVars.length} required environment variables:`);
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n🔧 To fix this:');
  console.log('1. Go to your Vercel project dashboard');
  console.log('2. Navigate to Settings → Environment Variables');
  console.log('3. Add the missing variables');
  console.log('4. Redeploy your application');
}

console.log('\n🔗 Next Steps:');
console.log('1. Deploy to Vercel: https://vercel.com');
console.log('2. Set up environment variables in Vercel dashboard');
console.log('3. Test your APIs after deployment');
console.log('4. Configure custom domain (optional)');

console.log('\n📖 For detailed instructions, see: VERCEL_DEPLOYMENT_GUIDE.md'); 