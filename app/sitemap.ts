import type { MetadataRoute } from "next"
import { posts } from "@/lib/posts"
import { quizzes } from "@/lib/quizzes"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/posts", "/quizzes", "/bookmarks", "/progress"].map((p) => ({
    url: `${siteUrl}${p || "/"}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }))

  const blogUrls = posts.map((p) => ({
    url: `${siteUrl}/posts/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(p.date),
  }))

  const quizUrls = quizzes.map((q) => ({
    url: `${siteUrl}/quizzes/${q.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...routes, ...blogUrls, ...quizUrls]
}
