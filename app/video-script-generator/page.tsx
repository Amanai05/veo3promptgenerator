"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { Loader2, FileText, Lightbulb, Clock, Users, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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
    <main>
      <section className="py-3 xs:py-4 sm:py-6 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto">
            {/* Headline with Accent Color */}
            <h1 className="text-center text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 px-2">
              Video <span className="text-blue-600">Script Generator</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base px-3 xs:px-4">
              Generate compelling video scripts for YouTube, TikTok, marketing, and more with AI.
            </p>
            
            {/* Navigation Tabs - Responsive Grid */}
            <div className="flex justify-center mb-4 xs:mb-6 px-3 xs:px-4">
              {/* Mobile: Stack vertically, Tablet+: 2x2 grid */}
              <div className="w-full max-w-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
                  <Link href="/" className="w-full">
                    <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200 truncate">
                      Veo3 Prompt Generator
                    </Button>
                  </Link>
                  <Button className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium bg-blue-600 hover:bg-blue-700 text-white truncate">
                    Video Script Generator
                  </Button>
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

            {/* Main Form Card - COMES FIRST */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardContent className="p-3 xs:p-4 sm:p-6">
                {/* Video Topic & Main Characters */}
                <div className="mb-3 xs:mb-4 sm:mb-6">
                  <label htmlFor="videoTopic" className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Video Topic & Main Characters:
                  </label>
                  <Textarea
                    id="videoTopic"
                    name="videoTopic"
                    value={formData.videoTopic}
                    onChange={(e) => setFormData({ ...formData, videoTopic: e.target.value })}
                    placeholder="Example: A short film about a lonely robot who finds a flower, featuring a curious robot and a vibrant, glowing flower."
                    className="min-h-[60px] xs:min-h-[80px] resize-none text-xs xs:text-sm sm:text-base"
                  />
                </div>

                {/* Audience */}
                <div className="mb-3 xs:mb-4 sm:mb-6">
                  <label htmlFor="audience" className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Audience:
                  </label>
                  <input
                    id="audience"
                    name="audience"
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    placeholder="Example: Young adults interested in sci-fi and emotional storytelling."
                    className="w-full px-2 xs:px-3 py-1 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs xs:text-sm sm:text-base bg-white dark:bg-gray-700"
                  />
                </div>

                {/* Script Length */}
                <div className="mb-3 xs:mb-4 sm:mb-6">
                  <label htmlFor="scriptLength" className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Script Length:
                  </label>
                  <Select
                    value={formData.scriptLength}
                    onValueChange={(value) => setFormData({ ...formData, scriptLength: value })}
                  >
                    <SelectTrigger id="scriptLength" className="text-xs xs:text-sm sm:text-base">
                      <SelectValue placeholder="Select script length" />
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

                {/* Script Style */}
                <div className="mb-3 xs:mb-4 sm:mb-6">
                  <label htmlFor="scriptStyle" className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Script Style:
                  </label>
                  <Select
                    value={formData.scriptStyle}
                    onValueChange={(value) => setFormData({ ...formData, scriptStyle: value })}
                  >
                    <SelectTrigger id="scriptStyle" className="text-xs xs:text-sm sm:text-base">
                      <SelectValue placeholder="Select script style" />
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

                {/* Language */}
                <div className="mb-4 xs:mb-6">
                  <label htmlFor="language" className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Language:
                  </label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger id="language" className="text-xs xs:text-sm sm:text-base">
                      <SelectValue placeholder="Select language" />
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 xs:gap-3">
                  <Button
                    onClick={generateScript}
                    disabled={isGenerating}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Video Script"
                    )}
                  </Button>
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className="h-10 xs:h-12 sm:h-14 px-4 xs:px-6 text-xs xs:text-sm sm:text-base"
                    disabled={isGenerating || (!formData.videoTopic && !formData.audience && !formData.scriptLength && !formData.scriptStyle && !generatedScript)}
                  >
                    Reset
                  </Button>
                </div>

                {/* Result Container */}
                {generatedScript && (
                  <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-bold mb-2 text-xs xs:text-sm sm:text-base">Generated Script:</h4>
                    <pre className="whitespace-pre-wrap text-xs xs:text-sm sm:text-base overflow-x-auto">{generatedScript}</pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How Video Script Generator Works */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-600 flex items-center gap-2">
                  <FileText className="h-5 w-5 xs:h-6 xs:w-6" />
                  How Video Script Generator Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 xs:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div className="space-y-3 xs:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="h-4 w-4 xs:h-5 xs:w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Target Audience Analysis</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Our AI analyzes your target audience to create scripts that resonate with specific demographics and interests.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 xs:h-5 xs:w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Style Customization</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Choose from multiple script styles including conversational, professional, energetic, and storytelling.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 xs:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 xs:h-5 xs:w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Length Optimization</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Optimize your script for specific video lengths from 15 seconds to 10 minutes.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="h-4 w-4 xs:h-5 xs:w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Engagement Focus</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Scripts are designed to maximize viewer engagement and retention rates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Paragraph About the Tool */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardContent className="p-4 xs:p-6">
                <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-blue-600">About Video Script Generator</h3>
                <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our Video Script Generator is an advanced AI-powered tool designed to help content creators, marketers, and businesses create compelling video scripts quickly and efficiently. Whether you're creating YouTube content, TikTok videos, marketing campaigns, or educational materials, our tool provides professional-quality scripts tailored to your specific audience and style preferences. The generator takes into account your target audience, desired video length, and preferred tone to create engaging scripts that maximize viewer engagement and conversion rates.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mx-3 xs:mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-600">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-xs xs:text-sm sm:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-xs xs:text-sm sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
