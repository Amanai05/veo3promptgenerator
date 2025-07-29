import Link from "next/link"

const sitemapLinks = [
  { title: "Home", href: "/" },
  { title: "Tools", href: "/tools" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Prompt Guide", href: "/prompt-guide" },
  { title: "Prompt Library", href: "/prompt-library" },
  { title: "Community", href: "/community" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Disclaimer", href: "/disclaimer" },
]

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        <div className="space-y-4">
          {sitemapLinks.map((link) => (
            <div key={link.href} className="border-b pb-2">
              <Link href={link.href} className="text-primary hover:underline text-lg">
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
