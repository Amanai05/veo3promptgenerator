import { DetailedVideoAnalysis } from "@/lib/services/dual-ai-pipeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Monitor, Speaker, Eye, BarChart3 } from "lucide-react"

interface DetailedAnalysisViewProps {
  analysis: DetailedVideoAnalysis
}

export function DetailedAnalysisView({ analysis }: DetailedAnalysisViewProps) {
  return (
    <div className="space-y-6">
      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Resolution:</span>
                <Badge variant="secondary">{analysis.technicalSpecs.resolution}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Frame Rate:</span>
                <Badge variant="secondary">{analysis.technicalSpecs.frameRate}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Duration:</span>
                <Badge variant="secondary">{analysis.technicalSpecs.duration}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Aspect Ratio:</span>
                <Badge variant="secondary">{analysis.technicalSpecs.aspectRatio}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Quality:</span>
                <Badge variant="outline">{analysis.technicalSpecs.qualityAssessment}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visual Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {analysis.visualBreakdown}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Speaker className="h-5 w-5" />
            Audio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {analysis.audioBreakdown}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {analysis.overallAssessment}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Metadata */}
      <div className="text-center">
        <Badge variant="outline" className="text-xs">
          Processed with {analysis.metadata.model} in {analysis.metadata.processingTime}ms
        </Badge>
      </div>
    </div>
  )
} 