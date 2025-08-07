import { type NextRequest, NextResponse } from "next/server"
import { dualAIPipelineService } from "@/lib/services/dual-ai-pipeline"

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

    console.log("🚀 Starting Dual AI Pipeline...")
    console.log("📹 File info:", { 
      name: videoFile.name, 
      size: videoFile.size, 
      type: mimeType 
    })

    // Use dual AI pipeline service
    const result = await dualAIPipelineService.processVideoToVeo3Prompts(
      base64Data, mimeType, videoFile.name
    )

    if (!result.success) {
      console.error("❌ Dual AI Pipeline failed:", result.error)
      return NextResponse.json({ 
        error: result.error || "Failed to process video" 
      }, { status: 500 })
    }

    console.log("🎉 Dual AI Pipeline completed successfully!")
    console.log("📊 Results:", {
      analysisModel: result.data.detailedAnalysis.metadata.model,
      promptModel: result.data.veo3Prompts.metadata.model,
      totalTime: result.data.totalProcessingTime,
      scenesGenerated: result.data.veo3Prompts.scenes.length
    })

    return NextResponse.json({
      success: true,
      detailedAnalysis: result.data.detailedAnalysis,
      veo3Prompts: result.data.veo3Prompts,
      totalProcessingTime: result.data.totalProcessingTime
    })

  } catch (error) {
    console.error("💥 Error in video-to-veo3 API:", error)
    return NextResponse.json({ 
      error: "Failed to process video",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 