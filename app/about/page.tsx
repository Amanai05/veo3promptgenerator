import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Globe, Award, Target, Lightbulb, Shield, Rocket, Sparkles, FileText, Brain, Mic, Camera, Video } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Veo3 Prompt Generator - AI Video Tools & Content Creation Platform",
  description: "Learn about Veo3 Prompt Generator, the leading AI-powered platform for video content creation. Discover our tools, mission, and commitment to empowering creators worldwide.",
  keywords: "about Veo3 Prompt Generator, AI video tools, content creation platform, video prompt generator, video script creator, video transcription, AI content creation, digital marketing tools, video production platform, content creators, video marketing, AI video generation",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Veo3 Prompt Generator - AI Video Tools & Content Creation Platform",
    description: "Learn about Veo3 Prompt Generator, the leading AI-powered platform for video content creation. Discover our tools, mission, and commitment to empowering creators worldwide.",
    url: "https://veo3promptgenerator.online/about",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "About Veo3 Prompt Generator - AI Video Tools Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Veo3 Prompt Generator - AI Video Tools & Content Creation Platform",
    description: "Learn about Veo3 Prompt Generator, the leading AI-powered platform for video content creation.",
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

const tools = [
  {
    icon: Sparkles,
    title: "Veo3 Prompt Generator",
    description: "Our flagship tool that transforms your creative ideas into detailed, professional prompts for Google's Veo3 AI video generation platform.",
    benefits: [
      "Advanced character development with voice and dialogue specifications",
      "Context-aware scene descriptions and sound design",
      "Professional prompt formatting optimized for Veo3",
      "Support for multiple languages with English output"
    ],
    color: "text-purple-600"
  },
  {
    icon: FileText,
    title: "Video Script Generator",
    description: "Create compelling video scripts for YouTube, TikTok, marketing campaigns, and educational content with AI-powered assistance.",
    benefits: [
      "Multiple script styles (conversational, professional, educational)",
      "Audience-targeted content optimization",
      "Customizable script lengths and formats",
      "Multi-language support for global reach"
    ],
    color: "text-blue-600"
  },
  {
    icon: Brain,
    title: "Video to Prompt Generator",
    description: "Extract inspiration from existing videos and convert them into detailed prompts for AI video generation platforms.",
    benefits: [
      "Scene-by-scene analysis of uploaded videos",
      "Object detection and action recognition",
      "Audio and visual element extraction",
      "Compatible with Veo3, Runway, and other AI platforms"
    ],
    color: "text-green-600"
  },
  {
    icon: Mic,
    title: "Video Transcription",
    description: "Convert video audio into accurate, searchable text with speaker detection and timestamp markers.",
    benefits: [
      "95%+ accuracy with clear audio",
      "Multi-language support with auto-detection",
      "Speaker identification and timestamps",
      "Professional formatting for subtitles and documentation"
    ],
    color: "text-orange-600"
  }
]

const values = [
  {
    icon: Target,
    title: "User-Centric Design",
    description: "Every tool we build is designed with our users' needs and workflows in mind, ensuring accessibility for creators of all skill levels.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We're constantly pushing the boundaries of what's possible with AI, bringing cutting-edge technology to everyday creators.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data and content are protected with enterprise-grade security measures and immediate deletion after processing.",
  },
  {
    icon: Rocket,
    title: "Continuous Improvement",
    description: "We iterate quickly based on user feedback and the latest AI research, ensuring you always have access to the best tools.",
  },
]

const impactStories = [
  {
    category: "Content Creators",
    description: "YouTubers and social media creators use our tools to generate engaging scripts, create AI-powered videos, and transcribe content for better accessibility.",
    icon: Video
  },
  {
    category: "Marketers",
    description: "Marketing teams leverage our prompt generators to create compelling video content for campaigns, product demos, and brand storytelling.",
    icon: Target
  },
  {
    category: "Educators",
    description: "Teachers and trainers use our transcription and script tools to create educational content, make videos accessible, and develop engaging learning materials.",
    icon: Lightbulb
  },
  {
    category: "Developers",
    description: "AI developers and researchers use our tools to understand prompt engineering, analyze video content, and create training datasets.",
    icon: Brain
  }
]

export default function AboutPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-primary">VeO3 Prompt Generator</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing how creators work with AI by providing a comprehensive suite of tools that make 
            advanced video generation, script writing, and content analysis accessible to everyone.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Mission */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At VeO3 Prompt Generator, we believe that the future of content creation lies in the seamless
                  collaboration between human creativity and artificial intelligence. Our mission is to democratize
                  access to advanced AI tools, making professional video creation, script writing, and content
                  analysis accessible to creators of all backgrounds.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're committed to providing a comprehensive suite of tools that not only save time but also
                  inspire creativity, helping our users unlock new possibilities in their work while maintaining
                  the highest standards of quality, privacy, and reliability.
                </p>
              </div>
            </div>

            {/* Our Tools */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Tool Suite</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tools.map((tool, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <tool.icon className={`h-8 w-8 ${tool.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                        <p className="text-muted-foreground mb-4">{tool.description}</p>
                        <ul className="space-y-1">
                          {tool.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* How We Help People */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">How Our Tools Transform Lives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {impactStories.map((story, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <story.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{story.category}</h3>
                        <p className="text-muted-foreground">{story.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* What Makes Us Different */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Comprehensive AI Suite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Unlike single-purpose tools, we provide a complete ecosystem for AI-powered content creation,
                      from prompt generation to script writing, video analysis, and transcription.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our tools are designed for professional use, with enterprise-grade accuracy and features
                      that scale from individual creators to large teams and organizations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We prioritize your privacy and security. All uploads are processed securely and deleted
                      immediately after processing, ensuring your content remains private and protected.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Continuous Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We're constantly improving our algorithms and adding new features based on user feedback and the
                      latest AI research, ensuring you always have access to cutting-edge tools.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Join Our Journey */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                We're just getting started. Join thousands of creators, marketers, educators, and developers who are 
                already using our comprehensive tool suite to transform their creative process and bring their ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Badge variant="outline" className="text-sm px-4 py-2">
                  🚀 Launching new features monthly
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2">
                  🌍 Available worldwide
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2">
                  💡 Community-driven development
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Badge className="text-sm px-6 py-3 bg-primary hover:bg-primary/90 cursor-pointer">
                    Try Veo3 Prompt Generator
                  </Badge>
                </Link>
                <Link href="/video-script-generator">
                  <Badge variant="outline" className="text-sm px-6 py-3 hover:bg-muted cursor-pointer">
                    Video Script Generator
                  </Badge>
                </Link>
                <Link href="/video-to-prompt">
                  <Badge variant="outline" className="text-sm px-6 py-3 hover:bg-muted cursor-pointer">
                    Video to Prompt
                  </Badge>
                </Link>
                <Link href="/transcription">
                  <Badge variant="outline" className="text-sm px-6 py-3 hover:bg-muted cursor-pointer">
                    Video Transcription
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
