"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Copy, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useToast } from "@/hooks/use-toast"

export function ImageToPrompt() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [jsonOutput, setJsonOutput] = useState("")
  const [paragraphOutput, setParagraphOutput] = useState("")
  const [fallbackUsed, setFallbackUsed] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  })

  const processImage = async () => {
    if (!uploadedFile || !uploadedImage) return

    setIsProcessing(true)
    setJsonOutput("")
    setParagraphOutput("")
    setFallbackUsed(false)

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: uploadedImage,
          mimeType: uploadedFile.type,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image")
      }

      setJsonOutput(data.jsonOutput)
      setParagraphOutput(data.paragraphOutput)
      setFallbackUsed(data.fallbackUsed || false)

      if (data.fallbackUsed) {
        toast({
          title: "Using backup AI",
          description: "Primary API was busy, used OpenRouter fallback successfully",
        })
      } else {
        toast({
          title: "Image processed successfully!",
          description: "Your detailed prompts have been generated using AI.",
        })
      }
    } catch (error) {
      console.error("Error processing image:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to process image"

      if (errorMessage.includes("credits") || errorMessage.includes("upgrade")) {
        toast({
          title: "API Credit Issue",
          description: "OpenRouter needs more credits. Please upgrade your account.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Processing failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsProcessing(false)
    }
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
              <ImageIcon className="h-5 w-5" />
              Upload Image
              {fallbackUsed && (
                <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Backup AI
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-xs">Upload an image to generate detailed AI prompts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors min-h-[200px] flex flex-col justify-center ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              {uploadedImage ? (
                <div className="space-y-3">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded"
                    className="max-w-full max-h-32 mx-auto rounded-lg shadow-lg object-cover"
                  />
                  <Badge variant="secondary" className="text-xs">
                    Image uploaded • {uploadedFile?.name}
                  </Badge>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isDragActive ? "Drop image here" : "Drag & drop image"}
                    </p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, GIF, WebP (max 10MB)</p>
                  </div>
                </div>
              )}
            </div>

            {uploadedImage && (
              <Button onClick={processImage} className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Prompts
                  </>
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
              JSON Prompt
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
            <CardDescription className="text-xs">Detailed structured data for developers</CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin text-primary loading-glow" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-accent animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-primary">AI is analyzing your image...</p>
                  <p className="text-xs text-muted-foreground">This may take a few moments</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={jsonOutput}
                readOnly
                className="min-h-[150px] font-mono text-xs resize-none bg-background text-foreground border-border"
                placeholder="JSON output will appear here after AI analysis..."
              />
            )}
          </CardContent>
        </Card>

        {/* Paragraph Output */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base text-card-foreground">
              Paragraph Prompt
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
            <CardDescription className="text-xs">Human-readable description for creators</CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin text-primary loading-glow" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-accent animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-primary">AI is creating your description...</p>
                  <p className="text-xs text-muted-foreground">Generating creative prompts</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={paragraphOutput}
                readOnly
                className="min-h-[150px] text-xs resize-none bg-background text-foreground border-border"
                placeholder="Paragraph description will appear here after AI analysis..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
