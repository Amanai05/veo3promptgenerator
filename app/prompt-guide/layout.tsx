import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prompt Guide - Veo3 AI Video Generation Tips",
  description: "Master the art of prompt engineering for Veo3 AI video generation. Learn expert tips, best practices, and techniques to create stunning AI-generated videos.",
  keywords: "prompt guide, Veo3 prompt engineering, AI video generation tips, prompt best practices, Veo3 tutorials, AI video prompts, prompt engineering guide, Veo3 tips and tricks",
  openGraph: {
    title: "Prompt Guide - Veo3 AI Video Generation Tips",
    description: "Master the art of prompt engineering for Veo3 AI video generation. Learn expert tips, best practices, and techniques to create stunning AI-generated videos.",
    url: "https://veo3promptgenerator.online/prompt-guide",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Prompt Guide - Veo3 AI Video Generation Tips",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Guide - Veo3 AI Video Generation Tips",
    description: "Master the art of prompt engineering for Veo3 AI video generation. Learn expert tips, best practices, and techniques to create stunning AI-generated videos.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/prompt-guide",
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

export default function PromptGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 