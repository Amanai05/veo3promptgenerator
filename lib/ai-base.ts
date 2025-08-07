// ========================================================================
// AI Base Service - Multi-API Key Fallback System
// ========================================================================

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface AIMetadata {
  model: string;
  processingTime: number;
  apiKeyUsed: string;
  fallbackUsed: boolean;
}

export interface APIConfig {
  apiKey: string;
  name: string;
  priority: number;
}

export class BaseAIService {
  protected geminiAPIs: APIConfig[] = [];
  protected openRouterAPI?: APIConfig;
  protected currentApiIndex: number = 0;

  constructor() {
    this.initializeAPIs();
  }

  private initializeAPIs(): void {
    // Initialize multiple Gemini API keys
    const geminiKey1 = process.env.GEMINI_API_KEY_1 || process.env.GEMINI_API_KEY;
    const geminiKey2 = process.env.GEMINI_API_KEY_2;
    const geminiKey3 = process.env.GEMINI_API_KEY_3;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    // Add Gemini APIs in priority order
    if (geminiKey1 && geminiKey1 !== "your_gemini_api_key_here") {
      this.geminiAPIs.push({ apiKey: geminiKey1, name: "Gemini API 1", priority: 1 });
    }
    if (geminiKey2 && geminiKey2 !== "your_gemini_api_key_here") {
      this.geminiAPIs.push({ apiKey: geminiKey2, name: "Gemini API 2", priority: 2 });
    }
    if (geminiKey3 && geminiKey3 !== "your_gemini_api_key_here") {
      this.geminiAPIs.push({ apiKey: geminiKey3, name: "Gemini API 3", priority: 3 });
    }

    // Add OpenRouter as final fallback
    if (openRouterKey && openRouterKey !== "your_openrouter_api_key_here") {
      this.openRouterAPI = { apiKey: openRouterKey, name: "OpenRouter API", priority: 4 };
    }

    console.log("AI Service Initialization:");
    console.log(`  - Gemini APIs configured: ${this.geminiAPIs.length}`);
    console.log(`  - OpenRouter API: ${this.openRouterAPI ? "Configured" : "Not configured"}`);
    
    if (this.geminiAPIs.length === 0 && !this.openRouterAPI) {
      console.warn("No API keys configured. AI features will not work.");
    }
  }

  protected async tryWithRobustFallback(prompt: string, videoData?: string): Promise<{ result: string; metadata: AIMetadata }> {
    const startTime = Date.now();
    let lastError: Error | null = null;

    // Try Gemini APIs in order
    for (let i = 0; i < this.geminiAPIs.length; i++) {
      const apiConfig = this.geminiAPIs[i];
      try {
        console.log(`Attempting ${apiConfig.name}...`);
        const result = videoData 
          ? await this.callGeminiAPIWithVideo(apiConfig.apiKey, prompt, videoData)
          : await this.callGeminiAPI(apiConfig.apiKey, prompt);
        
        return {
          result,
          metadata: {
            model: "gemini-2.5-pro",
            processingTime: Date.now() - startTime,
            apiKeyUsed: apiConfig.name,
            fallbackUsed: i > 0
          }
        };
      } catch (error) {
        console.warn(`${apiConfig.name} failed:`, error instanceof Error ? error.message : "Unknown error");
        lastError = error instanceof Error ? error : new Error("Unknown error");
        
        // If this is the last Gemini API, try OpenRouter
        if (i === this.geminiAPIs.length - 1 && this.openRouterAPI) {
          try {
            console.log("All Gemini APIs failed, trying OpenRouter...");
            const result = videoData
              ? await this.callOpenRouterAPIWithVideo(this.openRouterAPI.apiKey, prompt, videoData)
              : await this.callOpenRouterAPI(this.openRouterAPI.apiKey, prompt);
            
            return {
              result,
              metadata: {
                model: "openrouter/gemini-2.5-pro",
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

  private async callGeminiAPI(apiKey: string, prompt: string): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

      if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.candidates[0]?.content?.parts[0]?.text || "";
    
    if (!result) {
      throw new Error("Empty response from Gemini API");
    }

    return result;
  }

  private async callOpenRouterAPI(apiKey: string, prompt: string): Promise<string> {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "veo3promptgenerator",
        },
        body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2048,
          temperature: 0.7,
      }),
    });

      if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || "";
    
    if (!result) {
      throw new Error("Empty response from OpenRouter API");
    }

    return result;
  }

  private async callGeminiAPIWithVideo(apiKey: string, prompt: string, videoData: string): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
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
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

      if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.candidates[0]?.content?.parts[0]?.text || "";
    
    if (!result) {
      throw new Error("Empty response from Gemini API");
    }

    return result;
  }

