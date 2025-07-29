import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { message, attachedFiles, conversationHistory } = await request.json()

    if (!message && (!attachedFiles || attachedFiles.length === 0)) {
      return NextResponse.json({ error: "Message or files required" }, { status: 400 })
    }

    const result = await aiService.chatCompletion(message, attachedFiles, conversationHistory)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      ...result.data,
      fallbackUsed: result.fallbackUsed,
    })
  } catch (error) {
    console.error("Chat completion error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
