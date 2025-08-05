"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useEffect } from "react"
import { Loader2, FileText, Brain, Copy, Check, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useToastNotification } from "@/hooks/use-toast-notification"
import { ToolNavigation } from "@/components/tool-navigation"
import { ToastNotification } from "@/components/ui/toast-notification"
import { PromptHistory, addPromptToHistoryGlobal } from "@/components/prompt-history"

export default function VideoScriptGeneratorPage() {
  const [activeTab, setActiveTab] = useState<"video-script" | "history">("video-script")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const { showToast, showToastAfterSuccess, closeToast } = useToastNotification()

  // Teaser prompts state
  const [currentTeaserIndex, setCurrentTeaserIndex] = useState(0)
  const teaserPrompts = [
    "Crafting your perfect script...",
    "Weaving words into stories...",
    "Creating cinematic magic...",
    "Building your video masterpiece..."
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

  // Form state
  const [formData, setFormData] = useState({
    videoTopic: "",
    audience: "",
    scriptLength: "",
    scriptStyle: "",
    language: "english",
  })

  // Validation state
  const [validationErrors, setValidationErrors] = useState<string[]>([])

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
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
  ]

  const faqs = [
    {
      question: "What types of videos can I create scripts for?",
      answer: "Our Video Script Generator supports various video types including YouTube content, TikTok videos, marketing campaigns, educational content, product demonstrations, storytelling videos, and promotional materials."
    },
    {
      question: "How accurate are the generated scripts?",
      answer: "Our AI-powered script generator creates highly accurate and engaging scripts tailored to your specific audience and style preferences. The scripts are optimized for maximum engagement and conversion rates."
    },
    {
      question: "Can I customize the script style and tone?",
      answer: "Yes! You can choose from multiple script styles including conversational, professional, energetic, educational, storytelling, and promotional. Each style is optimized for different content types and audiences."
    },
    {
      question: "What languages are supported?",
      answer: "We support multiple languages including English, Hindi, Vietnamese, French, Spanish, and German. More languages are being added regularly to serve our global user base."
    },
    {
      question: "How long does script generation take?",
      answer: "Script generation typically takes 10-30 seconds depending on the complexity and length of your requirements. Our optimized AI ensures fast and reliable results."
    },
    {
      question: "Can I use the generated scripts commercially?",
      answer: "Absolutely! All generated scripts are yours to use for any purpose, including commercial projects, client work, and personal content creation."
    }
  ]

  // Validation function
  const validateForm = () => {
    const errors: string[] = []

    if (!formData.videoTopic.trim()) {
      errors.push("Video Topic & Main Characters is required")
    }

    if (!formData.audience) {
      errors.push("Please select an Audience")
    }

    if (!formData.scriptLength) {
      errors.push("Please select a Script Length")
    }

    if (!formData.scriptStyle) {
      errors.push("Please select a Script Style")
    }

    if (!formData.language) {
      errors.push("Please select a Language")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const generateScript = async () => {
    // Clear previous errors
    setValidationErrors([])

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: `Please fill in the following fields: ${validationErrors.join(", ")}`,
        variant: "default",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedScript("")

    try {
      const response = await fetch("/api/generate-video-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to generate script")

      setGeneratedScript(data.script)
      
      // Save to prompt history
      addPromptToHistoryGlobal(
        data.script,
        "video-script",
        "video-script",
        {
          json: false,
          paragraph: true
        }
      )
      
      // Play notification sound when script is generated successfully
      playNotificationSound()
      
      toast({
        title: "Script generated successfully!",
        description: "Your professional video script is ready.",
      })
      
      // Show bookmark toast notification
      showToastAfterSuccess()
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

  const clearForm = () => {
    setFormData({
      videoTopic: "",
      audience: "",
      scriptLength: "",
      scriptStyle: "",
      language: "english",
    })
    setGeneratedScript("")
    setValidationErrors([])
    setCopied(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript)
      setCopied(true)
      toast({
        title: "Copied to clipboard!",
        description: "The script has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-black dark:from-black dark:from-black">
      <div className="max-w-[720px] mx-auto px-2 xs:px-3 sm:px-4 pt-6 xs:pt-8 sm:pt-10">
        {/* Headline with Accent Color */}
        <h1 className="text-center text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-bold mb-2 xs:mb-3 px-1">
          Video Script Generator <span className="text-blue-600">Free Online</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-sm xs:text-base px-2">
          Create compelling video scripts with our AI-powered generator. Perfect for YouTube, TikTok, Instagram, and social media content creators.
        </p>

        {/* Navigation Tabs */}
        <ToolNavigation activeTool="video-script-generator" />

        {/* Main Form Card - COMES FIRST */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5 sm:p-6">
            {/* Mode Selection */}
            <div className="flex items-center justify-center mb-6 gap-2">
              <button
                onClick={() => setActiveTab("video-script")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === "video-script" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Video Script
                </div>
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === "history" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </div>
              </button>
            </div>

            {/* Video Script Content */}
            {activeTab === "video-script" && (
              <div>
                {/* Video Topic & Main Characters */}
            <div className="mb-4 xs:mb-6">
              <label className="text-sm xs:text-base font-bold mb-2 block">Video Topic & Main Characters:</label>
              <Textarea
                value={formData.videoTopic}
                onChange={(e) => setFormData({ ...formData, videoTopic: e.target.value })}
                placeholder="Example: A short film about a lonely robot who finds a flower, featuring a curious robot and a vibrant, glowing flower."
                className="min-h-[120px] xs:min-h-[150px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[250px] resize-none text-sm xs:text-base rounded-lg p-4"
                maxLength={1500}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Describe your video concept, characters, and story in detail
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formData.videoTopic.length}/1500
                </div>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 mb-4 xs:mb-6">
              {/* Audience */}
              <div className="space-y-2">
                <label className="text-sm xs:text-base font-bold">Audience:</label>
                <Select
                  value={formData.audience}
                  onValueChange={(value) => setFormData({ ...formData, audience: value })}
                >
                  <SelectTrigger className="text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {audiences.map((audience) => (
                      <SelectItem 
                        key={audience.value} 
                        value={audience.value}
                        className="focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-700 dark:focus:text-blue-300 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20 data-[state=checked]:text-blue-700 dark:data-[state=checked]:text-blue-300"
                      >
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Script Length */}
              <div className="space-y-2">
                <label className="text-sm xs:text-base font-bold">Script Length:</label>
                <Select
                  value={formData.scriptLength}
                  onValueChange={(value) => setFormData({ ...formData, scriptLength: value })}
                >
                  <SelectTrigger className="text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {scriptLengths.map((length) => (
                      <SelectItem 
                        key={length.value} 
                        value={length.value}
                        className="focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-700 dark:focus:text-blue-300 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20 data-[state=checked]:text-blue-700 dark:data-[state=checked]:text-blue-300"
                      >
                        {length.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Script Style */}
              <div className="space-y-2">
                <label className="text-sm xs:text-base font-bold">Script Style:</label>
                <Select
                  value={formData.scriptStyle}
                  onValueChange={(value) => setFormData({ ...formData, scriptStyle: value })}
                >
                  <SelectTrigger className="text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {scriptStyles.map((style) => (
                      <SelectItem 
                        key={style.value} 
                        value={style.value}
                        className="focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-700 dark:focus:text-blue-300 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20 data-[state=checked]:text-blue-700 dark:data-[state=checked]:text-blue-300"
                      >
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm xs:text-base font-bold">Language:</label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger className="text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {languages.map((lang) => (
                      <SelectItem 
                        key={lang.value} 
                        value={lang.value}
                        className="focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-700 dark:focus:text-blue-300 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20 data-[state=checked]:text-blue-700 dark:data-[state=checked]:text-blue-300"
                      >
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 xs:gap-4">
              <Button
                onClick={generateScript}
                disabled={isGenerating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 xs:h-12 text-sm xs:text-base font-medium rounded-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Script...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Script
                  </>
                )}
              </Button>
              <Button
                onClick={clearForm}
                variant="outline"
                className="h-10 xs:h-12 px-4 xs:px-6 text-sm xs:text-base rounded-lg"
                disabled={isGenerating || (!formData.videoTopic.trim() && !generatedScript)}
              >
                Clear
              </Button>
            </div>

            {/* Animated Loading Bar */}
            {isGenerating && (
              <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                {/* Loading Bar - Full width with padding */}
                <div className="px-2.5">
                  <div className="loader-blue"></div>
                </div>
                
                {/* Mini Teaser Prompts */}
                <div className="text-center">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                    {teaserPrompts[currentTeaserIndex]}
                  </p>
                </div>
              </div>
            )}

            {/* Result Container */}
            {generatedScript && (
              <div className="mt-4 xs:mt-6 p-4 xs:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-sm xs:text-base">Generated Script:</h4>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="whitespace-pre-wrap text-sm xs:text-base overflow-x-auto text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
                    {generatedScript}
                  </div>
                </div>
              </div>
            )}
              </div>
            )}

            {/* History Content */}
            {activeTab === "history" && (
              <div className="space-y-4">
                <PromptHistory />
              </div>
            )}
          </CardContent>
        </Card>

        {/* How Video Script Generator Works */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-600 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              How Video Script Generator Works
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Describe Your Video</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enter your video topic and describe the main characters or elements you want to include in your script.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">AI Generation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our advanced AI analyzes your input and generates a professional video script with proper structure and flow.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Download & Use</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Copy the generated script and use it for your video production, with clear scene descriptions and dialogue.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simple Paragraph About the Tool */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5">
            <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-blue-600">About Video Script Generator</h3>
            <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Video Script Generator is a powerful AI-driven tool designed to help content creators, filmmakers, and video producers create compelling scripts quickly and efficiently. By simply describing your video concept and main characters, our advanced AI generates professional-quality scripts that include scene descriptions, character dialogue, and narrative flow. This tool is perfect for YouTube creators, social media influencers, marketing teams, and anyone who needs to produce engaging video content with a clear, structured script.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-600">Frequently Asked Questions</CardTitle>
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
  )
}
