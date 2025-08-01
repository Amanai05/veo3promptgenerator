import { MainHero } from "@/components/main-hero"
import { HomeSections } from "@/components/home-sections"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veo3 Prompt Generator - Free AI Video Prompt Creator | Professional Content Tools",
  description: "Create professional Veo3 prompts and video scripts with our free AI-powered generator. Perfect for content creators, marketers, and businesses. Transform ideas into high-quality video content instantly.",
  keywords: "Veo3 prompt generator, AI video prompts, video script generator, content creation tools, AI video generation, Google Veo3, prompt engineering, video content creation",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://veo3promptgenerator.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Veo3 Prompt Generator - Free AI Video Prompt Creator",
    description: "Create professional Veo3 prompts and video scripts with our free AI-powered generator. Perfect for content creators, marketers, and businesses.",
    url: "https://veo3promptgenerator.com",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/veo3-logo.png",
        width: 1200,
        height: 630,
        alt: "Veo3 Prompt Generator - AI Video Prompt Creator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veo3 Prompt Generator - Free AI Video Prompt Creator",
    description: "Create professional Veo3 prompts and video scripts with our free AI-powered generator.",
    images: ["/images/veo3-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function HomePage() {
  return (
    <>
      <main>
        <MainHero />
        <HomeSections />
      </main>
      
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Veo3 Prompt Generator",
            "url": "https://veo3promptgenerator.com",
            "logo": "https://veo3promptgenerator.com/images/veo3-logo.png",
            "description": "Free AI-powered Veo3 prompt generator for content creators, marketers, and businesses",
            "sameAs": [
              "https://twitter.com/veo3promptgen",
              "https://linkedin.com/company/veo3promptgenerator"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "support@veo3promptgenerator.com"
            }
          })
        }}
      />
      
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Veo3 Prompt Generator",
            "url": "https://veo3promptgenerator.com",
            "description": "Free AI-powered Veo3 prompt generator and video script creator",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://veo3promptgenerator.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Veo3 Prompt Generator",
            "applicationCategory": "ContentCreationApplication",
            "operatingSystem": "Web Browser",
            "description": "AI-powered tool for creating professional Veo3 prompts and video scripts",
            "url": "https://veo3promptgenerator.com",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "Veo3 Prompt Generation",
              "Video Script Creation", 
              "AI-Powered Content Tools",
              "Professional Templates",
              "Free Online Access"
            ]
          })
        }}
      />
    </>
  )
}
