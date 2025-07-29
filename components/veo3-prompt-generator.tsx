"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type Locale, getTranslation } from "@/lib/i18n"

interface Veo3PromptGeneratorProps {
  locale: Locale
}

export function Veo3PromptGenerator({ locale }: Veo3PromptGeneratorProps) {
  const [activeMode, setActiveMode] = useState("structured")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompts, setGeneratedPrompts] = useState<{
    jsonPrompt: string
    paragraphPrompt: string
    metadata?: any
  } | null>(null)
  const { toast } = useToast()

  // Structured Mode State
  const [structuredData, setStructuredData] = useState({
    mainSubject: "",
    sceneAction: "",
    dialogue: "",
    cameraMovement: "",
    otherDetails: "",
    subtitles: "",
  })

  // Chat Mode State
  const [chatInput, setChatInput] = useState("")

  const generateStructuredPrompt = async () => {
    if (!structuredData.mainSubject.trim() || !structuredData.sceneAction.trim()) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in the main subject and scene action fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedPrompts(null)

    try {
      const response = await fetch("/api/generate-veo3-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(structuredData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate prompt")
      }

      setGeneratedPrompts({
        jsonPrompt: data.jsonPrompt,
        paragraphPrompt: data.paragraphPrompt,
        metadata: data.metadata
      })

      toast({
        title: "AI Prompt Generated!",
        description: "Both JSON and paragraph formats are ready.",
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

  const generateChatPrompt = async () => {
    if (!chatInput.trim()) {
      toast({
        title: "Missing Input",
        description: "Please describe your video idea.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedPrompts(null)

    try {
      const response = await fetch("/api/generate-chat-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: chatInput }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate prompt")
      }

      setGeneratedPrompts({
        jsonPrompt: data.jsonPrompt,
        paragraphPrompt: data.paragraphPrompt,
        metadata: data.metadata
      })

      toast({
        title: "AI Prompt Generated!",
        description: "Both JSON and paragraph formats are ready.",
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

  return (
    <section id="veo3-prompt-generator" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Video className="h-6 w-6" />
                {getTranslation(locale, "veo3PromptGenerator")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="structured">{getTranslation(locale, "structuredMode")}</TabsTrigger>
                  <TabsTrigger value="chat">{getTranslation(locale, "chatMode")}</TabsTrigger>
                </TabsList>

                {/* Structured Mode */}
                <TabsContent value="structured" className="space-y-6">
                  {/* Main Subject - Required */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {getTranslation(locale, "mainSubject")}
                    </label>
                    <Input
                      value={structuredData.mainSubject}
                      onChange={(e) => setStructuredData((prev) => ({ ...prev, mainSubject: e.target.value }))}
                      placeholder={getTranslation(locale, "mainSubjectPlaceholder")}
                      className="border-red-200 focus:border-red-500"
                    />
                    <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      {getTranslation(locale, "mainSubjectRequired")}
                    </div>
                  </div>

                  {/* Scene Action - Required */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {getTranslation(locale, "sceneAction")}
                    </label>
                    <Input
                      value={structuredData.sceneAction}
                      onChange={(e) => setStructuredData((prev) => ({ ...prev, sceneAction: e.target.value }))}
                      placeholder={getTranslation(locale, "sceneActionPlaceholder")}
                      className="border-red-200 focus:border-red-500"
                    />
                    <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      {getTranslation(locale, "sceneActionRequired")}
                    </div>
                  </div>

                  {/* Dialogue - Optional */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      <em>{getTranslation(locale, "dialogue")}</em>{" "}
                      <span className="text-muted-foreground">{getTranslation(locale, "dialogueOptional")}</span>
                    </label>
                    <Input
                      value={structuredData.dialogue}
                      onChange={(e) => setStructuredData((prev) => ({ ...prev, dialogue: e.target.value }))}
                      placeholder={getTranslation(locale, "dialoguePlaceholder")}
                    />
                  </div>

                  {/* Camera Movement - Optional */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      <em>{getTranslation(locale, "cameraMovement")}</em>{" "}
                      <span className="text-muted-foreground">{getTranslation(locale, "cameraOptional")}</span>
                    </label>
                    <Input
                      value={structuredData.cameraMovement}
                      onChange={(e) => setStructuredData((prev) => ({ ...prev, cameraMovement: e.target.value }))}
                      placeholder={getTranslation(locale, "cameraPlaceholder")}
                    />
                  </div>

                  {/* Other Details - Optional */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      <em>{getTranslation(locale, "otherDetails")}</em>{" "}
                      <span className="text-muted-foreground">{getTranslation(locale, "otherDetailsOptional")}</span>
                    </label>
                    <Input
                      value={structuredData.otherDetails}
                      onChange={(e) => setStructuredData((prev) => ({ ...prev, otherDetails: e.target.value }))}
                      placeholder={getTranslation(locale, "otherDetailsPlaceholder")}
                    />
                  </div>

                  {/* Subtitles - Optional */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {getTranslation(locale, "subtitles")}{" "}
                      <span className="text-muted-foreground">{getTranslation(locale, "subtitlesOptional")}</span>
                    </label>
                    <div className="flex gap-4">
                      <Button
                        variant={structuredData.subtitles === "yes" ? "default" : "outline"}
                        onClick={() => setStructuredData((prev) => ({ ...prev, subtitles: "yes" }))}
                        className={structuredData.subtitles === "yes" ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {getTranslation(locale, "yes")}
                      </Button>
                      <Button
                        variant={structuredData.subtitles === "no" ? "default" : "outline"}
                        onClick={() => setStructuredData((prev) => ({ ...prev, subtitles: "no" }))}
                        className={structuredData.subtitles === "no" ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {getTranslation(locale, "no")}
                      </Button>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={generateStructuredPrompt}
                    disabled={isGenerating}
                    className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {getTranslation(locale, "loading")}
                      </>
                    ) : (
                      getTranslation(locale, "generate")
                    )}
                  </Button>
                </TabsContent>

                {/* Chat Mode */}
                <TabsContent value="chat" className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">{getTranslation(locale, "chatPrompt")}</p>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={getTranslation(locale, "chatPlaceholder")}
                      className="min-h-[200px] resize-none"
                      maxLength={1000}
                    />
                    <div className="text-xs text-muted-foreground text-right">{chatInput.length}/1000</div>
                  </div>

                  <Button
                    onClick={generateChatPrompt}
                    disabled={isGenerating}
                    className="w-full h-12 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {getTranslation(locale, "loading")}
                      </>
                    ) : (
                      <>
                        <Video className="h-5 w-5 mr-2" />
                        {getTranslation(locale, "generateVideoPrompt")}
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Generated Prompts Output */}
          {generatedPrompts && (
            <div className="mt-6 space-y-6">
              {/* JSON Format */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">📋</span>
                      JSON Format (Technical)
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(generatedPrompts.jsonPrompt)
                        toast({
                          title: "Copied!",
                          description: "JSON format copied to clipboard",
                        })
                      }}
                      className="text-xs"
                    >
                      📋 Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-gray-800">
                      {generatedPrompts.jsonPrompt}
                    </pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use this structured format for technical AI processing and API integrations.
                  </p>
                </CardContent>
              </Card>

              {/* Paragraph Format */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">📝</span>
                      Paragraph Format (Creative)
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(generatedPrompts.paragraphPrompt)
                        toast({
                          title: "Copied!",
                          description: "Paragraph format copied to clipboard",
                        })
                      }}
                      className="text-xs"
                    >
                      📋 Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-4 border">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-blue-900">
                      {generatedPrompts.paragraphPrompt}
                    </pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use this narrative format for creative AI processing and storytelling.
                  </p>
                </CardContent>
              </Card>

              {/* AI Status */}
              {generatedPrompts.metadata && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🤖</span>
                        <span className="text-green-800">
                          AI Powered by {generatedPrompts.metadata.model}
                        </span>
                      </div>
                      <div className="text-green-600">
                        {generatedPrompts.metadata.processingTime}ms
                      </div>
                    </div>
                    {generatedPrompts.metadata.fallbackUsed && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⚠️ Used fallback API for enhanced reliability
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
