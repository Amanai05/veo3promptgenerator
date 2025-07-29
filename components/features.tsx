import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Code, Globe, Clock, Star } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description:
      "Get results in seconds with our optimized AI algorithms and cloud infrastructure with automatic fallback.",
    badge: "Performance",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your files are processed securely and deleted immediately after processing with enterprise-grade security.",
    badge: "Security",
  },
  {
    icon: Code,
    title: "Detailed JSON Prompts",
    description:
      "Get highly detailed, scene-by-scene JSON prompts with technical specifications and metadata for developers.",
    badge: "Advanced",
  },
  {
    icon: Globe,
    title: "Multiple Formats",
    description:
      "Support for various image and video formats including JPG, PNG, MP4, and more with intelligent processing.",
    badge: "Compatibility",
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Watch your prompts generate in real-time with live progress indicators and fallback protection.",
    badge: "Real-time",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "High-quality prompts suitable for professional use and creative projects with AI-powered enhancement.",
    badge: "Quality",
  },
]

export function Features() {
  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VU3 PromGenerator
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Experience the most advanced AI-powered prompt generation platform with enterprise-grade features and
            reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border border-red-medium/20 bg-background/50 backdrop-blur card-red-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-red-light/20 flex items-center justify-center group-hover:bg-red-light/30 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-red-light/20 text-primary border-red-medium/20">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
