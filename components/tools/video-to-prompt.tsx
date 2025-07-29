"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Video, Copy, Loader2, Sparkles, Play } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useToast } from "@/hooks/use-toast"

export function VideoToPrompt() {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [jsonOutput, setJsonOutput] = useState("")
  const [paragraphOutput, setParagraphOutput] = useState("")
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
      const mockJsonOutput = {
        video_analysis: {
          duration: "2:34",
          resolution: "1920x1080",
          fps: 30,
          main_scenes: [
            "Person walking in urban environment",
            "Close-up of architectural details",
            "Wide shot of city skyline",
          ],
          dominant_colors: ["gray", "blue", "white", "black"],
          mood: "modern, urban, dynamic",
          camera_movements: ["pan", "tilt", "zoom", "tracking"],
          audio_elements: ["ambient city sounds", "footsteps", "traffic"],
          key_objects: ["buildings", "person", "street", "cars", "windows"],
          lighting_conditions: "natural daylight with some shadows",
        },
        scene_breakdown: [
          {
            timestamp: "0:00-0:45",
            description: "Opening shot of modern city architecture with geometric patterns",
            camera_angle: "low angle",
            movement: "static to slow pan",
          },
          {
            timestamp: "0:45-1:30",
            description: "Person walking through urban landscape, medium shot",
            camera_angle: "eye level",
            movement: "tracking shot",
          },
          {
            timestamp: "1:30-2:34",
            description: "Panoramic view of city skyline at golden hour",
            camera_angle: "high angle",
            movement: "wide pan with zoom out",
          },
        ],
        technical_details: {
          estimated_equipment: "Professional camera with stabilization",
          color_grading: "Cool tones with warm highlights",
          editing_style: "Clean cuts with smooth transitions",
        },
      }

      const mockParagraphOutput = `This compelling urban narrative unfolds over 2 minutes and 34 seconds, showcasing the dynamic relationship between human presence and contemporary metropolitan architecture. The footage opens with striking architectural details of modern buildings, featuring clean geometric lines and glass facades that reflect the surrounding cityscape. The cinematography employs professional camera work with smooth panning movements and strategic angle changes that emphasize the scale and grandeur of the urban environment. A central figure moves through this concrete landscape, creating a powerful sense of scale and human connection to the metropolitan setting. The color palette is dominated by cool grays and blues, punctuated by warm golden highlights during the concluding sequences. The camera work demonstrates excellent technical execution with fluid tracking shots, thoughtful composition, and seamless transitions between wide establishing shots and more intimate medium shots. The video concludes with a breathtaking panoramic view of the city skyline during golden hour, where the interplay of natural light and architectural elements creates a visually stunning finale. The ambient audio layer includes authentic urban soundscapes - distant traffic, footsteps on pavement, and the subtle hum of city life - which enhances the immersive metropolitan experience and adds depth to the visual narrative.`

      setJsonOutput(JSON.stringify(mockJsonOutput, null, 2))
      setParagraphOutput(mockParagraphOutput)
      setIsProcessing(false)

      toast({
        title: "Video processed successfully!",
        description: "Your detailed video prompts have been generated.",
      })
    }, 4000)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${type} copied!`,
      description: "Content has been copied to your clipboard.",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Upload Section */}
      <div className="lg:col-span-1">
        <Card className="h-full bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
              <Video className="h-5 w-5" />
              Upload Video
            </CardTitle>
            <CardDescription className="text-xs">Upload a video to generate comprehensive prompts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors min-h-[200px] flex flex-col justify-center ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              {uploadedVideo ? (
                <div className="space-y-3">
                  <div className="relative max-w-full mx-auto">
                    <video
                      src={uploadedVideo}
                      className="w-full max-h-32 rounded-lg shadow-lg object-cover"
                      controls
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Play className="h-8 w-8 text-white/80 drop-shadow-lg" />
                    </div>
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

            {uploadedVideo && (
              <Button onClick={() => processVideo(new File([], "video"))} className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Generate Prompts"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Output Sections - Stacked Vertically */}
      <div className="lg:col-span-1 space-y-4">
        {/* JSON Output */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base text-card-foreground">
              JSON Analysis
              {jsonOutput && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(jsonOutput, "JSON")}
                  className="text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              )}
            </CardTitle>
            <CardDescription className="text-xs">Scene breakdown with timestamps and technical details</CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin text-primary loading-glow" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-accent animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-primary">AI magic is happening...</p>
                  <p className="text-xs text-muted-foreground">Loading your prompt</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={jsonOutput}
                readOnly
                className="min-h-[150px] font-mono text-xs resize-none bg-background text-foreground border-border"
                placeholder="JSON analysis will appear here..."
              />
            )}
          </CardContent>
        </Card>

        {/* Paragraph Output */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base text-card-foreground">
              Narrative Description
              {paragraphOutput && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(paragraphOutput, "Paragraph")}
                  className="text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              )}
            </CardTitle>
            <CardDescription className="text-xs">Comprehensive narrative of video content</CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin text-primary loading-glow" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-accent animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-primary">AI magic is happening...</p>
                  <p className="text-xs text-muted-foreground">Loading your prompt</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={paragraphOutput}
                readOnly
                className="min-h-[150px] text-xs resize-none bg-background text-foreground border-border"
                placeholder="Video description will appear here..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
