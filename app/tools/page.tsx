import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, FileText, ImageIcon, Mic, Zap, Download } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    icon: Video,
    title: "Video to Prompt Generator",
    description:
      "Upload your video and get detailed prompts for AI video generation with scene analysis and technical specifications.",
    features: ["Scene breakdown", "Technical analysis", "JSON output", "Narrative description"],
    href: "/tools/video-to-prompt",
    color: "bg-blue-500",
  },
  {
    icon: FileText,
    title: "Video Transcription",
    description: "Extract and transcribe audio from your videos with AI precision in multiple languages and formats.",
    features: ["Multi-language support", "Timestamp accuracy", "Multiple formats", "Download options"],
    href: "/tools/transcription",
    color: "bg-green-500",
  },
  {
    icon: ImageIcon,
    title: "Image to Prompt",
    description: "Transform images into detailed prompts for AI image and video generation with advanced analysis.",
    features: ["Visual analysis", "Style detection", "Composition breakdown", "Creative suggestions"],
    href: "/tools/image-to-prompt",
    color: "bg-purple-500",
  },
  {
    icon: Mic,
    title: "Audio to Script",
    description: "Convert audio files into formatted scripts with speaker identification and timing information.",
    features: ["Speaker detection", "Script formatting", "Audio enhancement", "Export options"],
    href: "/tools/audio-to-script",
    color: "bg-orange-500",
  },
]

const upcomingTools = [
  {
    icon: Zap,
    title: "Batch Processor",
    description: "Process multiple files at once for efficient workflow management.",
    status: "Coming Soon",
  },
  {
    icon: Download,
    title: "API Access",
    description: "Integrate our tools directly into your applications and workflows.",
    status: "Beta",
  },
]

export default function ToolsPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            AI-Powered <span className="text-primary">Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional tools for content creators, marketers, and developers. Transform your media into powerful
            prompts and scripts with cutting-edge AI technology.
          </p>
        </div>
      </section>

      {/* Main Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {tools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={tool.href}>Try {tool.title}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
            <p className="text-muted-foreground mb-8">Jump directly to our most popular generators</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild size="lg">
                <Link href="/#video-script-generator">Video Script Generator</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#veo3-prompt-generator">Veo3 Prompt Generator</Link>
              </Button>
            </div>
          </div>

          {/* Upcoming Tools */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTools.map((tool, index) => (
                <Card key={index} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{tool.title}</CardTitle>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tool.status}</span>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Tools?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with the latest AI technology and designed for professional workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Process your content in seconds, not minutes. Our optimized AI models deliver results quickly without
                  compromising quality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade AI models trained on professional content to deliver broadcast-quality results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
                <p className="text-muted-foreground">
                  Export in various formats including JSON, SRT, TXT, and more to fit your workflow needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
