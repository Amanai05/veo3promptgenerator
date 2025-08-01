import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Users, 
  Globe, 
  Award, 
  Target, 
  Lightbulb, 
  Shield, 
  Rocket,
  Upload,
  Brain,
  Download,
  Star,
  MessageSquare,
  Trophy,
  Heart,
  Share2,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Camera,
  Mic,
  FileText,
  Video
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export function HomeSections() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Get results in seconds with our optimized AI algorithms and cloud infrastructure with automatic fallback."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your files are processed securely and deleted immediately after processing with enterprise-grade security."
    },
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "Powered by Gemini 2.5 Pro with intelligent fallback to OpenRouter for maximum reliability."
    },
    {
      icon: Globe,
      title: "Multiple Formats",
      description: "Support for various image and video formats including JPG, PNG, MP4, and more with intelligent processing."
    },
    {
      icon: TrendingUp,
      title: "Real-time Processing",
      description: "Watch your content generate in real-time with live progress indicators and fallback protection."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "High-quality outputs suitable for professional use and creative projects with AI-powered enhancement."
    }
  ]

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Content",
      description: "Simply drag and drop your images, videos, or text, or click to browse and select files from your device.",
      step: "01"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your content, understanding context, objects, scenes, and emotions.",
      step: "02"
    },
    {
      icon: Download,
      title: "Get Your Results",
      description: "Receive detailed outputs in multiple formats - JSON for developers, paragraphs for creators.",
      step: "03"
    }
  ]

  const tools = [
    {
      icon: Video,
      title: "Veo3 Prompt Generator",
      description: "Create detailed prompts for Google's Veo3 AI video generation with structured forms and advanced chat modes.",
      link: "/veo3-prompt-generator"
    },
    {
      icon: FileText,
      title: "Video Script Generator",
      description: "Generate professional video scripts for YouTube, TikTok, Instagram, and marketing campaigns.",
      link: "/video-script-generator"
    },
    {
      icon: Camera,
      title: "Video to Prompt",
      description: "Convert existing videos into detailed prompts for AI video generation tools.",
      link: "/video-to-prompt"
    },
    {
      icon: Mic,
      title: "Audio Transcription",
      description: "Transcribe audio files with high accuracy and multiple output formats.",
      link: "/transcription"
    }
  ]

  const benefits = [
    {
      icon: Rocket,
      title: "Save Hours of Work",
      description: "Transform your ideas into production-ready content in minutes instead of hours of manual work."
    },
    {
      icon: Users,
      title: "Professional Quality",
      description: "Access enterprise-grade AI techniques used by top content creators and marketing agencies."
    },
    {
      icon: Heart,
      title: "Creative Freedom",
      description: "Focus on your creative vision while our AI handles the technical complexities."
    },
    {
      icon: TrendingUp,
      title: "Better Results",
      description: "Generate more engaging, consistent, and high-quality content with optimized AI processing."
    }
  ]

  const whoCanBenefit = [
    {
      category: "Content Creators",
      description: "YouTubers, TikTok creators, and social media influencers who need engaging content quickly and consistently.",
      icon: Video
    },
    {
      category: "Marketing Teams",
      description: "Digital marketers and agencies creating campaigns, product demos, and brand storytelling content.",
      icon: Target
    },
    {
      category: "Educators",
      description: "Teachers, trainers, and educational content creators developing engaging learning materials and tutorials.",
      icon: Lightbulb
    },
    {
      category: "Businesses",
      description: "Companies and entrepreneurs creating promotional content, product demonstrations, and corporate communications.",
      icon: Shield
    }
  ]

  const faqs = [
    {
      question: "How accurate are the AI-generated outputs?",
      answer: "Our AI models achieve 99.5% accuracy in content generation, with continuous improvements through machine learning and user feedback."
    },
    {
      question: "What file formats are supported?",
      answer: "We support all major image formats (JPG, PNG, GIF, WebP) and video formats (MP4, AVI, MOV, WebM) up to 100MB per file."
    },
    {
      question: "Is my uploaded content secure?",
      answer: "Yes, all files are processed securely and automatically deleted after processing. We use enterprise-grade encryption and never store your content permanently."
    },
    {
      question: "Can I use the generated content commercially?",
      answer: "Absolutely! All generated content is yours to use for any purpose, including commercial projects and client work."
    },
    {
      question: "How long does processing take?",
      answer: "Most files are processed within 10-30 seconds. Larger files or complex content may take up to 2 minutes."
    },
    {
      question: "Do you offer API access?",
      answer: "Yes, we provide RESTful API access for developers. Contact us for API documentation and pricing information."
    }
  ]

  return (
    <>
      {/* Tools Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Our <span className="text-purple-600">AI Tools</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Discover our comprehensive suite of AI-powered tools designed for content creators and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-3 xs:pt-4 sm:pt-6 p-3 xs:p-4 sm:p-6">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 xs:mb-3 sm:mb-4 group-hover:bg-purple-200 transition-colors">
                    <tool.icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-xs xs:text-sm sm:text-base mb-4">{tool.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={tool.link}>
                      Try Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Why Choose <span className="text-purple-600">Our Platform</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Experience the most advanced AI-powered content generation platform with enterprise-grade features and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-3 xs:pt-4 sm:pt-6 p-3 xs:p-4 sm:p-6">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 xs:mb-3 sm:mb-4 group-hover:bg-purple-200 transition-colors">
                    <feature.icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs xs:text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 xs:py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              How It <span className="text-purple-600">Works</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Transform your ideas into powerful content in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-3 xs:pt-4 sm:pt-6 p-3 xs:p-4 sm:p-6">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4 text-white font-bold text-sm xs:text-lg sm:text-xl">
                    {step.step}
                  </div>
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                    <step.icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-xs xs:text-sm sm:text-base">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Key <span className="text-purple-600">Benefits</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Discover how our AI platform can transform your content creation workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-3 xs:pt-4 sm:pt-6 p-3 xs:p-4 sm:p-6">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                    <benefit.icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-xs xs:text-sm sm:text-base">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Platform Section - Minimal */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
              {/* Text Content - Right Side */}
              <div className="flex-1">
                <div className="mb-4">
                  <Button asChild variant="outline" className="px-3 py-1 text-sm font-medium border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                    <Link href="https://trustpilot.com" target="_blank" rel="noopener noreferrer">
                      ⭐ Review us on Trustpilot
                    </Link>
                  </Button>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  About <span className="text-purple-600 dark:text-purple-400">Veo3 Prompt Generator</span>
                </h2>
                
                <div className="space-y-4">
                  <p className="text-[15px] sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our mission is to revolutionize the way people create content, empowering them to unlock new levels of creativity and efficiency through AI-powered tools. We understand the challenges that content creators, marketers, and businesses face in today's fast-paced digital landscape, where quality content is essential for success.
                  </p>
                  <p className="text-[15px] sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Join our team of expert AI engineers who created Veo3 Prompt Generator on this journey of unlocking AI's full potential. We believe in making AI accessible and easy-to-use through our expertly curated prompt generation tools. Our platform combines cutting-edge technology with intuitive design, ensuring that even beginners can create professional-quality content while providing advanced features for experienced users.
                  </p>
                  <p className="text-[15px] sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    With years of experience in AI development and content creation, we've built a comprehensive suite of tools that cater to diverse needs. From Veo3 prompt generation to video script creation, our platform offers everything you need to bring your creative vision to life. We're committed to continuous innovation, regularly updating our AI models and features to stay ahead of industry trends and user needs.
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    <Link href="/about">
                      Read More About Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Frequently Asked <span className="text-purple-600">Questions</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Find answers to common questions about our AI platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto px-3 xs:px-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-xs xs:text-sm sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs xs:text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* FAQ Schema Markup */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": faqs.map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer
                    }
                  }))
                })
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
              <section className="py-8 xs:py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-black dark:from-black dark:from-black text-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-sm xs:text-lg sm:text-xl mb-4 xs:mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90 px-3 xs:px-4">
            Join thousands of creators who are already using our AI platform to create amazing content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 h-10 xs:h-12 sm:h-14 px-4 xs:px-6 sm:px-8 text-sm xs:text-base sm:text-lg">
              <Link href="/veo3-prompt-generator">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 h-10 xs:h-12 sm:h-14 px-4 xs:px-6 sm:px-8 text-sm xs:text-base sm:text-lg">
              <Link href="/tools">Explore All Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
} 