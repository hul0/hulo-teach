//  Blog detail page with SEO metadata & JSON-LD, markdown rendering, bookmarking & completion
import type { Metadata } from "next"
import { posts } from "@/lib/posts"
import BlogPostPageClient from "./BlogPostPageClient"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}
  const url = `/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPostPageClient params={params} />
}
