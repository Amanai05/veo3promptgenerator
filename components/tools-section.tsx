"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageToPrompt } from "@/components/tools/image-to-prompt"
import { VideoToPrompt } from "@/components/tools/video-to-prompt"
import { VideoTranscription } from "@/components/tools/video-transcription"
import { ImageIcon, VideoIcon, FileTextIcon } from "lucide-react"

export function ToolsSection() {
  return (
    <section id="tools" className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Generation Tools
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Choose your tool and start generating powerful prompts from your media content.
          </p>
        </div>

        <Tabs defaultValue="image" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12">
            <TabsTrigger value="image" className="flex items-center gap-2 text-xs sm:text-sm">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Image to Prompt</span>
              <span className="sm:hidden">Image</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2 text-xs sm:text-sm">
              <VideoIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Video to Prompt</span>
              <span className="sm:hidden">Video</span>
            </TabsTrigger>
            <TabsTrigger value="transcription" className="flex items-center gap-2 text-xs sm:text-sm">
              <FileTextIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Transcription</span>
              <span className="sm:hidden">Text</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image">
            <ImageToPrompt />
          </TabsContent>

          <TabsContent value="video">
            <VideoToPrompt />
          </TabsContent>

          <TabsContent value="transcription">
            <VideoTranscription />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
