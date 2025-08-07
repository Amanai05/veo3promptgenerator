import { BaseAIService } from "@/lib/ai-base"

interface DetailedVideoAnalysis {
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

interface Veo3Scene {
  sceneNumber: number;
  timeRange: string;
  prompt: string;
}

interface Veo3PromptResult {
  scenes: Veo3Scene[];
  metadata: {
    model: string;
    processingTime: number;
  };
}

export class Veo3PromptConverterService extends BaseAIService {
  async convertAnalysisToVeo3Prompts(detailedAnalysis: DetailedVideoAnalysis): Promise<{
    success: boolean;
    data?: Veo3PromptResult;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      const systemPrompt = `You are 'Veo3 Prompt Master v2.0', an expert Veo3 prompt engineer. Convert the detailed video analysis into professional Veo3 generation prompts.

**INPUT:** Detailed video analysis with pixel-level precision
**OUTPUT:** Scene-by-scene Veo3 prompts optimized for Google's Veo3 platform

**CONVERSION REQUIREMENTS:**
1. **Scene Segmentation**: Divide into 8-second segments
2. **Cinematic Language**: Use professional Veo3-compatible terms
3. **Technical Precision**: Maintain exact visual and audio specifications
4. **Dialogue Integration**: Properly format dialogue for lip-sync
5. **Style Consistency**: Ensure coherent visual style across scenes

**STRICT OUTPUT FORMAT:**
Your response MUST begin immediately with \`### SCENE 1\`. Use this exact format:

### SCENE 1 (00:00 - 00:08)

**Veo3 Generation Prompt:**
[Comprehensive comma-separated prompt with all visual and audio elements]

### SCENE 2 (00:08 - 00:16)

**Veo3 Generation Prompt:**
[Comprehensive comma-separated prompt with all visual and audio elements]

[Continue for all scenes]

**ANALYSIS TO CONVERT:**
${detailedAnalysis.visualBreakdown}

**AUDIO ANALYSIS:**
${detailedAnalysis.audioBreakdown}

**TECHNICAL SPECS:**
Resolution: ${detailedAnalysis.technicalSpecs.resolution}
Frame Rate: ${detailedAnalysis.technicalSpecs.frameRate}
Duration: ${detailedAnalysis.technicalSpecs.duration}
Aspect Ratio: ${detailedAnalysis.technicalSpecs.aspectRatio}
Quality: ${detailedAnalysis.technicalSpecs.qualityAssessment}

**OVERALL ASSESSMENT:**
${detailedAnalysis.overallAssessment}`

      const result = await this.tryWithRobustFallback(systemPrompt);

      if (!result) {
        return {
          success: false,
          error: "Failed to convert analysis to Veo3 prompts"
        };
      }

      // Parse the result into structured scenes
      const scenes = this.parseVeo3Scenes(result.result);

      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: {
          scenes,
          metadata: {
            model: result.metadata?.model || "Gemini 2.5 Flash",
            processingTime
          }
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to convert analysis to Veo3 prompts"
      };
    }
  }

  private parseVeo3Scenes(result: string): Veo3Scene[] {
    const scenes: Veo3Scene[] = [];
    const sceneRegex = /### SCENE (\d+) \(([^)]+)\)\s*\n\s*\*\*Veo3 Generation Prompt:\*\*\s*\n([\s\S]*?)(?=### SCENE|\s*$)/g;
    
    let match;
    while ((match = sceneRegex.exec(result)) !== null) {
      const sceneNumber = parseInt(match[1]);
      const timeRange = match[2];
      const prompt = match[3].trim();
      
      scenes.push({
        sceneNumber,
        timeRange,
        prompt
      });
    }
    
    return scenes;
  }
}

export const veo3PromptConverterService = new Veo3PromptConverterService() 