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
  title: "Veo3 Prompt Generator Free Online - AI Video Script & Prompt Tool",
  description:
    "Professional AI-powered tool for generating video scripts and Veo3 prompts. Create compelling video content with our free online generator for YouTube, TikTok, and social media.",
  keywords: "veo3, prompt generator, video script generator, AI video, video prompts, free online tool",
  authors: [{ name: "VeO3 Team" }],
  creator: "VeO3 Prompt Generator",
  publisher: "VeO3",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Veo3 Prompt Generator",
    title: "Veo3 Prompt Generator Free Online - AI Video Script & Prompt Tool",
    description:
      "Professional AI-powered tool for generating video scripts and Veo3 prompts. Create compelling video content with our free online generator.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veo3 Prompt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veo3 Prompt Generator Free Online",
    description: "Professional AI-powered tool for generating video scripts and Veo3 prompts.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
