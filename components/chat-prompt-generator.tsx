"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { VideoScriptGenerator } from "@/components/video-script-generator"
import { AdvancedPromptGenerator } from "@/components/advanced-prompt-generator"
import { AIChatSection } from "@/components/ai-chat-section"
import { Video, MessageSquare, Sparkles } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"

interface ChatPromptGeneratorProps {
  locale: Locale
}

export function ChatPromptGenerator({ locale }: ChatPromptGeneratorProps) {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)

  return (
    <section id="generator" className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Creative Tools
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Choose from our suite of AI tools to create video scripts, generate prompts, or chat with our AI assistant.
          </p>
        </div>

        {/* Tool Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <a href="#video-script">
                <Video className="h-4 w-4" />
                {getTranslation(locale, "aiVideoScript")}
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <a href="#prompt-generator">
                <MessageSquare className="h-4 w-4" />
                {getTranslation(locale, "promptGenerator")}
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <a href="#advanced-prompt">
                <Sparkles className="h-4 w-4" />
                {getTranslation(locale, "advancedPromptGenerator")}
              </a>
            </Button>
          </div>
        </div>

        {/* Main Content with Fixed Width */}
        <div className="max-w-[860px] mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
              <TabsTrigger value="video-script" className="flex items-center gap-2 text-sm">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Video Script</span>
                <span className="sm:hidden">Script</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">AI Chat</span>
                <span className="sm:hidden">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced</span>
                <span className="sm:hidden">Pro</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video-script" id="video-script">
              <VideoScriptGenerator locale={locale} />
            </TabsContent>

            <TabsContent value="chat" id="prompt-generator">
              {/* Mode Toggle */}
              <div className="mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">
                          {isAdvancedMode
                            ? getTranslation(locale, "advancedMode")
                            : getTranslation(locale, "standardMode")}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {isAdvancedMode
                            ? "Detailed form-based prompt generation with specific fields"
                            : "Natural conversation with AI for creative guidance and prompts"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{getTranslation(locale, "standardMode")}</span>
                        <Switch checked={isAdvancedMode} onCheckedChange={setIsAdvancedMode} />
                        <span className="text-xs text-muted-foreground">{getTranslation(locale, "advancedMode")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content based on mode */}
              {isAdvancedMode ? <AdvancedPromptGenerator locale={locale} /> : <AIChatSection />}
            </TabsContent>

            <TabsContent value="advanced" id="advanced-prompt">
              <AdvancedPromptGenerator locale={locale} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
