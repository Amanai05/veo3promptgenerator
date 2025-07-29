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

    // Create paragraph-specific prompt
    const paragraphPrompt = `You are an expert Veo3 prompt engineer specializing in AI video generation. Your task is to create a detailed paragraph prompt for Google's Veo3 AI video generator.

USER INPUT:
- Main Subject: ${cleanedData.mainSubject}
- Scene Action: ${cleanedData.sceneAction}
${cleanedData.dialogue ? `- Dialogue: ${cleanedData.dialogue}` : ''}
${cleanedData.cameraMovement ? `- Camera Movement: ${cleanedData.cameraMovement}` : ''}
${cleanedData.otherDetails ? `- Additional Details: ${cleanedData.otherDetails}` : ''}
${cleanedData.subtitles ? `- Subtitles: ${cleanedData.subtitles}` : ''}

REQUIREMENTS:
- Optimize specifically for Google's Veo3 AI video generation
- Duration: 15-60 seconds
- Quality: 4K resolution, 30fps
- Professional cinematic quality
- Include all visual and audio elements

CRITICAL INSTRUCTIONS:
- Write a single, flowing paragraph
- Be descriptive and cinematic
- Include all technical specifications
- Make it engaging and ready for immediate use

OUTPUT FORMAT:
Write a detailed, cinematic paragraph that includes:

1. SCENE DESCRIPTION: Location, environment, atmosphere, and setting details
2. SUBJECT DETAILS: Main subject appearance, clothing, characteristics, and behavior
3. VISUAL ELEMENTS: Camera angles, movements, shot composition, and framing
4. LIGHTING: Lighting setup, mood, shadows, and atmospheric effects
5. AUDIO ELEMENTS: Background music, sound effects, dialogue, and ambient sounds
6. TECHNICAL SPECS: Duration, quality, aspect ratio, and cinematic style
7. EMOTIONAL TONE: Mood, atmosphere, and emotional impact

Create a compelling, descriptive paragraph that brings the scene to life and is optimized for Veo3 AI video generation.`

    console.log("🔍 Paragraph API - Form Data Received:", JSON.stringify(cleanedData, null, 2))
    console.log("🔍 Paragraph API - System Prompt:", paragraphPrompt)

    // Generate paragraph prompt using AI service
    const aiResponse = await aiService.chatCompletion(paragraphPrompt)

    if (!aiResponse.success) {
      console.error("AI service error:", aiResponse.error)
      return NextResponse.json(
        { error: "Failed to generate paragraph prompt. Please try again." }, 
        { status: 500 }
      )
    }

    console.log("🔍 Paragraph API - AI Raw Response:", aiResponse.data.response)

    // Extract paragraph from response
    let paragraphResult = aiResponse.data.response || ""
    
    // If response is empty, create a fallback
    if (!paragraphResult.trim()) {
      paragraphResult = `Create a cinematic video scene featuring ${cleanedData.mainSubject}. The scene should depict ${cleanedData.sceneAction} with professional camera work, cinematic lighting, and appropriate background music. The video should be 15-60 seconds in duration, shot in 4K resolution at 30fps, with a 16:9 aspect ratio and cinematic style.${cleanedData.dialogue ? ` Include dialogue: ${cleanedData.dialogue}.` : ''}${cleanedData.cameraMovement ? ` Use camera movement: ${cleanedData.cameraMovement}.` : ''}${cleanedData.otherDetails ? ` Additional details: ${cleanedData.otherDetails}.` : ''}${cleanedData.subtitles ? ` Include subtitles: ${cleanedData.subtitles}.` : ''}`
    }

    console.log("🔍 Paragraph API - Final Paragraph Result:", paragraphResult)

    return NextResponse.json({
      success: true,
      paragraphPrompt: paragraphResult,
      metadata: {
        model: aiResponse.fallbackUsed ? "openrouter/gemini-2.5-flash" : "gemini-2.5-flash",
        processingTime: Date.now() - Date.now(),
        fallbackUsed: aiResponse.fallbackUsed || false
      }
    })

  } catch (error) {
    console.error("Error in generate-veo3-prompt-paragraph:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
} 