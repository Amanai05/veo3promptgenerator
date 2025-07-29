"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Copy, Loader2, Download, Sparkles } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useToast } from "@/hooks/use-toast"

export function VideoTranscription() {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [language, setLanguage] = useState("auto")
  const [format, setFormat] = useState("timestamps")
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedVideo(reader.result as string)
        processVideo(file)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
    },
    multiple: false,
  })

  const processVideo = async (file: File) => {
    setIsProcessing(true)

    setTimeout(() => {
      const mockTranscription = `[00:00:00] Welcome to our comprehensive guide on modern web development and AI integration. In today's rapidly evolving digital landscape, staying current with the latest technologies is crucial.

[00:00:15] We'll be covering several key topics including responsive design principles, performance optimization techniques, and the importance of accessibility in modern applications.

[00:00:30] First, let's discuss the fundamentals of responsive design. With the increasing variety of devices and screen sizes, it's essential that our websites adapt seamlessly.

[00:00:45] CSS Grid and Flexbox have revolutionized how we approach layout design, providing powerful tools for creating flexible and maintainable layouts.

[00:01:00] Performance optimization is another critical aspect we'll explore. From image optimization to code splitting, there are numerous strategies to ensure fast loading.

[00:01:15] We'll also delve into accessibility best practices, ensuring that our applications are usable by everyone, regardless of their abilities or assistive technologies.

[00:01:30] AI integration is becoming increasingly important in modern web development. Tools like machine learning APIs and natural language processing are transforming user experiences.

[00:01:45] Thank you for joining us on this journey through modern web development. Let's begin with our first topic and explore these exciting technologies together.`

      setTranscription(mockTranscription)
      setIsProcessing(false)

      toast({
        title: "Video transcribed successfully!",
        description: "Your transcription is ready for download.",
      })
    }, 3500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription)
    toast({
      title: "Transcription copied!",
      description: "Content has been copied to your clipboard.",
    })
  }

  const downloadTranscription = () => {
    const blob = new Blob([transcription], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transcription.${format === "srt" ? "srt" : "txt"}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download started!",
      description: "Your transcription file is being downloaded.",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Upload Section */}
      <div className="lg:col-span-1">
        <Card className="h-full bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
              <FileText className="h-5 w-5" />
              Upload Video
            </CardTitle>
            <CardDescription className="text-xs">Upload a video to extract and transcribe audio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors min-h-[180px] flex flex-col justify-center ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              {uploadedVideo ? (
                <div className="space-y-3">
                  <div className="relative max-w-full mx-auto">
                    <video
                      src={uploadedVideo}
                      className="w-full max-h-24 rounded-lg shadow-lg object-cover"
                      controls
                      preload="metadata"
                    />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Video uploaded
                  </Badge>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isDragActive ? "Drop video here" : "Drag & drop video"}
                    </p>
                    <p className="text-xs text-muted-foreground">MP4, AVI, MOV, WebM</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-8 text-xs bg-background border-border">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Format</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="h-8 text-xs bg-background border-border">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="timestamps">With Timestamps</SelectItem>
                    <SelectItem value="text">Plain Text</SelectItem>
                    <SelectItem value="srt">SRT Subtitles</SelectItem>
                    <SelectItem value="vtt">WebVTT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {uploadedVideo && (
              <Button onClick={() => processVideo(new File([], "video"))} className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Transcribing...
                  </>
                ) : (
                  "Generate Transcript"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transcription Output */}
      <div className="lg:col-span-1">
        <Card className="h-full bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg text-card-foreground">
              Transcription Result
              {transcription && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="text-xs bg-transparent">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadTranscription}
                    className="text-xs bg-transparent"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-xs">
              {format === "timestamps" && "Text with timestamps for easy navigation"}
              {format === "text" && "Clean text without timestamps"}
              {format === "srt" && "SRT subtitle format for video players"}
              {format === "vtt" && "WebVTT format for web video players"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-primary loading-glow" />
                  <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-accent animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-primary">Loading your transcript with AI magic...</p>
                  <p className="text-xs text-muted-foreground">Processing audio content</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={transcription}
                readOnly
                className="min-h-[400px] font-mono text-xs resize-none bg-background text-foreground border-border"
                placeholder="Transcription will appear here..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
