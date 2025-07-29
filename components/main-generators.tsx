"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Character {
  id: string
  name: string
  description: string
  voice: string
}

export function MainGenerators() {
  const [activeTab, setActiveTab] = useState("video-script")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const { toast } = useToast()

  // Video Script Generator State
  const [scriptData, setScriptData] = useState({
    videoTopic: "",
    audience: "",
    scriptLength: "",
    scriptStyle: "",
    language: "vietnamese",
  })

  // Veo3 Prompt Generator State
  const [promptMode, setPromptMode] = useState("structured")
  const [context, setContext] = useState("")
  const [characters, setCharacters] = useState<Character[]>([{ id: "1", name: "", description: "", voice: "" }])

  const audiences = [
    { value: "general", label: "General Audience" },
    { value: "teens", label: "Teenagers (13-19)" },
    { value: "young-adults", label: "Young Adults (20-35)" },
    { value: "professionals", label: "Professionals" },
    { value: "parents", label: "Parents" },
    { value: "seniors", label: "Seniors (55+)" },
  ]

  const scriptLengths = [
    { value: "15-30s", label: "15-30 seconds" },
    { value: "30-60s", label: "30-60 seconds" },
    { value: "1-2min", label: "1-2 minutes" },
    { value: "2-5min", label: "2-5 minutes" },
    { value: "5-10min", label: "5-10 minutes" },
  ]

  const scriptStyles = [
    { value: "conversational", label: "Conversational" },
    { value: "professional", label: "Professional" },
    { value: "energetic", label: "Energetic" },
    { value: "educational", label: "Educational" },
    { value: "storytelling", label: "Storytelling" },
    { value: "promotional", label: "Promotional" },
  ]

  const languages = [
    { value: "vietnamese", label: "Vietnamese" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
  ]

  const addCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "",
      description: "",
      voice: "",
    }
    setCharacters([...characters, newCharacter])
  }

  const removeCharacter = (id: string) => {
    if (characters.length > 1) {
      setCharacters(characters.filter((char) => char.id !== id))
    }
  }

  const updateCharacter = (id: string, field: keyof Character, value: string) => {
    setCharacters(characters.map((char) => (char.id === id ? { ...char, [field]: value } : char)))
  }

  const generateVideoScript = async () => {
    if (!scriptData.videoTopic.trim() || !scriptData.audience || !scriptData.scriptLength || !scriptData.scriptStyle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const response = await fetch("/api/generate-video-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scriptData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to generate script")

      setGeneratedContent(data.script)
      toast({
        title: "Script generated successfully!",
        description: "Your video script is ready.",
      })
    } catch (error) {
      console.error("Error generating script:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateVeo3Prompt = async () => {
    if (!context.trim()) {
      toast({
        title: "Missing Context",
        description: "Please provide context for your video.",
        variant: "destructive",
      })
      return
    }

    // Map the old structure to new API format
    const formData = {
      mainSubject: context.trim(),
      sceneAction: context.trim(), // Using context for both since this component doesn't have separate scene action
      dialogue: characters.map(char => 
        char.voice ? `${char.name}: ${char.voice}` : char.name
      ).filter(Boolean).join("; "),
      cameraMovement: undefined,
      otherDetails: characters.map(char => 
        char.description ? `${char.name} - ${char.description}` : char.name
      ).filter(Boolean).join("; "),
      subtitles: undefined
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const response = await fetch("/api/generate-veo3-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to generate prompt")

              console.log("API Response:", data) // Debug log

        // Handle both old and new response formats
        let prompt = "No prompt generated"

        if (data.jsonPrompt && data.paragraphPrompt) {
          // New dual format - store separately for dual-box display
          prompt = `JSON:${data.jsonPrompt}|||PARAGRAPH:${data.paragraphPrompt}`
        } else if (data.jsonPrompt) {
          prompt = data.jsonPrompt
        } else if (data.prompt) {
          prompt = data.prompt
        }

        setGeneratedContent(prompt)
      
      toast({
        title: "Prompt generated successfully!",
        description: "Your Veo3 prompt is ready.",
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
    <section id="main-generators" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Veo3 Prompt Generation Tool</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            A prompt generation tool for writing scripts for Google's AI Veo 3, which provides context, characters'
            voices, and dialogue in the native language, and produces a standardized prompt in English
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="video-script" className="text-base">
                Video Script Generator
              </TabsTrigger>
              <TabsTrigger
                value="veo3-prompt"
                className="text-base bg-blue-100 text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Veo3 Prompt Generation
              </TabsTrigger>
            </TabsList>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Link href="/video-script-generator">
                <Button variant="outline">Video Script Generator</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Veo3 Prompt Generator</Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("video-to-prompt")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Video to Prompt
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("transcription")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Transcription
              </Button>
            </div>

            {/* Video Script Generator */}
            <TabsContent value="video-script">
              <Card>
                <CardHeader>
                  <CardTitle>Video Script Generator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Video Topic & Main Characters (Describe in 1-2 sentences)
                    </label>
                    <Textarea
                      value={scriptData.videoTopic}
                      onChange={(e) => setScriptData((prev) => ({ ...prev, videoTopic: e.target.value }))}
                      placeholder="Example: New product advertisement, product introduction, product usage guide,... Characters: Example: Baby Bi, Mr. A, Mrs. B,..."
                      className="min-h-[120px] resize-none"
                      maxLength={500}
                    />
                    <div className="text-xs text-muted-foreground text-right">{scriptData.videoTopic.length}/500</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Who is your audience?</label>
                      <Select
                        value={scriptData.audience}
                        onValueChange={(value) => setScriptData((prev) => ({ ...prev, audience: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map((audience) => (
                            <SelectItem key={audience.value} value={audience.value}>
                              {audience.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Script Length</label>
                      <Select
                        value={scriptData.scriptLength}
                        onValueChange={(value) => setScriptData((prev) => ({ ...prev, scriptLength: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          {scriptLengths.map((length) => (
                            <SelectItem key={length.value} value={length.value}>
                              {length.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Script Style</label>
                      <Select
                        value={scriptData.scriptStyle}
                        onValueChange={(value) => setScriptData((prev) => ({ ...prev, scriptStyle: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          {scriptStyles.map((style) => (
                            <SelectItem key={style.value} value={style.value}>
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Language</label>
                      <Select
                        value={scriptData.language}
                        onValueChange={(value) => setScriptData((prev) => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={generateVideoScript}
                    disabled={isGenerating}
                    className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generator →"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Veo3 Prompt Generator */}
            <TabsContent value="veo3-prompt">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Context:</label>
                      <Button variant="outline" size="sm">
                        Clear
                      </Button>
                    </div>
                    <div className="relative">
                      <Textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Example: On a misty morning, at a small roadside café in Ho Chi Minh City..."
                        className="min-h-[120px] resize-none pr-20"
                        maxLength={1000}
                      />
                      <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-transparent">
                        ✏️ Suggest
                      </Button>
                    </div>
                  </div>

                  <Button onClick={addCharacter} className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200">
                    Thêm Nhân vật Trong Video
                  </Button>

                  {/* Characters */}
                  {characters.map((character, index) => (
                    <Card key={character.id} className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Nhân vật {index + 1}</h3>
                        {characters.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCharacter(character.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Xóa Nhân vật
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Character Name</label>
                          <Input
                            value={character.name}
                            onChange={(e) => updateCharacter(character.id, "name", e.target.value)}
                            placeholder="Example: John, Anna, The Storyteller..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Character Description</label>
                          <Textarea
                            value={character.description}
                            onChange={(e) => updateCharacter(character.id, "description", e.target.value)}
                            placeholder="Example: A woman in her 30s, with brown hair like waves..."
                            className="min-h-[80px] resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Character Voice</label>
                          <Textarea
                            value={character.voice}
                            onChange={(e) => updateCharacter(character.id, "voice", e.target.value)}
                            placeholder="Example: A soft, gentle voice, with a slightly sad tone, but full of hope..."
                            className="min-h-[80px] resize-none"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Button
                    onClick={generateVeo3Prompt}
                    disabled={isGenerating}
                    className="w-full h-12 text-base font-medium bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Video className="h-5 w-5 mr-2" />
                        Generate Video Prompt
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Generated Content Output */}
          {generatedContent && (
            <div className="mt-6 space-y-4">
              {/* JSON Format Box */}
              {generatedContent.includes('JSON:') && (
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
                          const jsonContent = generatedContent.split('JSON:')[1]?.split('|||')[0] || ''
                          await navigator.clipboard.writeText(jsonContent)
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
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                        {generatedContent.split('JSON:')[1]?.split('|||')[0] || ''}
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Use this structured format for technical AI processing and API integrations.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Paragraph Format Box */}
              {generatedContent.includes('PARAGRAPH:') && (
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
                          const paragraphContent = generatedContent.split('PARAGRAPH:')[1] || ''
                          await navigator.clipboard.writeText(paragraphContent)
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
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-800 dark:text-gray-200">
                        {generatedContent.split('PARAGRAPH:')[1] || ''}
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Use this narrative format for creative AI processing and storytelling.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Fallback for old format */}
              {!generatedContent.includes('JSON:') && !generatedContent.includes('PARAGRAPH:') && (
                <Card>
                  <CardHeader>
                    <CardTitle>Generated {activeTab === "video-script" ? "Script" : "Prompt"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-800 dark:text-gray-200">{generatedContent}</pre>
                    </div>
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
