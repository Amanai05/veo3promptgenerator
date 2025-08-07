import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Video to Text - Convert Video Audio to Text with Gemini 2.5 Flash",
  description: "Convert video audio to text with Gemini 2.5 Flash AI. Extract and transcribe all audio content with professional accuracy and language detection.",
  keywords: "video to text, audio to text, video transcription, Gemini 2.5 Flash, AI transcription, speech to text, video subtitles, transcription service, audio conversion, video audio extraction, transcription tool",
  openGraph: {
    title: "Video to Text - Convert Video Audio to Text with Gemini 2.5 Flash",
    description: "Convert video audio to text with Gemini 2.5 Flash AI. Extract and transcribe all audio content with professional accuracy and language detection.",
    url: "https://veo3promptgenerator.online/transcription",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Video to Text - Convert Video Audio to Text with Gemini 2.5 Flash",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to Text - Convert Video Audio to Text with Gemini 2.5 Flash",
    description: "Convert video audio to text with Gemini 2.5 Flash AI. Extract and transcribe all audio content with professional accuracy and language detection.",
    images: ["/images/twitter-image-1200x600.png"],
  },
  alternates: {
    canonical: "https://veo3promptgenerator.online/transcription",
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

export default function TranscriptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 