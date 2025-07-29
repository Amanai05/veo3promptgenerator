import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Brain, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Media",
    description: "Simply drag and drop your images or videos, or click to browse and select files from your device.",
    step: "01",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your content, understanding context, objects, scenes, and emotions.",
    step: "02",
  },
  {
    icon: Download,
    title: "Get Your Prompts",
    description: "Receive detailed prompts in multiple formats - JSON for developers, paragraphs for creators.",
    step: "03",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your media into powerful prompts in just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2" />

          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20"
            >
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors mx-auto">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
