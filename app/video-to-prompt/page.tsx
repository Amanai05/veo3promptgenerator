"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useCallback } from "react"
import { Loader2, Upload, FileVideo, X, Brain, Eye, Zap, Target, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToolNavigation } from "@/components/tool-navigation"
import { useDropzone } from "react-dropzone"

export default function VideoToPromptPage() {
  const [activeTab, setActiveTab] = useState("video-to-prompt")
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (file.type.startsWith('video/')) {
        setUploadedVideo(file)
        toast({
          title: "Video uploaded successfully!",
          description: `${file.name} has been uploaded.`,
        })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file.",
          variant: "destructive",
        })
      }
    }
  }, [toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  })

  const removeVideo = () => {
    setUploadedVideo(null)
    setGeneratedPrompt("")
  }

  const generatePrompt = async () => {
    if (!uploadedVideo) {
      toast({
        title: "No video uploaded",
        description: "Please upload a video file first.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setGeneratedPrompt("")

    try {
      const formData = new FormData()
      formData.append('video', uploadedVideo)

      const response = await fetch("/api/analyze-video", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to analyze video")

      setGeneratedPrompt(data.prompt)
      toast({
        title: "Prompt generated successfully!",
        description: "Your video prompt is ready.",
      })
    } catch (error) {
      console.error("Error generating prompt:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate prompt. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const clearAll = () => {
    setUploadedVideo(null)
    setGeneratedPrompt("")
  }

  const faqs = [
    {
      question: "What video formats are supported?",
      answer: "We support all major video formats including MP4, AVI, MOV, WMV, FLV, and WebM. Files up to 100MB can be uploaded for analysis."
    },
    {
      question: "How does the AI analyze my video?",
      answer: "Our advanced AI analyzes your video by examining scenes, objects, actions, colors, lighting, and audio elements to create comprehensive prompts that capture the essence of your content."
    },
    {
      question: "What types of prompts will I get?",
      answer: "You'll receive detailed prompts including scene descriptions, object identification, action sequences, mood analysis, and technical specifications suitable for AI video generation platforms."
    },
    {
      question: "How accurate is the video analysis?",
      answer: "Our AI achieves 95%+ accuracy in video analysis, with advanced computer vision and machine learning algorithms that understand context, emotions, and visual elements."
    },
    {
      question: "Can I use the generated prompts for commercial projects?",
      answer: "Yes! All generated prompts are yours to use for any purpose, including commercial video production, client work, and creative projects."
    },
    {
      question: "How long does video analysis take?",
      answer: "Analysis typically takes 30-60 seconds depending on video length and complexity. Our optimized AI ensures fast and reliable results."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-black dark:from-black dark:from-black">
      <div className="max-w-[720px] mx-auto px-2 xs:px-3 sm:px-4 pt-6 xs:pt-8 sm:pt-10">
        {/* Headline with Accent Color */}
        <h1 className="text-center text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-bold mb-2 xs:mb-3 px-1">
          Video to Prompt Generator <span className="text-green-600">Free Online</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-sm xs:text-base px-2">
          Transform your existing videos into detailed AI prompts. Upload a video and get comprehensive prompts for AI video generation platforms.
        </p>

        {/* Navigation Tabs */}
        <ToolNavigation activeTool="video-to-prompt" />

        {/* Main Form Card */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5 sm:p-6">
            {/* Video Upload Section */}
            <div className="mb-4 xs:mb-6">
              <label className="text-sm xs:text-base font-bold mb-2 block">Upload Video:</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">
                  {isDragActive ? "Drop the video here..." : "Drag & drop a video file here, or click to select"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Supports MP4, MOV, AVI (Max 100MB)</p>
              </div>
            </div>

            {/* Uploaded Video Display */}
            {uploadedVideo && (
              <div className="mb-4 xs:mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-green-600" />
                    <span className="text-sm xs:text-base font-medium">{uploadedVideo.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedVideo(null)}
                    className="text-red-600 hover:text-red-700 h-8 px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 xs:gap-4">
              <Button
                onClick={generatePrompt}
                disabled={isProcessing || !uploadedVideo}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10 xs:h-12 text-sm xs:text-base font-medium rounded-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Prompt
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="h-10 xs:h-12 px-4 xs:px-6 text-sm xs:text-base rounded-lg"
                disabled={isProcessing || (!uploadedVideo && !generatedPrompt)}
              >
                Clear
              </Button>
            </div>

            {/* Result Container */}
            {generatedPrompt && (
              <div className="mt-4 xs:mt-6 p-4 xs:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-bold mb-2 text-sm xs:text-base">Generated Prompt:</h4>
                <pre className="whitespace-pre-wrap text-sm xs:text-base overflow-x-auto">{generatedPrompt}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How Video to Prompt Generator Works */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              How Video to Prompt Generator Works
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Upload Your Video</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload any video file (MP4, MOV, AVI) up to 100MB. Our system will analyze the visual content.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">AI Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our advanced AI extracts key visual elements, scenes, objects, and actions from your video.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Generate Prompt</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get a comprehensive prompt that can be used to generate similar or enhanced video content with AI platforms.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simple Paragraph About the Tool */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5">
            <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-green-600">About Video to Prompt Generator</h3>
            <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Video to Prompt Generator is an innovative AI-powered tool that transforms your existing videos into detailed prompts for AI video generation platforms. By analyzing your video content, our advanced AI extracts key visual elements, scenes, objects, and actions to create comprehensive prompts that can be used to generate similar or enhanced video content. This tool is perfect for content creators, marketers, and video producers who want to leverage their existing content to create new AI-generated videos with consistent style and messaging.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm xs:text-base">What video formats are supported?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  We support most common video formats including MP4, MOV, AVI, and more. The maximum file size is 100MB to ensure fast processing and analysis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm xs:text-base">How accurate are the generated prompts?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Our AI provides highly accurate analysis of visual elements, scenes, and actions. The generated prompts capture the essence and key components of your original video for effective AI video generation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm xs:text-base">Can I use the prompts with any AI video platform?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! The generated prompts are designed to be compatible with most AI video generation platforms including Runway, Pika Labs, Veo3, and others. You can modify the prompts as needed for specific platforms.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm xs:text-base">Is my video content secure?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Absolutely. We prioritize your privacy and security. Videos are processed securely and are not stored permanently. We only analyze the content to generate prompts and do not retain your video files.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 