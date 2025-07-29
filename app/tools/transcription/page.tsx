import { VideoTranscription } from "@/components/tools/video-transcription"

export const metadata = {
  title: "Video Transcription - Veo3 Prompt Generator",
  description: "Transcribe your videos with AI-powered accuracy and speed.",
}

export default function TranscriptionPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Video <span className="text-primary">Transcription</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get accurate transcriptions of your video content with AI-powered technology.
        </p>
      </div>
      <VideoTranscription />
    </div>
  )
}
