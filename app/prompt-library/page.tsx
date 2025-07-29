"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

const promptExamples = [
  {
    title: "Cinematic Portrait",
    category: "Portrait",
    prompt:
      "Close-up portrait of a person with dramatic lighting, shallow depth of field, cinematic color grading, professional photography style, 4K resolution",
    tags: ["Portrait", "Cinematic", "Professional"],
  },
  {
    title: "Nature Landscape",
    category: "Nature",
    prompt:
      "Wide shot of a serene mountain landscape at golden hour, misty valleys, warm lighting, peaceful atmosphere, drone photography perspective",
    tags: ["Landscape", "Nature", "Golden Hour"],
  },
  {
    title: "Product Showcase",
    category: "Commercial",
    prompt:
      "360-degree rotation of a modern smartphone on white background, studio lighting, clean minimalist style, highlighting premium materials and design",
    tags: ["Product", "Commercial", "Clean"],
  },
  {
    title: "Urban Street Scene",
    category: "Urban",
    prompt:
      "Busy city street during rush hour, people walking, cars passing, urban energy, street photography style, natural lighting, documentary feel",
    tags: ["Urban", "Street", "Documentary"],
  },
]

export default function PromptLibraryPage() {
  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Prompt Library</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover professionally crafted prompts for various video styles and use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promptExamples.map((example, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <Badge variant="secondary">{example.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">{example.prompt}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => copyPrompt(example.prompt)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="bg-primary/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create Your Own Prompts</h2>
          <p className="text-muted-foreground mb-6">
            Use our AI-powered generator to create custom prompts tailored to your specific needs.
          </p>
          <Button asChild size="lg">
            <a href="/#generator">Generate Custom Prompts</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
