import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Veo3 Prompt Generator Content & Tips",
  description: "Discover the latest insights, tips, and tutorials for AI video generation, prompt engineering, and content creation. Stay updated with Veo3 Prompt Generator blog.",
  keywords: "Veo3 prompt generator blog, AI video generation tips, prompt engineering tutorials, content creation guides, AI video tools blog, Veo3 tutorials, video content creation tips, AI tools blog",
  openGraph: {
    title: "Blog - Veo3 Prompt Generator Content & Tips",
    description: "Discover the latest insights, tips, and tutorials for AI video generation, prompt engineering, and content creation. Stay updated with Veo3 Prompt Generator blog.",
    url: "https://veo3promptgenerator.online/blog",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Blog - Veo3 Prompt Generator Content & Tips",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Veo3 Prompt Generator Content & Tips",
    description: "Discover the latest insights, tips, and tutorials for AI video generation, prompt engineering, and content creation.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/blog",
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 