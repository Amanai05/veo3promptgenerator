import { type NextRequest, NextResponse } from "next/server"
import { videoAnalysisService } from "@/lib/services/video-analysis-service"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const videoFile = formData.get('video') as File

    if (!videoFile) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 })
    }

    // Validate file type
    if (!videoFile.type.startsWith('video/')) {
      return NextResponse.json({ error: "Invalid file type. Please upload a video file." }, { status: 400 })
    }

    // Validate file size (100MB limit)
    const MAX_FILE_SIZE = 100 * 1024 * 1024
    if (videoFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is 100MB. Current size: ${(videoFile.size / (1024 * 1024)).toFixed(1)}MB` 
      }, { status: 400 })
    }

    // Convert file to base64
    const arrayBuffer = await videoFile.arrayBuffer()
    const base64Data = Buffer.from(arrayBuffer).toString('base64')
    const mimeType = videoFile.type

    console.log("Analyzing video with Gemini 2.5 Pro...")
    console.log("File info:", { 
      name: videoFile.name, 
      size: videoFile.size, 
      type: mimeType 
    })

    // Use video analysis service
    const result = await videoAnalysisService.analyzeVideo(base64Data, mimeType, videoFile.name)

    if (!result.success) {
      console.error("Video analysis error:", result.error)
      return NextResponse.json({ 
        error: result.error || "Failed to analyze video" 
      }, { status: 500 })
    }

    console.log("Video analysis completed successfully")
    console.log("Model used:", result.data.metadata.model)
    console.log("Processing time:", result.data.metadata.processingTime, "ms")

    return NextResponse.json({
      success: true,
      analysis: result.data.analysis,
      metadata: result.data.metadata
    })

  } catch (error) {
    console.error("Error analyzing video:", error)
    return NextResponse.json({ 
      error: "Failed to analyze video",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 