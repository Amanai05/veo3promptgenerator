"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdvancedPromptGenerator } from "@/components/advanced-prompt-generator"
import { MessageSquare, Sparkles } from "lucide-react"
import { type Locale } from "@/lib/i18n"
import Link from "next/link"

interface ChatPromptGeneratorProps {
  locale: Locale
}

export function ChatPromptGenerator({ locale }: ChatPromptGeneratorProps) {
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
            Choose from our suite of AI tools to create video scripts and generate prompts.
          </p>
        </div>

        {/* Tool Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <Link href="/video-script-generator">
                <MessageSquare className="h-4 w-4" />
                Video Script Generator
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <a href="#prompt-generator">
                <Sparkles className="h-4 w-4" />
                Advanced Prompt Generator
              </a>
            </Button>
          </div>
        </div>

        {/* Main Content with Fixed Width */}
        <div className="max-w-[860px] mx-auto">
          <Tabs defaultValue="advanced" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-8 h-14">
              <TabsTrigger value="advanced" className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced Prompt Generator</span>
                <span className="sm:hidden">Advanced</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="advanced" id="advanced-prompt">
              <AdvancedPromptGenerator locale={locale} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
