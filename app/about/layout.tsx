import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Veo3 Prompt Generator Team",
  description: "Learn about the Veo3 Prompt Generator team and our mission to revolutionize content creation with AI-powered tools. Discover our story, values, and commitment to empowering creators.",
  keywords: "about Veo3 Prompt Generator, AI content creation team, Veo3 prompt generator about, content creation tools, AI video generation team, prompt engineering experts, video content creation, AI tools development",
  openGraph: {
    title: "About Us - Veo3 Prompt Generator Team",
    description: "Learn about the Veo3 Prompt Generator team and our mission to revolutionize content creation with AI-powered tools. Discover our story, values, and commitment to empowering creators.",
    url: "https://veo3promptgenerator.online/about",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "About Us - Veo3 Prompt Generator Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Veo3 Prompt Generator Team",
    description: "Learn about the Veo3 Prompt Generator team and our mission to revolutionize content creation with AI-powered tools.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/about",
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 