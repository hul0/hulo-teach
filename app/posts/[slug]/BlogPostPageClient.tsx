"use client"
//  Blog detail page with SEO metadata & JSON-LD, markdown rendering, bookmarking & completion
import { notFound } from "next/navigation"
import Link from "next/link"
import useSWR from "swr"
import { posts } from "@/lib/posts"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { useBookmarks, useCompletion } from "@/lib/storage"
import { Suspense } from "react"

type Props = { params: { slug: string } }

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load content")
    return r.text()
  })

function BlogControls({ slug, title }: { slug: string; title: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { isCompleted, toggleCompleted } = useCompletion()

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => toggleBookmark({ type: "post", slug, title })}
        className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent/20"
        aria-pressed={isBookmarked(slug)}
      >
        {isBookmarked(slug) ? "Bookmarked" : "Bookmark"}
      </button>
      <button
        onClick={() => toggleCompleted({ type: "post", slug })}
        className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm transition-colors hover:bg-primary/90"
        aria-pressed={isCompleted(slug)}
      >
        {isCompleted(slug) ? "Completed" : "Mark complete"}
      </button>
    </div>
  )
}

export default function BlogPostPageClient({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) notFound()
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-balance">{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {post.date} • {post.readingTime} min read
          </p>
          <BlogControls slug={post.slug} title={post.title} />
        </div>
      </header>

      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading content…</div>}>
        <BlogContent slug={post.slug} />
      </Suspense>

      {post.quizSlug ? (
        <div className="rounded-lg border p-4">
          <h2 className="font-medium mb-2">Practice Quiz</h2>
          <p className="text-sm text-muted-foreground mb-3">Test yourself with the quiz related to this article.</p>
          <Link
            href={`/quizzes/${post.quizSlug}`}
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm transition-colors hover:bg-primary/90"
          >
            Start Quiz
          </Link>
        </div>
      ) : null}

      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Person", name: "Instructor" },
            url: `/blog/${post.slug}`,
          }),
        }}
      />
    </div>
  )
}

function BlogContent({ slug }: { slug: string }) {
  const { data, error, isLoading } = useSWR(`/content/blog/${slug}.md`, fetcher)
  if (isLoading) return <div className="text-sm text-muted-foreground">Loading article…</div>
  if (error) return <div className="text-sm text-red-600">Failed to load article.</div>
  return <MarkdownRenderer markdown={data || ""} />
}
