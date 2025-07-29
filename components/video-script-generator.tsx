"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type Locale, getTranslation } from "@/lib/i18n"

interface VideoScriptGeneratorProps {
  locale: Locale
}

export function VideoScriptGenerator({ locale }: VideoScriptGeneratorProps) {
  const [formData, setFormData] = useState({
    videoTopic: "",
    audience: "",
    scriptLength: "",
    scriptStyle: "",
    language: "vietnamese",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const { toast } = useToast()

  const audiences = [
    { value: "general", label: getTranslation(locale, "generalAudience") },
    { value: "teens", label: getTranslation(locale, "teenagers") },
    { value: "young-adults", label: getTranslation(locale, "youngAdults") },
    { value: "professionals", label: getTranslation(locale, "professionals") },
    { value: "parents", label: getTranslation(locale, "parents") },
    { value: "seniors", label: getTranslation(locale, "seniors") },
  ]

  const scriptLengths = [
    { value: "15-30s", label: getTranslation(locale, "length15to30") },
    { value: "30-60s", label: getTranslation(locale, "length30to60") },
    { value: "1-2min", label: getTranslation(locale, "length1to2min") },
    { value: "2-5min", label: getTranslation(locale, "length2to5min") },
    { value: "5-10min", label: getTranslation(locale, "length5to10min") },
  ]

  const scriptStyles = [
    { value: "conversational", label: getTranslation(locale, "conversational") },
    { value: "professional", label: getTranslation(locale, "professional") },
    { value: "energetic", label: getTranslation(locale, "energetic") },
    { value: "educational", label: getTranslation(locale, "educational") },
    { value: "storytelling", label: getTranslation(locale, "storytelling") },
    { value: "promotional", label: getTranslation(locale, "promotional") },
  ]

  const languages = [
    { value: "vietnamese", label: getTranslation(locale, "vietnamese") },
    { value: "english", label: getTranslation(locale, "english") },
    { value: "french", label: getTranslation(locale, "french") },
    { value: "spanish", label: getTranslation(locale, "spanish") },
    { value: "german", label: getTranslation(locale, "german") },
  ]

  const generateScript = async () => {
    if (!formData.videoTopic.trim() || !formData.audience || !formData.scriptLength || !formData.scriptStyle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedScript("")

    try {
      const response = await fetch("/api/generate-video-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate script")
      }

      setGeneratedScript(data.script)

      toast({
        title: "Script generated successfully!",
        description: "Your video script is ready.",
      })
    } catch (error) {
      console.error("Error generating script:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="video-script-generator" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {getTranslation(locale, "videoScriptGenerator")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Topic */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{getTranslation(locale, "videoTopic")}</label>
                <Textarea
                  value={formData.videoTopic}
                  onChange={(e) => setFormData((prev) => ({ ...prev, videoTopic: e.target.value }))}
                  placeholder={getTranslation(locale, "videoTopicPlaceholder")}
                  className="min-h-[120px] resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground text-right">{formData.videoTopic.length}/500</div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Audience */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{getTranslation(locale, "audience")}</label>
                  <Select
                    value={formData.audience}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, audience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={getTranslation(locale, "selectAudience")} />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map((audience) => (
                        <SelectItem key={audience.value} value={audience.value}>
                          {audience.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Script Length */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {getTranslation(locale, "scriptLength")}
                  </label>
                  <Select
                    value={formData.scriptLength}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, scriptLength: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={getTranslation(locale, "selectLength")} />
                    </SelectTrigger>
                    <SelectContent>
                      {scriptLengths.map((length) => (
                        <SelectItem key={length.value} value={length.value}>
                          {length.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Script Style */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{getTranslation(locale, "scriptStyle")}</label>
                  <Select
                    value={formData.scriptStyle}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, scriptStyle: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={getTranslation(locale, "selectStyle")} />
                    </SelectTrigger>
                    <SelectContent>
                      {scriptStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{getTranslation(locale, "language")}</label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateScript}
                disabled={isGenerating}
                className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {getTranslation(locale, "loading")}
                  </>
                ) : (
                  <>{getTranslation(locale, "generator")} →</>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Script Output */}
          {generatedScript && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Generated Video Script</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedScript}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
