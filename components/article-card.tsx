"use client"

import Link from "next/link"
import { useBookmarks } from "@/lib/storage"

type Post = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: number
  tags: string[]
}

export function ArticleCard({ post }: { post: Post }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()

  return (
    <article className="rounded-lg border p-4 flex flex-col gap-3">
      <div className="space-y-1">
        <h3 className="font-medium">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{post.date}</span>
        <span>{post.readingTime} min</span>
      </div>
      <div className="flex items-center gap-2">
        {post.tags.slice(0, 3).map((t) => (
          <span key={t} className="text-xs rounded px-2 py-0.5 border">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto">
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-500"
        >
          Read
        </Link>
        <button
          onClick={() => toggleBookmark({ type: "post", slug: post.slug, title: post.title })}
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          aria-pressed={isBookmarked(post.slug)}
        >
          {isBookmarked(post.slug) ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </article>
  )
}
