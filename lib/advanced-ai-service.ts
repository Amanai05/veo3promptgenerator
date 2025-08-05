import { NextResponse } from "next/server";
import { BaseAIService, AIResponse, AIMetadata } from './ai-base';

interface AdvancedVeo3PromptData {
  jsonPrompt: string;
  paragraphPrompt: string;
  metadata: AIMetadata;
}

export class AdvancedAIService extends BaseAIService {
  async generateJSONPrompt(formData: any, dialogueSetting: string = "no"): Promise<AIResponse> {
    const startTime = Date.now();

    if (!this.hasValidAPIs()) {
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
      const { result, metadata } = await this.tryWithRobustFallback(advancedJSONSystemPrompt);
      console.log("Advanced JSON AI Response:", result);

      // Robust JSON parsing with fallback
      let jsonPrompt;
      try {
        jsonPrompt = this.parseJSONResponse(result);
      } catch (parseError) {
        console.error("JSON parsing failed, using fallback:", parseError);
        jsonPrompt = this.createFallbackJSON(formData.mainSubject || "main subject", formData);
      }

      return {
        success: true,
        data: {
          jsonPrompt,
          metadata: {
            ...metadata,
            processingTime: Date.now() - startTime
          }
        }
      };
    } catch (error) {
      console.error("Advanced JSON generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  async generateParagraphPrompt(formData: any, dialogueSetting: string = "no"): Promise<AIResponse> {
    const startTime = Date.now();

    if (!this.hasValidAPIs()) {
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
      const { result, metadata } = await this.tryWithRobustFallback(advancedParagraphSystemPrompt);
      console.log("Advanced Paragraph AI Response:", result);

      // Use the full response as paragraph, with fallback
      const paragraphPrompt = result || this.createFallbackParagraph(formData.mainSubject || "main subject", formData);

      return {
        success: true,
        data: {
          paragraphPrompt,
          metadata: {
            ...metadata,
            processingTime: Date.now() - startTime
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