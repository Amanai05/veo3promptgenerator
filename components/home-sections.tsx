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
      title: "Detailed JSON Prompts",
      description: "Get highly detailed, scene-by-scene JSON prompts with technical specifications and metadata for developers."
    },
    {
      icon: Globe,
      title: "Multiple Formats",
      description: "Support for various image and video formats including JPG, PNG, MP4, and more with intelligent processing."
    },
    {
      icon: TrendingUp,
      title: "Real-time Processing",
      description: "Watch your prompts generate in real-time with live progress indicators and fallback protection."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "High-quality prompts suitable for professional use and creative projects with AI-powered enhancement."
    }
  ]

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Media",
      description: "Simply drag and drop your images or videos, or click to browse and select files from your device.",
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
      title: "Get Your Prompts",
      description: "Receive detailed prompts in multiple formats - JSON for developers, paragraphs for creators.",
      step: "03"
    }
  ]

  const veo3Features = [
    {
      icon: Sparkles,
      title: "Advanced Character Development",
      description: "Create detailed character profiles with voice specifications, dialogue, and personality traits for consistent video generation."
    },
    {
      icon: Camera,
      title: "Scene-by-Scene Control",
      description: "Define precise camera movements, lighting conditions, and environmental details for professional-quality videos."
    },
    {
      icon: MessageSquare,
      title: "Multi-Language Support",
      description: "Input in your native language and receive optimized English prompts for Google's Veo3 AI platform."
    },
    {
      icon: Target,
      title: "Audience Optimization",
      description: "Tailor your prompts for specific platforms like TikTok, YouTube, Instagram, or professional marketing campaigns."
    }
  ]

  const benefits = [
    {
      icon: Rocket,
      title: "Save Hours of Work",
      description: "Transform your ideas into production-ready prompts in minutes instead of hours of manual writing and refinement."
    },
    {
      icon: Users,
      title: "Professional Quality",
      description: "Access enterprise-grade prompt engineering techniques used by top content creators and marketing agencies."
    },
    {
      icon: Heart,
      title: "Creative Freedom",
      description: "Focus on your creative vision while our AI handles the technical complexities of prompt optimization."
    },
    {
      icon: TrendingUp,
      title: "Better Results",
      description: "Generate more engaging, consistent, and high-quality videos with optimized prompts designed for maximum impact."
    }
  ]

  const whoCanBenefit = [
    {
      category: "Content Creators",
      description: "YouTubers, TikTok creators, and social media influencers who need engaging video content quickly and consistently.",
      icon: Video
    },
    {
      category: "Marketing Teams",
      description: "Digital marketers and agencies creating video campaigns, product demos, and brand storytelling content.",
      icon: Target
    },
    {
      category: "Educators",
      description: "Teachers, trainers, and educational content creators developing engaging learning materials and tutorials.",
      icon: Lightbulb
    },
    {
      category: "Businesses",
      description: "Companies and entrepreneurs creating promotional videos, product demonstrations, and corporate communications.",
      icon: Shield
    }
  ]

  const faqs = [
    {
      question: "How accurate are the AI-generated prompts?",
      answer: "Our AI models achieve 99.5% accuracy in prompt generation, with continuous improvements through machine learning and user feedback."
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
      question: "Can I use the generated prompts commercially?",
      answer: "Absolutely! All generated prompts are yours to use for any purpose, including commercial projects and client work."
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
      {/* About Veo3 Prompt Generator Section */}
      <section className="pt-4 pb-8 xs:pb-10 sm:pb-12 bg-muted/30">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto">
            <Card className="p-3 xs:p-4 sm:p-5 shadow-none border border-muted bg-background">
              <div className="mb-4 xs:mb-5 text-left">
                <h2 className="text-base xs:text-lg sm:text-xl font-bold mb-2 text-purple-700">About Veo3 Prompt Generator</h2>
                <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed">
                  Veo3 Prompt Generator is a minimal, fast, and secure AI tool for creating detailed, production-ready prompts for Google's Veo3 and other video AI models. It guides you through every step—context, characters, dialogue, camera, and more—so you can generate professional video scripts in minutes. Designed for creators, marketers, educators, and businesses, it makes prompt engineering simple, creative, and accessible for everyone.
                </p>
              </div>
              <div className="mb-3 xs:mb-4">
                <h3 className="text-xs xs:text-sm font-semibold mb-1 text-muted-foreground">Key Features</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-purple-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Character, voice, and dialogue control</span></li>
                  <li className="flex items-start gap-2"><Camera className="h-4 w-4 text-purple-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Scene-by-scene camera and environment</span></li>
                  <li className="flex items-start gap-2"><MessageSquare className="h-4 w-4 text-purple-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Multi-language input, English output</span></li>
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 text-purple-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Fast, secure, and private</span></li>
                </ul>
              </div>
              <div className="mb-3 xs:mb-4">
                <h3 className="text-xs xs:text-sm font-semibold mb-1 text-muted-foreground">Benefits</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2"><Rocket className="h-4 w-4 text-green-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Save hours of manual writing</span></li>
                  <li className="flex items-start gap-2"><Users className="h-4 w-4 text-green-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Professional results for all skill levels</span></li>
                  <li className="flex items-start gap-2"><Heart className="h-4 w-4 text-green-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Focus on creativity, not formatting</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs xs:text-sm font-semibold mb-1 text-muted-foreground">Who Can Benefit</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2"><Video className="h-4 w-4 text-blue-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Content creators & influencers</span></li>
                  <li className="flex items-start gap-2"><Target className="h-4 w-4 text-blue-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Marketing teams & agencies</span></li>
                  <li className="flex items-start gap-2"><Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Educators & trainers</span></li>
                  <li className="flex items-start gap-2"><Shield className="h-4 w-4 text-blue-500 mt-0.5" /><span className="text-xs xs:text-sm text-muted-foreground">Businesses & entrepreneurs</span></li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Why Choose <span className="text-purple-600">VeO3 Prompt Generator</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Experience the most advanced AI-powered prompt generation platform with enterprise-grade features and reliability.
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
      <section className="py-8 xs:py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              How It <span className="text-purple-600">Works</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Transform your media into powerful prompts in just three simple steps.
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

      {/* FAQ Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Frequently Asked <span className="text-purple-600">Questions</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-3 xs:px-4">
              Find answers to common questions about VeO3 Prompt Generator
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
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-8 xs:py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-sm xs:text-lg sm:text-xl mb-4 xs:mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90 px-3 xs:px-4">
            Join thousands of creators who are already using VeO3 Prompt Generator to create amazing content.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 h-10 xs:h-12 sm:h-14 px-4 xs:px-6 sm:px-8 text-sm xs:text-base sm:text-lg">
            <Link href="/#main-generators">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </>
  )
} 