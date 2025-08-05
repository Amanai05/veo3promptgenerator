import { type NextRequest, NextResponse } from "next/server"
import { analysisService } from "@/lib/services/analysis-service"

export async function POST(request: NextRequest) {
  try {
    const { audioData, language, format } = await request.json()

    if (!audioData) {
      return NextResponse.json({ error: "Missing audio data" }, { status: 400 })
    }

    // Remove data URL prefix if present
    const base64Data = audioData.replace(/^data:audio\/[a-z0-9]+;base64,/, "")

    const result = await analysisService.transcribeAudio(base64Data, format || "audio/wav")

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      transcription: result.data?.transcription,
      metadata: result.data?.metadata,
    })
  } catch (error) {
    console.error("Audio transcription error:", error)
    return NextResponse.json(
      {
        error: "Failed to transcribe audio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
