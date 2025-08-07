import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: {
    default: "Veo3 Prompt Generator - Free AI Video Prompt Creator | Professional Content Tools",
    template: "%s | Veo3 Prompt Generator"
  },
  description: "Create professional Veo3 prompts and video scripts with our free AI-powered generator. Perfect for content creators, marketers, and businesses. Transform ideas into high-quality video content instantly.",
  keywords: "Veo3 prompt generator, AI video prompts, video script generator, content creation tools, AI video generation, Google Veo3, prompt engineering, video content creation, free AI tools, video marketing, social media content, YouTube prompts, TikTok content, Instagram videos, professional video scripts, AI content creation, video production tools, digital marketing, content marketing, video advertising",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon', url: '/images/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
          url: "https://veo3promptgenerator.online",
    siteName: "Veo3 Prompt Generator",
    title: "Veo3 Prompt Generator - Free AI Video Prompt Creator | Professional Content Tools",
    description: "Create professional Veo3 prompts and video scripts with our free AI-powered generator. Perfect for content creators, marketers, and businesses. Transform ideas into high-quality video content instantly.",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Veo3 Prompt Generator - AI Video Prompt Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veo3 Prompt Generator - Free AI Video Prompt Creator",
    description: "Create professional Veo3 prompts and video scripts with our free AI-powered generator.",
    images: ["/images/twitter-image-1200x600.png"],
    creator: "@veo3promptgen",
    site: "@veo3promptgen",
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
  category: "Technology",
  classification: "AI Tools",
  other: {
    "theme-color": "#6366f1",
    "color-scheme": "light dark",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Veo3 Prompt Generator",
    "application-name": "Veo3 Prompt Generator",
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
    "manifest": "/manifest.json",
  },
  generator: 'Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://veo3promptgenerator.online" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </head>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
