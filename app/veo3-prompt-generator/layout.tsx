import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Veo3 Prompt Generator (Advanced JSON & Viral Templates)",
  description: "Generate production-ready prompts for Google's Veo3. Our free tool creates advanced JSON & paragraph prompts with viral templates and full cinematic control. No signup required.",
  keywords: "Veo3 prompt generator, free Veo3 prompts, AI video generation, Google Veo3, JSON prompts, viral video templates, cinematic prompts, video content creation, AI video tools, prompt engineering, Veo3 AI, video generation prompts, advanced prompts, paragraph prompts, production-ready prompts, viral templates, cinematic control, no signup, free AI tools",
  openGraph: {
    title: "Free Veo3 Prompt Generator (Advanced JSON & Viral Templates)",
    description: "Generate production-ready prompts for Google's Veo3. Our free tool creates advanced JSON & paragraph prompts with viral templates and full cinematic control. No signup required.",
          url: "https://veo3promptgenerator.online/veo3-prompt-generator",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Free Veo3 Prompt Generator - Advanced JSON & Viral Templates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Veo3 Prompt Generator (Advanced JSON & Viral Templates)",
    description: "Generate production-ready prompts for Google's Veo3. Our free tool creates advanced JSON & paragraph prompts with viral templates and full cinematic control. No signup required.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
          canonical: "https://veo3promptgenerator.online/veo3-prompt-generator",
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

export default function Veo3PromptGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 