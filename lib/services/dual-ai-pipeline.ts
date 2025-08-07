import { videoAnalysisService } from "./video-analysis-service"
import { veo3PromptConverterService } from "./veo3-prompt-converter"

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

export interface Veo3Scene {
  sceneNumber: number;
  timeRange: string;
  prompt: string;
}

export interface Veo3PromptResult {
  scenes: Veo3Scene[];
  metadata: {
    model: string;
    processingTime: number;
  };
}

export interface DualAIResult {
  detailedAnalysis: DetailedVideoAnalysis;
  veo3Prompts: Veo3PromptResult;
  totalProcessingTime: number;
}

export class DualAIPipelineService {
  async processVideoToVeo3Prompts(
    base64Data: string, 
    mimeType: string, 
    fileName: string
  ): Promise<{
    success: boolean;
    data?: DualAIResult;
    error?: string;
  }> {
    const totalStartTime = Date.now();

    try {
      console.log("🚀 Starting Dual AI Pipeline...");
      console.log("📹 Stage 1: Detailed Video Analysis");
      
      // Stage 1: Detailed Analysis
      const analysisResult = await videoAnalysisService.analyzeVideoDetailed(
        base64Data, mimeType, fileName
      );
      
      if (!analysisResult.success) {
        console.error("❌ Stage 1 failed:", analysisResult.error);
        return { success: false, error: analysisResult.error };
      }
      
      console.log("✅ Stage 1 completed successfully");
      console.log("🎬 Stage 2: Veo3 Prompt Generation");
      
      // Stage 2: Veo3 Prompt Generation
      const promptResult = await veo3PromptConverterService.convertAnalysisToVeo3Prompts(
        analysisResult.data
      );
      
      if (!promptResult.success) {
        console.error("❌ Stage 2 failed:", promptResult.error);
        return { success: false, error: promptResult.error };
      }
      
      console.log("✅ Stage 2 completed successfully");
      
      const totalProcessingTime = Date.now() - totalStartTime;
      
      console.log("🎉 Dual AI Pipeline completed successfully!");
      console.log(`⏱️ Total processing time: ${totalProcessingTime}ms`);
      
      return {
        success: true,
        data: {
          detailedAnalysis: analysisResult.data,
          veo3Prompts: promptResult.data,
          totalProcessingTime
        }
      };
      
    } catch (error) {
      console.error("💥 Dual AI Pipeline error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Dual AI pipeline failed"
      };
    }
  }
}

export const dualAIPipelineService = new DualAIPipelineService() 