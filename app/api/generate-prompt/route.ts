import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    const prompt = `You are a professional video prompt engineer. Create two versions of a video prompt based on this description: "${input}"

1. PARAGRAPH PROMPT: Write a detailed, flowing paragraph that describes the video in natural language. Include visual elements, mood, pacing, and technical details in a narrative format.

2. JSON PROMPT: Create a structured JSON object with the following fields:
- "concept": Brief concept description
- "visual_style": Visual style and aesthetics
- "camera_work": Camera angles and movements
- "lighting": Lighting setup and mood
- "audio": Audio elements and music
- "duration": Suggested duration
- "aspect_ratio": Recommended aspect ratio
- "mood": Overall mood and atmosphere
- "technical_notes": Any technical specifications

Format your response as JSON with "paragraphPrompt" and "jsonPrompt" fields.`

    const result = await aiService.chatCompletion(prompt)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Try to parse the response
    try {
      const parsed = JSON.parse(result.data.response)
      return NextResponse.json({
        success: true,
        paragraphPrompt: parsed.paragraphPrompt || result.data.response,
        jsonPrompt:
          typeof parsed.jsonPrompt === "string" ? parsed.jsonPrompt : JSON.stringify(parsed.jsonPrompt, null, 2),
        fallbackUsed: result.fallbackUsed,
      })
    } catch (parseError) {
      // If parsing fails, create a fallback response
      const response = result.data.response
      const sections = response.split(/(?:PARAGRAPH PROMPT|JSON PROMPT):/i)

      return NextResponse.json({
        success: true,
        paragraphPrompt: sections[1]?.trim() || response,
        jsonPrompt: sections[2]?.trim() || JSON.stringify({ prompt: response }, null, 2),
        fallbackUsed: result.fallbackUsed,
      })
    }
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
