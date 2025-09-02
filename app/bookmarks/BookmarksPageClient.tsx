"use client"

import Link from "next/link"
import { useBookmarks } from "@/lib/storage"

export default function BookmarksPageClient() {
  const { bookmarks, removeBookmark } = useBookmarks()

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Bookmarks</h1>
        <p className="text-muted-foreground">Quickly return to saved items.</p>
      </header>

      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground">No bookmarks yet.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((b) => (
            <li key={`${b.type}:${b.slug}`} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase text-muted-foreground">{b.type}</p>
                  <Link
                    href={`/${b.type === "post" ? "posts" : "quizzes"}/${b.slug}`}
                    className="font-medium hover:underline"
                  >
                    {b.title}
                  </Link>
                </div>
                <button onClick={() => removeBookmark(b.slug)} className="text-sm text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
