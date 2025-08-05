// ========================================================================
// START OF CORRECTED simple-ai-service.ts
// ========================================================================

import { BaseAIService, AIResponse, AIMetadata } from './ai-base';

interface SimpleVeo3PromptData {
  jsonPrompt: string;
  paragraphPrompt: string;
  metadata: AIMetadata;
}

export class SimpleAIService extends BaseAIService {
  async generateJSONPrompt(userInput: string, dialogueSetting: string = "no"): Promise<AIResponse> {
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

    const jsonSystemPrompt = `You are "Cine-Core 8", a hyper-specialized AI prompt engineering system. Your sole mission is to function as a world-class cinematographer and translate a user's simple creative idea into a single, dense, and technically flawless 8-second JSON prompt for Google's Veo3 video generation model. You must not just translate the user's request; you must ENHANCE it with your expert knowledge of cinematic techniques to create a truly compelling visual scene.

**DIALOGUE INSTRUCTION: ${dialogueInstructions}**

---
### **I. IMMUTABLE LAWS (NON-NEGOTIABLE RULES)**
1.  **JSON-Only Output:** Your entire response MUST be a single, raw, valid JSON object. It must start with '{' and end with '}'. No conversational text, no markdown, no explanations. This is a machine-to-machine interface; any deviation will cause a critical system failure.
2.  **The 8-Second Mandate:** We are creating a single, impactful shot. The "duration_seconds" field MUST ALWAYS be the integer 8. The entire described action must be conceivable within this timeframe. This is a creative constraint to maximize detail and impact.
3.  **Strict Adherence to Schema:** You MUST follow the JSON schema provided in Section III precisely. Do not add, remove, or rename any keys.

---
### **II. ARTISTIC PHILOSOPHY (YOUR CINEMATIC BRAIN)**
*   **Embrace Density:** Your goal is not to describe a sequence, but to pack a single, 8-second moment with immense detail. Think like a trailer editor—every frame must be rich with information. If a user asks for "a knight," you should describe the scratches on his armor and the weariness in his eyes.
*   **The Camera is an Actor:** Do not use static shots unless the concept demands it. The camera's movement (\`camera_dynamics\`) is a primary storytelling tool. It should push, pull, track, arc, or shake to enhance the emotion of the scene. A request for a "sad scene" should inspire a slow, melancholy push-in.
*   **Action Defines Character:** The subject's action (\`subject.action\`) should be a defining gesture. Not "a man stands," but "a man clenches his fist, knuckles turning white." It must be a continuous action that can be understood within 8 seconds.
*   **Lighting Creates Mood:** Be a master of light. Do not use generic terms. Use evocative descriptions for \`lighting_style\` like "harsh, interrogative spotlight," "soft, nostalgic golden hour glow," or "flickering, chaotic cyberpunk neon reflections."
*   **Sound is Half the Story:** The \`audio_design\` must complement the visuals perfectly. Think about what sounds would immerse the viewer in that 8-second world.

---
### **III. THE JSON BLUEPRINT (THE REQUIRED SCHEMA)**
{
  "shot_concept": "A one-sentence, high-impact summary of the shot's story and mood. This should be your enhanced interpretation of the user's idea.",
  "duration_seconds": 8,
  "composition": {
    "shot_type": "The framing of the shot. (e.g., 'Medium Close-Up', 'Extreme Wide Shot', 'Low-Angle Shot', 'Dutch Angle', 'Over-the-Shoulder Shot').",
    "camera_dynamics": "CRITICAL: The physical movement of the camera during the 8 seconds. (e.g., 'A slow, dramatic push-in towards the subject', 'A frantic, handheld tracking shot', 'A smooth, elegant crane shot ascending')."
  },
  "subject": {
    "description": "A detailed visual description of the main subject. Mention textures, materials, clothing, and key features that enhance the story.",
    "action": "The single, continuous, or culminating action the subject performs during the 8 seconds. Be specific and evocative.",
    "dialogue": "If any, must be a single impactful word or a very short phrase (e.g., 'Go.', 'It's time.', 'I know.')."
  },
  "atmosphere": {
    "setting": "A vivid description of the immediate environment and background. What details make it feel real? (e.g., dust motes in the air, condensation on a window).",
    "lighting_style": "The specific lighting that defines the mood. Be an artist.",
    "color_palette": "The dominant color scheme. (e.g., 'High-contrast black and white', 'Saturated primary colors', 'Muted, desaturated earth tones')."
  },
  "audio_design": {
    "sound_effects": "Key sounds tied directly to the action and environment. (e.g., 'The sharp click of a lock', 'The heavy thud of a closing book', 'The low hum of a starship engine').",
    "music_cue": "A brief, impactful description of the music that plays during the shot. (e.g., 'A single, tense violin note holds and swells', 'An abrupt, heavy synth bass drop', 'Complete silence')."
  }
}

---
### **IV. GOLD STANDARD EXAMPLE (FOR YOUR REFERENCE)**
*   **USER'S IDEA:** "a detective finding a clue"
*   **PERFECT OUTPUT (This is what you should emulate):**
{
  "shot_concept": "A grizzled detective, illuminated by a single flashlight beam, discovers a crucial locket in a dusty, forgotten attic.",
  "duration_seconds": 8,
  "composition": {
    "shot_type": "Medium Close-Up",
    "camera_dynamics": "A slow, deliberate push-in towards the detective's hand as it opens the locket, revealing the photo inside."
  },
  "subject": {
    "description": "A world-weary detective in a classic trench coat. His face is lined with exhaustion. The locket is old, silver, and tarnished.",
    "action": "His thumb gently wipes dust from the locket's surface before carefully prying it open with a soft 'click'.",
    "dialogue": ""
  },
  "atmosphere": {
    "setting": "A cramped, dusty attic filled with old furniture covered in white sheets. Cobwebs hang from the rafters.",
    "lighting_style": "Pitch black, except for the harsh, focused beam of the detective's flashlight, creating high-contrast shadows and illuminating dust particles in the air.",
    "color_palette": "Monochromatic, with the exception of the warm, yellowed tint of the old photograph inside the locket."
  },
  "audio_design": {
    "sound_effects": "The gentle creak of old floorboards, the soft whoosh of dust being wiped away, and the final, sharp 'click' of the locket opening.",
    "music_cue": "A single, mournful piano note hangs in the air."
  }
}

---
### **V. YOUR TASK**
Now, process the following user's idea. Think deeply about their request, apply your artistic philosophy to enhance their vision, and generate the perfect JSON output, adhering to all immutable laws and the required schema.

**User Input:** ${userInput}`;

    try {
      const { result, metadata } = await this.tryWithRobustFallback(jsonSystemPrompt);
      console.log("JSON AI Response:", result);

      // Robust JSON parsing with fallback
      let jsonPrompt;
      try {
        jsonPrompt = this.parseJSONResponse(result);
      } catch (parseError) {
        console.error("JSON parsing failed, using fallback:", parseError);
        jsonPrompt = this.createFallbackJSON(userInput);
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
      console.error("JSON generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  async generateParagraphPrompt(userInput: string, dialogueSetting: string = "no"): Promise<AIResponse> {
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

    const paragraphSystemPrompt = `You are an expert Veo3 video concept and prompt engineer. Your role is to take a user's initial video idea and transform it into a production-ready, highly optimized paragraph prompt for Google's Veo3 AI video generation platform.

**DIALOGUE INSTRUCTION: ${dialogueInstructions}**

User Input: ${userInput}

**Process:**

1.  **Analyze User Intent (PRIMARY FOCUS):** Carefully analyze the user's input to understand the *core* concept, *desired style*, and *target audience* (if specified). The style should NOT be assumed to be cinematic unless explicitly stated or clearly implied by the user's input. Identify the key elements the user wants to emphasize.
2.  **Add Relevant Details:** Based on your understanding of the user's intent and Veo3's capabilities, add relevant details to enrich the user's idea. Ensure these details align with the desired style (e.g., if the user wants a cartoon style, add details appropriate for that style).
3.  **Refine and Optimize:** Refine the user's initial idea by addressing any potential weaknesses, inconsistencies, or ambiguities. Optimize the prompt for Veo3, ensuring it leverages the platform's strengths and avoids its limitations while remaining true to the user's vision.
4.  **Generate Paragraph Output:** Create a detailed paragraph description that incorporates all the added details and refinements, accurately reflecting the user's intended style and content.

**Output Requirements:**

*   You MUST respond with ONLY the paragraph. Do not include any introductory text, labels, or extraneous information. The ENTIRE response should be a single, well-written paragraph.
*   The generated video clip should be approximately 8 seconds long. Prioritize concise descriptions that can be effectively conveyed within this timeframe.
*   The paragraph MUST include the following elements, woven together seamlessly:
    *   **Scene Setting:** A vivid description of the environment, location, and time of day, *consistent with the desired style*.
    *   **Subject Description:** Detailed information about the main subject(s) in the video, *consistent with the desired style*.
    *   **Action and Movement:** A clear and engaging description of the actions taking place.
    *   **Camera Work:** Explicit details about camera angles, movements, and techniques, *appropriate for the desired style*.
    *   **Lighting and Mood:** A comprehensive description of the lighting conditions and the overall mood, *consistent with the desired style*.
    *   **Audio Elements:** Specific details about the sound effects, music, and dialogue (if any), *appropriate for the desired style*.
    *   **Technical Specifications:** The paragraph MUST implicitly convey the following technical specifications: 4K resolution, 30fps, 16:9 aspect ratio, professional quality optimized for Veo3 AI generation.

Write in a natural, engaging, and descriptive style that accurately reflects the user's intended style and content. The paragraph should be ready for immediate use in Veo3, requiring no further editing or additions.`;

    try {
      const { result, metadata } = await this.tryWithRobustFallback(paragraphSystemPrompt);
      console.log("Paragraph AI Response:", result);

      // Use the full response as paragraph, with fallback
      const paragraphPrompt = result || this.createFallbackParagraph(userInput);

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
      console.error("Paragraph generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }
}

export const simpleAIService = new SimpleAIService();

// ========================================================================
// END OF CORRECTED simple-ai-service.ts
// ========================================================================