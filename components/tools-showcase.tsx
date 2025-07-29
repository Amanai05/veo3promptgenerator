"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoToPrompt } from "@/components/tools/video-to-prompt"
import { VideoTranscription } from "@/components/tools/video-transcription"
import { VideoIcon, FileTextIcon } from "lucide-react"

export function ToolsShowcase() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Advanced AI <span className="text-primary">Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools for video analysis and transcription powered by cutting-edge AI technology.
          </p>
        </div>

        <Tabs defaultValue="video" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
            <TabsTrigger value="video" className="flex items-center gap-2 text-sm sm:text-base">
              <VideoIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Video to Prompt</span>
              <span className="sm:hidden">Video</span>
            </TabsTrigger>
            <TabsTrigger value="transcription" className="flex items-center gap-2 text-sm sm:text-base">
              <FileTextIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Transcription</span>
              <span className="sm:hidden">Text</span>
            </TabsTrigger>
          </TabsList>

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
