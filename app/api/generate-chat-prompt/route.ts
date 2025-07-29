import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "Valid input description is required" }, { status: 400 })
    }

    // Create form data structure from chat input
    const formData = {
      mainSubject: "From user description",
      sceneAction: input.trim(),
      dialogue: undefined,
      cameraMovement: undefined,
      otherDetails: undefined,
      subtitles: undefined
    }

    // Generate Veo3 prompt using AI service
    const aiResponse = await aiService.generateVeo3Prompt(formData)

    if (!aiResponse.success) {
      console.error("AI service error:", aiResponse.error)
      return NextResponse.json(
        { error: "Failed to generate prompt. Please try again." }, 
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      jsonPrompt: aiResponse.data.jsonPrompt,
      paragraphPrompt: aiResponse.data.paragraphPrompt,
      metadata: aiResponse.data.metadata
    })

  } catch (error) {
    console.error("Error in generate-chat-prompt:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}
