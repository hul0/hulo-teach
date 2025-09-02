"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type Quiz = {
  slug: string
  title: string
  description?: string
}

type Props = {
  quizzes: readonly Quiz[]
}

type SortKey = "az" | "za"

const LS_KEY = "quizzes:list:state"

export default function QuizzesIndexClient({ quizzes }: Props) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("az")

  // load persisted
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { q?: string; s?: SortKey }
        if (parsed.q) setQuery(parsed.q)
        if (parsed.s) setSort(parsed.s)
      }
    } catch {}
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ q: query, s: sort }))
    } catch {}
  }, [query, sort])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = quizzes.slice()
    if (q) {
      result = result.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          (item.description || "").toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
        )
      })
    }
    result.sort((a, b) => {
      return sort === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    })
    return result
  }, [quizzes, query, sort])

  const clear = () => setQuery("")

  return (
    <section className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quizzes by title or description"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            aria-label="Search quizzes"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              className="rounded-md border px-3 py-2 text-xs text-muted-foreground hover:bg-accent/20"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs text-muted-foreground">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Sort quizzes"
          >
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </p>

      {/* Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((q) => (
          <Link
            key={q.slug}
            href={`/quizzes/${q.slug}`}
            className="block rounded-lg border p-4 transition-colors hover:bg-accent/20"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{q.title}</h3>
              <p className="text-sm text-muted-foreground">{q.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
