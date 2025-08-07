import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Video to Prompt Generator - Convert Videos to AI Prompts with Gemini 2.5 Flash",
  description: "Convert existing videos into detailed prompts for AI video generation tools using Gemini 2.5 Flash. Transform your videos into optimized prompts for Veo3, Runway, and other AI video platforms.",
  keywords: "video to prompt, video prompt generator, AI video prompts, video conversion, Veo3 prompts, Runway prompts, AI video generation, video analysis, prompt engineering, video content creation, AI video tools, video optimization, Gemini 2.5 Flash",
  openGraph: {
    title: "Video to Prompt Generator - Convert Videos to AI Prompts with Gemini 2.5 Flash",
    description: "Convert existing videos into detailed prompts for AI video generation tools using Gemini 2.5 Flash. Transform your videos into optimized prompts for Veo3, Runway, and other AI video platforms.",
    url: "https://veo3promptgenerator.online/video-to-prompt",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Video to Prompt Generator - Convert Videos to AI Prompts with Gemini 2.5 Flash",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to Prompt Generator - Convert Videos to AI Prompts with Gemini 2.5 Flash",
    description: "Convert existing videos into detailed prompts for AI video generation tools using Gemini 2.5 Flash. Transform your videos into optimized prompts for Veo3, Runway, and other AI video platforms.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/video-to-prompt",
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

export default function VideoToPromptLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 