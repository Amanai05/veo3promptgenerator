// Test script for Multi-API Key Fallback System
// Run with: node test-multi-api.js

const { BaseAIService } = require('./lib/ai-base');

class TestAIService extends BaseAIService {
  async testFallback() {
    console.log('=== Testing Multi-API Key Fallback System ===\n');
    
    // Test API status
    const status = this.getAPIStatus();
    console.log('API Status:', status);
    
    // Test if APIs are available
    const hasAPIs = this.hasValidAPIs();
    console.log('Has Valid APIs:', hasAPIs);
    
    if (!hasAPIs) {
      console.log('\n❌ No API keys configured. Please add API keys to .env.local');
      console.log('Required: GEMINI_API_KEY_1 or GEMINI_API_KEY');
      console.log('Optional: GEMINI_API_KEY_2, GEMINI_API_KEY_3, OPENROUTER_API_KEY');
      return;
    }
    
    // Test with a simple prompt
    const testPrompt = "Generate a JSON prompt for: a detective finding a clue";
    
    try {
      console.log('\n🔄 Testing API fallback with prompt:', testPrompt);
      const { result, metadata } = await this.tryWithRobustFallback(testPrompt);
      
      console.log('\n✅ Success!');
      console.log('API Used:', metadata.apiKeyUsed);
      console.log('Fallback Used:', metadata.fallbackUsed);
      console.log('Processing Time:', metadata.processingTime + 'ms');
      console.log('Model:', metadata.model);
      
      // Test JSON parsing
      try {
        const parsed = this.parseJSONResponse(result);
        console.log('\n✅ JSON parsing successful');
        console.log('Response length:', result.length, 'characters');
      } catch (parseError) {
        console.log('\n⚠️ JSON parsing failed, but fallback will handle this');
        console.log('Error:', parseError.message);
      }
      
    } catch (error) {
      console.log('\n❌ All APIs failed');
      console.log('Error:', error.message);
      console.log('\nTroubleshooting:');
      console.log('1. Check your API keys in .env.local');
      console.log('2. Verify API key quotas and billing');
      console.log('3. Check network connectivity');
    }
  }
  
  async testJSONFallback() {
    console.log('\n=== Testing JSON Fallback System ===\n');
    
    // Test invalid JSON
    const invalidJSON = "This is not valid JSON";
    try {
      this.parseJSONResponse(invalidJSON);
      console.log('❌ Should have failed');
    } catch (error) {
      console.log('✅ Correctly handled invalid JSON');
    }
    
    // Test JSON with extra text
    const jsonWithText = "Here is the response: {\"test\": \"value\"} and some extra text";
    try {
      const result = this.parseJSONResponse(jsonWithText);
      console.log('✅ Successfully extracted JSON from text');
      console.log('Extracted:', result);
    } catch (error) {
      console.log('❌ Failed to extract JSON:', error.message);
    }
    
    // Test fallback JSON generation
    const fallbackJSON = this.createFallbackJSON("test subject");
    console.log('\n✅ Fallback JSON generated:');
    console.log(fallbackJSON.substring(0, 100) + '...');
  }
}

async function runTests() {
  const testService = new TestAIService();
  
  await testService.testFallback();
  await testService.testJSONFallback();
  
  console.log('\n=== Test Complete ===');
  console.log('\nTo use the system:');
  console.log('1. Add your API keys to .env.local');
  console.log('2. Restart your development server: npm run dev');
  console.log('3. Test the Veo3 Prompt Generator interface');
}

runTests().catch(console.error); 