import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.mainSubject?.trim() || !formData.sceneAction?.trim()) {
      return NextResponse.json(
        { error: "Main subject and scene action are required. Please fill in the context/description field." }, 
        { status: 400 }
      )
    }

    // Clean and validate input data
    const cleanedData = {
      mainSubject: formData.mainSubject.trim(),
      sceneAction: formData.sceneAction.trim(),
      dialogue: formData.dialogue?.trim() || undefined,
      cameraMovement: formData.cameraMovement?.trim() || undefined,
      otherDetails: formData.otherDetails?.trim() || undefined,
      subtitles: formData.subtitles || undefined
    }

    // Generate Veo3 prompt using AI service
    const aiResponse = await aiService.generateVeo3Prompt(cleanedData)

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
    console.error("Error in generate-veo3-prompt:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}
