"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useCallback } from "react"
import { Loader2, Upload, FileVideo, X, Brain, Eye, Zap, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
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
    <main>
      <section className="py-3 xs:py-4 sm:py-6 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto">
            {/* Headline with Accent Color */}
            <h1 className="text-center text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 px-2">
              Video to <span className="text-green-600">Prompt Generator</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base px-3 xs:px-4">
              Upload your video and get detailed prompts for AI video generation. Analyze scenes, objects, and actions to create powerful prompts.
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
                  <Link href="/video-script-generator" className="w-full">
                    <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 truncate">
                      Video Script Generator
                    </Button>
                  </Link>
                  <Button className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium bg-green-600 hover:bg-green-700 text-white truncate">
                    Video to Prompt Generator
                  </Button>
                  <Link href="/transcription" className="w-full">
                    <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-200 truncate">
                      Video Transcription
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Form Card */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardContent className="p-3 xs:p-4 sm:p-6">
                {/* Video Upload Section */}
                <div className="mb-4 xs:mb-6">
                  <label className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Upload Your Video
                  </label>
                  
                  {!uploadedVideo ? (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-4 xs:p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                        isDragActive 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 mx-auto mb-2 xs:mb-4 text-gray-400" />
                      {isDragActive ? (
                        <p className="text-green-600 font-medium text-sm xs:text-base">Drop the video here...</p>
                      ) : (
                        <div>
                          <p className="text-sm xs:text-base sm:text-lg font-medium mb-1 xs:mb-2">Drag & drop your video here</p>
                          <p className="text-xs xs:text-sm text-gray-500 mb-2 xs:mb-4">or click to browse files</p>
                          <p className="text-xs text-gray-400">
                            Supports: MP4, AVI, MOV, WMV, FLV, WebM (Max 100MB)
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 xs:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 xs:space-x-3">
                          <FileVideo className="h-5 w-5 xs:h-6 xs:w-6 text-green-600" />
                          <div>
                            <p className="text-sm xs:text-base font-medium truncate">{uploadedVideo.name}</p>
                            <p className="text-xs text-gray-500">
                              {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={removeVideo}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 h-8 w-8 xs:h-10 xs:w-10 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 xs:gap-3">
                  <Button
                    onClick={generatePrompt}
                    disabled={isProcessing || !uploadedVideo}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2" />
                        Generate Prompt
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    className="h-10 xs:h-12 sm:h-14 px-4 xs:px-6 text-xs xs:text-sm sm:text-base"
                    disabled={isProcessing || (!uploadedVideo && !generatedPrompt)}
                  >
                    Reset
                  </Button>
                </div>

                {/* Result Container */}
                {generatedPrompt && (
                  <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-bold mb-2 text-xs xs:text-sm sm:text-base">Generated Prompt:</h4>
                    <pre className="whitespace-pre-wrap text-xs xs:text-sm sm:text-base overflow-x-auto">{generatedPrompt}</pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How Video to Prompt Generator Works */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600 flex items-center gap-2">
                  <Eye className="h-5 w-5 xs:h-6 xs:w-6" />
                  How Video to Prompt Generator Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 xs:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div className="space-y-3 xs:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="h-4 w-4 xs:h-5 xs:w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">AI Video Analysis</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Our advanced AI analyzes your video by examining scenes, objects, actions, colors, and lighting to understand the content.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="h-4 w-4 xs:h-5 xs:w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Scene Detection</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Identifies key scenes, objects, and actions to create comprehensive scene descriptions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 xs:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="h-4 w-4 xs:h-5 xs:w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Prompt Generation</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Converts video analysis into detailed prompts suitable for AI video generation platforms.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileVideo className="h-4 w-4 xs:h-5 xs:w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Multi-Format Support</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Supports all major video formats including MP4, AVI, MOV, WMV, FLV, and WebM.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Paragraph About the Tool */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardContent className="p-4 xs:p-6">
                <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-green-600">About Video to Prompt Generator</h3>
                <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our Video to Prompt Generator is an innovative AI-powered tool that transforms your existing videos into detailed prompts for AI video generation platforms. By analyzing your video content, our advanced AI extracts key visual elements, scenes, objects, and actions to create comprehensive prompts that can be used to generate similar or enhanced video content. This tool is perfect for content creators, marketers, and video producers who want to leverage their existing content to create new AI-generated videos with consistent style and messaging.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mx-3 xs:mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600">Frequently Asked Questions</CardTitle>
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