import { BaseAIService } from "@/lib/ai-base"

interface VideoAnalysisResult {
  analysis: string
  metadata: {
    model: string
    processingTime: number
  }
}

export interface DetailedVideoAnalysis {
  technicalSpecs: {
    resolution: string;
    frameRate: string;
    duration: string;
    aspectRatio: string;
    qualityAssessment: string;
  };
  visualBreakdown: string;
  audioBreakdown: string;
  overallAssessment: string;
  metadata: {
    model: string;
    processingTime: number;
  };
}

export class VideoAnalysisService extends BaseAIService {
  private cleanAnalysisText(text: string): string {
    // For the new structured format, we want to preserve the markdown structure
    // but clean up any extra formatting artifacts
    return text
      .replace(/\n\s*\n/g, '\n\n') // Clean up extra line breaks
      .replace(/^\s+|\s+$/g, '') // Trim whitespace
      .replace(/\n{3,}/g, '\n\n') // Limit consecutive line breaks
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s+/g, '\n') // Remove leading spaces after line breaks
      .replace(/\s+\n/g, '\n') // Remove trailing spaces before line breaks
      .trim() // Final trim
  }

  private async tryWithRobustFallbackVideo(prompt: string, videoData: string): Promise<{ result: string; metadata: any }> {
    const startTime = Date.now();
    let lastError: Error | null = null;

    // Try Gemini 2.5 Flash APIs in order
    for (let i = 0; i < this.geminiAPIs.length; i++) {
      const apiConfig = this.geminiAPIs[i];
      try {
        console.log(`Attempting ${apiConfig.name} with Gemini 2.5 Flash...`);
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
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
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
        max_tokens: 2048,
          temperature: 0.7,
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

  async analyzeVideo(base64Data: string, mimeType: string, fileName: string): Promise<{
    success: boolean
    data?: VideoAnalysisResult
    error?: string
  }> {
    const startTime = Date.now()

    try {
      const systemPrompt = `You are 'Cine-Scribe AI v3.0', an elite multi-modal analysis engine. You are analyzing the video file: ${fileName} (${mimeType}). Your mission is to deconstruct this video into a series of hyper-detailed, narratively rich, 8-second 'prompt scenes' for direct use in Google's Veo video generation platform. Adherence to the following directives is non-negotiable.

**MISSION CONTEXT: UNDERSTANDING GOOGLE VEO**
To ensure your output is perfectly optimized, you must operate with this knowledge of Veo's capabilities:
*   **High-Fidelity & Coherence:** Veo generates high-quality 1080p video and excels at maintaining character, object, and stylistic consistency over multiple scenes. Your prompts should encourage this coherence.
*   **Cinematic Language:** Veo understands professional cinematic terms. You MUST use terms like "timelapse," "drone shot," "dolly zoom," "chiaroscuro lighting," "long exposure," etc., where appropriate.
*   **Dialogue & Lip-Sync:** Veo can generate characters that speak and will attempt to match lip movements. Dialogue in prompts influences character expression and action. It is critical to include it correctly.
*   **Text & Visual Nuance:** Veo can render text and understands nuanced visual styles. Your analysis of fonts, colors, and textures is essential.

**CORE DECONSTRUCTION DIRECTIVES:**

1.  **Strict 8-Second Segmentation:** Analyze the video and divide its content into sequential 8-second segments. Each segment is a new 'Scene'. The final segment may be shorter.

2.  **Granular Visual Analysis (For each segment):**
    *   **Cinematography & Composition:** No detail is too small. Identify the exact shot type, camera movement, and compositional principles (e.g., rule of thirds, leading lines).
    *   **Lighting:** Describe the lighting setup in professional terms (e.g., "three-point lighting with a warm key light and a subtle blue kicker to separate the subject from the background"). Describe the mood it creates.
    *   **Color Palette & Grading:** Describe the color grading style (e.g., "bleach bypass effect with high contrast and desaturated colors, except for a vibrant crimson red").
    *   **Subjects, Actions & Expressions:** Describe subjects in extreme detail: their precise actions, their micro-expressions (e.g., "a fleeting look of disappointment hidden by a forced smile"), and the texture/material of their clothing.
    *   **Environment & On-Screen Text:** Detail the setting, background, foreground, and any on-screen text, including its font, style, and color.

3.  **Meticulous Auditory Analysis (For each segment):**
    *   **Dialogue:** Transcribe dialogue VERBATIM within double quotes. Crucially, you must provide the dialogue in its original language and script. Example: \`Dialogue: "तुम यहाँ क्या कर रहे हो?" [Language: Hindi, Devanagari Script]\`. If there is no dialogue, you MUST state "None."
    *   **Soundscape & SFX:** Describe the complete sound environment with rich detail and its emotional impact. Not just "footsteps," but "the lonely echo of heavy leather boots on a polished marble floor, creating a sense of isolation."
    *   **Music/Score:** Describe the musical score's style, instrumentation, and emotional function (e.g., "an anxious, rising string crescendo to build tension").

**STRICT OUTPUT FORMATTING RULES:**

*   **ZERO DEVIATION:** Your response MUST begin immediately with \`### SCENE 1\`. There will be no pre-amble, greeting, or explanation.
*   **MARKDOWN STRUCTURE:** Use the exact Markdown formatting shown in the template.
*   **DIALOGUE INTEGRATION:** When a scene has dialogue, you MUST embed it within the final 'Veo Generation Prompt' using the format: \`dialogue: "Verbatim text in its native script"\`. This command must be a part of the comma-separated prompt string. If there is no dialogue, this command must be omitted.
*   **SYNTHESIS IS KEY:** The "Veo Generation Prompt" is the most important part. It must artfully synthesize ALL visual and auditory analysis into a single, powerful, comma-separated paragraph.

**OUTPUT TEMPLATE (Adhere to this exactly):**

### SCENE 1 (00:00 - 00:08)

**Visuals:** Medium close-up shot of a detective in a dark, rain-soaked room, illuminated only by a flickering neon sign outside the window. The light casts long, dramatic shadows across his face (chiaroscuro). He has a weary expression, his eyes scanning a case file on the desk. The color grade is cold and desaturated, with deep blues and crushed blacks.
**Audio:**
*   **Dialogue:** "यहाँ बहुत अँधेरा है।" [Language: Hindi, Devanagari Script]
*   **Soundscape:** The steady drumming of heavy rain against the windowpane, a distant police siren wails and fades.
*   **Score:** A low, ominous synthesizer drone holds throughout, creating a feeling of dread.

**Veo Generation Prompt:**
cinematic medium close-up, a weary detective in a dark room, chiaroscuro lighting from a flickering neon sign creates harsh shadows on his face, cold and desaturated color grade, he examines a case file on his desk, dialogue: "यहाँ बहुत अँधेरा है。", sound of heavy rain and a distant siren, ominous synth drone score, noir film aesthetic, photorealistic, 4K.

### SCENE 2 (00:08 - 00:16)

**Visuals:** A sweeping drone shot ascending over a vibrant, sun-drenched coastal city at dawn. The architecture is a mix of modern glass skyscrapers and old, colorful villas. The sky is a gradient of orange and pink. Lens flare is visible as the camera pans towards the sun.
**Audio:**
*   **Dialogue:** None.
*   **Soundscape:** Faint sound of seagulls and the gentle wash of waves on a distant shore.
*   **Score:** An uplifting and gentle orchestral piece begins, featuring piano and soft strings.

**Veo Generation Prompt:**
epic sweeping drone shot, ascending over a sun-drenched coastal city at dawn, vibrant orange and pink sky, modern glass skyscrapers mixed with colorful old villas, beautiful lens flare, sound of seagulls and gentle waves, uplifting orchestral score, peaceful and majestic mood, hyper-detailed, 8K.

---
*(Continue this exact format for all segments of the video)*`

      const result = await this.tryWithRobustFallbackVideo(systemPrompt, base64Data)

      if (!result) {
        return {
          success: false,
          error: "Failed to analyze video"
        }
      }

      const processingTime = Date.now() - startTime

      // Clean up the analysis text to remove any markdown formatting
      const cleanAnalysis = this.cleanAnalysisText(result.result || "Analysis completed but no output generated")

      return {
        success: true,
        data: {
          analysis: cleanAnalysis,
          metadata: {
            model: result.metadata?.model || "Gemini 2.5 Flash",
            processingTime
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze video"
      }
    }
  }

  async analyzeVideoDetailed(base64Data: string, mimeType: string, fileName: string): Promise<{
    success: boolean
    data?: DetailedVideoAnalysis
    error?: string
  }> {
    const startTime = Date.now()

    try {
      const systemPrompt = `You are 'PixelPerfect Analyzer v4.0', an elite video analysis engine. Analyze the video file: ${fileName} (${mimeType}) with microscopic precision.

**MISSION: COMPREHENSIVE VIDEO DECONSTRUCTION**

**VISUAL ANALYSIS REQUIREMENTS:**
1. **Frame-by-Frame Breakdown**: Analyze every visual element with pixel-level detail
2. **Cinematography Precision**: Identify exact shot types, camera movements, focal lengths
3. **Lighting Analysis**: Describe lighting setup, color temperature, shadows, highlights
4. **Color Grading**: Analyze color palette, contrast, saturation, color theory
5. **Composition**: Rule of thirds, leading lines, depth of field, framing
6. **Subject Analysis**: Clothing details, expressions, body language, micro-movements
7. **Environment**: Background details, props, textures, spatial relationships
8. **Technical Specs**: Resolution, frame rate, aspect ratio, quality indicators

**AUDIO ANALYSIS REQUIREMENTS:**
1. **Dialogue Transcription**: Verbatim text with language identification
2. **Sound Effects**: Detailed description of every audio element
3. **Music Analysis**: Genre, instruments, tempo, emotional impact
4. **Audio Quality**: Clarity, mixing, spatial audio, frequency analysis

**OUTPUT FORMAT:**
Provide a comprehensive analysis in this exact structure:

### DETAILED VIDEO ANALYSIS

**Technical Specifications:**
- Resolution: [exact resolution]
- Frame Rate: [fps]
- Duration: [total time]
- Aspect Ratio: [ratio]
- Quality Assessment: [professional evaluation]

**Visual Breakdown:**
[Detailed scene-by-scene analysis with pixel-level precision]

**Audio Breakdown:**
[Comprehensive audio analysis with technical details]

**Overall Assessment:**
[Professional evaluation of video quality and content]`

      const result = await this.tryWithRobustFallbackVideo(systemPrompt, base64Data)

      if (!result) {
        return {
          success: false,
          error: "Failed to analyze video"
        }
      }

      const processingTime = Date.now() - startTime

      // Parse the detailed analysis
      const parsedAnalysis = this.parseDetailedAnalysis(result.result || "Analysis completed but no output generated")

      return {
        success: true,
        data: {
          ...parsedAnalysis,
          metadata: {
            model: result.metadata?.model || "Gemini 2.5 Flash",
            processingTime
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze video"
      }
    }
  }

  private parseDetailedAnalysis(analysis: string): Omit<DetailedVideoAnalysis, 'metadata'> {
    // Parse technical specifications
    const techSpecsMatch = analysis.match(/\*\*Technical Specifications:\*\*\s*\n([\s\S]*?)(?=\*\*Visual Breakdown:\*\*)/)
    const visualMatch = analysis.match(/\*\*Visual Breakdown:\*\*\s*\n([\s\S]*?)(?=\*\*Audio Breakdown:\*\*)/)
    const audioMatch = analysis.match(/\*\*Audio Breakdown:\*\*\s*\n([\s\S]*?)(?=\*\*Overall Assessment:\*\*)/)
    const overallMatch = analysis.match(/\*\*Overall Assessment:\*\*\s*\n([\s\S]*?)$/)

    // Extract technical specs
    const techSpecsText = techSpecsMatch?.[1] || ""
    const resolutionMatch = techSpecsText.match(/Resolution:\s*([^\n]+)/)
    const frameRateMatch = techSpecsText.match(/Frame Rate:\s*([^\n]+)/)
    const durationMatch = techSpecsText.match(/Duration:\s*([^\n]+)/)
    const aspectRatioMatch = techSpecsText.match(/Aspect Ratio:\s*([^\n]+)/)
    const qualityMatch = techSpecsText.match(/Quality Assessment:\s*([^\n]+)/)

    return {
      technicalSpecs: {
        resolution: resolutionMatch?.[1]?.trim() || "Unknown",
        frameRate: frameRateMatch?.[1]?.trim() || "Unknown",
        duration: durationMatch?.[1]?.trim() || "Unknown",
        aspectRatio: aspectRatioMatch?.[1]?.trim() || "Unknown",
        qualityAssessment: qualityMatch?.[1]?.trim() || "Unknown"
      },
      visualBreakdown: visualMatch?.[1]?.trim() || analysis,
      audioBreakdown: audioMatch?.[1]?.trim() || "No audio analysis available",
      overallAssessment: overallMatch?.[1]?.trim() || "No overall assessment available"
    }
  }
}

export const videoAnalysisService = new VideoAnalysisService() 