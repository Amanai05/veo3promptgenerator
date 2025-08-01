// ========================================================================
// START OF CORRECTED simple-ai-service.ts
// ========================================================================

interface AIResponse {
    success: boolean;
    data?: any;
    error?: string;
  }
  
  // NOTE: This interface is not currently used by the corrected JSON logic,
  // but is kept for the paragraph prompt.
  interface SimpleVeo3PromptData {
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
            temperature: 0.8, // FIX: Slightly increased temperature to encourage more creative enhancement.
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048, // FIX: Increased token limit for potentially more detailed JSON.
          },
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      // The response text is now guaranteed to be a JSON string.
      return data.candidates[0]?.content?.parts[0]?.text || "";
    }
  }
  
  class OpenRouterAPI {
      // ... (This class remains unchanged, but be aware it might not support response_mime_type, making it a less reliable fallback for JSON)
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
            model: "google/gemini-2.5-pro",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2048,
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
  
  export class SimpleAIService {
    private geminiAPI?: GeminiAPI;
    private openRouterAPI?: OpenRouterAPI;
  
    constructor() {
      // ... (Constructor remains unchanged)
      const geminiKey = process.env.GEMINI_API_KEY
      const openRouterKey = process.env.OPENROUTER_API_KEY
  
      console.log("Simple AI Service Initialization:")
      console.log("  - GEMINI_API_KEY:", geminiKey ? "Set" : "Missing")
      console.log("  - OPENROUTER_API_KEY:", openRouterKey ? "Set" : "Missing")
  
      if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
        this.geminiAPI = new GeminiAPI(geminiKey)
      }
      if (openRouterKey && openRouterKey !== "your_openrouter_api_key_here") {
        this.openRouterAPI = new OpenRouterAPI(openRouterKey)
      }
  
      if (!this.geminiAPI && !this.openRouterAPI) {
        console.warn("No API keys configured. Simple mode AI features will not work.")
      }
    }
  
    private async tryWithFallback(prompt: string): Promise<{ result: string; model: string }> {
      // ... (tryWithFallback remains unchanged)
      if (this.geminiAPI) {
          try {
            console.log("Using Gemini API for simple mode...")
            const result = await this.geminiAPI.generateContent(prompt)
            return { result, model: "gemini-2.5-pro" }
          } catch (error) {
            console.warn("Gemini API failed, trying OpenRouter...")
            if (this.openRouterAPI) {
              const result = await this.openRouterAPI.generateContent(prompt)
              return { result, model: "openrouter/gemini-2.5-flash" }
            } else {
              throw error
            }
          }
        } else if (this.openRouterAPI) {
          console.log("Using OpenRouter API for simple mode...")
          const result = await this.openRouterAPI.generateContent(prompt)
          return { result, model: "openrouter/gemini-2.5-flash" }
        } else {
          throw new Error("No AI service available")
        }
    }
  
    async generateJSONPrompt(userInput: string, dialogueSetting: string = "no"): Promise<AIResponse> {
      const startTime = Date.now()

      if (!this.geminiAPI && !this.openRouterAPI) {
        return {
          success: false,
          error: "No AI service available. Please configure API keys in .env.local file."
        }
      }

      // Add dialogue-specific instructions based on user selection
      let dialogueInstructions = ""
      switch (dialogueSetting) {
        case "yes":
          dialogueInstructions = "create the detailed prompt with the dialogue provided by the users"
          break
        case "ai":
          dialogueInstructions = "if the prompt provided by the user doesn't have any dialogue add few dialogue relevant to the content or the user prompt the audio dialogue length should not exceed more than 5 seconds"
          break
        case "no":
          dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues"
          break
        default:
          dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues"
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

**User Input:** ${userInput}`
  
      try {
        const { result, model } = await this.tryWithFallback(jsonSystemPrompt);
        console.log("JSON AI Response:", result);
  
        // FIX: Replaced the entire fragile parsing block with a single, robust try/catch.
        // This is now possible because we are using `response_mime_type: "application/json"`.
        let jsonPrompt;
        try {
          // First, try to parse the result directly as JSON
          JSON.parse(result);
          jsonPrompt = result;
        } catch (e) {
          console.log("Direct JSON parsing failed, looking for JSON in response...");
          
          // Look for JSON in the response (in case AI added explanatory text)
          const jsonStart = result.indexOf('{');
          const jsonEnd = result.lastIndexOf('}') + 1;
          
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            try {
              const potentialJson = result.substring(jsonStart, jsonEnd);
              JSON.parse(potentialJson); // Validate it's proper JSON
              jsonPrompt = potentialJson;
              console.log("Found valid JSON in response");
            } catch (parseError) {
              console.error("JSON found but invalid, using fallback");
              throw parseError;
            }
          } else {
            console.error("No JSON found in response, using fallback");
            throw new Error("No JSON found in response");
          }
        }
        
        // If we still don't have valid JSON, use the fallback
        if (!jsonPrompt) {
          console.error("CRITICAL: AI returned invalid JSON despite instructions. Using fallback.");
          
          // FIX: The fallback now uses the CORRECT schema and follows the rules.
          const fallbackJson = {
            shot_concept: `A cinematic 8-second shot based on the idea: ${userInput}.`,
            duration_seconds: 8,
            composition: {
              shot_type: "Medium Shot",
              camera_dynamics: "Smooth and stable camera work."
            },
            subject: {
              description: `The main subject is: ${userInput}.`,
              action: "The subject performs a key action related to the concept.",
              dialogue: ""
            },
            atmosphere: {
              setting: "A setting appropriate to the user's concept.",
              lighting_style: "Professional cinematic lighting.",
              color_palette: "A color palette that matches the mood of the scene."
            },
            audio_design: {
              sound_effects: "Appropriate ambient sounds and sound effects.",
              music_cue: "Background music that fits the scene's emotion."
            }
          };
          jsonPrompt = JSON.stringify(fallbackJson, null, 2);
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
        console.error("JSON generation error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    }
  
    // NOTE: The paragraph prompt generation is a separate concern.
    // The issues identified primarily affect the JSON generation logic.
    async generateParagraphPrompt(userInput: string, dialogueSetting: string = "no"): Promise<AIResponse> {
      const startTime = Date.now()

      if (!this.geminiAPI && !this.openRouterAPI) {
        return {
          success: false,
          error: "No AI service available. Please configure API keys in .env.local file."
        }
      }

      // Add dialogue-specific instructions based on user selection
      let dialogueInstructions = ""
      switch (dialogueSetting) {
        case "yes":
          dialogueInstructions = "create the detailed prompt with the dialogue provided by the users"
          break
        case "ai":
          dialogueInstructions = "if the prompt provided by the user doesn't have any dialogue add few dialogue relevant to the content or the user prompt the audio dialogue length should not exceed more than 5 seconds"
          break
        case "no":
          dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues"
          break
        default:
          dialogueInstructions = "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues"
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

Write in a natural, engaging, and descriptive style that accurately reflects the user's intended style and content. The paragraph should be ready for immediate use in Veo3, requiring no further editing or additions.`
  
      try {
        const { result, model } = await this.tryWithFallback(paragraphSystemPrompt)
        console.log("Paragraph AI Response:", result)
  
        // Use the full response as paragraph
        const paragraphPrompt = result || `A dynamic 8-second video scene featuring ${userInput}. The environment is carefully crafted to match the user's vision, with detailed subject descriptions that capture the essence of the concept. The camera work employs professional techniques with smooth movements and strategic angles that enhance the narrative. Lighting is designed to create the perfect mood and atmosphere, while audio elements include carefully selected sound effects and background music that complement the visual storytelling. The scene is optimized for 4K resolution at 30fps with a 16:9 aspect ratio, ensuring professional quality output ready for immediate use in Veo3 AI generation.`
  
        const processingTime = Date.now() - startTime
  
        return {
          success: true,
          data: {
            paragraphPrompt,
            metadata: {
              model,
              processingTime
            }
          }
        }
  
      } catch (error) {
        console.error("Paragraph generation error:", error)
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error occurred"
        }
      }
    }
  }
  
  export const simpleAIService = new SimpleAIService();
  
  
  // ========================================================================
  // END OF CORRECTED simple-ai-service.ts
  // ========================================================================