import { type NextRequest, NextResponse } from "next/server"
import { veo3PromptService } from "@/lib/services/veo3-prompt-service"

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    const result = await veo3PromptService.generateVeo3Prompt(input)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      paragraphPrompt: result.data.paragraphPrompt,
      jsonPrompt: result.data.jsonPrompt,
      metadata: result.data.metadata,
    })
  } catch (error) {
    console.error("Prompt generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate prompt",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
