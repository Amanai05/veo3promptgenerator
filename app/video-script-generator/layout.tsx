import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Video Script Generator - Free AI Video Script Creator",
  description: "Generate professional video scripts for YouTube, TikTok, Instagram, and marketing campaigns with our free AI-powered video script generator. Perfect for content creators and marketers.",
  keywords: "video script generator, AI video scripts, YouTube script generator, TikTok script creator, Instagram video scripts, marketing video scripts, content creation tools, AI script writing, video content creation, free script generator, social media scripts, video marketing, content marketing, video production",
  openGraph: {
    title: "Video Script Generator - Free AI Video Script Creator",
    description: "Generate professional video scripts for YouTube, TikTok, Instagram, and marketing campaigns with our free AI-powered video script generator. Perfect for content creators and marketers.",
    url: "https://veo3promptgenerator.online/video-script-generator",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Video Script Generator - Free AI Video Script Creator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Script Generator - Free AI Video Script Creator",
    description: "Generate professional video scripts for YouTube, TikTok, Instagram, and marketing campaigns with our free AI-powered video script generator.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/video-script-generator",
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
  other: {
    "application-name": "Veo3 Prompt Generator",
    "apple-mobile-web-app-title": "Veo3 Prompt Generator",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#6366f1",
    "msapplication-TileColor": "#6366f1",
  },
}

export default function VideoScriptGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 