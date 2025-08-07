import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veo3 Prompt Guide - Master AI Video Prompt Engineering",
  description: "Learn how to create effective prompts for AI video generation with our comprehensive guide. Master prompt engineering techniques for Veo3 and other AI video platforms.",
  keywords: "Veo3 prompt guide, AI video prompt engineering, prompt writing tips, video generation prompts, AI content creation guide, prompt engineering tutorial, video prompt best practices, AI video tips, content creation guide, video production prompts, creative writing for AI, prompt optimization",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/prompt-guide",
  },
  openGraph: {
    title: "Veo3 Prompt Guide - Master AI Video Prompt Engineering",
    description: "Learn how to create effective prompts for AI video generation with our comprehensive guide. Master prompt engineering techniques for Veo3 and other AI video platforms.",
    url: "https://veo3promptgenerator.online/prompt-guide",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Veo3 Prompt Guide - AI Video Prompt Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veo3 Prompt Guide - Master AI Video Prompt Engineering",
    description: "Learn how to create effective prompts for AI video generation with our comprehensive guide. Master prompt engineering techniques for Veo3 and other AI video platforms.",
    images: ["/images/og-image-1200x630.png"],
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
}

export default function PromptGuidePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Prompt Guide</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Learn how to create effective prompts for AI video generation and get the best results from your creative
            projects.
          </p>

          <h2>Getting Started</h2>
          <p>
            Creating effective prompts is both an art and a science. This guide will help you understand the
            fundamentals of prompt engineering and how to apply them to video generation.
          </p>

          <h2>Basic Prompt Structure</h2>
          <p>A well-structured prompt should include:</p>
          <ul>
            <li>Clear description of the subject</li>
            <li>Specific actions or movements</li>
            <li>Setting and environment details</li>
            <li>Visual style and mood</li>
            <li>Technical specifications</li>
          </ul>

          <h2>Advanced Techniques</h2>
          <p>
            Once you master the basics, you can explore advanced prompting techniques to achieve more sophisticated
            results.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="mb-4">Try our AI-powered prompt generator to create professional prompts instantly.</p>
            <a href="/#generator" className="text-primary hover:underline font-medium">
              Generate Prompts Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
