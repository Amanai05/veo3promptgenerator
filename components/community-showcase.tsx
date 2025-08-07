"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const communityVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Creative Video Example 1",
  },
  {
    id: "9bZkp7q19f0",
    title: "Creative Video Example 2",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Creative Video Example 3",
  },
  {
    id: "tgbNymZ7vqY",
    title: "Creative Video Example 4",
  },
  {
    id: "60ItHLz5WEA",
    title: "Creative Video Example 5",
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "Creative Video Example 6",
  },
]

export function CommunityShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const autoScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth
      const currentScroll = container.scrollLeft

      if (currentScroll >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        container.scrollTo({
          left: currentScroll + 320,
          behavior: "smooth",
        })
      }
    }

    const interval = setInterval(autoScroll, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Community{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Showcase</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover amazing videos created by our community using Veo3 prompts and tools.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Video Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto px-12"
          >
            {communityVideos.map((video) => (
              <div key={video.id} className="flex-shrink-0 w-80">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0&showinfo=0&controls=1`}
                        title={video.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
