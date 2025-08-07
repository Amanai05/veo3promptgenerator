import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Veo3 Prompt Generator Support",
  description: "Get in touch with the Veo3 Prompt Generator team. Contact us for support, feedback, partnerships, or any questions about our AI-powered content creation tools.",
  keywords: "contact Veo3 Prompt Generator, support, feedback, partnerships, AI tools support, content creation help, Veo3 prompt generator contact, customer service",
  openGraph: {
    title: "Contact Us - Veo3 Prompt Generator Support",
    description: "Get in touch with the Veo3 Prompt Generator team. Contact us for support, feedback, partnerships, or any questions about our AI-powered content creation tools.",
    url: "https://veo3promptgenerator.online/contact",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Contact Us - Veo3 Prompt Generator Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Veo3 Prompt Generator Support",
    description: "Get in touch with the Veo3 Prompt Generator team. Contact us for support, feedback, partnerships, or any questions about our AI-powered content creation tools.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 