"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { Loader2, FileText, Lightbulb, Clock, Users, Target, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToolNavigation } from "@/components/tool-navigation"

export default function VideoScriptGeneratorPage() {
  const [activeTab, setActiveTab] = useState("video-script")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    videoTopic: "",
    audience: "",
    scriptLength: "",
    scriptStyle: "",
    language: "english",
  })

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
      answer: "We support multiple languages including English, Vietnamese, French, Spanish, and German. More languages are being added regularly to serve our global user base."
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

  const generateScript = async () => {
    if (!formData.videoTopic.trim() || !formData.audience || !formData.scriptLength || !formData.scriptStyle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
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

  const clearForm = () => {
    setFormData({
      videoTopic: "",
      audience: "",
      scriptLength: "",
      scriptStyle: "",
      language: "english",
    })
    setGeneratedScript("")
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
            {/* Video Topic & Main Characters */}
            <div className="mb-4 xs:mb-6">
              <label className="text-sm xs:text-base font-bold mb-2 block">Video Topic & Main Characters:</label>
              <Textarea
                value={formData.videoTopic}
                onChange={(e) => setFormData({ ...formData, videoTopic: e.target.value })}
                placeholder="Example: A short film about a lonely robot who finds a flower, featuring a curious robot and a vibrant, glowing flower."
                className="min-h-[60px] xs:min-h-[80px] resize-none text-sm xs:text-base rounded-lg"
              />
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
                disabled={isGenerating || !formData.videoTopic.trim()}
              >
                Clear
              </Button>
            </div>

            {/* Result Container */}
            {generatedScript && (
              <div className="mt-4 xs:mt-6 p-4 xs:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-bold mb-2 text-sm xs:text-base">Generated Script:</h4>
                <pre className="whitespace-pre-wrap text-sm xs:text-base overflow-x-auto">{generatedScript}</pre>
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
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm xs:text-base">What types of videos can I create scripts for?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Our Video Script Generator can create scripts for various video types including YouTube videos, TikTok content, Instagram Reels, educational videos, promotional content, storytelling videos, and more. Just describe your concept and the AI will adapt the script accordingly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm xs:text-base">How long are the generated scripts?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Script length varies based on your input and requirements. You can specify if you need a short 30-second script or a longer 5-10 minute video script. The AI will adjust the content and detail level accordingly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm xs:text-base">Can I edit the generated script?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Absolutely! The generated script is a starting point that you can copy, edit, and customize to match your specific needs, style, and brand voice. Feel free to modify dialogue, add details, or adjust the structure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm xs:text-base">Is the script suitable for commercial use?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Yes, the scripts generated by our tool are free to use for both personal and commercial projects. However, we recommend reviewing and customizing the content to ensure it aligns with your brand guidelines and legal requirements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
