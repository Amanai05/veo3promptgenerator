# VeO3 Prompt Generator - Internationalization Guide

## Overview
This guide explains how to add new languages and maintain SEO optimization for the VeO3 Prompt Generator platform.

## Current Implementation

### Supported Languages
- **English (en)** - Default language
- **French (fr)** - First additional language

### URL Structure
- English (default): `veo3.ai/` 
- French: `veo3.ai/fr/`
- Other languages: `veo3.ai/[locale]/`

## Adding a New Language

### Step 1: Update Language Configuration

1. **Add locale to `lib/i18n.ts`**:
\`\`\`typescript
export const locales = ['en', 'fr', 'es'] as const // Add 'es' for Spanish
\`\`\`

2. **Add translations to the translations object**:
\`\`\`typescript
export const translations = {
  en: { /* existing English translations */ },
  fr: { /* existing French translations */ },
  es: {
    // Navigation
    home: 'Inicio',
    tools: 'Herramientas',
    blog: 'Blog',
    about: 'Acerca de',
    contact: 'Contacto',
    getStarted: 'Comenzar',
    
    // Hero Section
    heroTitle: 'Crea videos e indicaciones impactantes con IA',
    heroSubtitle: 'Nuestra plataforma te permite generar guiones de video, optimizar tus indicaciones y liberar tu creatividad sin esfuerzo.',
    startFree: 'Comenzar gratis',
    
    // Add all other required translations...
  }
}
\`\`\`

### Step 2: Update Language Selector

Add the new language to `components/language-selector.tsx`:

\`\`\`typescript
const languageNames = {
  en: 'English',
  fr: 'Français',
  es: 'Español' // Add new language
}
\`\`\`

### Step 3: Create Route Structure

1. **Static generation**: The `app/[locale]/page.tsx` will automatically handle new locales
2. **Update `generateStaticParams`** if needed for build optimization

### Step 4: SEO Optimization

1. **Update `app/layout.tsx`** to include new hreflang tags:
\`\`\`typescript
<link rel="alternate" hrefLang="es" href={`${process.env.NEXT_PUBLIC_SITE_URL}/es`} />
\`\`\`

2. **Update metadata alternates**:
\`\`\`typescript
alternates: {
  canonical: "/",
  languages: {
    'en': '/',
    'fr': '/fr',
    'es': '/es', // Add new language
  },
},
\`\`\`

### Step 5: Content Translation

1. **Professional Translation**: Use professional translation services for accuracy
2. **Cultural Adaptation**: Adapt content for local markets, not just literal translation
3. **Technical Terms**: Maintain consistency in technical terminology
4. **SEO Keywords**: Research and implement locale-specific keywords

## SEO Best Practices

### URL Structure
- Use subdirectories (`/fr/`, `/es/`) for better SEO than subdomains
- Keep URLs clean and readable
- Maintain consistent structure across languages

### Hreflang Implementation
\`\`\`html
<link rel="alternate" hrefLang="en" href="https://veo3.ai/" />
<link rel="alternate" hrefLang="fr" href="https://veo3.ai/fr/" />
<link rel="alternate" hrefLang="es" href="https://veo3.ai/es/" />
<link rel="alternate" hrefLang="x-default" href="https://veo3.ai/" />
\`\`\`

### Content Considerations
- **Unique Content**: Each language version should have unique, valuable content
- **Local Keywords**: Research and implement language-specific keywords
- **Cultural Relevance**: Adapt examples, references, and imagery for local markets
- **Technical SEO**: Ensure proper meta tags, structured data, and sitemap inclusion

### Sitemap Generation
Update `app/sitemap.ts` to include all language versions:

\`\`\`typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const routes = ['', '/tools', '/blog', '/about', '/contact']
  const locales = ['en', 'fr', 'es']
  
  const urls = []
  
  for (const locale of locales) {
    for (const route of routes) {
      urls.push({
        url: locale === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      })
    }
  }
  
  return urls
}
\`\`\`

## Testing New Languages

### Checklist
- [ ] All UI elements translated
- [ ] Navigation works correctly
- [ ] URLs generate properly
- [ ] Hreflang tags present
- [ ] Language selector functions
- [ ] SEO metadata in target language
- [ ] Content culturally appropriate
- [ ] Forms and error messages translated
- [ ] Mobile experience tested

### Tools for Testing
- **Google Search Console**: Monitor international targeting
- **Hreflang Testing Tools**: Validate hreflang implementation
- **Local SEO Tools**: Check keyword rankings in target markets
- **Browser Language Settings**: Test automatic language detection

## Maintenance

### Regular Tasks
1. **Content Updates**: Keep all language versions synchronized
2. **SEO Monitoring**: Track performance across all languages
3. **User Feedback**: Collect feedback from international users
4. **Technical Updates**: Ensure new features work across all languages

### Performance Considerations
- **Bundle Size**: Monitor JavaScript bundle size with additional languages
- **Loading Speed**: Test page load times for international users
- **CDN Configuration**: Ensure proper geographic distribution

## Advanced Features

### Future Enhancements
1. **Automatic Language Detection**: Improve middleware for better detection
2. **Regional Variations**: Support for regional variants (e.g., es-MX, es-ES)
3. **RTL Languages**: Prepare for right-to-left languages
4. **Dynamic Content**: Implement CMS for easier content management

This guide ensures that new languages are added with proper SEO optimization and maintain the high quality standards of the VeO3 Prompt Generator platform.
