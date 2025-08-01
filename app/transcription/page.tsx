"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useCallback } from "react"
import { Loader2, Upload, FileVideo, X, Download, Mic, Languages, Clock, Users, Brain, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToolNavigation } from "@/components/tool-navigation"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-black dark:from-black dark:from-black">
      <div className="max-w-[720px] mx-auto px-2 xs:px-3 sm:px-4 pt-6 xs:pt-8 sm:pt-10">
        {/* Headline with Accent Color */}
        <h1 className="text-center text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-bold mb-2 xs:mb-3 px-1">
          Video Transcription <span className="text-orange-600">Free Online</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 xs:mb-6 max-w-2xl mx-auto text-sm xs:text-base px-2">
          Convert your video audio into accurate text transcriptions. Support for 14+ languages with automatic detection and timestamps.
        </p>

        {/* Navigation Tabs */}
        <ToolNavigation activeTool="transcription" />

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
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500"
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
                    <Video className="h-4 w-4 text-orange-600" />
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

            {/* Language Selection */}
            <div className="mb-4 xs:mb-6">
              <label className="text-sm xs:text-base font-bold mb-2 block">Language:</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="min-h-[48px] px-4 text-sm xs:text-base rounded-lg">
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
            <div className="flex gap-3 xs:gap-4">
              <Button
                onClick={transcribeVideo}
                disabled={isTranscribing || !uploadedVideo}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-10 xs:h-12 text-sm xs:text-base font-medium rounded-lg"
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transcribing...
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Transcribe Video
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="h-10 xs:h-12 px-4 xs:px-6 text-sm xs:text-base rounded-lg"
                disabled={isTranscribing || (!uploadedVideo && !transcription)}
              >
                Clear
              </Button>
            </div>

            {/* Result Container */}
            {transcription && (
              <div className="mt-4 xs:mt-6 p-4 xs:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm xs:text-base">Transcription:</h4>
                  <Button
                    onClick={downloadTranscription}
                    variant="outline"
                    size="sm"
                    className="text-sm h-8 px-3"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap text-sm xs:text-base overflow-x-auto">{transcription}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How Video Transcription Works */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-orange-600 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              How Video Transcription Works
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Upload Your Video</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload any video file (MP4, MOV, AVI) up to 100MB. Our system will extract the audio for transcription.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">AI Transcription</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our advanced AI transcribes the audio with high accuracy, supporting 14+ languages with automatic detection.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xs:text-base mb-1">Download & Use</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get your transcription with timestamps. Download as text file for use in subtitles, content analysis, or documentation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simple Paragraph About the Tool */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mb-6 xs:mb-8 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardContent className="p-4 xs:p-5">
            <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4 text-orange-600">About Video Transcription</h3>
            <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Video Transcription tool is a powerful AI-powered solution that extracts and converts audio from your videos into accurate text transcriptions. Supporting 14+ languages with automatic detection, this tool is perfect for content creators, businesses, educators, and anyone who needs to convert video content into searchable, accessible text. The transcription includes timestamps for easy navigation and can be downloaded for use in subtitles, content analysis, or documentation purposes.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 mx-1 xs:mx-2 sm:mx-0 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-orange-600">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 xs:p-5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm xs:text-base">What languages are supported?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  We support 14+ languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean, Arabic, Hindi, and more. The system automatically detects the language in your video.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm xs:text-base">How accurate is the transcription?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Our AI provides highly accurate transcriptions with industry-leading accuracy rates. The quality depends on audio clarity, background noise, and speaker pronunciation, but typically achieves 95%+ accuracy for clear audio.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm xs:text-base">Do you include timestamps?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! All transcriptions include timestamps for easy navigation and reference. This makes it perfect for creating subtitles, finding specific moments in your video, or analyzing content structure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm xs:text-base">Can I download the transcription?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  Absolutely! You can download your transcription as a text file (.txt) with timestamps. This makes it easy to use in video editing software, create subtitles, or archive for future reference.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 