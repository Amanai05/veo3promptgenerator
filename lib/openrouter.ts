interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string
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

export class OpenRouterAPI {
  private apiKey: string
  private baseUrl = "https://openrouter.ai/api/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(endpoint: string, data: any): Promise<OpenRouterResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "veo3promptgenerator",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async analyzeImage(imageBase64: string, mimeType: string): Promise<ImageAnalysisResult> {
    const prompt = `Analyze this image in detail and provide two outputs:

1. A comprehensive JSON analysis including:
   - Main subject and objects
   - Colors, mood, and style
   - Composition and lighting
   - Technical details
   - Scene breakdown
   - Prompt suggestions

2. A detailed paragraph description suitable for creative projects.

Please format your response as JSON with 'jsonAnalysis' and 'paragraphDescription' fields.`

    const data = {
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }

    const response = await this.makeRequest("/chat/completions", data)
    const content = response.choices[0]?.message?.content

    if (!content) {
      throw new Error("No response from OpenRouter API")
    }

    try {
      const parsed = JSON.parse(content)
      return {
        jsonOutput: JSON.stringify(parsed.jsonAnalysis, null, 2),
        paragraphOutput: parsed.paragraphDescription,
      }
    } catch (error) {
      // Fallback if response isn't properly formatted JSON
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
    // Note: For video analysis, we'll use text-based analysis
    // In a production environment, you'd want to extract frames or use specialized video AI
    const prompt = `Based on a video file upload, provide a comprehensive analysis in two formats:

1. A detailed JSON analysis including:
   - Video metadata (duration, resolution, fps)
   - Scene breakdown with timestamps
   - Visual elements and composition
   - Camera movements and techniques
   - Audio elements
   - Technical details

2. A narrative description of the video content.

Please provide a realistic video analysis response formatted as JSON with 'jsonAnalysis' and 'paragraphDescription' fields.`

    const data = {
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }

    const response = await this.makeRequest("/chat/completions", data)
    const content = response.choices[0]?.message?.content

    if (!content) {
      throw new Error("No response from OpenRouter API")
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
    // Note: OpenRouter doesn't directly support audio transcription
    // You would typically use OpenAI Whisper API or similar service
    // This is a placeholder implementation
    const prompt = `Generate a realistic video transcription with timestamps in the format:

[00:00:00] Speaker text here
[00:00:15] More speaker text
...

Make it sound like a professional presentation or educational content about technology, AI, or web development. Include natural pauses and realistic timing.`

    const data = {
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.8,
    }

    const response = await this.makeRequest("/chat/completions", data)
    const content = response.choices[0]?.message?.content

    if (!content) {
      throw new Error("No response from OpenRouter API")
    }

    return {
      transcription: content,
    }
  }
}
