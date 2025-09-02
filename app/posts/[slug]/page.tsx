//  Blog detail page with SEO metadata & JSON-LD, markdown rendering, bookmarking & completion
import type { Metadata } from "next"
import { posts } from "@/lib/posts"
import BlogPostPageClient from "./BlogPostPageClient"
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from "next/navigation";

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}
  const url = `/posts/${post.slug}`
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

export default async function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'public', 'content', 'blog', `${params.slug}.md`);
  let markdownContent = '';
  try {
    markdownContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error("Error reading markdown file:", error);
    notFound();
  }

  return <BlogPostPageClient post={post} markdownContent={markdownContent} />
}
