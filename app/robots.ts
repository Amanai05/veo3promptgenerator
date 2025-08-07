import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://veo3promptgenerator.online"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/temp/",
          "/cache/",
          "/logs/",
          "/.env",
          "/.env.local",
          "/.env.production",
          "/package.json",
          "/package-lock.json",
          "/node_modules/",
          "/.git/",
          "/.github/",
          "/.vscode/",
          "/.idea/",
          "/coverage/",
          "/dist/",
          "/build/",
          "/.next/",
          "/out/",
          "/.vercel/",
          "/.netlify/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
