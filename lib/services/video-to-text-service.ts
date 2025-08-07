import { BaseAIService } from "@/lib/ai-base"

interface VideoToTextResult {
  transcription: string
  metadata: {
    model: string
    processingTime: number
  }
}

export class VideoToTextService extends BaseAIService {
  async extractAudioAndTranscribe(base64Data: string, mimeType: string, fileName: string): Promise<{
    success: boolean
    data?: VideoToTextResult
    error?: string
  }> {
    const startTime = Date.now()

    try {
      const fileType = mimeType.startsWith('video/') ? 'video' : 'audio'
      const systemPrompt = `You are 'AudioExtractor Pro v2.0', an elite ${fileType}-to-text conversion engine. Extract and transcribe all audio content from the ${fileType} file: ${fileName} (${mimeType}).

**MISSION: COMPREHENSIVE AUDIO EXTRACTION & TRANSCRIPTION**

**AUDIO EXTRACTION REQUIREMENTS:**
1. **Audio Detection**: Identify all audio elements in the video
2. **Dialogue Transcription**: Transcribe all spoken words verbatim
3. **Language Identification**: Detect and note the language(s) used
4. **Audio Quality Assessment**: Evaluate clarity, background noise, etc.
5. **Timing Information**: Note approximate timestamps for key audio segments
6. **Speaker Identification**: Identify different speakers if multiple voices
7. **Audio Effects**: Note music, sound effects, ambient sounds
8. **Emotional Context**: Capture tone, emotion, and delivery style

**TRANSCRIPTION REQUIREMENTS:**
1. **Verbatim Accuracy**: Transcribe exactly what is said, including filler words
2. **Punctuation**: Add appropriate punctuation based on speech patterns
3. **Speaker Labels**: Mark different speakers if identifiable
4. **Timestamps**: Include approximate timestamps for major segments
5. **Language Notes**: Specify the language and any code-switching
6. **Audio Descriptions**: Note music, sound effects, and ambient audio
7. **Quality Notes**: Mention audio clarity, background noise, etc.

**OUTPUT FORMAT:**
Provide the transcription in this exact structure:

### ${fileType.toUpperCase()} TO TEXT TRANSCRIPTION

**Audio Information:**
- Language(s): [detected languages]
- Audio Quality: [professional assessment]
- Duration: [total audio duration]
- Speakers: [number of speakers identified]

**Transcription:**
[Complete verbatim transcription with timestamps and speaker labels]

**Audio Elements:**
- Music: [description of any background music]
- Sound Effects: [description of sound effects]
- Ambient Audio: [description of background sounds]

**Quality Assessment:**
[Professional evaluation of audio clarity and transcription accuracy]`

      const result = await this.tryWithRobustFallbackVideo(systemPrompt, base64Data)

      if (!result) {
        return {
          success: false,
          error: "Failed to extract audio and transcribe video"
        }
      }

      const processingTime = Date.now() - startTime

      // Parse the transcription result
      const parsedResult = this.parseTranscriptionResult(result.result || "Transcription completed but no output generated")

      return {
        success: true,
        data: {
          transcription: parsedResult,
          metadata: {
            model: result.metadata?.model || "Gemini 2.5 Flash",
            processingTime
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to extract audio and transcribe video"
      }
    }
  }

  private parseTranscriptionResult(result: string): string {
    // Extract the transcription section
    const transcriptionMatch = result.match(/\*\*Transcription:\*\*\s*\n([\s\S]*?)(?=\*\*Audio Elements:\*\*|\*\*Quality Assessment:\*\*|\s*$)/)
    
    if (transcriptionMatch) {
      return transcriptionMatch[1].trim()
    }
    
    // Fallback: return the entire result if parsing fails
    return result
  }

  private async tryWithRobustFallbackVideo(prompt: string, videoData: string): Promise<{ result: string; metadata: any }> {
    const startTime = Date.now();
    let lastError: Error | null = null;

    // Try Gemini 2.5 Flash APIs in order
    for (let i = 0; i < this.geminiAPIs.length; i++) {
      const apiConfig = this.geminiAPIs[i];
      try {
        console.log(`Attempting ${apiConfig.name} with Gemini 2.5 Flash for audio extraction...`);
        const result = await this.callGeminiFlashAPIWithVideo(apiConfig.apiKey, prompt, videoData);
        
        return {
          result,
          metadata: {
            model: "gemini-2.5-flash",
            processingTime: Date.now() - startTime,
            apiKeyUsed: apiConfig.name,
            fallbackUsed: i > 0
          }
        };
      } catch (error) {
        console.warn(`${apiConfig.name} failed:`, error instanceof Error ? error.message : "Unknown error");
        lastError = error instanceof Error ? error : new Error("Unknown error");
        
        // If this is the last Gemini API, try OpenRouter with Flash
        if (i === this.geminiAPIs.length - 1 && this.openRouterAPI) {
          try {
            console.log("All Gemini APIs failed, trying OpenRouter with Gemini 2.5 Flash...");
            const result = await this.callOpenRouterFlashAPIWithVideo(this.openRouterAPI.apiKey, prompt, videoData);
            
            return {
              result,
              metadata: {
                model: "openrouter/gemini-2.5-flash",
                processingTime: Date.now() - startTime,
                apiKeyUsed: this.openRouterAPI.name,
                fallbackUsed: true
              }
            };
          } catch (openRouterError) {
            console.error("OpenRouter API also failed:", openRouterError instanceof Error ? openRouterError.message : "Unknown error");
            lastError = openRouterError instanceof Error ? openRouterError : new Error("Unknown error");
          }
        }
      }
    }

    // If we get here, all APIs failed
    throw lastError || new Error("No AI service available");
  }

  private async callGeminiFlashAPIWithVideo(apiKey: string, prompt: string, videoData: string): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        contents: [{ 
          parts: [
            { text: prompt },
            { 
              inlineData: {
                mimeType: "video/mp4",
                data: videoData
              }
            }
          ] 
        }],
        generationConfig: {
          temperature: 0.3, // Lower temperature for more accurate transcription
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096, // Higher token limit for longer transcriptions
        },
      }),
    });

      if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini Flash API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.candidates[0]?.content?.parts[0]?.text || "";
    
    if (!result) {
      throw new Error("Empty response from Gemini Flash API");
    }

    return result;
  }

  private async callOpenRouterFlashAPIWithVideo(apiKey: string, prompt: string, videoData: string): Promise<string> {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "veo3promptgenerator",
        },
        body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ 
          role: "user", 
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:video/mp4;base64,${videoData}` } }
          ]
        }],
        max_tokens: 4096,
          temperature: 0.3,
      }),
    });

      if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter Flash API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || "";
    
    if (!result) {
      throw new Error("Empty response from OpenRouter Flash API");
    }

    return result;
  }
}

export const videoToTextService = new VideoToTextService() 