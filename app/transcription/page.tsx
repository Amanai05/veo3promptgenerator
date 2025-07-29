"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useCallback } from "react"
import { Loader2, Upload, FileVideo, X, Download, Mic, Languages, Clock, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useDropzone } from "react-dropzone"

export default function TranscriptionPage() {
  const [activeTab, setActiveTab] = useState("transcription")
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null)
  const [language, setLanguage] = useState("auto")
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
    setTranscription("")
  }

  const transcribeVideo = async () => {
    if (!uploadedVideo) {
      toast({
        title: "No video uploaded",
        description: "Please upload a video file first.",
        variant: "destructive",
      })
      return
    }

    setIsTranscribing(true)
    setTranscription("")

    try {
      const formData = new FormData()
      formData.append('video', uploadedVideo)
      formData.append('language', language)

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to transcribe video")

      setTranscription(data.transcription)
      toast({
        title: "Transcription completed!",
        description: "Your video has been transcribed successfully.",
      })
    } catch (error) {
      console.error("Error transcribing video:", error)
      toast({
        title: "Transcription failed",
        description: error instanceof Error ? error.message : "Failed to transcribe video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTranscribing(false)
    }
  }

  const downloadTranscription = () => {
    if (!transcription) return

    const blob = new Blob([transcription], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transcription-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download started!",
      description: "Your transcription file is being downloaded.",
    })
  }

  const clearAll = () => {
    setUploadedVideo(null)
    setTranscription("")
    setLanguage("auto")
  }

  const languages = [
    { value: "auto", label: "Auto Detect" },
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "zh", label: "Chinese" },
    { value: "ar", label: "Arabic" },
    { value: "hi", label: "Hindi" },
    { value: "vi", label: "Vietnamese" },
  ]

  const faqs = [
    {
      question: "What video formats are supported for transcription?",
      answer: "We support all major video formats including MP4, AVI, MOV, WMV, FLV, and WebM. Files up to 100MB can be uploaded for transcription."
    },
    {
      question: "How accurate is the transcription?",
      answer: "Our AI transcription achieves 95%+ accuracy with clear audio. Accuracy depends on audio quality, background noise, and speaker clarity."
    },
    {
      question: "What languages are supported?",
      answer: "We support 14+ languages including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, and Vietnamese with auto-detection."
    },
    {
      question: "Can I get timestamps with the transcription?",
      answer: "Yes! Our transcription includes timestamps for each segment, making it easy to navigate and reference specific parts of your video."
    },
    {
      question: "How long does transcription take?",
      answer: "Transcription typically takes 1-3 minutes depending on video length and audio quality. Our optimized AI ensures fast and reliable results."
    },
    {
      question: "Can I use the transcriptions commercially?",
      answer: "Absolutely! All generated transcriptions are yours to use for any purpose, including commercial projects, subtitles, and content analysis."
    }
  ]

  return (
    <main>
      <section className="py-3 xs:py-4 sm:py-6 bg-background">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto">
            {/* Headline with Accent Color */}
            <h1 className="text-center text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 px-2">
              Video <span className="text-orange-600">Transcription</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base px-3 xs:px-4">
              Extract and transcribe audio from your videos with AI precision. Support for multiple languages and high accuracy transcription.
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
                  <Link href="/video-to-prompt" className="w-full">
                    <Button variant="outline" className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 truncate">
                      Video to Prompt Generator
                    </Button>
                  </Link>
                  <Button className="w-full h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium bg-orange-600 hover:bg-orange-700 text-white truncate">
                    Video Transcription
                  </Button>
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
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-orange-400'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 mx-auto mb-2 xs:mb-4 text-gray-400" />
                      {isDragActive ? (
                        <p className="text-orange-600 font-medium text-sm xs:text-base">Drop the video here...</p>
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
                          <FileVideo className="h-5 w-5 xs:h-6 xs:w-6 text-orange-600" />
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

                {/* Language Selection */}
                <div className="mb-4 xs:mb-6">
                  <label className="text-xs xs:text-sm sm:text-base font-bold mb-2 block">
                    Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="text-xs xs:text-sm sm:text-base">
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
                    onClick={transcribeVideo}
                    disabled={isTranscribing || !uploadedVideo}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-10 xs:h-12 sm:h-14 text-xs xs:text-sm sm:text-base font-medium"
                  >
                    {isTranscribing ? (
                      <>
                        <Loader2 className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2 animate-spin" />
                        Transcribing...
                      </>
                    ) : (
                      <>
                        <Mic className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-1 xs:mr-2" />
                        Transcribe Video
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    className="h-10 xs:h-12 sm:h-14 px-4 xs:px-6 text-xs xs:text-sm sm:text-base"
                    disabled={isTranscribing || (!uploadedVideo && !transcription)}
                  >
                    Reset
                  </Button>
                </div>

                {/* Result Container */}
                {transcription && (
                  <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-xs xs:text-sm sm:text-base">Transcription:</h4>
                      <Button
                        onClick={downloadTranscription}
                        variant="outline"
                        size="sm"
                        className="h-7 xs:h-8 px-2 xs:px-3 text-xs"
                      >
                        <Download className="h-3 w-3 xs:h-4 xs:w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <pre className="whitespace-pre-wrap text-xs xs:text-sm sm:text-base overflow-x-auto">{transcription}</pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How Video Transcription Works */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-orange-600 flex items-center gap-2">
                  <Mic className="h-5 w-5 xs:h-6 xs:w-6" />
                  How Video Transcription Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 xs:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div className="space-y-3 xs:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Languages className="h-4 w-4 xs:h-5 xs:w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Multi-Language Support</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Supports 14+ languages with automatic language detection for accurate transcription.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 xs:h-5 xs:w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Timestamp Support</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Includes timestamps for each segment to help navigate and reference specific parts.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 xs:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 xs:h-5 xs:w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">High Accuracy</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Achieves 95%+ accuracy with clear audio, adapting to different speakers and accents.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Download className="h-4 w-4 xs:h-5 xs:w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm xs:text-base">Easy Export</h4>
                        <p className="text-xs xs:text-sm text-muted-foreground">Download transcriptions as text files for use in subtitles, content analysis, or documentation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Paragraph About the Tool */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-3 xs:mx-4 sm:mx-0">
              <CardContent className="p-4 xs:p-6">
                <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-orange-600">About Video Transcription</h3>
                <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our Video Transcription tool is a powerful AI-powered solution that extracts and converts audio from your videos into accurate text transcriptions. Supporting 14+ languages with automatic detection, this tool is perfect for content creators, businesses, educators, and anyone who needs to convert video content into searchable, accessible text. The transcription includes timestamps for easy navigation and can be downloaded for use in subtitles, content analysis, or documentation purposes.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 mx-3 xs:mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-orange-600">Frequently Asked Questions</CardTitle>
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