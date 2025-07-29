"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type Locale, getTranslation } from "@/lib/i18n"

interface AdvancedPromptGeneratorProps {
  locale: Locale
}

export function AdvancedPromptGenerator({ locale }: AdvancedPromptGeneratorProps) {
  const [formData, setFormData] = useState({
    mainSubject: "",
    sceneAction: "",
    dialogue: "",
    cameraMovement: "",
    otherDetails: "",
    subtitles: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const { toast } = useToast()

  const generatePrompt = async () => {
    if (!formData.mainSubject.trim() || !formData.sceneAction.trim()) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields (marked with red border).",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedPrompt("")

    try {
      const response = await fetch("/api/generate-advanced-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate prompt")
      }

              console.log("API Response:", data) // Debug log

        // Handle both old and new response formats
        let prompt = "No prompt generated"

        if (data.jsonPrompt && data.paragraphPrompt) {
          // New dual format - store separately for dual-box display
          prompt = `JSON:${data.jsonPrompt}|||PARAGRAPH:${data.paragraphPrompt}`
        } else if (data.jsonPrompt) {
          prompt = data.jsonPrompt
        } else if (data.prompt) {
          prompt = data.prompt
        }

        setGeneratedPrompt(prompt)

      toast({
        title: "Advanced prompt generated!",
        description: "Your detailed video prompt is ready.",
      })
    } catch (error) {
      console.error("Error generating prompt:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate prompt. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {getTranslation(locale, "advancedPromptGenerator")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Subject - Required */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{getTranslation(locale, "mainSubject")}</label>
            <Textarea
              value={formData.mainSubject}
              onChange={(e) => setFormData((prev) => ({ ...prev, mainSubject: e.target.value }))}
              placeholder={getTranslation(locale, "mainSubjectPlaceholder")}
              className={`min-h-[80px] resize-none ${!formData.mainSubject.trim() ? "border-red-500 focus:border-red-500" : ""}`}
              maxLength={300}
            />
            {!formData.mainSubject.trim() && (
              <p className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">{getTranslation(locale, "required")}</p>
            )}
          </div>

          {/* Scene Action - Required */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{getTranslation(locale, "sceneAction")}</label>
            <Textarea
              value={formData.sceneAction}
              onChange={(e) => setFormData((prev) => ({ ...prev, sceneAction: e.target.value }))}
              placeholder={getTranslation(locale, "sceneActionPlaceholder")}
              className={`min-h-[80px] resize-none ${!formData.sceneAction.trim() ? "border-red-500 focus:border-red-500" : ""}`}
              maxLength={300}
            />
            {!formData.sceneAction.trim() && (
              <p className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">{getTranslation(locale, "required")}</p>
            )}
          </div>

          {/* Dialogue - Optional */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {getTranslation(locale, "dialogue")}{" "}
              <span className="text-muted-foreground italic">({getTranslation(locale, "optional")})</span>
            </label>
            <Textarea
              value={formData.dialogue}
              onChange={(e) => setFormData((prev) => ({ ...prev, dialogue: e.target.value }))}
              placeholder={getTranslation(locale, "dialoguePlaceholder")}
              className="min-h-[80px] resize-none"
              maxLength={200}
            />
          </div>

          {/* Camera Movement - Optional */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {getTranslation(locale, "cameraMovement")}{" "}
              <span className="text-muted-foreground italic">({getTranslation(locale, "optional")})</span>
            </label>
            <Textarea
              value={formData.cameraMovement}
              onChange={(e) => setFormData((prev) => ({ ...prev, cameraMovement: e.target.value }))}
              placeholder={getTranslation(locale, "cameraPlaceholder")}
              className="min-h-[80px] resize-none"
              maxLength={200}
            />
          </div>

          {/* Other Details - Optional */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {getTranslation(locale, "otherDetails")}{" "}
              <span className="text-muted-foreground italic">({getTranslation(locale, "optional")})</span>
            </label>
            <Textarea
              value={formData.otherDetails}
              onChange={(e) => setFormData((prev) => ({ ...prev, otherDetails: e.target.value }))}
              placeholder={getTranslation(locale, "otherDetailsPlaceholder")}
              className="min-h-[80px] resize-none"
              maxLength={200}
            />
          </div>

          {/* Subtitles - Optional */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              {getTranslation(locale, "subtitles")}{" "}
              <span className="text-muted-foreground italic">({getTranslation(locale, "optional")})</span>
            </label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={formData.subtitles === "yes" ? "default" : "outline"}
                onClick={() => setFormData((prev) => ({ ...prev, subtitles: "yes" }))}
                className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white"
              >
                {getTranslation(locale, "yes")}
              </Button>
              <Button
                type="button"
                variant={formData.subtitles === "no" ? "default" : "outline"}
                onClick={() => setFormData((prev) => ({ ...prev, subtitles: "no" }))}
                className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white"
              >
                {getTranslation(locale, "no")}
              </Button>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generatePrompt}
            disabled={isGenerating || !formData.mainSubject.trim() || !formData.sceneAction.trim()}
            className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                {getTranslation(locale, "loading")}
              </>
            ) : (
              getTranslation(locale, "generate")
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Prompt Output */}
      {generatedPrompt && (
        <div className="space-y-4">
          {/* JSON Format Box */}
          {generatedPrompt.includes('JSON:') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    JSON Format (Technical)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const jsonContent = generatedPrompt.split('JSON:')[1]?.split('|||')[0] || ''
                      await navigator.clipboard.writeText(jsonContent)
                      toast({
                        title: "Copied!",
                        description: "JSON format copied to clipboard",
                      })
                    }}
                    className="text-xs"
                  >
                    📋 Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {generatedPrompt.split('JSON:')[1]?.split('|||')[0] || ''}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use this structured format for technical AI processing and API integrations.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Paragraph Format Box */}
          {generatedPrompt.includes('PARAGRAPH:') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Paragraph Format (Creative)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const paragraphContent = generatedPrompt.split('PARAGRAPH:')[1] || ''
                      await navigator.clipboard.writeText(paragraphContent)
                      toast({
                        title: "Copied!",
                        description: "Paragraph format copied to clipboard",
                      })
                    }}
                    className="text-xs"
                  >
                    📋 Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-800 dark:text-gray-200">
                    {generatedPrompt.split('PARAGRAPH:')[1] || ''}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use this narrative format for creative AI processing and storytelling.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Fallback for old format */}
          {!generatedPrompt.includes('JSON:') && !generatedPrompt.includes('PARAGRAPH:') && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Advanced Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-800 dark:text-gray-200">{generatedPrompt}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
