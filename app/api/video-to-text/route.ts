import { type NextRequest, NextResponse } from "next/server"
import { videoToTextService } from "@/lib/services/video-to-text-service"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const videoFile = formData.get('video') as File

    if (!videoFile) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 })
    }

    // Validate file type
    if (!videoFile.type.startsWith('video/') && !videoFile.type.startsWith('audio/')) {
      return NextResponse.json({ error: "Invalid file type. Please upload a video or audio file." }, { status: 400 })
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

    console.log("🎵 Starting Audio/Video to Text conversion...")
    console.log("📹 File info:", { 
      name: videoFile.name, 
      size: videoFile.size, 
      type: mimeType 
    })

    // Use video to text service
    const result = await videoToTextService.extractAudioAndTranscribe(
      base64Data, mimeType, videoFile.name
    )

    if (!result.success) {
      console.error("❌ Audio/Video to Text conversion failed:", result.error)
      return NextResponse.json({ 
        error: result.error || "Failed to convert file to text" 
      }, { status: 500 })
    }

    console.log("✅ Audio/Video to Text conversion completed successfully!")
    console.log("📊 Results:", {
      model: result.data.metadata.model,
      processingTime: result.data.metadata.processingTime,
      transcriptionLength: result.data.transcription.length
    })

    return NextResponse.json({
      success: true,
      transcription: result.data.transcription,
      metadata: result.data.metadata
    })

  } catch (error) {
    console.error("💥 Error in audio/video-to-text API:", error)
    return NextResponse.json({ 
      error: "Failed to convert file to text",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 