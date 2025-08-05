import { type NextRequest, NextResponse } from "next/server"
import { analysisService } from "@/lib/services/analysis-service"

export async function POST(request: NextRequest) {
  try {
    const { imageData, mimeType } = await request.json()

    if (!imageData || !mimeType) {
      return NextResponse.json({ error: "Missing image data or mime type" }, { status: 400 })
    }

    // Remove data URL prefix if present
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, "")

    const result = await analysisService.analyzeImage(base64Data, mimeType)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      jsonOutput: result.data.jsonOutput,
      paragraphOutput: result.data.paragraphOutput,
      metadata: result.data.metadata,
    })
  } catch (error) {
    console.error("Image analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
