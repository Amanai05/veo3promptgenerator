"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const videoShowcase = [
  {
    id: "1",
    title: "Cinematic Landscape",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "2:34",
    category: "Nature",
    embedId: "dQw4w9WgXcQ", // Example YouTube ID
  },
  {
    id: "2",
    title: "Urban Architecture",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "1:45",
    category: "Architecture",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Product Showcase",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "3:12",
    category: "Commercial",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Abstract Motion",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "1:28",
    category: "Motion",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Documentary Style",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "4:56",
    category: "Documentary",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Tech Innovation",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "2:18",
    category: "Technology",
    embedId: "dQw4w9WgXcQ",
  },
]

export function VideoCarousel() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Community{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Showcase</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover amazing videos processed by our community and see the power of AI-generated prompts in action.
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-scroll space-x-6">
            {[...videoShowcase, ...videoShowcase].map((video, index) => (
              <Card
                key={`${video.id}-${index}`}
                className="flex-shrink-0 w-80 group hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                        <Play className="h-8 w-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Generated with Veo3 Prompt Generator AI
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{video.category}</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
