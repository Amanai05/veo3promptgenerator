import { NextResponse } from "next/server"

interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface AdvancedVeo3PromptData {
  jsonPrompt: string;
  paragraphPrompt: string;
  metadata: {
    model: string;
    processingTime: number;
  };
}

class GeminiAPI {
  private apiKey: string;
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/models/gemini-2.5-pro:generateContent?key=${this.apiKey}`, {
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
    return data.candidates[0]?.content?.parts[0]?.text || "";
  }
}

class OpenRouterAPI {
  private apiKey: string;
  private baseUrl = "https://openrouter.ai/api/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
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
    return data.choices[0]?.message?.content || "";
  }
}

export class AdvancedAIService {
  private geminiAPI?: GeminiAPI;
  private openRouterAPI?: OpenRouterAPI;

  constructor() {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (geminiApiKey) {
      this.geminiAPI = new GeminiAPI(geminiApiKey);
    }

    if (openRouterApiKey) {
      this.openRouterAPI = new OpenRouterAPI(openRouterApiKey);
    }

    console.log("Advanced AI Service Initialization:");
    console.log("  - GEMINI_API_KEY:", geminiApiKey ? "Set" : "Not set");
    console.log("  - OPENROUTER_API_KEY:", openRouterApiKey ? "Set" : "Not set");
  }

  private async tryWithFallback(prompt: string): Promise<{ result: string; model: string }> {
    try {
      if (this.geminiAPI) {
        console.log("Using Gemini API for advanced mode...");
        const result = await this.geminiAPI.generateContent(prompt);
        return { result, model: "gemini-2.5-pro" };
      }
    } catch (error) {
      console.log("Gemini API failed, trying OpenRouter...");
    }

    if (this.openRouterAPI) {
      console.log("Using OpenRouter API for advanced mode...");
      const result = await this.openRouterAPI.generateContent(prompt);
      return { result, model: "openrouter-gemini-2.5-pro" };
    }

    throw new Error("No AI service available");
  }

  async generateJSONPrompt(formData: any, dialogueSetting: string = "no"): Promise<AIResponse> {
    const startTime = Date.now();

    if (!this.geminiAPI && !this.openRouterAPI) {
      return {
        success: false,
        error: "No AI service available. Please configure API keys in .env.local file."
      };
    }

    // Add dialogue-specific instructions based on user selection
    let dialogueInstructions = "";
    switch (dialogueSetting) {
      case "yes":
        dialogueInstructions = "create the detailed prompt with the dialogue provided by the users";
        break;
      case "ai":
        dialogueInstructions = "if the prompt provided by the user doesn't have any dialogue add few dialogue relevant to the content or the user prompt the audio dialogue length should not exceed more than 5 seconds";
        break;
      case "no":
        dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues";
        break;
      default:
        dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues";
    }

    const advancedJSONSystemPrompt = `You are "Cine-Core 8 Advanced", a hyper-specialized AI prompt engineering system for professional cinematography. Your mission is to transform detailed form inputs into a single, dense, and technically flawless 8-second JSON prompt for Google's Veo3 video generation model.

**DIALOGUE INSTRUCTION: ${dialogueInstructions}**

**FORM DATA ANALYSIS:**
- Main Subject: ${formData.mainSubject}
- Scene Action: ${formData.sceneAction}
- Camera Movement: ${formData.cameraMovement || "Not specified"}
- Additional Details: ${formData.otherDetails || "Not specified"}
- Subtitles: ${formData.subtitles === "yes" ? "Include subtitles" : "No subtitles"}
- Target Audience: ${formData.targetAudience || "General audience"}
- Video Style: ${formData.videoStyle || "Cinematic"}
- Duration Preference: ${formData.durationPreference || "8 seconds"}

---
### **I. IMMUTABLE LAWS (NON-NEGOTIABLE RULES)**
1.  **JSON-Only Output:** Your entire response MUST be a single, raw, valid JSON object. It must start with '{' and end with '}'. No conversational text, no markdown, no explanations.
2.  **The 8-Second Mandate:** We are creating a single, impactful shot. The "duration_seconds" field MUST ALWAYS be the integer 8.
3.  **Strict Adherence to Schema:** You MUST follow the JSON schema provided in Section III precisely.
4.  **Form Data Integration:** You MUST incorporate ALL provided form data into your JSON output, enhancing it with cinematic expertise.

---
### **II. ADVANCED CINEMATIC PHILOSOPHY**
*   **Form-Driven Enhancement:** Use the provided form data as your foundation, then enhance it with professional cinematography techniques.
*   **Audience Awareness:** Tailor the visual style and mood to match the specified target audience.
*   **Style Consistency:** Maintain the specified video style throughout all elements.
*   **Technical Precision:** Ensure all technical specifications align with Veo3's capabilities.
*   **Narrative Coherence:** Create a cohesive 8-second story that flows naturally.

---
### **III. THE ADVANCED JSON BLUEPRINT**
{
  "shot_concept": "A one-sentence, high-impact summary incorporating the main subject, action, and style preferences.",
  "duration_seconds": 8,
  "composition": {
    "shot_type": "Professional shot type based on the scene requirements.",
    "camera_dynamics": "Detailed camera movement incorporating the specified camera movement preferences."
  },
  "subject": {
    "description": "Enhanced description of the main subject incorporating all form details.",
    "action": "The specific action incorporating the scene action and additional details.",
    "dialogue": "Dialogue handling based on the dialogue setting instruction."
  },
  "atmosphere": {
    "setting": "Detailed environment description incorporating additional details and style preferences.",
    "lighting_style": "Professional lighting that matches the video style and mood.",
    "color_palette": "Color scheme appropriate for the target audience and style."
  },
  "audio_design": {
    "sound_effects": "Sound effects that complement the action and environment.",
    "music_cue": "Music description that matches the style and target audience."
  },
  "technical_specs": {
    "resolution": "4K",
    "frame_rate": 30,
    "aspect_ratio": "16:9",
    "subtitles": ${formData.subtitles === "yes" ? "true" : "false"}
  }
}

---
### **IV. YOUR TASK**
Process the provided form data with cinematic expertise. Enhance every element while maintaining the user's vision. Generate a professional JSON output that incorporates all form details seamlessly.

**Form Data:** ${JSON.stringify(formData, null, 2)}`;

    try {
      const { result, model } = await this.tryWithFallback(advancedJSONSystemPrompt);
      console.log("Advanced JSON AI Response:", result);

      // Robust JSON parsing
      let jsonPrompt;
      try {
        JSON.parse(result);
        jsonPrompt = result;
      } catch (e) {
        console.log("Direct JSON parsing failed, looking for JSON in response...");
        
        const jsonStart = result.indexOf('{');
        const jsonEnd = result.lastIndexOf('}') + 1;
        
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          try {
            const potentialJson = result.substring(jsonStart, jsonEnd);
            JSON.parse(potentialJson);
            jsonPrompt = potentialJson;
          } catch (e2) {
            console.log("JSON extraction failed, using fallback...");
            jsonPrompt = JSON.stringify({
              shot_concept: `Advanced 8-second cinematic shot featuring ${formData.mainSubject} performing ${formData.sceneAction}.`,
              duration_seconds: 8,
              composition: {
                shot_type: "Professional Cinematic Shot",
                camera_dynamics: formData.cameraMovement || "Smooth and dynamic camera work"
              },
              subject: {
                description: `Enhanced ${formData.mainSubject} with professional details.`,
                action: formData.sceneAction,
                dialogue: ""
              },
              atmosphere: {
                setting: formData.otherDetails || "Professional cinematic environment",
                lighting_style: "Professional cinematic lighting",
                color_palette: "Cinematic color grading"
              },
              audio_design: {
                sound_effects: "Professional sound design",
                music_cue: "Cinematic score"
              },
              technical_specs: {
                resolution: "4K",
                frame_rate: 30,
                aspect_ratio: "16:9",
                subtitles: formData.subtitles === "yes"
              }
            }, null, 2);
          }
        } else {
          jsonPrompt = JSON.stringify({
            shot_concept: `Advanced 8-second cinematic shot featuring ${formData.mainSubject} performing ${formData.sceneAction}.`,
            duration_seconds: 8,
            composition: {
              shot_type: "Professional Cinematic Shot",
              camera_dynamics: formData.cameraMovement || "Smooth and dynamic camera work"
            },
            subject: {
              description: `Enhanced ${formData.mainSubject} with professional details.`,
              action: formData.sceneAction,
              dialogue: ""
            },
            atmosphere: {
              setting: formData.otherDetails || "Professional cinematic environment",
              lighting_style: "Professional cinematic lighting",
              color_palette: "Cinematic color grading"
            },
            audio_design: {
              sound_effects: "Professional sound design",
              music_cue: "Cinematic score"
            },
            technical_specs: {
              resolution: "4K",
              frame_rate: 30,
              aspect_ratio: "16:9",
              subtitles: formData.subtitles === "yes"
            }
          }, null, 2);
        }
      }

      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: {
          jsonPrompt,
          metadata: {
            model,
            processingTime,
          },
        },
      };
    } catch (error) {
      console.error("Advanced JSON generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  async generateParagraphPrompt(formData: any, dialogueSetting: string = "no"): Promise<AIResponse> {
    const startTime = Date.now();

    if (!this.geminiAPI && !this.openRouterAPI) {
      return {
        success: false,
        error: "No AI service available. Please configure API keys in .env.local file."
      };
    }

    // Add dialogue-specific instructions based on user selection
    let dialogueInstructions = "";
    switch (dialogueSetting) {
      case "yes":
        dialogueInstructions = "create the detailed prompt with the dialogue provided by the users";
        break;
      case "ai":
        dialogueInstructions = "if the prompt provided by the user doesn't have any dialogue add few dialogue relevant to the content or the user prompt the audio dialogue length should not exceed more than 5 seconds";
        break;
      case "no":
        dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues";
        break;
      default:
        dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues";
    }

    const advancedParagraphSystemPrompt = `You are an expert Veo3 video concept and prompt engineer specializing in advanced, form-driven prompt generation. Your role is to transform detailed form inputs into a production-ready, highly optimized paragraph prompt for Google's Veo3 AI video generation platform.

**DIALOGUE INSTRUCTION: ${dialogueInstructions}**

**FORM DATA ANALYSIS:**
- Main Subject: ${formData.mainSubject}
- Scene Action: ${formData.sceneAction}
- Camera Movement: ${formData.cameraMovement || "Not specified"}
- Additional Details: ${formData.otherDetails || "Not specified"}
- Subtitles: ${formData.subtitles === "yes" ? "Include subtitles" : "No subtitles"}
- Target Audience: ${formData.targetAudience || "General audience"}
- Video Style: ${formData.videoStyle || "Cinematic"}
- Duration Preference: ${formData.durationPreference || "8 seconds"}

**Process:**

1.  **Form Data Integration (PRIMARY FOCUS):** Carefully analyze ALL provided form data to understand the complete vision. Integrate every detail into a cohesive narrative.
2.  **Style Enhancement:** Based on the specified video style and target audience, enhance the form data with professional cinematography techniques.
3.  **Technical Optimization:** Ensure the prompt leverages Veo3's capabilities while incorporating all technical specifications.
4.  **Generate Advanced Paragraph:** Create a detailed paragraph that seamlessly weaves together all form elements with cinematic expertise.

**Output Requirements:**

*   You MUST respond with ONLY the paragraph. Do not include any introductory text, labels, or extraneous information.
*   The generated video clip should be approximately 8 seconds long.
*   The paragraph MUST include the following elements, woven together seamlessly:
    *   **Scene Setting:** A vivid description incorporating additional details and style preferences.
    *   **Subject Description:** Detailed information about the main subject incorporating all form details.
    *   **Action and Movement:** A clear description incorporating the specified scene action and camera movement.
    *   **Camera Work:** Explicit details about camera angles, movements, and techniques based on form specifications.
    *   **Lighting and Mood:** A comprehensive description matching the specified video style and target audience.
    *   **Audio Elements:** Specific details about sound effects, music, and dialogue based on form preferences.
    *   **Technical Specifications:** Implicitly convey 4K resolution, 30fps, 16:9 aspect ratio, with subtitle handling based on form data.

Write in a natural, engaging, and descriptive style that accurately reflects the form data and target audience. The paragraph should be ready for immediate use in Veo3.`;

    try {
      const { result, model } = await this.tryWithFallback(advancedParagraphSystemPrompt);
      console.log("Advanced Paragraph AI Response:", result);

      // Use the full response as paragraph
      const paragraphPrompt = result || `A professional 8-second cinematic video featuring ${formData.mainSubject} performing ${formData.sceneAction}. The environment is carefully crafted based on the provided details, with enhanced subject descriptions that capture the essence of the concept. The camera work employs professional techniques incorporating ${formData.cameraMovement || "smooth movements"} and strategic angles that enhance the narrative. Lighting is designed to create the perfect mood matching the ${formData.videoStyle || "cinematic"} style for the ${formData.targetAudience || "target"} audience. Audio elements include carefully selected sound effects and background music that complement the visual storytelling. The scene is optimized for 4K resolution at 30fps with a 16:9 aspect ratio, ensuring professional quality output ready for immediate use in Veo3 AI generation.`;

      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: {
          paragraphPrompt,
          metadata: {
            model,
            processingTime
          }
        }
      };

    } catch (error) {
      console.error("Advanced paragraph generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }
}

export const advancedAIService = new AdvancedAIService(); 