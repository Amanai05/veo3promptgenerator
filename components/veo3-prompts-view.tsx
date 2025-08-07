import { Veo3PromptResult } from "@/lib/services/dual-ai-pipeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Play, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Veo3PromptsViewProps {
  prompts: Veo3PromptResult
}

export function Veo3PromptsView({ prompts }: Veo3PromptsViewProps) {
  const { toast } = useToast()

  const copyToClipboard = async (text: string, sceneNumber: number) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Prompt copied!",
        description: `Scene ${sceneNumber} prompt copied to clipboard.`,
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive"
      })
    }
  }

  const copyAllPrompts = async () => {
    try {
      const allPrompts = prompts.scenes.map(scene => 
        `Scene ${scene.sceneNumber} (${scene.timeRange}):\n${scene.prompt}\n`
      ).join('\n')
      
      await navigator.clipboard.writeText(allPrompts)
      toast({
        title: "All prompts copied!",
        description: "All Veo3 prompts copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy all prompts. Please copy manually.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Copy All Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Veo3 Generation Prompts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {prompts.scenes.length} scenes generated for Veo3 AI
          </p>
        </div>
        <Button onClick={copyAllPrompts} variant="outline" size="sm">
          <Copy className="h-4 w-4 mr-2" />
          Copy All
        </Button>
      </div>

      {/* Scenes */}
      <div className="space-y-4">
        {prompts.scenes.map((scene, index) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Scene {scene.sceneNumber}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {scene.timeRange}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => copyToClipboard(scene.prompt, scene.sceneNumber)}
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <code className="text-sm leading-relaxed whitespace-pre-wrap">
                  {scene.prompt}
                </code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Metadata */}
      <div className="text-center">
        <Badge variant="outline" className="text-xs">
          Generated with {prompts.metadata.model} in {prompts.metadata.processingTime}ms
        </Badge>
      </div>
    </div>
  )
} 