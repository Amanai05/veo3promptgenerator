import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Invalid input provided" }, { status: 400 })
    }

    // Simulate AI processing for chat-style prompt generation
    const prompt = `Based on your description: "${input}"

Here's a detailed video prompt for AI generation:

SCENE: ${input}

TECHNICAL SPECIFICATIONS:
- Duration: 15-30 seconds
- Quality: 4K resolution
- Frame rate: 30fps
- Aspect ratio: Determined by platform requirements

VISUAL ELEMENTS:
- Lighting: Professional, well-balanced
- Camera work: Smooth, cinematic movements
- Color grading: Enhanced for visual appeal

AUDIO CONSIDERATIONS:
- Background music: Appropriate to mood
- Sound effects: Natural and immersive
- Voice-over: Clear and engaging if applicable

This prompt is optimized for AI video generation tools like Google's Veo 3.`

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error("Error generating chat prompt:", error)
    return NextResponse.json({ error: "Failed to generate prompt" }, { status: 500 })
  }
}
