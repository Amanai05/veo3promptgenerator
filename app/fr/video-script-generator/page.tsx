"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function FrenchVideoScriptGeneratorPage() {
  const [activeTab, setActiveTab] = useState("video-script")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    videoTopic: "",
    audience: "",
    scriptLength: "",
    scriptStyle: "",
    language: "french",
  })

  const audiences = [
    { value: "general", label: "Audience Générale" },
    { value: "teens", label: "Adolescents (13-19)" },
    { value: "young-adults", label: "Jeunes Adultes (20-35)" },
    { value: "professionals", label: "Professionnels" },
    { value: "parents", label: "Parents" },
    { value: "seniors", label: "Seniors (55+)" },
  ]

  const scriptLengths = [
    { value: "15-30s", label: "15-30 secondes" },
    { value: "30-60s", label: "30-60 secondes" },
    { value: "1-2min", label: "1-2 minutes" },
    { value: "2-5min", label: "2-5 minutes" },
    { value: "5-10min", label: "5-10 minutes" },
  ]

  const scriptStyles = [
    { value: "conversational", label: "Conversationnel" },
    { value: "professional", label: "Professionnel" },
    { value: "energetic", label: "Énergique" },
    { value: "educational", label: "Éducatif" },
    { value: "storytelling", label: "Narratif" },
    { value: "promotional", label: "Promotionnel" },
  ]

  const languages = [
    { value: "french", label: "Français" },
    { value: "english", label: "Anglais" },
    { value: "vietnamese", label: "Vietnamien" },
    { value: "spanish", label: "Espagnol" },
    { value: "german", label: "Allemand" },
  ]

  const generateScript = async () => {
    if (!formData.videoTopic.trim() || !formData.audience || !formData.scriptLength || !formData.scriptStyle) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedScript("")

    try {
      const response = await fetch("/api/generate-video-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Échec de la génération du script")

      setGeneratedScript(data.script)
      toast({
        title: "Script généré avec succès!",
        description: "Votre script vidéo est prêt.",
      })
    } catch (error) {
      console.error("Error generating script:", error)
      toast({
        title: "Échec de la génération",
        description: error instanceof Error ? error.message : "Échec de la génération du script. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const clearForm = () => {
    setFormData({
      videoTopic: "",
      audience: "",
      scriptLength: "",
      scriptStyle: "",
      language: "french",
    })
    setGeneratedScript("")
  }

  return (
    <main>
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto">
            {/* Headline */}
            <h1 className="text-center text-2xl font-bold mb-3">
              Générateur de Script Vidéo
            </h1>
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-center mb-6 max-w-2xl mx-auto text-sm">
              Créez des scripts vidéo professionnels pour YouTube, TikTok, Short, Reels et vidéos marketing
            </p>
            
            {/* Navigation Tabs */}
            <div className="flex justify-center mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video-script" className="bg-blue-100 text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    Générateur de Script Vidéo
                  </TabsTrigger>
                  <TabsTrigger value="veo3-prompt" asChild>
                    <Link href="/fr">Génération de Prompt Veo3</Link>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Main Form Card */}
            <Card className="shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                {/* Video Topic & Main Characters */}
                <div className="mb-6">
                  <label className="text-sm font-bold mb-2 block">
                    Sujet Vidéo et Personnages Principaux (Décrire en 1-2 phrases)
                  </label>
                  <Textarea
                    value={formData.videoTopic}
                    onChange={(e) => setFormData({ ...formData, videoTopic: e.target.value })}
                    placeholder="Exemple: Nouvelle publicité produit, introduction produit, guide d'utilisation produit,... Personnages: Exemple: Bébé Bi, M. A, Mme B,..."
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Form Fields in Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Who is your audience */}
                    <div>
                      <label className="text-sm font-bold mb-2 block">Qui est votre audience?</label>
                      <Select
                        value={formData.audience}
                        onValueChange={(value) => setFormData({ ...formData, audience: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner l'audience" />
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

                    {/* Script Style */}
                    <div>
                      <label className="text-sm font-bold mb-2 block">Style de Script</label>
                      <Select
                        value={formData.scriptStyle}
                        onValueChange={(value) => setFormData({ ...formData, scriptStyle: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le style" />
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
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Script Length */}
                    <div>
                      <label className="text-sm font-bold mb-2 block">Longueur du Script</label>
                      <Select
                        value={formData.scriptLength}
                        onValueChange={(value) => setFormData({ ...formData, scriptLength: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la longueur" />
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

                    {/* Language */}
                    <div>
                      <label className="text-sm font-bold mb-2 block">Langue</label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) => setFormData({ ...formData, language: value })}
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
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={generateScript}
                    disabled={isGenerating}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      "Générateur →"
                    )}
                  </Button>
                  <Button 
                    onClick={clearForm}
                    variant="outline"
                    className="px-6"
                  >
                    Réinitialiser
                  </Button>
                </div>

                {/* Result Container */}
                {generatedScript && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-bold mb-2">Script Généré:</h4>
                    <pre className="whitespace-pre-wrap text-sm">{generatedScript}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
} 