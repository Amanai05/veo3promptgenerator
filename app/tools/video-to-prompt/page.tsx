import { VideoToPrompt } from "@/components/tools/video-to-prompt"

export const metadata = {
  title: "Video to Prompt - Veo3 Prompt Generator",
  description: "Convert your videos into detailed AI prompts for video generation tools.",
}

export default function VideoToPromptPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Video to <span className="text-primary">Prompt</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload your video and get detailed AI prompts that can recreate similar content.
        </p>
      </div>
      <VideoToPrompt />
    </div>
  )
}
