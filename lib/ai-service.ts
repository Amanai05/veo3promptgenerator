interface AIResponse {
  success: boolean
  data?: any
  error?: string
}

interface Veo3PromptData {
  jsonPrompt: string
  paragraphPrompt: string
  metadata: {
    model: string
    processingTime: number
  }
}

class GeminiAPI {
  private apiKey: string
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1500,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data.candidates[0]?.content?.parts[0]?.text || ""
  }
}

class OpenRouterAPI {
  private apiKey: string
  private baseUrl = "https://openrouter.ai/api/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "veo3promptgenerator",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ""
  }
}

export class AIService {
  private geminiAPI?: GeminiAPI
  private openRouterAPI?: OpenRouterAPI

  constructor() {
    const geminiKey = process.env.GEMINI_API_KEY
    const openRouterKey = process.env.OPENROUTER_API_KEY

    console.log("AI Service Initialization:")
    console.log("  - GEMINI_API_KEY:", geminiKey ? "Set" : "Missing")
    console.log("  - OPENROUTER_API_KEY:", openRouterKey ? "Set" : "Missing")

    if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
      this.geminiAPI = new GeminiAPI(geminiKey)
    }
    if (openRouterKey && openRouterKey !== "your_openrouter_api_key_here") {
      this.openRouterAPI = new OpenRouterAPI(openRouterKey)
    }

    if (!this.geminiAPI && !this.openRouterAPI) {
      console.warn("No API keys configured. AI features will not work.")
    }
  }

  async generateVeo3Prompt(userInput: string): Promise<AIResponse> {
    const startTime = Date.now()

    if (!this.geminiAPI && !this.openRouterAPI) {
      return {
        success: false,
        error: "No AI service available. Please configure API keys in .env.local file."
      }
    }

    const systemPrompt = `You are an expert Veo3 prompt engineer. Create a video prompt for Google's Veo3 AI video generation.

User Input: ${userInput}

Requirements:
- Duration: 15-60 seconds
- Quality: 4K resolution, 30fps
- Professional cinematic quality
- Optimized for Veo3 AI generation

Provide your response in this exact format:

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
[Write a detailed, cinematic paragraph describing the scene with all visual and audio elements, optimized for Veo3 AI generation.]
===END PARAGRAPH===

Think like a professional cinematographer and director.`

    try {
      let result: string
      let model: string

      // Try Gemini first, then OpenRouter as fallback
      if (this.geminiAPI) {
        try {
          console.log("Using Gemini API...")
          result = await this.geminiAPI.generateContent(systemPrompt)
          model = "gemini-2.5-flash"
        } catch (error) {
          console.warn("Gemini API failed, trying OpenRouter...")
          if (this.openRouterAPI) {
            result = await this.openRouterAPI.generateContent(systemPrompt)
            model = "openrouter/gemini-2.5-flash"
          } else {
            throw error
          }
        }
      } else if (this.openRouterAPI) {
        console.log("Using OpenRouter API...")
        result = await this.openRouterAPI.generateContent(systemPrompt)
        model = "openrouter/gemini-2.5-flash"
      } else {
        throw new Error("No AI service available")
      }

      console.log("Raw AI Response:", result)

      // Parse JSON and paragraph from response
      const jsonMatch = result.match(/===JSON FORMAT===\s*([\s\S]*?)\s*===END JSON===/)
      const paragraphMatch = result.match(/===PARAGRAPH FORMAT===\s*([\s\S]*?)\s*===END PARAGRAPH===/)

      let jsonPrompt = jsonMatch ? jsonMatch[1].trim() : null
      let paragraphPrompt = paragraphMatch ? paragraphMatch[1].trim() : null

      // Fallback parsing if structured format fails
      if (!jsonPrompt) {
        try {
          const jsonStart = result.indexOf('{')
          const jsonEnd = result.lastIndexOf('}') + 1
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const potentialJson = result.substring(jsonStart, jsonEnd)
            JSON.parse(potentialJson)
            jsonPrompt = potentialJson
          }
        } catch (e) {
          // Create basic JSON if parsing fails
          const basicJson = {
            scene: `A cinematic scene featuring ${userInput}`,
            subject: userInput,
            action: userInput,
            camera: "Professional camera work",
            lighting: "Cinematic lighting",
            audio: "Background music",
            technical: {
              duration: "15-60 seconds",
              quality: "4K, 30fps",
              aspect_ratio: "16:9",
              style: "cinematic"
            }
          }
          jsonPrompt = JSON.stringify(basicJson, null, 2)
        }
      }

      if (!paragraphPrompt) {
        paragraphPrompt = result || `Create a cinematic video scene featuring ${userInput}. The scene should depict ${userInput} with professional camera work, cinematic lighting, and appropriate background music. The video should be 15-60 seconds in duration, shot in 4K resolution at 30fps, with a 16:9 aspect ratio and cinematic style.`
      }

      const processingTime = Date.now() - startTime

      return {
        success: true,
        data: {
          jsonPrompt,
          paragraphPrompt,
          metadata: {
            model,
            processingTime
          }
        }
      }

    } catch (error) {
      console.error("AI service error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }
    }
  }
}

export const aiService = new AIService()

