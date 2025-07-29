import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { mainSubject, sceneAction, dialogue, cameraMovement, otherDetails, subtitles } = await request.json()

    if (!mainSubject || !sceneAction) {
      return NextResponse.json({ error: "Main subject and scene action are required" }, { status: 400 })
    }

    // Generate structured prompt based on form inputs
    let prompt = `MAIN SUBJECT: ${mainSubject}

SCENE ACTION: ${sceneAction}`

    if (dialogue) {
      prompt += `

DIALOGUE/AUDIO: ${dialogue}`
    }

    if (cameraMovement) {
      prompt += `

CAMERA WORK: ${cameraMovement}`
    }

    if (otherDetails) {
      prompt += `

ADDITIONAL DETAILS: ${otherDetails}`
    }

    if (subtitles) {
      prompt += `

SUBTITLES: ${subtitles === "yes" ? "Include subtitles" : "No subtitles required"}`
    }

    prompt += `

TECHNICAL SPECIFICATIONS:
- Quality: 4K resolution
- Frame rate: 30fps
- Duration: 15-60 seconds
- Lighting: Professional, cinematic
- Color grading: Enhanced for visual appeal

This prompt is optimized for AI video generation tools like Google's Veo 3.`

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error("Error generating advanced prompt:", error)
    return NextResponse.json({ error: "Failed to generate prompt" }, { status: 500 })
  }
}
