"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Lightbulb, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type Locale, getTranslation } from "@/lib/i18n"

interface Character {
  id: string
  name: string
  description: string
}

interface Veo3PromptInterfaceProps {
  locale: Locale
}

export function Veo3PromptInterface({ locale }: Veo3PromptInterfaceProps) {
  const [context, setContext] = useState("")
  const [characters, setCharacters] = useState<Character[]>([{ id: "1", name: "", description: "" }])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const { toast } = useToast()

  const addCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "",
      description: "",
    }
    setCharacters([...characters, newCharacter])
  }

  const removeCharacter = (id: string) => {
    if (characters.length > 1) {
      setCharacters(characters.filter((char) => char.id !== id))
    }
  }

  const updateCharacter = (id: string, field: "name" | "description", value: string) => {
    setCharacters(characters.map((char) => (char.id === id ? { ...char, [field]: value } : char)))
  }

  const generatePrompt = async () => {
    if (!context.trim()) {
      toast({
        title: "Contexte requis",
        description: "Veuillez fournir un contexte pour générer le prompt.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedPrompt("")

    try {
      const response = await fetch("/api/generate-veo3-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context,
          characters: characters.filter((char) => char.name.trim() || char.description.trim()),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Échec de la génération du prompt")
      }

      setGeneratedPrompt(data.prompt)

      toast({
        title: "Prompt généré avec succès!",
        description: "Votre prompt Veo3 est prêt à être utilisé.",
      })
    } catch (error) {
      console.error("Erreur lors de la génération:", error)
      toast({
        title: "Échec de la génération",
        description: error instanceof Error ? error.message : "Échec de la génération du prompt. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const suggestContext = () => {
    const suggestions = [
      "Par un matin brumeux, dans un petit café au bord de la route à Ho Chi Minh Ville, une conversation inattendue change le cours d'une journée ordinaire.",
      "Dans un laboratoire high-tech futuriste, un scientifique fait une découverte qui pourrait changer l'humanité pour toujours.",
      "Sur une plage isolée au coucher du soleil, deux amis d'enfance se retrouvent après des années de séparation.",
      "Dans une librairie ancienne et mystérieuse, un livre oublié révèle des secrets du passé.",
      "Au sommet d'un gratte-ciel, un entrepreneur prend la décision la plus importante de sa carrière.",
    ]

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setContext(randomSuggestion)
  }

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[860px] mx-auto">
          <Tabs defaultValue="veo3" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="script" className="text-sm font-medium">
                {getTranslation(locale, "videoScriptGenerator")}
              </TabsTrigger>
              <TabsTrigger value="veo3" className="text-sm font-medium text-blue-600">
                {getTranslation(locale, "veo3PromptGeneration")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="script">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Générateur de Script Vidéo - En cours de développement</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="veo3">
              <div className="space-y-6">
                {/* Context Section */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                          {getTranslation(locale, "context")}
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={suggestContext}
                          className="flex items-center gap-2 text-xs bg-transparent"
                        >
                          <Lightbulb className="h-3 w-3" />
                          {getTranslation(locale, "suggest")}
                        </Button>
                      </div>
                      <Textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder={getTranslation(locale, "contextPlaceholder")}
                        className="min-h-[120px] resize-none text-sm"
                        maxLength={1000}
                      />
                      <div className="text-xs text-muted-foreground text-right">{context.length}/1000</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Characters Section */}
                <div className="space-y-4">
                  {characters.map((character, index) => (
                    <Card key={character.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-foreground">
                            {getTranslation(locale, "character")} {index + 1}
                          </h3>
                          {characters.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeCharacter(character.id)}
                              className="text-red-600 hover:text-red-700 text-xs"
                            >
                              {getTranslation(locale, "deleteCharacter")}
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                              {getTranslation(locale, "characterName")}
                            </label>
                            <Input
                              value={character.name}
                              onChange={(e) => updateCharacter(character.id, "name", e.target.value)}
                              placeholder={getTranslation(locale, "characterNamePlaceholder")}
                              className="text-sm"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                              {getTranslation(locale, "characterDescription")}
                            </label>
                            <Textarea
                              value={character.description}
                              onChange={(e) => updateCharacter(character.id, "description", e.target.value)}
                              placeholder={getTranslation(locale, "characterDescriptionPlaceholder")}
                              className="min-h-[80px] resize-none text-sm"
                              maxLength={300}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addCharacter}
                    className="w-full flex items-center gap-2 py-3 border-dashed bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter un Personnage
                  </Button>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generatePrompt}
                  disabled={isGenerating || !context.trim()}
                  className="w-full h-12 text-base font-medium"
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

                {/* Generated Prompt Output */}
                {generatedPrompt && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Prompt Généré</h3>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedPrompt}</pre>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
