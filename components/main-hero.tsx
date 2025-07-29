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
          description: "Please fill in the Context field at the top of the form. This describes your video scene.",
          variant: "destructive",
        })
        return
      }
    }

    setIsGenerating(true)
    setGeneratedPrompt("")

    try {
      // Map the old structure to new API format
      const formData = {
        mainSubject: isAdvancedMode ? advancedPrompt : context,
        sceneAction: isAdvancedMode ? advancedPrompt : context,
        dialogue: isAdvancedMode ? "" : characters.map(char => 
          char.dialogue ? `${char.name}: ${char.dialogue}` : char.voice ? `${char.name}: ${char.voice}` : char.name
        ).filter(Boolean).join("; "),
        cameraMovement: undefined,
        otherDetails: isAdvancedMode ? "" : characters.map(char => 
          char.description ? `${char.name} - ${char.description}` : char.name
        ).filter(Boolean).join("; ") + (sound ? ` | Sound: ${sound}` : ""),
        subtitles: undefined
      }

      console.log("📤 Sending Form Data:", JSON.stringify(formData, null, 2)) // Debug log

      // DUAL METHOD: Generate JSON and Paragraph separately
      console.log("🔄 Step 1: Generating JSON prompt...")
      const jsonResponse = await fetch("/api/generate-veo3-prompt-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const jsonData = await jsonResponse.json()
      if (!jsonResponse.ok) throw new Error(jsonData.error || "Failed to generate JSON prompt")
      console.log("✅ JSON Response:", jsonData.jsonPrompt)

      console.log("🔄 Step 2: Generating Paragraph prompt...")
      const paragraphResponse = await fetch("/api/generate-veo3-prompt-paragraph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const paragraphData = await paragraphResponse.json()
      if (!paragraphResponse.ok) throw new Error(paragraphData.error || "Failed to generate paragraph prompt")
      console.log("✅ Paragraph Response:", paragraphData.paragraphPrompt)

      // Store both formats separately
      setGeneratedPrompt(`JSON:${jsonData.jsonPrompt}|||PARAGRAPH:${paragraphData.paragraphPrompt}`)
      
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
    <section className="py-8 xs:py-10 sm:py-12 lg:py-16">
      <div className="max-w-[720px] mx-auto px-2 xs:px-3 sm:px-4">
        {/* Headline with Accent Color */}
        <h1 className="text-center text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 px-1">
          Veo3 Prompt Generator <span className="text-purple-600">Free Online</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-sm xs:text-base px-2">
          A prompt generation tool for writing scripts for Google's AI Veo 3, which provides context, characters' voices, and dialogue in the native language, and produces a standardized prompt in English
        </p>

        {/* Navigation Tabs */}
        <div className="mb-6 xs:mb-8 px-1">
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
              <Button className="w-full h-10 xs:h-12 text-sm xs:text-base font-medium bg-purple-600 hover:bg-purple-700 text-white break-words">
                Veo3 Prompt Generator
              </Button>
              <Link href="/video-script-generator" className="w-full">
                <Button variant="outline" className="w-full h-10 xs:h-12 text-sm xs:text-base font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 break-words">
                  Video Script Generator
                </Button>
              </Link>
              <Link href="/video-to-prompt" className="w-full">
                <Button variant="outline" className="w-full h-10 xs:h-12 text-sm xs:text-base font-medium hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 break-words">
                  Video to Prompt Generator
                </Button>
              </Link>
              <Link href="/transcription" className="w-full">
                <Button variant="outline" className="w-full h-10 xs:h-12 text-sm xs:text-base font-medium hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-200 break-words">
                  Video Transcription
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Advanced Mode Toggle */}
        <div className="flex items-center justify-center gap-2 xs:gap-3 mb-4 xs:mb-6 px-2">
          <span className="text-sm xs:text-base font-medium text-gray-700 dark:text-gray-300">Standard Mode</span>
          <Switch
            checked={isAdvancedMode}
            onCheckedChange={setIsAdvancedMode}
            className="data-[state=checked]:bg-purple-600"
          />
          <span className="text-sm xs:text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 xs:gap-2">
            <MessageSquare className="h-3 w-3 xs:h-4 xs:w-4" />
            <span className="hidden xs:inline">Advanced LLM Prompting</span>
            <span className="xs:hidden">Advanced</span>
          </span>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5 sm:p-6">
            {isAdvancedMode ? (
              /* Advanced Chat Mode Interface */
              <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                {/* Instruction Box */}
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 xs:p-4">
                  <p className="text-sm xs:text-base text-blue-800 dark:text-blue-200">
                    Please describe your idea clearly, specify the required video dimensions, and accurately define your target audience. 
                    Example: An astronaut embarking on an exploratory mission to the moon, vertical video for TikTok targeting space and celestial body enthusiasts
                  </p>
                </div>

                {/* Advanced Prompt Input */}
                <div>
                  <Textarea
                    value={advancedPrompt}
                    onChange={(e) => setAdvancedPrompt(e.target.value)}
                    placeholder="Describe the video you want to create..."
                    className="min-h-[120px] xs:min-h-[150px] sm:min-h-[200px] resize-none text-sm xs:text-base"
                    maxLength={1000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {advancedPrompt.length}/1000 characters
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAdvancedPrompt}
                      className="text-sm h-8 px-3"
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generatePrompt}
                  disabled={isGenerating || !advancedPrompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-10 xs:h-12 text-sm xs:text-base font-medium rounded-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Prompt...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Advanced Prompt
                    </>
                  )}
                </Button>
              </div>
            ) : (
              /* Standard Mode Interface */
              <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                {/* Context Input */}
                <div className="mb-3 xs:mb-4 sm:mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm xs:text-base font-bold text-red-600 flex items-center gap-2">
                      <span>🎬 Context: *Required</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">MUST FILL</span>
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearContext}
                      className="text-sm h-8 px-3"
                    >
                      Clear
                    </Button>
                  </div>
                  <Textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Example: On a misty morning, at a small roadside café in Ho Chi Minh City..."
                    className={`min-h-[60px] xs:min-h-[80px] resize-none text-sm xs:text-base rounded-lg border-2 ${
                      !context.trim() ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  />
                  {!context.trim() && (
                    <div className="text-sm text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded mt-2 flex items-center gap-2">
                      <span>🚨</span>
                      <span><strong>Context is required!</strong> Please describe your video scene in the field above.</span>
                    </div>
                  )}
                </div>

                {/* Characters Section */}
                <div className="mb-4 xs:mb-6">
                  <div className="flex justify-between items-center mb-3 xs:mb-4">
                    <h3 className="text-sm xs:text-base font-bold">Characters:</h3>
                    <Button
                      onClick={addCharacter}
                      variant="outline"
                      className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 h-8 xs:h-10 px-3 xs:px-4 rounded-lg"
                    >
                      <Plus className="h-3 w-3 xs:h-4 xs:w-4 mr-1 xs:mr-2" />
                      <span className="text-sm xs:text-base">Add Character</span>
                    </Button>
                  </div>

                  {characters.map((character, index) => (
                    <div key={character.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 xs:p-4 mb-3 xs:mb-4">
                      <div className="flex justify-between items-center mb-2 xs:mb-3">
                        <h3 className="font-bold text-sm xs:text-base">Character {index + 1}</h3>
                        {characters.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCharacter(character.id)}
                            className="text-red-600 hover:text-red-700 text-sm h-8 px-3"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3 xs:space-y-4">
                        {/* Character Name */}
                        <div>
                          <label className="text-sm font-bold mb-1 block">Character Name</label>
                          <input
                            type="text"
                            value={character.name}
                            onChange={(e) => updateCharacter(character.id, "name", e.target.value)}
                            placeholder="Example: John, Anna, The Storyteller..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm xs:text-base bg-white dark:bg-gray-700"
                          />
                        </div>

                        {/* Character Description */}
                        <div>
                          <label className="text-sm font-bold mb-1 block">Character Description</label>
                          <Textarea
                            value={character.description}
                            onChange={(e) => updateCharacter(character.id, "description", e.target.value)}
                            placeholder="Example: A woman in her 30s, with brown hair like waves..."
                            className="min-h-[60px] resize-none text-sm xs:text-base rounded-lg"
                          />
                        </div>

                        {/* Character Voice */}
                        <div>
                          <label className="text-sm font-bold mb-1 block">Character Voice</label>
                          <Textarea
                            value={character.voice}
                            onChange={(e) => updateCharacter(character.id, "voice", e.target.value)}
                            placeholder="Example: A soft, gentle voice, with a slightly sad tone, but full of hope..."
                            className="min-h-[60px] resize-none text-sm xs:text-base rounded-lg"
                          />
                        </div>

                        {/* Dialogue */}
                        <div>
                          <label className="text-sm font-bold mb-1 block">Dialogue</label>
                          <Textarea
                            value={character.dialogue}
                            onChange={(e) => updateCharacter(character.id, "dialogue", e.target.value)}
                            placeholder="Example: Life goes on, no matter what happens..."
                            className="min-h-[60px] resize-none text-sm xs:text-base rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sound Input */}
                <div className="mb-4 xs:mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm xs:text-base font-bold">Sound:</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSound("")}
                      className="text-sm h-8 px-3"
                    >
                      Clear
                    </Button>
                  </div>
                  <Textarea
                    value={sound}
                    onChange={(e) => setSound(e.target.value)}
                    placeholder="Example: The sound of chirping birds, a gentle breeze, distant city hum..."
                    className="min-h-[60px] xs:min-h-[80px] resize-none text-sm xs:text-base rounded-lg"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 xs:gap-4">
                  <Button
                    onClick={generatePrompt}
                    disabled={isGenerating}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-10 xs:h-12 text-sm xs:text-base font-medium rounded-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Prompt
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    className="h-10 xs:h-12 px-4 xs:px-6 text-sm xs:text-base rounded-lg"
                    disabled={isGenerating || (!context && !sound && characters.length === 1 && !characters[0].name && !characters[0].description && !characters[0].voice && !characters[0].dialogue && !generatedPrompt)}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}

            {/* Result Container */}
            {generatedPrompt && (
              <div className="mt-4 xs:mt-6 space-y-4">
                {/* JSON Format Box */}
                {generatedPrompt.includes('JSON:') && (
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        <span className="text-lg">📋</span>
                        JSON Format (Technical)
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const jsonContent = generatedPrompt.split('JSON:')[1]?.split('|||')[0] || ''
                          await navigator.clipboard.writeText(jsonContent)
                          toast({
                            title: "Copied!",
                            description: "JSON format copied to clipboard",
                          })
                        }}
                        className="text-xs h-8 px-3"
                      >
                        📋 Copy
                      </Button>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                        {generatedPrompt.split('JSON:')[1]?.split('|||')[0] || ''}
                      </pre>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Use this structured format for technical AI processing and API integrations.
                    </p>
                  </div>
                )}

                {/* Paragraph Format Box */}
                {generatedPrompt.includes('PARAGRAPH:') && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        <span className="text-lg">📝</span>
                        Paragraph Format (Creative)
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const paragraphContent = generatedPrompt.split('PARAGRAPH:')[1] || ''
                          await navigator.clipboard.writeText(paragraphContent)
                          toast({
                            title: "Copied!",
                            description: "Paragraph format copied to clipboard",
                          })
                        }}
                        className="text-xs h-8 px-3"
                      >
                        📋 Copy
                      </Button>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-800 dark:text-gray-200">
                        {generatedPrompt.split('PARAGRAPH:')[1] || ''}
                      </pre>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Use this narrative format for creative AI processing and storytelling.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
