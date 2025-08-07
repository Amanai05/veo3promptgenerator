"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Camera, FileText, Type, Info, Video, Loader2, Brain, Copy, Check, Settings, History } from "lucide-react"
import { ToolNavigation } from "@/components/tool-navigation"
import { ToastNotification } from "@/components/ui/toast-notification"
import { useToastNotification } from "@/hooks/use-toast-notification"
import { PromptHistory, addPromptToHistoryGlobal } from "@/components/prompt-history"

export default function Veo3PromptGeneratorPage() {
  const [activeMode, setActiveMode] = useState("chat")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompts, setGeneratedPrompts] = useState<{
    jsonPrompt: string
    paragraphPrompt: string
    metadata?: any
  } | null>(null)
  const { toast } = useToast()
  const { showToast, showToastAfterSuccess, closeToast } = useToastNotification()

  // Output options state
  const [outputOptions, setOutputOptions] = useState({
    jsonPrompt: false,
    paragraphPrompt: true,
    subtitles: "no", // "yes" or "no"
    dialogue: "yes" // "yes", "ai", or "no"
  })

  // Advanced Mode State
  const [advancedData, setAdvancedData] = useState({
    mainSubject: "",
    sceneAction: "",
    cameraMovement: "",
    otherDetails: "",
    subtitles: "no",
    targetAudience: "",
    videoStyle: "Cinematic",
    durationPreference: "8 seconds",
    lightingStyle: "",
    colorPalette: "",
    audioElements: "",
    specialEffects: ""
  })

  // Chat Mode State
  const [chatInput, setChatInput] = useState("")

  // Teaser prompts state
  const [currentTeaserIndex, setCurrentTeaserIndex] = useState(0)
  const teaserPrompts = [
    "We're pulling magic from the cloud…",
    "Consulting the prompt oracle…",
    "Cooking something magical",
    "Creating something you love just a sec. please"
  ]

  // Function to play notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/sounds/toastnotifications.wav')
      audio.volume = 0.5
      audio.play().catch(error => {
        console.log('Audio autoplay blocked or failed:', error)
      })
    } catch (error) {
      console.log('Failed to play notification sound:', error)
    }
  }

  // Cycle through teaser prompts when generating
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentTeaserIndex((prev) => (prev + 1) % teaserPrompts.length)
      }, 3000) // Change every 3 seconds
      
      return () => clearInterval(interval)
    }
  }, [isGenerating, teaserPrompts.length])

  const generateChatPrompt = async () => {
    if (!chatInput.trim()) {
      toast({
        title: "Missing Input",
        description: "Please describe your video idea.",
        variant: "destructive",
      })
      return
    }

    // Check if at least one output type is selected
    if (!outputOptions.jsonPrompt && !outputOptions.paragraphPrompt) {
      toast({
        title: "No Output Selected",
        description: "Please select at least one output format (JSON or Paragraph).",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedPrompts(null)

    try {
      const results: any = {}
      let totalProcessingTime = 0
      let usedModel = "unknown"

      // Generate JSON prompt ONLY if selected
      if (outputOptions.jsonPrompt) {
        console.log("Generating JSON prompt...")
        const jsonResponse = await fetch("/api/simple-veo3-prompt/json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            input: chatInput,
            dialogueSetting: outputOptions.dialogue
          }),
        })

        const jsonData = await jsonResponse.json()

        if (!jsonResponse.ok) {
          throw new Error(jsonData.error || "Failed to generate JSON prompt")
        }

        results.jsonPrompt = jsonData.jsonPrompt
        results.jsonMetadata = jsonData.metadata
        totalProcessingTime += jsonData.metadata?.processingTime || 0
        usedModel = jsonData.metadata?.model || "unknown"
      }

      // Generate paragraph prompt ONLY if selected
      if (outputOptions.paragraphPrompt) {
        console.log("Generating paragraph prompt...")
        const paragraphResponse = await fetch("/api/simple-veo3-prompt/paragraph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ 
            input: chatInput,
            dialogueSetting: outputOptions.dialogue
          }),
        })

        const paragraphData = await paragraphResponse.json()

        if (!paragraphResponse.ok) {
          throw new Error(paragraphData.error || "Failed to generate paragraph prompt")
        }

        results.paragraphPrompt = paragraphData.paragraphPrompt
        results.paragraphMetadata = paragraphData.metadata
        totalProcessingTime += paragraphData.metadata?.processingTime || 0
        usedModel = paragraphData.metadata?.model || usedModel
      }

      setGeneratedPrompts({
        jsonPrompt: results.jsonPrompt || "",
        paragraphPrompt: results.paragraphPrompt || "",
        metadata: {
          model: usedModel,
          processingTime: totalProcessingTime,
          mode: "chat",
          outputsGenerated: {
            json: outputOptions.jsonPrompt,
            paragraph: outputOptions.paragraphPrompt
          }
        }
      })

      // Save to prompt history
      const promptToSave = outputOptions.paragraphPrompt 
        ? results.paragraphPrompt 
        : results.jsonPrompt || chatInput
      
      addPromptToHistoryGlobal(
        promptToSave,
        "chat",
        "veo3-prompt",
        {
          json: outputOptions.jsonPrompt,
          paragraph: outputOptions.paragraphPrompt
        }
      )

      const outputTypes = []
      if (outputOptions.jsonPrompt) outputTypes.push("JSON")
      if (outputOptions.paragraphPrompt) outputTypes.push("Paragraph")

      // Play notification sound when prompt is generated successfully
      playNotificationSound()

      toast({
        title: "AI Prompt Generated!",
        description: `${outputTypes.join(" & ")} format${outputTypes.length > 1 ? 's' : ''} ready.`,
      })
      
      // Show bookmark toast notification
      showToastAfterSuccess()
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

  const generateAdvancedPrompt = async () => {
    if (!advancedData.mainSubject.trim() || !advancedData.sceneAction.trim()) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in the main subject and scene action fields.",
        variant: "destructive",
      })
      return
    }

    // Check if at least one output type is selected
    if (!outputOptions.jsonPrompt && !outputOptions.paragraphPrompt) {
      toast({
        title: "No Output Selected",
        description: "Please select at least one output format (JSON or Paragraph).",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedPrompts(null)

    try {
      const results: any = {}
      let totalProcessingTime = 0
      let usedModel = "unknown"

      // Generate JSON prompt ONLY if selected
      if (outputOptions.jsonPrompt) {
        console.log("Generating Advanced JSON prompt...")
        const jsonResponse = await fetch("/api/advanced-veo3-prompt/json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            formData: advancedData,
            dialogueSetting: outputOptions.dialogue
          }),
        })

        const jsonData = await jsonResponse.json()

        if (!jsonResponse.ok) {
          throw new Error(jsonData.error || "Failed to generate Advanced JSON prompt")
        }

        results.jsonPrompt = jsonData.jsonPrompt
        results.jsonMetadata = jsonData.metadata
        totalProcessingTime += jsonData.metadata?.processingTime || 0
        usedModel = jsonData.metadata?.model || "unknown"
      }

      // Generate paragraph prompt ONLY if selected
      if (outputOptions.paragraphPrompt) {
        console.log("Generating Advanced paragraph prompt...")
        const paragraphResponse = await fetch("/api/advanced-veo3-prompt/paragraph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ 
            formData: advancedData,
            dialogueSetting: outputOptions.dialogue
          }),
        })

        const paragraphData = await paragraphResponse.json()

        if (!paragraphResponse.ok) {
          throw new Error(paragraphData.error || "Failed to generate Advanced paragraph prompt")
        }

        results.paragraphPrompt = paragraphData.paragraphPrompt
        results.paragraphMetadata = paragraphData.metadata
        totalProcessingTime += paragraphData.metadata?.processingTime || 0
        usedModel = paragraphData.metadata?.model || usedModel
      }

      setGeneratedPrompts({
        jsonPrompt: results.jsonPrompt || "",
        paragraphPrompt: results.paragraphPrompt || "",
        metadata: {
          model: usedModel,
          processingTime: totalProcessingTime,
          mode: "advanced",
          outputsGenerated: {
            json: outputOptions.jsonPrompt,
            paragraph: outputOptions.paragraphPrompt
          }
        }
      })

      // Save to prompt history
      const promptToSave = outputOptions.paragraphPrompt 
        ? results.paragraphPrompt 
        : results.jsonPrompt || `${advancedData.mainSubject} - ${advancedData.sceneAction}`
      
      addPromptToHistoryGlobal(
        promptToSave,
        "advanced",
        "veo3-prompt",
        {
          json: outputOptions.jsonPrompt,
          paragraph: outputOptions.paragraphPrompt
        }
      )

      const outputTypes = []
      if (outputOptions.jsonPrompt) outputTypes.push("JSON")
      if (outputOptions.paragraphPrompt) outputTypes.push("Paragraph")

      // Play notification sound when prompt is generated successfully
      playNotificationSound()

      toast({
        title: "Advanced AI Prompt Generated!",
        description: `${outputTypes.join(" & ")} format${outputTypes.length > 1 ? 's' : ''} ready.`,
      })
      
      // Show bookmark toast notification
      showToastAfterSuccess()
    } catch (error) {
      console.error("Error generating advanced prompt:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate advanced prompt. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const clearForm = () => {
    setAdvancedData({
      mainSubject: "",
      sceneAction: "",
      cameraMovement: "",
      otherDetails: "",
      subtitles: "no",
      targetAudience: "",
      videoStyle: "Cinematic",
      durationPreference: "8 seconds",
      lightingStyle: "",
      colorPalette: "",
      audioElements: "",
      specialEffects: ""
    })
    setChatInput("")
    setGeneratedPrompts(null)
    setOutputOptions({
      jsonPrompt: false,
      paragraphPrompt: true,
      subtitles: "no",
      dialogue: "yes"
    })
  }

  const faqs = [
    {
      question: "What is Veo3 and how does this generator help?",
      answer: "Veo3 is Google's advanced AI video generation model. Our prompt generator creates detailed, structured prompts that help Veo3 understand exactly what video you want to create, including scene details, camera movements, lighting, and audio elements."
    },
    {
      question: "What's the difference between JSON and paragraph formats?",
      answer: "JSON format provides structured data for technical AI processing and API integrations, while paragraph format offers narrative descriptions for creative AI processing. Both formats contain the same information but are optimized for different use cases."
    },
    {
      question: "Can I use the generated prompts commercially?",
      answer: "Absolutely! All generated prompts are yours to use for any purpose, including commercial projects, client work, and personal content creation. The prompts are designed to work with Google's Veo3 and other AI video generation tools."
    },
    {
      question: "How accurate are the generated prompts?",
      answer: "Our AI models achieve 99.5% accuracy in prompt generation, with continuous improvements through machine learning and user feedback. The prompts are specifically optimized for Veo3's capabilities and requirements."
    },
    {
      question: "What video formats does Veo3 support?",
      answer: "Veo3 can generate videos up to 2 minutes long in 4K resolution. Our prompts are optimized for 15-60 second clips with professional cinematic quality, perfect for social media and marketing content."
    },
    {
      question: "Do I need technical knowledge to use this tool?",
      answer: "No technical knowledge required! Our tool provides both structured (form-based) and advanced (chat-based) modes. Simply describe your video idea in natural language, and our AI will create professional prompts for you."
    }
  ]

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Veo3 Prompt Generator",
            "description": "Generate production-ready prompts for Google's Veo3. Our free tool creates advanced JSON & paragraph prompts with viral templates and full cinematic control. No signup required.",
            "url": "https://veo3promptgenerator.online/veo3-prompt-generator",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "Veo3 Prompt Generator"
            },
            "featureList": [
              "Advanced JSON prompt generation",
              "Viral video templates",
              "Cinematic control",
              "Paragraph prompt format",
              "No signup required",
              "Free to use"
            ],
            "screenshot": "https://veo3promptgenerator.online/images/screenshot-desktop.png",
            "softwareVersion": "1.0",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
            }
          })
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-black dark:from-black dark:from-black">
      <div className="max-w-[720px] mx-auto px-2 xs:px-3 sm:px-4 pt-6 xs:pt-8 sm:pt-10">
        {/* Headline with Accent Color */}
        <h1 className="text-center text-2xl xs:text-3xl sm:text-4xl lg:text-4xl font-bold mb-3 xs:mb-4 px-1">
          Free Veo3 Prompt Generator <span className="text-purple-600">Online</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-3xl mx-auto text-sm xs:text-base px-2 leading-relaxed">
          Transform your ideas into stunning, high-quality videos. Our AI-powered tool, trained on over 10,000 professional prompts, gives you unparalleled control over every detail—from multi-character dialogue to precise camera movements. 100% free, no signup required.
        </p>

        {/* Navigation Tabs */}
        <ToolNavigation activeTool="veo3-prompt-generator" />

        {/* Main Form Card */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5 sm:p-6">
            {/* Mode Selection */}
            <div className="flex items-center justify-center mb-6 gap-2">
              <button
                onClick={() => setActiveMode("chat")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeMode === "chat" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat Mode
                </div>
              </button>
              
              <button
                onClick={() => setActiveMode("advanced")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeMode === "advanced" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Advanced Mode
                </div>
              </button>

              <button
                onClick={() => setActiveMode("history")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeMode === "history" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </div>
              </button>
            </div>

            {/* Chat Mode Content */}
            {activeMode === "chat" && (
              <div className="space-y-4 xs:space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm xs:text-base text-blue-800 dark:text-blue-200">
                    Please describe your idea clearly, specify the required video dimensions, and accurately define your target audience. 
                    Example: An astronaut embarking on an exploratory mission to the moon, vertical video for TikTok targeting space and celestial body enthusiasts
                  </p>
                </div>

                <div className="space-y-2">
                  <Textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Describe the video you want to create..."
                    className="min-h-[120px] xs:min-h-[150px] sm:min-h-[200px] resize-none text-sm xs:text-base"
                    maxLength={1000}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {chatInput.length}/1000 characters
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Mode Content */}
            {activeMode === "advanced" && (
              <div className="space-y-4 xs:space-y-6">
                {/* Main Subject - Required */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-bold text-red-600">
                    Main Subject: *Required
                  </label>
                  <Input
                    value={advancedData.mainSubject}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, mainSubject: e.target.value }))}
                    placeholder="Describe the main subject's appearance, clothing, characteristics..."
                    className="border-red-200 focus:border-red-500 text-sm xs:text-base"
                  />
                  {!advancedData.mainSubject.trim() && (
                    <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      This field is required
                    </div>
                  )}
                </div>

                {/* Scene Action - Required */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-bold text-red-600">
                    Scene Action: *Required
                  </label>
                  <Input
                    value={advancedData.sceneAction}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, sceneAction: e.target.value }))}
                    placeholder="What is the subject doing or feeling in the scene?"
                    className="border-red-200 focus:border-red-500 text-sm xs:text-base"
                  />
                  {!advancedData.sceneAction.trim() && (
                    <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      This field is required
                    </div>
                  )}
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Target Audience
                  </label>
                  <Input
                    value={advancedData.targetAudience}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="e.g., Young adults, Children, Business professionals..."
                    className="text-sm xs:text-base"
                  />
                </div>

                {/* Video Style */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Video Style
                  </label>
                  <select
                    value={advancedData.videoStyle}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, videoStyle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm xs:text-base bg-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="Cinematic">Cinematic</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Educational">Educational</option>
                    <option value="Artistic">Artistic</option>
                    <option value="Minimalist">Minimalist</option>
                  </select>
                </div>

                {/* Camera Movement */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Camera Movement
                  </label>
                  <Input
                    value={advancedData.cameraMovement}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, cameraMovement: e.target.value }))}
                    placeholder="Slow zoom, aerial view, close-up, tracking shot, etc..."
                    className="text-sm xs:text-base"
                  />
                </div>

                {/* Lighting Style */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Lighting Style
                  </label>
                  <Input
                    value={advancedData.lightingStyle}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, lightingStyle: e.target.value }))}
                    placeholder="Natural, dramatic, soft, harsh, colored lighting..."
                    className="text-sm xs:text-base"
                  />
                </div>

                {/* Color Palette */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Color Palette
                  </label>
                  <Input
                    value={advancedData.colorPalette}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, colorPalette: e.target.value }))}
                    placeholder="Warm, cool, monochrome, vibrant, muted colors..."
                    className="text-sm xs:text-base"
                  />
                </div>

                {/* Audio Elements */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Audio Elements
                  </label>
                  <Input
                    value={advancedData.audioElements}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, audioElements: e.target.value }))}
                    placeholder="Background music, sound effects, ambient sounds..."
                    className="text-sm xs:text-base"
                  />
                </div>

                {/* Special Effects */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Special Effects
                  </label>
                  <Input
                    value={advancedData.specialEffects}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, specialEffects: e.target.value }))}
                    placeholder="VFX, transitions, filters, overlays..."
                    className="text-sm xs:text-base"
                  />
                </div>

                {/* Additional Details */}
                <div className="space-y-2">
                  <label className="text-sm xs:text-base font-medium">
                    Additional Details
                  </label>
                  <Textarea
                    value={advancedData.otherDetails}
                    onChange={(e) => setAdvancedData((prev) => ({ ...prev, otherDetails: e.target.value }))}
                    placeholder="Any other specific details, mood, atmosphere, or technical requirements..."
                    className="min-h-[100px] resize-none text-sm xs:text-base"
                    maxLength={500}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {advancedData.otherDetails.length}/500 characters
                  </div>
                </div>
              </div>
            )}

            {/* History Mode Content */}
            {activeMode === "history" && (
              <div className="space-y-4">
                <PromptHistory />
              </div>
            )}

            {/* Output Options */}
            {activeMode !== "history" && (
              <div className="mt-6 space-y-2">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-sm xs:text-base mb-2">Output Options</h3>
                  
                  {/* Prompt Type Options - Optimized for mobile */}
                  <div className="flex space-x-2 xs:space-x-4">
                    <div className="flex items-center space-x-1.5 xs:space-x-2">
                      <Checkbox
                        id="paragraph-prompt"
                        checked={outputOptions.paragraphPrompt}
                        onCheckedChange={(checked) => 
                          setOutputOptions(prev => ({ ...prev, paragraphPrompt: checked as boolean }))
                        }
                      />
                      <Label htmlFor="paragraph-prompt" className="text-xs xs:text-sm">Paragraph Prompt</Label>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 xs:space-x-2">
                      <Checkbox
                        id="json-prompt"
                        checked={outputOptions.jsonPrompt}
                        onCheckedChange={(checked) => 
                          setOutputOptions(prev => ({ ...prev, jsonPrompt: checked as boolean }))
                        }
                      />
                      <Label htmlFor="json-prompt" className="text-xs xs:text-sm">JSON Prompt</Label>
                    </div>
                  </div>

                  {/* Dialogue Options */}
                  <div className="mt-4">
                    <Label className="font-semibold text-sm xs:text-base">Dialogue Settings</Label>
                    <div className="flex space-x-2 xs:space-x-4 mt-1">
                      <div className="flex items-center space-x-1.5 xs:space-x-2">
                        <Checkbox
                          id="dialogue-yes"
                          checked={outputOptions.dialogue === "yes"}
                          onCheckedChange={(checked) => 
                            setOutputOptions(prev => ({ ...prev, dialogue: checked ? "yes" : "no" }))
                          }
                        />
                        <Label htmlFor="dialogue-yes" className="text-xs xs:text-sm">Has Dialogue</Label>
                      </div>
                      <div className="flex items-center space-x-1.5 xs:space-x-2">
                        <Checkbox
                          id="dialogue-ai"
                          checked={outputOptions.dialogue === "ai"}
                          onCheckedChange={(checked) => 
                            setOutputOptions(prev => ({ ...prev, dialogue: checked ? "ai" : "no" }))
                          }
                        />
                        <Label htmlFor="dialogue-ai" className="text-xs xs:text-sm">Auto Generate</Label>
                      </div>
                      <div className="flex items-center space-x-1.5 xs:space-x-2">
                        <Checkbox
                          id="dialogue-no"
                          checked={outputOptions.dialogue === "no"}
                          onCheckedChange={(checked) => 
                            setOutputOptions(prev => ({ ...prev, dialogue: checked ? "no" : "yes" }))
                          }
                        />
                        <Label htmlFor="dialogue-no" className="text-xs xs:text-sm">No Dialogue</Label>
                      </div>
                    </div>
                  </div>

                  {/* Subtitles Option */}
                  <div className="mt-4">
                    <Label className="font-semibold text-sm xs:text-base">Subtitles</Label>
                    <div className="flex space-x-2 xs:space-x-4 mt-1">
                      <div className="flex items-center space-x-1.5 xs:space-x-2">
                        <Checkbox
                          id="subtitles-no"
                          checked={outputOptions.subtitles === "no"}
                          onCheckedChange={(checked) => 
                            setOutputOptions(prev => ({ ...prev, subtitles: checked ? "no" : "yes" }))
                          }
                        />
                        <Label htmlFor="subtitles-no" className="text-xs xs:text-sm">No Subtitles</Label>
                      </div>
                      <div className="flex items-center space-x-1.5 xs:space-x-2">
                        <Checkbox
                          id="subtitles-yes"
                          checked={outputOptions.subtitles === "yes"}
                          onCheckedChange={(checked) => 
                            setOutputOptions(prev => ({ ...prev, subtitles: checked ? "yes" : "no" }))
                          }
                        />
                        <Label htmlFor="subtitles-yes" className="text-xs xs:text-sm">Include Subtitles</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {activeMode !== "history" && (
              <div className="flex gap-3 xs:gap-4 mt-6">
                <Button
                  onClick={
                    activeMode === "chat" ? generateChatPrompt : generateAdvancedPrompt
                  }
                  disabled={isGenerating || (!outputOptions.jsonPrompt && !outputOptions.paragraphPrompt)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-10 xs:h-12 text-sm xs:text-base font-medium rounded-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Prompt...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Generate Prompt
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearForm}
                  variant="outline"
                  className="h-10 xs:h-12 px-4 xs:px-6 text-sm xs:text-base rounded-lg"
                  disabled={isGenerating}
                >
                  Clear
                </Button>
              </div>
            )}

            {/* Animated Loading Bar */}
            {activeMode !== "history" && isGenerating && (
              <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                {/* Loading Bar - Full width with padding */}
                <div className="px-2.5">
                  <div className="loader"></div>
                </div>
                
                {/* Mini Teaser Prompts */}
                <div className="text-center">
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium animate-pulse">
                    {teaserPrompts[currentTeaserIndex]}
                  </p>
                </div>
              </div>
            )}

            {/* Generated Prompts Output */}
            {activeMode !== "history" && generatedPrompts && (
              <div className="mt-6 space-y-4">
                {/* JSON Format */}
                {outputOptions.jsonPrompt && generatedPrompts.jsonPrompt && (
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      JSON Format (Technical)
                    </h4>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Structured JSON format optimized for technical AI processing and API integrations</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(generatedPrompts.jsonPrompt)
                        toast({
                          title: "Copied!",
                          description: "JSON format copied to clipboard",
                        })
                        // Show toast notification after copying
                        showToastAfterSuccess()
                      }}
                      className="text-xs h-8 px-3"
                    >
                        Copy
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-gray-800 dark:text-gray-200 overflow-x-auto">
                      {generatedPrompts.jsonPrompt}
                    </pre>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Use this structured format for technical AI processing and API integrations.
                  </p>
                </div>
                )}

                {/* Paragraph Format */}
                {outputOptions.paragraphPrompt && generatedPrompts.paragraphPrompt && (
                <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4 text-gray-600" />
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      Paragraph Format (Creative)
                    </h4>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Narrative paragraph format optimized for creative AI processing and storytelling</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(generatedPrompts.paragraphPrompt)
                        toast({
                          title: "Copied!",
                          description: "Paragraph format copied to clipboard",
                        })
                        // Show toast notification after copying
                        showToastAfterSuccess()
                      }}
                      className="text-xs h-8 px-3"
                    >
                        Copy
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-gray-800 dark:text-gray-200">
                      {generatedPrompts.paragraphPrompt}
                    </pre>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Use this narrative format for creative AI processing and storytelling.
                  </p>
                </div>
                )}

                {/* AI Info Box */}
                <div className="bg-purple-600 border border-purple-600 rounded-lg p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm font-medium">
                          We trained our AI model over more than thousands of prompt to create the best prompting experience for you
                        </p>
                        <p className="text-xs mt-1 opacity-90">
                          Made with ❤️ Love, Your One Share means a Lot
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(window.location.href)
                        toast({
                          title: "Link Copied!",
                          description: "Tool link copied to clipboard",
                        })
                        // Show toast notification after copying
                        showToastAfterSuccess()
                      }}
                      className="text-xs h-8 px-3 bg-white text-purple-600 border-white hover:bg-gray-100"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How Veo3 Prompt Generator Works */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-purple-600 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              How Veo3 Prompt Generator Works
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Describe Your Video</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use structured mode for detailed control or advanced mode for natural language input to describe your video concept.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">AI Prompt Generation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our advanced AI analyzes your input and generates both JSON and paragraph formats optimized for Veo3 AI video generation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Use with Veo3</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Copy the generated prompts and use them with Google's Veo3 AI to create professional-quality videos with your specifications.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Veo3 Prompt Generator */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5">
            <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-purple-600">About Veo3 Prompt Generator</h3>
            <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Veo3 Prompt Generator is a specialized AI tool designed to create detailed, production-ready prompts for Google's Veo3 AI video generation platform. Whether you're a content creator, marketer, or video producer, our tool helps you transform your creative ideas into structured prompts that Veo3 can understand and execute perfectly. With both structured and advanced modes, you can either fill out detailed forms for precise control or use natural language for quick ideation. The generated prompts include scene descriptions, camera movements, lighting details, audio elements, and technical specifications optimized for Veo3's capabilities.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-purple-600">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm xs:text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      
      {/* Toast Notification */}
      <ToastNotification 
        isVisible={showToast} 
        onClose={closeToast} 
      />
    </div>
    </>
  )
} 