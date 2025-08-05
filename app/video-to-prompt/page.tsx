"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Copy, Upload, Video, Loader2, Brain, X, FileVideo } from "lucide-react"
import { ToolNavigation } from "@/components/tool-navigation"

// File validation constants
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_DURATION_SECONDS = 120 // 2 minutes

interface VideoAnalysisResult {
  analysis: string
  metadata: {
    model: string
    processingTime: number
  }
}

export default function VideoToPromptPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<VideoAnalysisResult | null>(null)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      
      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file (MP4, MOV, AVI, etc.)",
          variant: "destructive",
        })
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `Please upload a video smaller than 100MB. Current size: ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
          variant: "destructive",
        })
        return
      }

      setVideoFile(file)
      setAnalysisResult(null)
      toast({
        title: "Video uploaded successfully!",
        description: `${file.name} has been uploaded.`,
      })
    }
  }, [toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })

  const removeVideo = () => {
    setVideoFile(null)
    setAnalysisResult(null)
  }

  const validateForm = () => {
    if (!videoFile) {
      toast({
        title: "No video uploaded",
        description: "Please upload a video file first.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const analyzeVideo = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    setAnalysisResult(null)

    try {
      // Mock processing for now - backend will be implemented separately
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock result
      const mockResult = {
        analysis: "This is a sample video analysis. The backend will be implemented separately to provide real AI-powered video analysis.",
        metadata: {
          model: "Backend will be implemented",
          processingTime: 2000
        }
      }

      setAnalysisResult(mockResult)

      toast({
        title: "Video analysis completed!",
        description: "Backend will be implemented separately.",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis failed",
        description: "Backend will be implemented separately.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "The analysis has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive"
      })
    }
  }

  const clearAll = () => {
    setVideoFile(null)
    setAnalysisResult(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const faqs = [
    {
      question: "What video formats are supported?",
      answer: "We support all major video formats including MP4, AVI, MOV, WMV, FLV, WebM, and MKV. Files up to 100MB and 2 minutes can be uploaded for analysis."
    },
    {
      question: "How does the AI analyze my video?",
      answer: "Our advanced AI analyzes your video by examining scenes, objects, actions, colors, lighting, and audio elements to create comprehensive analysis that captures the essence of your content."
    },
    {
      question: "What type of analysis will I get?",
      answer: "You'll receive detailed video analysis including scene breakdown, visual elements, camera techniques, lighting analysis, audio elements, and technical specifications."
    },
    {
      question: "How accurate is the video analysis?",
      answer: "Our AI achieves high accuracy in video analysis, with advanced computer vision and machine learning algorithms that understand context, emotions, and visual elements."
    },
    {
      question: "Can I use the generated analysis for commercial projects?",
      answer: "Yes! All generated analysis is yours to use for any purpose, including commercial video production, client work, and creative projects."
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
          Transform your existing videos into detailed AI prompts. Upload a video and get comprehensive analysis for AI video generation platforms.
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
                <p className="text-xs text-gray-500 mt-1">
                  Supports MP4, MOV, AVI, WebM, MKV (Max 100MB, 2 minutes)
                </p>
              </div>
            </div>

            {/* Uploaded Video Display */}
            {videoFile && (
              <div className="mb-4 xs:mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileVideo className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="text-sm xs:text-base font-medium">{videoFile.name}</span>
                      <p className="text-xs text-gray-500">{formatFileSize(videoFile.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeVideo}
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
                onClick={analyzeVideo}
                disabled={isProcessing || !videoFile}
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
                    Analyze Video
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="h-10 xs:h-12 px-4 xs:px-6 text-sm xs:text-base rounded-lg"
                disabled={isProcessing || (!videoFile && !analysisResult)}
              >
                Clear
              </Button>
            </div>

            {/* Processing Animation */}
            {isProcessing && (
              <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                <div className="px-2.5">
                  <div className="loader-green"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium animate-pulse">
                    Analyzing video content with AI...
                  </p>
                </div>
              </div>
            )}

            {/* Results Container */}
            {analysisResult && (
              <div className="mt-4 xs:mt-6 space-y-4">
                <div className="p-4 xs:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm xs:text-base">Video Analysis:</h4>
                    <Button
                      onClick={() => copyToClipboard(analysisResult.analysis)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                    <div className="whitespace-pre-wrap text-sm xs:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                      {analysisResult.analysis}
                    </div>
                  </div>
                </div>

                {/* Processing Metadata */}
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Processed with {analysisResult.metadata.model} in {analysisResult.metadata.processingTime}ms
                </div>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload any video file (MP4, MOV, AVI) up to 100MB and 2 minutes. Our system will analyze the visual content.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">AI Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our advanced AI will extract key visual elements, scenes, objects, and actions from your video.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Get Detailed Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive comprehensive video analysis including scene breakdown, visual elements, camera techniques, lighting, and technical specifications.</p>
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
              Our Video to Prompt Generator is an innovative AI-powered tool that transforms your existing videos into detailed analysis for AI video generation platforms. By analyzing your video content, our advanced AI extracts key visual elements, scenes, objects, and actions to create comprehensive analysis that can be used to generate similar or enhanced video content. This tool is perfect for content creators, marketers, and video producers who want to leverage their existing content to create new AI-generated videos with consistent style and messaging.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <h4 className="font-semibold text-sm xs:text-base mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 