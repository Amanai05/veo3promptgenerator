import { type NextRequest, NextResponse } from "next/server"
import { videoScriptService } from "@/lib/services/video-script-service"

export async function POST(request: NextRequest) {
  try {
    const { videoTopic, audience, scriptLength, scriptStyle, language } = await request.json()

    if (!videoTopic || !audience || !scriptLength || !scriptStyle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate input length
    if (videoTopic.length > 1500) {
      return NextResponse.json({ error: "Video topic is too long. Maximum 1500 characters allowed." }, { status: 400 })
    }

    console.log("Generating video script with AI...")
    console.log("Form data:", { videoTopic, audience, scriptLength, scriptStyle, language })

    // Use dedicated video script service
    const result = await videoScriptService.generateVideoScript({
      videoTopic,
      audience,
      scriptLength,
      scriptStyle,
      language
    })

    if (!result.success) {
      console.error("AI service error:", result.error)
      return NextResponse.json({ 
        error: result.error || "Failed to generate script with AI" 
      }, { status: 500 })
    }

    console.log("Script generated successfully")
    console.log("Model used:", result.data.metadata.model)
    console.log("Processing time:", result.data.metadata.processingTime, "ms")

    return NextResponse.json({ 
      script: result.data.script,
      metadata: result.data.metadata
    })

  } catch (error) {
    console.error("Error generating video script:", error)
    return NextResponse.json({ 
      error: "Failed to generate script",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
