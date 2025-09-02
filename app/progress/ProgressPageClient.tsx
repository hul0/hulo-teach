// <CHANGE> Progress page shows completed items
"use client"

import Link from "next/link"
import { useCompletion } from "@/lib/storage"

export default function ProgressPageClient() {
  const { completed } = useCompletion()
  const posts = completed.filter((c) => c.type === "post")
  const quizzes = completed.filter((c) => c.type === "quiz")

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Progress</h1>
        <p className="text-muted-foreground">Your completed learning items.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Completed Articles</h2>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No articles completed yet.</p>
        ) : (
          <ul className="grid gap-2">
            {posts.map((p) => (
              <li key={`post:${p.slug}`}>
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.slug}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Completed Quizzes</h2>
        {quizzes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No quizzes completed yet.</p>
        ) : (
          <ul className="grid gap-2">
            {quizzes.map((q) => (
              <li key={`quiz:${q.slug}`}>
                <Link href={`/quizzes/${q.slug}`} className="hover:underline">
                  {q.slug}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
