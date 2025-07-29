"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Plus, X, Loader2, Camera, MessageSquare, Sparkles, Zap, Target, Users, Globe, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Character {
  id: string
  name: string
  description: string
  voice: string
  dialogue: string
}

export function MainHero() {
  const [activeTab, setActiveTab] = useState("veo3-prompt")
  const [context, setContext] = useState("")
  const [sound, setSound] = useState("")
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "",
      description: "",
      voice: "",
      dialogue: "",
    },
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [advancedPrompt, setAdvancedPrompt] = useState("")
  const { toast } = useToast()

  const addCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "",
      description: "",
      voice: "",
      dialogue: "",
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

  const clearAll = () => {
    setContext("")
    setSound("")
    setCharacters([{
      id: "1",
      name: "",
      description: "",
      voice: "",
      dialogue: "",
    }])
    setGeneratedPrompt("")
    setAdvancedPrompt("")
  }

  const generatePrompt = async () => {
    if (isAdvancedMode) {
      if (!advancedPrompt.trim()) {
        toast({
          title: "Missing Description",
          description: "Please describe the video you want to create.",
          variant: "destructive",
        })
        return
      }
    } else {
      if (!context.trim()) {
        toast({
          title: "Missing Context",
          description: "Please provide context for your video.",
          variant: "destructive",
        })
        return
      }
    }

    setIsGenerating(true)
    setGeneratedPrompt("")

    try {
      const response = await fetch("/api/generate-veo3-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: isAdvancedMode ? advancedPrompt : context,
          characters: isAdvancedMode ? [] : characters,
          sound: isAdvancedMode ? "" : sound
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to generate prompt")

      setGeneratedPrompt(data.prompt)
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

  const clearContext = () => setContext("")
  const clearAdvancedPrompt = () => setAdvancedPrompt("")

  return (
    <section className="py-3 xs:py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] mx-auto">
          {/* Headline with Accent Color */}
          <h1 className="text-center text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 px-2">
            Veo3 Prompt Generator <span className="text-purple-600">Free Online</span>
          </h1>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base px-3 xs:px-4">
            A prompt generation tool for writing scripts for Google's AI Veo 3, which provides context, characters' voices, and dialogue in the native language, and produces a standardized prompt in English
          </p>

          {/* Navigation Tabs - Responsive Grid */}
          <div className="flex justify-center mb-4 xs:mb-6 px-3 xs:px-4">
            {/* Mobile: Stack vertically, Tablet+: 2x2 grid */}
            <div className="w-full max-w-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
                <Button className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium bg-purple-600 hover:bg-purple-700 text-white truncate">
                  Veo3 Prompt Generator
                </Button>
                <Link href="/video-script-generator" className="w-full">
                  <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 truncate">
                    Video Script Generator
                  </Button>
                </Link>
                <Link href="/video-to-prompt" className="w-full">
                  <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 truncate">
                    Video to Prompt Generator
                  </Button>
                </Link>
                <Link href="/transcription" className="w-full">
                  <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-200 truncate">
                    Video Transcription
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Advanced Mode Toggle */}
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-4 xs:mb-6 px-3 xs:px-4">
            <span className="text-xs xs:text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Standard Mode</span>
            <Switch
              checked={isAdvancedMode}
              onCheckedChange={setIsAdvancedMode}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className="text-xs xs:text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 xs:gap-2">
              <MessageSquare className="h-3 w-3 xs:h-4 xs:w-4" />
              <span className="hidden xs:inline">Advanced LLM Prompting</span>
              <span className="xs:hidden">Advanced</span>
            </span>
          </div>

          {/* Main Form Card */}
          <Card className="shadow-lg bg-white dark:bg-gray-800 mx-3 xs:mx-4 sm:mx-0">
            <CardContent className="p-3 xs:p-4 sm:p-6">
              {isAdvancedMode ? (
                /* Advanced Chat Mode Interface */
                <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                  {/* Instruction Box */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2 xs:p-3 sm:p-4">
                    <p className="text-xs xs:text-sm text-blue-800 dark:text-blue-200">
                      Please describe your idea clearly, specify the required video dimensions, and accurately define your target audience. 
                      Example: An astronaut embarking on an exploratory mission to the moon, vertical video for TikTok targeting space and celestial body enthusiasts
                    </p>
                  </div>

                  {/* Large Text Area */}
                  <div>
                    <Textarea
                      value={advancedPrompt}
                      onChange={(e) => setAdvancedPrompt(e.target.value)}
                      placeholder="Describe the video you want to create..."
                      className="min-h-[120px] xs:min-h-[150px] sm:min-h-[200px] resize-none text-xs xs:text-sm sm:text-base"
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {advancedPrompt.length}/1000 characters
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAdvancedPrompt}
                        className="text-xs h-7 xs:h-8 px-2 xs:px-3"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={generatePrompt}
                    disabled={isGenerating || !advancedPrompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Camera className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2" />
                        Generate Video Prompt
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                /* Standard Mode Interface */
                <>
                  {/* Context Section */}
                  <div className="mb-3 xs:mb-4 sm:mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs xs:text-sm sm:text-base font-bold">Context:</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearContext}
                        className="text-xs h-7 xs:h-8 px-2 xs:px-3"
                      >
                        Clear
                      </Button>
                    </div>
                    <Textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Example: On a misty morning, at a small roadside café in Ho Chi Minh City..."
                      className="min-h-[60px] xs:min-h-[80px] resize-none text-xs xs:text-sm sm:text-base"
                    />
                  </div>

                  {/* Characters Section */}
                  <div className="mb-3 xs:mb-4 sm:mb-6">
                    {characters.map((character, index) => (
                      <div key={character.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-2 xs:p-3 sm:p-4 mb-2 xs:mb-3 sm:mb-4">
                        <div className="flex justify-between items-center mb-2 xs:mb-3">
                          <h3 className="font-bold text-xs xs:text-sm sm:text-base">Character {index + 1}</h3>
                          {characters.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCharacter(character.id)}
                              className="text-red-600 hover:text-red-700 text-xs h-7 xs:h-8 px-2 xs:px-3"
                            >
                              <X className="h-3 w-3 mr-1" />
                              <span className="hidden xs:inline">Remove Character</span>
                              <span className="xs:hidden">Remove</span>
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                          {/* Character Name */}
                          <div>
                            <label className="text-xs font-bold mb-1 block">Character Name</label>
                            <input
                              type="text"
                              value={character.name}
                              onChange={(e) => updateCharacter(character.id, "name", e.target.value)}
                              placeholder="Example: John, Anna, The Storyteller..."
                              className="w-full px-2 xs:px-3 py-1 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs xs:text-sm sm:text-base bg-white dark:bg-gray-700"
                            />
                          </div>

                          {/* Character Description */}
                          <div>
                            <label className="text-xs font-bold mb-1 block">Character Description</label>
                            <Textarea
                              value={character.description}
                              onChange={(e) => updateCharacter(character.id, "description", e.target.value)}
                              placeholder="Example: A woman in her 30s, with brown hair like waves..."
                              className="min-h-[50px] xs:min-h-[60px] resize-none text-xs xs:text-sm sm:text-base"
                            />
                          </div>

                          {/* Character Voice */}
                          <div>
                            <label className="text-xs font-bold mb-1 block">Character Voice</label>
                            <Textarea
                              value={character.voice}
                              onChange={(e) => updateCharacter(character.id, "voice", e.target.value)}
                              placeholder="Example: A soft, gentle voice, with a slightly sad tone, but full of hope..."
                              className="min-h-[50px] xs:min-h-[60px] resize-none text-xs xs:text-sm sm:text-base"
                            />
                          </div>

                          {/* Dialogue */}
                          <div>
                            <label className="text-xs font-bold mb-1 block">Dialogue</label>
                            <Textarea
                              value={character.dialogue}
                              onChange={(e) => updateCharacter(character.id, "dialogue", e.target.value)}
                              placeholder="Example: Life goes on, no matter what happens..."
                              className="min-h-[50px] xs:min-h-[60px] resize-none text-xs xs:text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Character Button */}
                    <div className="text-center mb-3 xs:mb-4 sm:mb-6">
                      <Button
                        onClick={addCharacter}
                        variant="outline"
                        className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 h-8 xs:h-10 sm:h-12 px-3 xs:px-4 sm:px-6"
                      >
                        <Plus className="h-3 w-3 xs:h-4 xs:w-4 mr-1 xs:mr-2" />
                        <span className="text-xs xs:text-sm sm:text-base">Add Character to Video</span>
                      </Button>
                    </div>
                  </div>

                  {/* Sound Section */}
                  <div className="mb-4 xs:mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs xs:text-sm sm:text-base font-bold">Sound:</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSound("")}
                        className="text-xs h-7 xs:h-8 px-2 xs:px-3"
                      >
                        Clear
                      </Button>
                    </div>
                    <Textarea
                      value={sound}
                      onChange={(e) => setSound(e.target.value)}
                      placeholder="Example: The sound of chirping birds, a gentle breeze, distant city hum..."
                      className="min-h-[60px] xs:min-h-[80px] resize-none text-xs xs:text-sm sm:text-base"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 xs:gap-3">
                    <Button
                      onClick={generatePrompt}
                      disabled={isGenerating}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Video VEO3 Prompt"
                      )}
                    </Button>
                    <Button
                      onClick={clearAll}
                      variant="outline"
                      className="h-10 xs:h-12 sm:h-14 px-4 xs:px-6 text-xs xs:text-sm sm:text-base"
                      disabled={isGenerating || (!context && !sound && characters.length === 1 && !characters[0].name && !characters[0].description && !characters[0].voice && !characters[0].dialogue && !generatedPrompt)}
                    >
                      Reset
                    </Button>
                  </div>
                </>
              )}

              {/* Result Container */}
              {generatedPrompt && (
                <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-bold mb-2 text-xs xs:text-sm sm:text-base">Generated Prompt:</h4>
                  <pre className="whitespace-pre-wrap text-xs xs:text-sm sm:text-base overflow-x-auto">{generatedPrompt}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
