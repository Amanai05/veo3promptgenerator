interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
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

export class GeminiAPI {
  private apiKey: string
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(endpoint: string, data: any): Promise<GeminiResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}?key=${this.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async analyzeImage(imageBase64: string, mimeType: string): Promise<ImageAnalysisResult> {
    const systemPrompt = `You are an expert AI image analyst specializing in creating detailed prompts for content creators and developers. Analyze the provided image with extreme detail and provide two distinct outputs:

1. JSON Analysis: Create a comprehensive structured analysis including:
   - Main subjects, objects, and elements
   - Color palette with hex codes where possible
   - Mood, atmosphere, and emotional tone
   - Composition, framing, and visual hierarchy
   - Lighting conditions and quality
   - Style, genre, and artistic approach
   - Technical camera details (estimated)
   - Scene breakdown by layers (foreground, midground, background)
   - Suggested use cases and applications
   - Keywords and tags for searchability

2. Paragraph Description: Write a rich, detailed narrative description that:
   - Captures the essence and story of the image
   - Uses vivid, descriptive language
   - Includes technical and artistic details
   - Suitable for creative briefs and content creation
   - Flows naturally and engagingly

Format your response as valid JSON with 'jsonAnalysis' and 'paragraphDescription' fields.`

    const data = {
      contents: [
        {
          parts: [
            {
              text: systemPrompt,
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }

    const response = await this.makeRequest("/models/gemini-2.5-flash:generateContent", data)
    const content = response.candidates[0]?.content?.parts[0]?.text

    if (!content) {
      throw new Error("No response from Gemini API")
    }

    try {
      const parsed = JSON.parse(content)
      return {
        jsonOutput: JSON.stringify(parsed.jsonAnalysis, null, 2),
        paragraphOutput: parsed.paragraphDescription,
      }
    } catch (error) {
      return {
        jsonOutput: JSON.stringify(
          {
            error: "Failed to parse structured response",
            raw_response: content,
          },
          null,
          2,
        ),
        paragraphOutput: content,
      }
    }
  }

  async analyzeVideo(videoBase64: string): Promise<VideoAnalysisResult> {
    const systemPrompt = `You are an expert video content analyst. Analyze the provided video and create two comprehensive outputs:

1. JSON Analysis: Detailed structured breakdown including:
   - Video metadata (duration, resolution, fps, file size estimate)
   - Scene-by-scene breakdown with timestamps
   - Visual elements, objects, and subjects
   - Camera work (movements, angles, shots)
   - Audio analysis (dialogue, music, sound effects, ambient sounds)
   - Color grading and visual style
   - Pacing and rhythm
   - Technical production quality
   - Mood and atmosphere progression
   - Suggested applications and use cases

2. Narrative Description: Comprehensive storytelling description that:
   - Describes the video's narrative flow
   - Captures visual and audio elements
   - Includes technical production details
   - Suitable for video briefs and creative direction
   - Engaging and professionally written

If the video contains no dialogue or voice, focus on analyzing background music, sound effects, ambient audio, and visual storytelling elements.

Format as valid JSON with 'jsonAnalysis' and 'paragraphDescription' fields.`

    const data = {
      contents: [
        {
          parts: [
            {
              text: systemPrompt,
            },
            {
              inline_data: {
                mime_type: "video/mp4",
                data: videoBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }

    const response = await this.makeRequest("/models/gemini-2.5-flash:generateContent", data)
    const content = response.candidates[0]?.content?.parts[0]?.text

    if (!content) {
      throw new Error("No response from Gemini API")
    }

    try {
      const parsed = JSON.parse(content)
      return {
        jsonOutput: JSON.stringify(parsed.jsonAnalysis, null, 2),
        paragraphOutput: parsed.paragraphDescription,
      }
    } catch (error) {
      return {
        jsonOutput: JSON.stringify(
          {
            error: "Failed to parse structured response",
            raw_response: content,
          },
          null,
          2,
        ),
        paragraphOutput: content,
      }
    }
  }

  async transcribeAudio(audioBase64: string): Promise<TranscriptionResult> {
    const systemPrompt = `You are an expert audio transcription and analysis specialist. Analyze the provided audio and:

1. If there is clear speech/dialogue:
   - Provide accurate transcription with timestamps
   - Format: [HH:MM:SS] Speaker text
   - Include natural pauses and speech patterns
   - Note any background sounds or music

2. If there is no clear speech/dialogue:
   - Analyze and describe background music in detail
   - Identify sound effects and ambient sounds
   - Describe the audio's mood and atmosphere
   - Note tempo, instruments, genre (for music)
   - Provide timestamps for different audio segments

3. Mixed content:
   - Transcribe speech where present
   - Describe non-speech audio elements
   - Note the relationship between speech and background audio

Always provide detailed, professional analysis regardless of audio content type.`

    const data = {
      contents: [
        {
          parts: [
            {
              text: systemPrompt,
            },
            {
              inline_data: {
                mime_type: "audio/mp3",
                data: audioBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.6,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,
      },
    }

    const response = await this.makeRequest("/models/gemini-2.5-flash:generateContent", data)
    const content = response.candidates[0]?.content?.parts[0]?.text

    if (!content) {
      throw new Error("No response from Gemini API")
    }

    return {
      transcription: content,
    }
  }

  async chatPromptGeneration(
    userMessage: string,
    attachedFiles?: Array<{ data: string; mimeType: string; name: string }>,
  ): Promise<ChatResponse> {
    const systemPrompt = `You are Veo 3 PromptGenerator's advanced AI assistant, specialized in creating exceptional video prompts and creative content. Your expertise includes:

- Video production and cinematography
- Creative writing and storytelling
- Technical video specifications
- AI video generation prompts
- Content strategy and creative direction

When a user describes what they want to create, analyze their request and provide THREE distinct variations:

1. DETAILED PROMPT: Highly technical, comprehensive prompt with specific camera angles, lighting, timing, technical specifications, and production details
2. PARAGRAPH PROMPT: Creative, narrative-focused description that captures the essence and story
3. IDEA TEXT: Concise, inspiring concept that distills the core creative vision

Always consider:
- Visual composition and cinematography
- Audio and music suggestions
- Pacing and rhythm
- Mood and atmosphere
- Technical feasibility
- Creative innovation

If files are attached, analyze them deeply and incorporate insights into your prompt variations.

Respond in a conversational, helpful tone while maintaining professional expertise.`

    const parts = [{ text: `${systemPrompt}\n\nUser Request: ${userMessage}` }]

    // Add attached files if present
    if (attachedFiles && attachedFiles.length > 0) {
      attachedFiles.forEach((file) => {
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
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }

    const response = await this.makeRequest("/models/gemini-2.5-flash:generateContent", data)
    const content = response.candidates[0]?.content?.parts[0]?.text

    if (!content) {
      throw new Error("No response from Gemini API")
    }

    // Parse the response to extract the three variations
    const sections = content.split(/(?:DETAILED PROMPT|PARAGRAPH PROMPT|IDEA TEXT):/i)

    return {
      detailedPrompt: sections[1]?.trim() || content,
      paragraphPrompt: sections[2]?.trim() || "Creative description will be generated...",
      ideaText: sections[3]?.trim() || "Core concept will be provided...",
    }
  }
}
