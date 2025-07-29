"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Loader2, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PromptGenerator() {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [paragraphPrompt, setParagraphPrompt] = useState("")
  const [jsonPrompt, setJsonPrompt] = useState("")
  const { toast } = useToast()

  const generatePrompt = async () => {
    if (!input.trim()) return

    setIsGenerating(true)
    setParagraphPrompt("")
    setJsonPrompt("")

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate prompt")
      }

      setParagraphPrompt(data.paragraphPrompt)
      setJsonPrompt(data.jsonPrompt)

      toast({
        title: "Prompt generated successfully!",
        description: "Your video prompts are ready to use.",
      })
    } catch (error) {
      console.error("Error generating prompt:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate prompt. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${type} copied!`,
      description: "Content has been copied to your clipboard.",
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      generatePrompt()
    }
  }

  return (
    <section id="generator" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Generate Your Video Prompt</h2>
            <p className="text-muted-foreground">
              Describe your video idea and get professional prompts in both paragraph and JSON formats.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Describe Your Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="bg-primary/10 p-4 rounded-lg text-sm">
                    <p className="font-medium mb-2">Example:</p>
                    <p className="text-muted-foreground">
                      An astronaut embarking on an exploratory mission to the moon, vertical video for TikTok targeting
                      space and celestial body enthusiasts
                    </p>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe the video you want to create..."
                    className="min-h-[200px] resize-none"
                    maxLength={1000}
                  />
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{input.length}/1000</span>
                    <span className="text-xs">Ctrl+Enter to generate</span>
                  </div>
                </div>
                <Button onClick={generatePrompt} disabled={!input.trim() || isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Generate Video Prompt
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <div className="space-y-6">
              {/* Paragraph Prompt */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    Paragraph Prompt
                    {paragraphPrompt && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(paragraphPrompt, "Paragraph prompt")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <Textarea
                      value={paragraphPrompt}
                      readOnly
                      className="min-h-[150px] resize-none bg-muted/50"
                      placeholder="Paragraph format prompt will appear here..."
                    />
                  )}
                </CardContent>
              </Card>

              {/* JSON Prompt */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    JSON Prompt
                    {jsonPrompt && (
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(jsonPrompt, "JSON prompt")}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <Textarea
                      value={jsonPrompt}
                      readOnly
                      className="min-h-[150px] resize-none bg-muted/50 font-mono text-sm"
                      placeholder="JSON format prompt will appear here..."
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
