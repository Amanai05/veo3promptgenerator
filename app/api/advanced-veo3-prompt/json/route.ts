import { NextResponse } from "next/server"
import { advancedAIService } from "@/lib/advanced-ai-service"

export async function POST(request: Request) {
  try {
    const { formData, dialogueSetting = "no" } = await request.json()

    if (!formData || typeof formData !== "object") {
      return NextResponse.json(
        { error: "Form data is required and must be an object" },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!formData.mainSubject || !formData.sceneAction) {
      return NextResponse.json(
        { error: "Main subject and scene action are required" },
        { status: 400 }
      )
    }

    const aiResponse = await advancedAIService.generateJSONPrompt(formData, dialogueSetting)

    if (!aiResponse.success) {
      return NextResponse.json(
        { error: aiResponse.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      jsonPrompt: aiResponse.data.jsonPrompt,
      metadata: aiResponse.data.metadata
    })

  } catch (error) {
    console.error("Advanced JSON API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 