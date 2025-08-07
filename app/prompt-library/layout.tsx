import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prompt Library - Veo3 AI Video Templates",
  description: "Explore our curated collection of professional Veo3 prompts and templates. Find ready-to-use prompts for various video styles, genres, and content types.",
  keywords: "prompt library, Veo3 templates, AI video prompts, video templates, Veo3 prompt collection, professional prompts, video generation templates, AI video library",
  openGraph: {
    title: "Prompt Library - Veo3 AI Video Templates",
    description: "Explore our curated collection of professional Veo3 prompts and templates. Find ready-to-use prompts for various video styles, genres, and content types.",
    url: "https://veo3promptgenerator.online/prompt-library",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Prompt Library - Veo3 AI Video Templates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Library - Veo3 AI Video Templates",
    description: "Explore our curated collection of professional Veo3 prompts and templates. Find ready-to-use prompts for various video styles, genres, and content types.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/prompt-library",
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

export default function PromptLibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 