  private async callOpenRouterAPIWithVideo(apiKey: string, prompt: string, videoData: string): Promise<string> {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "veo3promptgenerator",
        },
        body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [{ 
          role: "user", 
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:video/mp4;base64,${videoData}` } }
          ]
        }],
        max_tokens: 2048,
          temperature: 0.7,
      }),
    });

      if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || "";
    
    if (!result) {
      throw new Error("Empty response from OpenRouter API");
    }

    return result;
  }

  protected parseJSONResponse(response: string): string {
    try {
      // First, try to parse the response directly as JSON
      JSON.parse(response);
      return response;
    } catch (e) {
      console.log("Direct JSON parsing failed, looking for JSON in response...");
      
      // Look for JSON in the response (in case AI added explanatory text)
      const jsonStart = response.indexOf('{');
      const jsonEnd = response.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        try {
          const potentialJson = response.substring(jsonStart, jsonEnd);
          JSON.parse(potentialJson); // Validate it's proper JSON
          console.log("Found valid JSON in response");
          return potentialJson;
        } catch (parseError) {
          console.error("JSON found but invalid:", parseError);
          throw new Error("Invalid JSON format in response");
        }
      } else {
        console.error("No JSON found in response");
        throw new Error("No JSON found in response");
      }
    }
  }

  protected createFallbackJSON(userInput: string, formData?: any): string {
    const baseData = {
      shot_concept: `A cinematic 8-second shot based on: ${userInput}`,
      duration_seconds: 8,
      composition: {
        shot_type: "Medium Shot",
        camera_dynamics: "Smooth and stable camera work"
      },
      subject: {
        description: `Main subject: ${userInput}`,
        action: "Performs a key action related to the concept",
        dialogue: ""
      },
      atmosphere: {
        setting: "Appropriate cinematic environment",
        lighting_style: "Professional cinematic lighting",
        color_palette: "Cinematic color grading"
      },
      audio_design: {
        sound_effects: "Appropriate ambient sounds",
        music_cue: "Background music fitting the scene"
      }
    };

    // If form data is provided, enhance the fallback
    if (formData) {
      baseData.shot_concept = `Advanced 8-second cinematic shot featuring ${formData.mainSubject || userInput} performing ${formData.sceneAction || "key actions"}`;
      baseData.subject.description = `Enhanced ${formData.mainSubject || userInput} with professional details`;
      baseData.subject.action = formData.sceneAction || "Performs key actions";
      
      if (formData.cameraMovement) {
        baseData.composition.camera_dynamics = formData.cameraMovement;
      }
      
      if (formData.otherDetails) {
        baseData.atmosphere.setting = formData.otherDetails;
      }
    }

    return JSON.stringify(baseData, null, 2);
  }

  protected createFallbackParagraph(userInput: string, formData?: any): string {
    if (formData) {
      return `A professional 8-second cinematic video featuring ${formData.mainSubject || userInput} performing ${formData.sceneAction || "key actions"}. The environment is carefully crafted based on the provided details, with enhanced subject descriptions that capture the essence of the concept. The camera work employs professional techniques incorporating ${formData.cameraMovement || "smooth movements"} and strategic angles that enhance the narrative. Lighting is designed to create the perfect mood matching the ${formData.videoStyle || "cinematic"} style for the ${formData.targetAudience || "target"} audience. Audio elements include carefully selected sound effects and background music that complement the visual storytelling. The scene is optimized for 4K resolution at 30fps with a 16:9 aspect ratio, ensuring professional quality output ready for immediate use in Veo3 AI generation.`;
    }
    
    return `A dynamic 8-second video scene featuring ${userInput}. The environment is carefully crafted to match the user's vision, with detailed subject descriptions that capture the essence of the concept. The camera work employs professional techniques with smooth movements and strategic angles that enhance the narrative. Lighting is designed to create the perfect mood and atmosphere, while audio elements include carefully selected sound effects and background music that complement the visual storytelling. The scene is optimized for 4K resolution at 30fps with a 16:9 aspect ratio, ensuring professional quality output ready for immediate use in Veo3 AI generation.`;
  }

  protected hasValidAPIs(): boolean {
    return this.geminiAPIs.length > 0 || !!this.openRouterAPI;
  }

  protected getAPIStatus(): { geminiCount: number; openRouterAvailable: boolean } {
    return {
      geminiCount: this.geminiAPIs.length,
      openRouterAvailable: !!this.openRouterAPI
    };
  }
} 