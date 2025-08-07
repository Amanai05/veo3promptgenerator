"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Sparkles, Zap, Target } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface AboutSectionProps {
  locale: Locale
}

export function AboutSection({ locale }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const fullContent = `Veo3 Prompt Generator represents the cutting-edge evolution of AI-powered creative tools, specifically designed to revolutionize how content creators, marketers, and businesses approach video production and prompt engineering. Our platform harnesses the advanced capabilities of Gemini 2.5 Pro technology to deliver unprecedented accuracy and creativity in video prompt generation.

At the core of our innovation lies a sophisticated understanding of visual storytelling, technical video production requirements, and the nuanced art of prompt crafting. We recognize that creating compelling video content requires more than just basic descriptions – it demands a deep comprehension of cinematography, narrative structure, audience psychology, and technical execution.

Our AI-powered video script generator transforms abstract ideas into comprehensive, production-ready scripts tailored for various platforms including YouTube, TikTok, Instagram Reels, and professional marketing campaigns. The system analyzes your input through multiple layers of creative intelligence, considering factors such as target audience demographics, content style preferences, optimal video length, and platform-specific requirements.

The advanced prompt generator feature represents a breakthrough in AI interaction methodology. Unlike traditional prompt tools that rely on simple text input, our system employs a structured approach that guides users through essential creative elements: subject description, scene dynamics, dialogue integration, camera movement specifications, environmental details, and post-production considerations including subtitle requirements.

Our commitment to multilingual accessibility ensures that creators worldwide can leverage our tools in their native languages, with professional-grade translations that maintain creative nuance and technical accuracy. The French language integration exemplifies our dedication to global accessibility, featuring culturally appropriate adaptations and region-specific creative considerations.

The platform's intelligent chat interface serves as a creative collaborator, engaging users in meaningful dialogue about their projects, offering suggestions, refinements, and alternative approaches. This conversational AI doesn't just generate content – it educates, inspires, and guides users through the creative process, making professional-level video production accessible to creators at all skill levels.

Technical excellence underpins every aspect of our platform. The integration of multiple AI models ensures reliability and consistency, with automatic fallback systems maintaining service continuity. Our SEO-optimized architecture guarantees that content creators can discover and utilize our tools effectively, while our responsive design ensures seamless functionality across all devices and platforms.

Security and privacy remain paramount in our design philosophy. All user interactions, uploaded content, and generated materials are processed with enterprise-grade security protocols, ensuring that creative work remains confidential and protected. We implement advanced data encryption, secure API communications, and privacy-first design principles throughout our infrastructure.

The community showcase feature highlights the remarkable diversity and quality of content created using our tools, serving as both inspiration and validation of our platform's capabilities. These real-world examples demonstrate the practical applications of AI-assisted creativity across industries, from independent content creators to major brand campaigns.

Looking forward, Veo3 Prompt Generator continues to evolve, incorporating user feedback, advancing AI capabilities, and expanding creative possibilities. Our roadmap includes enhanced collaboration features, advanced analytics for content optimization, integration with major video production platforms, and continued expansion of language support to serve the global creative community.

We believe that the future of content creation lies in the harmonious collaboration between human creativity and artificial intelligence. Our platform doesn't replace human creativity – it amplifies it, providing the tools, guidance, and technical capabilities that allow creators to focus on what they do best: telling compelling stories and creating meaningful connections with their audiences.`

  const previewContent = fullContent.split("\n\n")[0]

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Veo3 Prompt Generator
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Revolutionizing creative content with advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Creativity</h3>
              <p className="text-sm text-muted-foreground">
                Advanced Gemini 2.5 Pro technology for intelligent content generation
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Generate professional video scripts and prompts in seconds
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Precision Targeting</h3>
              <p className="text-sm text-muted-foreground">Tailored content for specific audiences and platforms</p>
            </Card>
          </div>

          {/* SEO-Optimized Content - Always in DOM */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                {/* Always visible content for SEO */}
                <div className="hidden" aria-hidden="true">
                  {fullContent}
                </div>

                {/* User-visible content */}
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>{previewContent}</p>

                  {isExpanded && (
                    <div className="space-y-4">
                      {fullContent
                        .split("\n\n")
                        .slice(1)
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Read Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Read More
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
