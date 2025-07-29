import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, User, Clock } from "lucide-react"

const blogPosts = [
  {
    id: "complete-guide-veo3-prompts",
    title: "Complete Guide to Veo3 Prompts: Master AI Video Generation",
    excerpt:
      "Learn how to create compelling Veo3 prompts that generate stunning AI videos. From basic concepts to advanced techniques, this comprehensive guide covers everything you need to know.",
    author: "Sarah Johnson",
    date: "2024-01-20",
    image: "/placeholder.svg?height=200&width=400&text=Veo3+Guide",
    category: "Guide",
    readTime: "12 min read",
  },
  {
    id: "video-script-writing-tips",
    title: "10 Essential Video Script Writing Tips for Content Creators",
    excerpt:
      "Discover proven techniques for writing engaging video scripts that captivate your audience and drive results. Perfect for YouTube, TikTok, and social media creators.",
    author: "Mike Chen",
    date: "2024-01-18",
    image: "/placeholder.svg?height=200&width=400&text=Script+Writing",
    category: "Tutorial",
    readTime: "8 min read",
  },
  {
    id: "ai-video-generation-trends-2024",
    title: "AI Video Generation Trends 2024: What's Next for Content Creation",
    excerpt:
      "Explore the latest trends in AI video generation, from Veo3 to Sora, and discover how these technologies are revolutionizing content creation across industries.",
    author: "Alex Rivera",
    date: "2024-01-15",
    image: "/placeholder.svg?height=200&width=400&text=AI+Trends+2024",
    category: "Industry",
    readTime: "10 min read",
  },
  {
    id: "optimize-prompts-better-results",
    title: "How to Optimize Your Prompts for Better AI Video Results",
    excerpt:
      "Master the art of prompt optimization with practical tips and examples. Learn how small changes in your prompts can dramatically improve your AI video output quality.",
    author: "Emma Thompson",
    date: "2024-01-12",
    image: "/placeholder.svg?height=200&width=400&text=Prompt+Optimization",
    category: "Tips",
    readTime: "7 min read",
  },
  {
    id: "veo3-vs-competitors-comparison",
    title: "Veo3 vs Competitors: Comprehensive AI Video Tool Comparison",
    excerpt:
      "An in-depth comparison of Veo3 against other leading AI video generation tools. Find out which platform best suits your content creation needs and budget.",
    author: "David Park",
    date: "2024-01-10",
    image: "/placeholder.svg?height=200&width=400&text=Tool+Comparison",
    category: "Comparison",
    readTime: "15 min read",
  },
]

export default function BlogPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            VeO3 <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and best practices for AI video generation, prompt engineering, and content creation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Link href={`/blog/${post.id}`} className="text-primary hover:underline font-medium">
                      Read More
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
