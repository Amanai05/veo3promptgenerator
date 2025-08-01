import { type NextRequest, NextResponse } from "next/server"
import { simpleAIService } from "@/lib/simple-ai-service"

export async function POST(request: Request) {
  try {
    const { input, dialogueSetting = "no" } = await request.json()

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Input is required and must be a string" },
        { status: 400 }
      )
    }

    const aiResponse = await simpleAIService.generateJSONPrompt(input, dialogueSetting)

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
    console.error("JSON API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 