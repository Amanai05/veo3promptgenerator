import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Star, Trophy, Heart, Share2, TrendingUp, Award } from "lucide-react"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veo3 Community - Connect with AI Video Creators & Share Prompts",
  description: "Join the Veo3 community of content creators, AI enthusiasts, and video professionals. Share prompts, get help, and stay updated with the latest AI video generation trends.",
  keywords: "Veo3 community, AI video creators, content creator community, prompt sharing, video creation tips, AI video enthusiasts, content creator network, video production community, AI tools community, digital creators, video marketing community, creative collaboration",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Veo3 Community - Connect with AI Video Creators & Share Prompts",
    description: "Join the Veo3 community of content creators, AI enthusiasts, and video professionals. Share prompts, get help, and stay updated with the latest AI video generation trends.",
    url: "https://veo3promptgenerator.online/community",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Veo3 Community - AI Video Creators Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veo3 Community - Connect with AI Video Creators & Share Prompts",
    description: "Join the Veo3 community of content creators, AI enthusiasts, and video professionals. Share prompts, get help, and stay updated with the latest AI video generation trends.",
    images: ["/images/og-image-1200x630.png"],
    creator: "@veo3promptgen",
    site: "@veo3promptgen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const communityStats = [
  { icon: Users, label: "Active Members", value: "25K+" },
  { icon: MessageSquare, label: "Discussions", value: "5K+" },
  { icon: Star, label: "Shared Prompts", value: "50K+" },
  { icon: Trophy, label: "Success Stories", value: "1K+" },
]

const featuredMembers = [
  {
    name: "Sarah Creative",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=60&width=60&text=SC",
    contribution: "Shared 200+ viral video prompts",
    badge: "Top Contributor",
  },
  {
    name: "Mike VideoMaster",
    role: "YouTuber",
    avatar: "/placeholder.svg?height=60&width=60&text=MV",
    contribution: "Helped 500+ creators with script advice",
    badge: "Community Helper",
  },
  {
    name: "Alex AI Enthusiast",
    role: "AI Researcher",
    avatar: "/placeholder.svg?height=60&width=60&text=AA",
    contribution: "Created advanced prompting techniques",
    badge: "Innovation Leader",
  },
]

const recentDiscussions = [
  {
    title: "Best practices for Veo3 character consistency",
    author: "CreativeGuru",
    replies: 23,
    likes: 45,
    category: "Tips & Tricks",
    timeAgo: "2 hours ago",
  },
  {
    title: "How I got 1M views using AI-generated video scripts",
    author: "ViralMaker",
    replies: 67,
    likes: 128,
    category: "Success Stories",
    timeAgo: "5 hours ago",
  },
  {
    title: "Troubleshooting common prompt generation issues",
    author: "TechHelper",
    replies: 34,
    likes: 56,
    category: "Support",
    timeAgo: "1 day ago",
  },
  {
    title: "New feature request: Batch prompt generation",
    author: "ProductivityPro",
    replies: 19,
    likes: 32,
    category: "Feature Requests",
    timeAgo: "2 days ago",
  },
]

const communityFeatures = [
  {
    icon: Share2,
    title: "Share Your Prompts",
    description: "Share successful prompts with the community and help others create amazing content.",
  },
  {
    icon: MessageSquare,
    title: "Get Help & Support",
    description: "Ask questions, get answers, and learn from experienced creators and AI enthusiasts.",
  },
  {
    icon: TrendingUp,
    title: "Stay Updated",
    description: "Keep up with the latest trends, techniques, and best practices in AI video generation.",
  },
  {
    icon: Award,
    title: "Recognition Program",
    description: "Earn badges and recognition for your contributions to the community.",
  },
]

export default function CommunityPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Join Our <span className="text-primary">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with thousands of creators, share your experiences, and learn from the best in AI video generation
            and prompt engineering.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Join Discord</Button>
            <Button size="lg" variant="outline">
              Browse Forum
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Members */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Featured Members
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featuredMembers.map((member, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <Image
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{member.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {member.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.contribution}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Discussions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentDiscussions.map((discussion, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm hover:text-primary cursor-pointer">{discussion.title}</h4>
                        <Badge variant="outline" className="text-xs ml-2">
                          {discussion.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>by {discussion.author}</span>
                          <span>{discussion.timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {discussion.replies}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {discussion.likes}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Button variant="outline">View All Discussions</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our community is more than just a forum - it's a place where creators come together to learn, share, and
              grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
              <p className="text-lg text-muted-foreground">
                To maintain a positive and helpful environment, please follow these guidelines:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Do's</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✅ Be respectful and constructive in your feedback</li>
                    <li>✅ Share your knowledge and help others learn</li>
                    <li>✅ Use clear and descriptive titles for your posts</li>
                    <li>✅ Search before posting to avoid duplicates</li>
                    <li>✅ Give credit when sharing others' work</li>
                    <li>✅ Report inappropriate content or behavior</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Don'ts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>❌ Post spam, self-promotion, or off-topic content</li>
                    <li>❌ Share copyrighted material without permission</li>
                    <li>❌ Use offensive language or personal attacks</li>
                    <li>❌ Share inappropriate or harmful content</li>
                    <li>❌ Violate others' privacy or intellectual property</li>
                    <li>❌ Engage in harassment or discriminatory behavior</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of our growing community of creators and start sharing your journey today.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">
              Join Discord Server
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Create Forum Account
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
