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

    // Create JSON-specific prompt
    const jsonPrompt = `You are an expert Veo3 prompt engineer specializing in AI video generation. Your task is to create a structured JSON prompt for Google's Veo3 AI video generator.

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
- Return ONLY a valid JSON object
- Do not include any text before or after the JSON
- Ensure the JSON is properly formatted and valid
- Use the exact structure provided below

OUTPUT FORMAT:
Return ONLY this JSON structure (no additional text):

{
  "scene": "detailed scene description with location, environment, and atmosphere",
  "subject": "main subject details including appearance, clothing, and characteristics",
  "action": "specific actions, movements, and behaviors of the subject",
  "camera": "camera angles, movements, and shot composition details",
  "lighting": "lighting setup, mood, and atmospheric lighting details",
  "audio": "sound effects, background music, and audio elements",
  "technical": {
    "duration": "15-60 seconds",
    "quality": "4K, 30fps",
    "aspect_ratio": "16:9",
    "style": "cinematic"
  }
}

IMPORTANT: Return ONLY the JSON object, no explanations or additional text.`

    console.log("🔍 JSON API - Form Data Received:", JSON.stringify(cleanedData, null, 2))
    console.log("🔍 JSON API - System Prompt:", jsonPrompt)

    // Generate JSON prompt using AI service
    const aiResponse = await aiService.chatCompletion(jsonPrompt)

    if (!aiResponse.success) {
      console.error("AI service error:", aiResponse.error)
      return NextResponse.json(
        { error: "Failed to generate JSON prompt. Please try again." }, 
        { status: 500 }
      )
    }

    console.log("🔍 JSON API - AI Raw Response:", aiResponse.data.response)

    // Extract JSON from response
    let jsonResult = aiResponse.data.response || ""
    
    console.log("🔍 JSON API - Attempting to extract JSON from response...")
    
    // Try to extract JSON from the response
    try {
      // First, try to parse the entire response as JSON
      JSON.parse(jsonResult)
      console.log("🔍 JSON API - Response is already valid JSON")
    } catch (e) {
      console.log("🔍 JSON API - Response is not valid JSON, attempting extraction...")
      
      // Try to extract JSON using regex
      const jsonMatch = jsonResult.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const potentialJson = jsonMatch[0]
        try {
          JSON.parse(potentialJson) // Validate JSON
          jsonResult = potentialJson
          console.log("🔍 JSON API - Successfully extracted JSON using regex")
        } catch (parseError) {
          console.log("🔍 JSON API - Extracted text is not valid JSON, using fallback")
        }
      } else {
        console.log("🔍 JSON API - No JSON pattern found, using fallback")
      }
      
      // If extraction failed, create a fallback
      if (!jsonResult.match(/^\s*\{[\s\S]*\}\s*$/)) {
        jsonResult = `{
  "scene": "A cinematic scene featuring ${cleanedData.mainSubject} in a detailed environment",
  "subject": "${cleanedData.mainSubject} with clear visual characteristics",
  "action": "${cleanedData.sceneAction} with specific movements and behaviors",
  "camera": "Professional camera work with smooth movements and dynamic angles",
  "lighting": "Cinematic lighting with dramatic shadows and atmospheric mood",
  "audio": "Background music appropriate to the scene mood with ambient sound effects",
  "technical": {
    "duration": "15-60 seconds",
    "quality": "4K, 30fps",
    "aspect_ratio": "16:9",
    "style": "cinematic"
  }
}`
        console.log("🔍 JSON API - Using fallback JSON")
      }
    }

    console.log("🔍 JSON API - Final JSON Result:", jsonResult)

    return NextResponse.json({
      success: true,
      jsonPrompt: jsonResult,
      metadata: {
        model: aiResponse.fallbackUsed ? "openrouter/gemini-2.5-flash" : "gemini-2.5-flash",
        processingTime: Date.now() - Date.now(),
        fallbackUsed: aiResponse.fallbackUsed || false
      }
    })

  } catch (error) {
    console.error("Error in generate-veo3-prompt-json:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
} 