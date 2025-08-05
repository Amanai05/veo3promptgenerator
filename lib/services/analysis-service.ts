import { BaseAIService } from "@/lib/ai-base"

export class AnalysisService extends BaseAIService {
  async analyzeImage(base64Data: string, mimeType: string) {
    try {
      const systemPrompt = `Analyze this image and provide both JSON and paragraph descriptions for Veo3 video generation. The image is in ${mimeType} format.`

      const result = await this.tryWithRobustFallback(systemPrompt)

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error || "Failed to analyze image"
        }
      }

      return {
        success: true,
        data: {
          jsonOutput: result.data.jsonPrompt,
          paragraphOutput: result.data.paragraphPrompt,
          metadata: result.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze image"
      }
    }
  }

  async transcribeAudio(audioData: string, mimeType: string) {
    try {
      const systemPrompt = `Transcribe this audio and provide both JSON and paragraph descriptions for Veo3 video generation. The audio is in ${mimeType} format.`

      const result = await this.tryWithRobustFallback(systemPrompt)

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error || "Failed to transcribe audio"
        }
      }

      return {
        success: true,
        data: {
          jsonOutput: result.data.jsonPrompt,
          paragraphOutput: result.data.paragraphPrompt,
          transcription: result.data.paragraphPrompt, // Use paragraph prompt as transcription
          metadata: result.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to transcribe audio"
      }
    }
  }
}

export const analysisService = new AnalysisService() 