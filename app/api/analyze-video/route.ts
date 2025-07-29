import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { videoData } = await request.json()

    if (!videoData) {
      return NextResponse.json({ error: "Missing video data" }, { status: 400 })
    }

    // Remove data URL prefix if present
    const base64Data = videoData.replace(/^data:video\/[a-z0-9]+;base64,/, "")

    const result = await aiService.analyzeVideo(base64Data)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      jsonOutput: result.data.jsonOutput,
      paragraphOutput: result.data.paragraphOutput,
      fallbackUsed: result.fallbackUsed,
    })
  } catch (error) {
    console.error("Video analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze video",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
