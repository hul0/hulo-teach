"use client"

import { useEffect, useMemo, useState } from "react"
import { ArticleCard } from "@/components/article-card"
import { cn } from "@/lib/utils"

type Post = {
  slug: string
  title: string
  description: string
  date?: string
  tags?: string[]
  readingTime?: number
  quizSlug?: string | null
}

type Props = {
  posts: readonly Post[]
}

type SortKey = "newest" | "oldest" | "reading-time"

const LS_KEY = "blog:list:state"

export default function BlogIndexClient({ posts }: Props) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("newest")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // load persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { q?: string; s?: SortKey; t?: string[] }
        if (parsed.q) setQuery(parsed.q)
        if (parsed.s) setSort(parsed.s)
        if (Array.isArray(parsed.t)) setSelectedTags(parsed.t)
      }
    } catch {}
  }, [])

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ q: query, s: sort, t: selectedTags }))
    } catch {}
  }, [query, sort, selectedTags])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [posts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = posts.slice()

    if (q) {
      result = result.filter((p) => {
        const inTitle = p.title.toLowerCase().includes(q)
        const inDesc = p.description?.toLowerCase().includes(q)
        const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q))
        return inTitle || inDesc || inTags
      })
    }
    if (selectedTags.length) {
      result = result.filter((p) => {
        const tags = p.tags || []
        return selectedTags.every((t) => tags.includes(t))
      })
    }

    result.sort((a, b) => {
      if (sort === "reading-time") {
        const ra = a.readingTime || 0
        const rb = b.readingTime || 0
        return ra - rb
      }
      const da = a.date ? new Date(a.date).getTime() : 0
      const db = b.date ? new Date(b.date).getTime() : 0
      return sort === "newest" ? db - da : da - db
    })
    return result
  }, [posts, query, selectedTags, sort])

  const toggleTag = (t: string) =>
    setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const clearFilters = () => {
    setQuery("")
    setSelectedTags([])
    setSort("newest")
  }

  return (
    <section className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, description, or tag"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            aria-label="Search articles"
          />
          {(query || selectedTags.length) && (
            <button
              type="button"
              onClick={clearFilters}
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
            aria-label="Sort articles"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="reading-time">Reading time</option>
          </select>
        </div>
      </div>

      {/* Tag chips */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => {
            const active = selectedTags.includes(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition-colors",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-accent/20 text-muted-foreground",
                )}
              >
                {t}
              </button>
            )
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </p>

      {/* Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  )
}
