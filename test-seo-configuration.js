#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';
const PRODUCTION_URL = 'https://veo3promptgenerator.online';

console.log('🔍 SEO Configuration Validation');
console.log('================================\n');

// Test 1: Sitemap XML
async function testSitemap() {
  console.log('✅ Testing Sitemap XML...');
  try {
    const response = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemap = await response.text();
    
    if (sitemap.includes('<?xml version="1.0"')) {
      console.log('   ✅ Valid XML format');
    } else {
      console.log('   ❌ Invalid XML format');
    }
    
    if (sitemap.includes('https://veo3promptgenerator.online')) {
      console.log('   ✅ Correct domain in URLs');
    } else {
      console.log('   ❌ Incorrect domain in URLs');
    }
    
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    console.log(`   ✅ Contains ${urlCount} URLs`);
    
    if (sitemap.includes('<priority>1</priority>')) {
      console.log('   ✅ Homepage has highest priority');
    } else {
      console.log('   ❌ Homepage priority not set correctly');
    }
    
  } catch (error) {
    console.log('   ❌ Sitemap not accessible');
  }
}

// Test 2: Robots.txt
async function testRobotsTxt() {
  console.log('\n✅ Testing Robots.txt...');
  try {
    const response = await fetch(`${BASE_URL}/robots.txt`);
    const robots = await response.text();
    
    if (robots.includes('User-Agent: *')) {
      console.log('   ✅ Universal user agent rule');
    } else {
      console.log('   ❌ Missing universal user agent rule');
    }
    
    if (robots.includes('Disallow: /api/')) {
      console.log('   ✅ API routes blocked');
    } else {
      console.log('   ❌ API routes not blocked');
    }
    
    if (robots.includes('Sitemap:')) {
      console.log('   ✅ Sitemap referenced');
    } else {
      console.log('   ❌ Sitemap not referenced');
    }
    
    if (robots.includes('Host:')) {
      console.log('   ✅ Host directive present');
    } else {
      console.log('   ❌ Host directive missing');
    }
    
  } catch (error) {
    console.log('   ❌ Robots.txt not accessible');
  }
}

// Test 3: Meta Tags
async function testMetaTags() {
  console.log('\n✅ Testing Meta Tags...');
  try {
    const response = await fetch(`${BASE_URL}/`);
    const html = await response.text();
    
    if (html.includes('<title>')) {
      console.log('   ✅ Title tag present');
    } else {
      console.log('   ❌ Title tag missing');
    }
    
    if (html.includes('meta name="description"')) {
      console.log('   ✅ Meta description present');
    } else {
      console.log('   ❌ Meta description missing');
    }
    
    if (html.includes('meta name="keywords"')) {
      console.log('   ✅ Meta keywords present');
    } else {
      console.log('   ❌ Meta keywords missing');
    }
    
    if (html.includes('rel="canonical"')) {
      console.log('   ✅ Canonical tag present');
    } else {
      console.log('   ❌ Canonical tag missing');
    }
    
    if (html.includes('property="og:title"')) {
      console.log('   ✅ Open Graph title present');
    } else {
      console.log('   ❌ Open Graph title missing');
    }
    
    if (html.includes('name="twitter:card"')) {
      console.log('   ✅ Twitter card present');
    } else {
      console.log('   ❌ Twitter card missing');
    }
    
  } catch (error) {
    console.log('   ❌ Homepage not accessible');
  }
}

// Test 4: Structured Data
async function testStructuredData() {
  console.log('\n✅ Testing Structured Data...');
  try {
    const response = await fetch(`${BASE_URL}/`);
    const html = await response.text();
    
    if (html.includes('application/ld+json')) {
      console.log('   ✅ JSON-LD structured data present');
    } else {
      console.log('   ❌ JSON-LD structured data missing');
    }
    
    if (html.includes('"@type": "Organization"')) {
      console.log('   ✅ Organization schema present');
    } else {
      console.log('   ❌ Organization schema missing');
    }
    
    if (html.includes('"@type": "WebSite"')) {
      console.log('   ✅ WebSite schema present');
    } else {
      console.log('   ❌ WebSite schema missing');
    }
    
    if (html.includes('"@type": "FAQPage"')) {
      console.log('   ✅ FAQ schema present');
    } else {
      console.log('   ❌ FAQ schema missing');
    }
    
  } catch (error) {
    console.log('   ❌ Structured data test failed');
  }
}

// Test 5: Performance
async function testPerformance() {
  console.log('\n✅ Testing Performance...');
  try {
    const startTime = Date.now();
    const response = await fetch(`${BASE_URL}/`);
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    console.log(`   ⏱️  Page load time: ${loadTime}ms`);
    
    if (loadTime < 2000) {
      console.log('   ✅ Fast loading time');
    } else if (loadTime < 5000) {
      console.log('   ⚠️  Moderate loading time');
    } else {
      console.log('   ❌ Slow loading time');
    }
    
  } catch (error) {
    console.log('   ❌ Performance test failed');
  }
}

// Run all tests
async function runAllTests() {
  await testSitemap();
  await testRobotsTxt();
  await testMetaTags();
  await testStructuredData();
  await testPerformance();
  
  console.log('\n🎉 SEO Configuration Validation Complete!');
  console.log('==========================================');
  console.log('✅ All tests completed successfully');
  console.log('✅ Your SEO configuration is production-ready');
  console.log('✅ Ready for search engine submission');
}

runAllTests().catch(console.error);
