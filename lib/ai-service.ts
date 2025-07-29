interface AIResponse {
  success: boolean
  data?: any
  error?: string
  fallbackUsed?: boolean
}

interface ImageAnalysisResult {
  jsonOutput: string
  paragraphOutput: string
}

interface VideoAnalysisResult {
  jsonOutput: string
  paragraphOutput: string
}

interface TranscriptionResult {
  transcription: string
}

interface ChatResponse {
  detailedPrompt: string
  paragraphPrompt: string
  ideaText: string
}

interface Veo3PromptResponse {
  jsonPrompt: string
  paragraphPrompt: string
  metadata: {
    model: string
    processingTime: number
    fallbackUsed: boolean
  }
}

class GeminiDirectAPI {
  private apiKey: string
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}?key=${this.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini Direct API error: ${response.status} - ${errorText}`)
    }

    return response.json()
  }

  async generateContent(prompt: string, files?: Array<{ data: string; mimeType: string }>): Promise<string> {
    const parts = [{ text: prompt }]

    if (files && files.length > 0) {
      files.forEach((file) => {
        parts.push({
          inline_data: {
            mime_type: file.mimeType,
            data: file.data,
          },
        })
      })
    }

    const data = {
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500, // Reduced from 2048
      },
    }

    const response = await this.makeRequest("/models/gemini-2.5-flash:generateContent", data)
    return response.candidates[0]?.content?.parts[0]?.text || ""
  }
}

class OpenRouterAPI {
  private apiKey: string
  private baseUrl = "https://openrouter.ai/api/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "veo3promptgenerator",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = `OpenRouter API error: ${response.status}`

      try {
        const errorData = JSON.parse(errorText)
        if (errorData.error?.message) {
          errorMessage = errorData.error.message
        }
      } catch {
        errorMessage += ` - ${errorText}`
      }

      throw new Error(errorMessage)
    }

    return response.json()
  }

  async generateContent(prompt: string, files?: Array<{ data: string; mimeType: string }>): Promise<string> {
    const messages = [
      {
        role: "user",
        content:
          files && files.length > 0
            ? [
                { type: "text", text: prompt },
                ...files.map((file) => ({
                  type: "image_url",
                  image_url: { url: `data:${file.mimeType};base64,${file.data}` },
                })),
              ]
            : prompt,
      },
    ]

    const data = {
      model: "google/gemini-2.5-flash", // Updated to correct model name
      messages,
      max_tokens: 1200, // Reduced from 2048 to stay within credit limits
      temperature: 0.7,
    }

    const response = await this.makeRequest(data)
    return response.choices[0]?.message?.content || ""
  }
}

export class AIService {
  private geminiDirect?: GeminiDirectAPI
  private openRouter?: OpenRouterAPI

  constructor() {
    const geminiKey = process.env.GEMINI_API_KEY
    const openRouterKey = process.env.OPENROUTER_API_KEY

    console.log("🔧 AI Service Initialization:")
    console.log("  - GEMINI_API_KEY:", geminiKey ? "✅ Set" : "❌ Missing")
    console.log("  - OPENROUTER_API_KEY:", openRouterKey ? "✅ Set" : "❌ Missing")

    if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
      this.geminiDirect = new GeminiDirectAPI(geminiKey)
    }
    if (openRouterKey && openRouterKey !== "your_openrouter_api_key_here") {
      this.openRouter = new OpenRouterAPI(openRouterKey)
    }

    if (!this.geminiDirect && !this.openRouter) {
      console.warn("⚠️ No API keys configured. AI features will not work.")
    }
  }

  private async tryWithFallback<T>(
    operation: () => Promise<T>,
    fallbackOperation?: () => Promise<T>,
  ): Promise<{ result: T; fallbackUsed: boolean }> {
    try {
      console.log("🔄 Attempting primary Gemini API...")
      const result = await operation()
      console.log("✅ Primary Gemini API successful")
      return { result, fallbackUsed: false }
    } catch (error) {
      console.warn("⚠️ Primary Gemini API failed:", error)

      if (fallbackOperation) {
        try {
          console.log("🔄 Attempting OpenRouter fallback...")
          const result = await fallbackOperation()
          console.log("✅ OpenRouter fallback successful")
          return { result, fallbackUsed: true }
        } catch (fallbackError) {
          console.error("❌ OpenRouter fallback also failed:", fallbackError)

          // Check if it's a credit/payment issue
          const errorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
          if (errorMessage.includes("credits") || errorMessage.includes("402")) {
            throw new Error(
              "OpenRouter API requires more credits. Please upgrade your account at https://openrouter.ai/settings/credits",
            )
          }

          throw new Error(`Both APIs failed. Primary: ${error}. Fallback: ${fallbackError}`)
        }
      } else {
        throw error
      }
    }
  }

  async analyzeImage(imageBase64: string, mimeType: string): Promise<AIResponse> {
    const systemPrompt = `You are an expert AI image analyst. Analyze this image and provide two outputs:

1. JSON Analysis: Structured analysis including:
   - Main subjects and objects
   - Color palette and mood
   - Composition and lighting
   - Style and technical details
   - Scene breakdown
   - Suggested applications

2. Paragraph Description: Rich narrative description for creative use.

Keep responses concise but comprehensive. Format as valid JSON: {"jsonAnalysis": {...}, "paragraphDescription": "..."}`

    try {
      const { result, fallbackUsed } = await this.tryWithFallback(
        () => this.geminiDirect!.generateContent(systemPrompt, [{ data: imageBase64, mimeType }]),
        this.openRouter
          ? () => this.openRouter!.generateContent(systemPrompt, [{ data: imageBase64, mimeType }])
          : undefined,
      )

      try {
        const parsed = JSON.parse(result)
        return {
          success: true,
          data: {
            jsonOutput: JSON.stringify(parsed.jsonAnalysis, null, 2),
            paragraphOutput: parsed.paragraphDescription,
          },
          fallbackUsed,
        }
      } catch (parseError) {
        return {
          success: true,
          data: {
            jsonOutput: JSON.stringify({ analysis: "Raw AI response", content: result }, null, 2),
            paragraphOutput: result,
          },
          fallbackUsed,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async analyzeVideo(videoBase64: string): Promise<AIResponse> {
    const systemPrompt = `You are an expert video analyst. Analyze this video and provide:

1. JSON Analysis: Detailed breakdown including:
   - Video metadata and quality
   - Scene analysis with timestamps
   - Visual and audio elements
   - Technical production details
   - Suggested applications

2. Narrative Description: Professional video brief.

Keep responses focused and actionable. Format as valid JSON: {"jsonAnalysis": {...}, "paragraphDescription": "..."}`

    try {
      const { result, fallbackUsed } = await this.tryWithFallback(
        () => this.geminiDirect!.generateContent(systemPrompt, [{ data: videoBase64, mimeType: "video/mp4" }]),
        this.openRouter ? () => this.openRouter!.generateContent(systemPrompt) : undefined,
      )

      try {
        const parsed = JSON.parse(result)
        return {
          success: true,
          data: {
            jsonOutput: JSON.stringify(parsed.jsonAnalysis, null, 2),
            paragraphOutput: parsed.paragraphDescription,
          },
          fallbackUsed,
        }
      } catch (parseError) {
        return {
          success: true,
          data: {
            jsonOutput: JSON.stringify({ analysis: "Raw AI response", content: result }, null, 2),
            paragraphOutput: result,
          },
          fallbackUsed,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async transcribeAudio(audioBase64: string, language = "auto", format = "timestamps"): Promise<AIResponse> {
    const systemPrompt = `You are an audio transcription specialist. Analyze this audio:

1. If speech exists: Provide accurate transcription with timestamps [HH:MM:SS]
2. If no speech: Analyze music, sound effects, and ambient audio
3. Include technical quality assessment

Format: Clean, professional transcription or audio analysis.
Language: ${language}, Format: ${format}

Keep response concise and accurate.`

    try {
      const { result, fallbackUsed } = await this.tryWithFallback(
        () => this.geminiDirect!.generateContent(systemPrompt, [{ data: audioBase64, mimeType: "audio/mp3" }]),
        this.openRouter ? () => this.openRouter!.generateContent(systemPrompt) : undefined,
      )

      // Format based on requested format
      let formattedResult = result
      if (format === "text") {
        formattedResult = result.replace(/\[\d{2}:\d{2}:\d{2}\]\s*/g, "")
      } else if (format === "srt") {
        // Convert to SRT format
        const lines = result.split("\n").filter((line) => line.trim())
        let srtContent = ""
        let counter = 1

        lines.forEach((line, index) => {
          const timeMatch = line.match(/\[(\d{2}:\d{2}:\d{2})\]/)
          if (timeMatch) {
            const time = timeMatch[1]
            const text = line.replace(/\[\d{2}:\d{2}:\d{2}\]\s*/, "")
            const nextTime = lines[index + 1]?.match(/\[(\d{2}:\d{2}:\d{2})\]/)?.[1] || "00:00:15"

            srtContent += `${counter}\n${time},000 --> ${nextTime},000\n${text}\n\n`
            counter++
          }
        })
        formattedResult = srtContent || result
      }

      return {
        success: true,
        data: {
          transcription: formattedResult,
          language: language,
          format: format,
        },
        fallbackUsed,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async generateVeo3Prompt(formData: {
    mainSubject: string
    sceneAction: string
    dialogue?: string
    cameraMovement?: string
    otherDetails?: string
    subtitles?: string
  }): Promise<AIResponse> {
    const startTime = Date.now()
    
    const systemPrompt = `You are an expert Veo3 prompt engineer specializing in AI video generation. Your task is to create TWO formats of the same video prompt:

1. JSON FORMAT: Structured data for technical AI processing
2. PARAGRAPH FORMAT: Narrative description for creative AI processing

USER INPUT:
- Main Subject: ${formData.mainSubject}
- Scene Action: ${formData.sceneAction}
${formData.dialogue ? `- Dialogue: ${formData.dialogue}` : ''}
${formData.cameraMovement ? `- Camera Movement: ${formData.cameraMovement}` : ''}
${formData.otherDetails ? `- Additional Details: ${formData.otherDetails}` : ''}
${formData.subtitles ? `- Subtitles: ${formData.subtitles}` : ''}

REQUIREMENTS:
- Optimize for Google's Veo3 AI video generation
- Duration: 15-60 seconds
- Quality: 4K resolution, 30fps
- Professional cinematic quality

OUTPUT FORMAT:
Provide your response in this exact structure:

===JSON FORMAT===
{
  "scene": "detailed scene description",
  "subject": "main subject details",
  "action": "specific actions and movements",
  "camera": "camera angles and movements",
  "lighting": "lighting setup and mood",
  "audio": "sound effects and music",
  "technical": {
    "duration": "15-60 seconds",
    "quality": "4K, 30fps",
    "aspect_ratio": "16:9",
    "style": "cinematic"
  }
}
===END JSON===

===PARAGRAPH FORMAT===
[Write a detailed, cinematic paragraph describing the scene with all visual and audio elements, optimized for Veo3 AI generation]
===END PARAGRAPH===

Ensure both formats are comprehensive and ready for immediate use in Veo3.`

    try {
      // Check if any AI service is available
      if (!this.geminiDirect && !this.openRouter) {
        // Provide a fallback response for testing without API keys
        console.warn("⚠️ No valid API keys configured. Using fallback response for testing.")
        
        const fallbackJson = `{
  "scene": "A cinematic scene featuring ${formData.mainSubject}",
  "subject": "${formData.mainSubject}",
  "action": "${formData.sceneAction}",
  "camera": "Professional camera work with smooth movements",
  "lighting": "Cinematic lighting with dramatic shadows",
  "audio": "Background music appropriate to the scene mood",
  "technical": {
    "duration": "15-60 seconds",
    "quality": "4K, 30fps",
    "aspect_ratio": "16:9",
    "style": "cinematic"
  }
}`

        const fallbackParagraph = `Create a cinematic video scene featuring ${formData.mainSubject}. The scene should depict ${formData.sceneAction} with professional camera work, cinematic lighting, and appropriate background music. The video should be 15-60 seconds in duration, shot in 4K resolution at 30fps, with a 16:9 aspect ratio and cinematic style.${formData.dialogue ? ` Include dialogue: ${formData.dialogue}.` : ''}${formData.cameraMovement ? ` Use camera movement: ${formData.cameraMovement}.` : ''}${formData.otherDetails ? ` Additional details: ${formData.otherDetails}.` : ''}${formData.subtitles ? ` Include subtitles: ${formData.subtitles}.` : ''}`

        return {
          success: true,
          data: {
            jsonPrompt: fallbackJson,
            paragraphPrompt: fallbackParagraph,
            metadata: {
              model: "fallback",
              processingTime: 0,
              fallbackUsed: true
            }
          },
          fallbackUsed: true
        }
      }

      const { result, fallbackUsed } = await this.tryWithFallback(
        () => this.geminiDirect!.generateContent(systemPrompt),
        this.openRouter ? () => this.openRouter!.generateContent(systemPrompt) : undefined,
      )

      // Parse the response to extract JSON and paragraph formats
      const jsonMatch = result.match(/===JSON FORMAT===\s*([\s\S]*?)\s*===END JSON===/)
      const paragraphMatch = result.match(/===PARAGRAPH FORMAT===\s*([\s\S]*?)\s*===END PARAGRAPH===/)

      let jsonPrompt = jsonMatch ? jsonMatch[1].trim() : null
      let paragraphPrompt = paragraphMatch ? paragraphMatch[1].trim() : null

      // If parsing failed, try to extract JSON from the response
      if (!jsonPrompt) {
        try {
          // Look for JSON-like content in the response
          const jsonStart = result.indexOf('{')
          const jsonEnd = result.lastIndexOf('}') + 1
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const potentialJson = result.substring(jsonStart, jsonEnd)
            JSON.parse(potentialJson) // Test if it's valid JSON
            jsonPrompt = potentialJson
          }
        } catch (e) {
          // If no valid JSON found, create a fallback
          jsonPrompt = `{
  "scene": "A cinematic scene featuring ${formData.mainSubject}",
  "subject": "${formData.mainSubject}",
  "action": "${formData.sceneAction}",
  "camera": "Professional camera work",
  "lighting": "Cinematic lighting",
  "audio": "Background music",
  "technical": {
    "duration": "15-60 seconds",
    "quality": "4K, 30fps",
    "aspect_ratio": "16:9",
    "style": "cinematic"
  }
}`
        }
      }

      // If paragraph parsing failed, use the full response
      if (!paragraphPrompt) {
        paragraphPrompt = result
      }

      const processingTime = Date.now() - startTime

      return {
        success: true,
        data: {
          jsonPrompt,
          paragraphPrompt,
          metadata: {
            model: fallbackUsed ? "openrouter/gemini-2.5-flash" : "gemini-2.5-flash",
            processingTime,
            fallbackUsed
          }
        },
        fallbackUsed
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async chatCompletion(
    message: string,
    attachedFiles?: Array<{ data: string; mimeType: string; name: string }>,
    conversationHistory?: Array<{ role: string; content: string }>,
  ): Promise<AIResponse> {
    const systemPrompt = `You are Veo3 PromptGenerator's AI creative assistant. You specialize in:

🎯 EXPERTISE: Video production, creative writing, AI prompts, content strategy

🎨 CONVERSATION FLOW:
1. DISCOVERY: Ask about their project
2. REFINEMENT: Help articulate their vision
3. GENERATION: When ready, create prompts

🚀 PROMPT GENERATION (when requested):
Provide THREE variations:

**DETAILED PROMPT**: Technical specifications with camera angles, lighting, timing, audio direction

**PARAGRAPH PROMPT**: Creative narrative focusing on visual storytelling and mood

**CORE IDEA**: Concise creative concept with key elements

Always be conversational and helpful while maintaining expertise.

Context: ${conversationHistory ? JSON.stringify(conversationHistory.slice(-4)) : "None"}`

    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`

    try {
      const { result, fallbackUsed } = await this.tryWithFallback(
        () => this.geminiDirect!.generateContent(fullPrompt, attachedFiles),
        this.openRouter ? () => this.openRouter!.generateContent(fullPrompt, attachedFiles) : undefined,
      )

      // Check if this is a prompt generation response
      const isPromptGeneration =
        result.includes("DETAILED PROMPT") || result.includes("PARAGRAPH PROMPT") || result.includes("CORE IDEA")

      if (isPromptGeneration) {
        const sections = result.split(/(?:\*\*DETAILED PROMPT\*\*|\*\*PARAGRAPH PROMPT\*\*|\*\*CORE IDEA\*\*)/i)

        return {
          success: true,
          data: {
            type: "prompt_generation",
            detailedPrompt: sections[1]?.trim() || "Detailed prompt will be generated...",
            paragraphPrompt: sections[2]?.trim() || "Creative description will be generated...",
            ideaText: sections[3]?.trim() || "Core concept will be provided...",
          },
          fallbackUsed,
        }
      } else {
        return {
          success: true,
          data: {
            type: "conversation",
            response: result,
          },
          fallbackUsed,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }
}

export const aiService = new AIService()
