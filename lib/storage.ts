"use client"

import { useCallback, useEffect, useState } from "react"

type Bookmark = { type: "post" | "quiz"; slug: string; title: string }
type Completion = { type: "post" | "quiz"; slug: string }

function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) setState(JSON.parse(raw))
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {}
  }, [key, state])

  return [state, setState] as const
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>("bookmarks", [])

  const isBookmarked = useCallback(
    (slug: string) => {
      return bookmarks.some((b) => b.slug === slug)
    },
    [bookmarks],
  )

  const toggleBookmark = useCallback(
    (item: Bookmark) => {
      setBookmarks((prev) => {
        const exists = prev.some((b) => b.slug === item.slug)
        if (exists) return prev.filter((b) => b.slug !== item.slug)
        return [...prev, item]
      })
    },
    [setBookmarks],
  )

  const removeBookmark = useCallback(
    (slug: string) => {
      setBookmarks((prev) => prev.filter((b) => b.slug !== slug))
    },
    [setBookmarks],
  )

  return { bookmarks, isBookmarked, toggleBookmark, removeBookmark }
}

export function useCompletion() {
  const [completed, setCompleted] = useLocalStorage<Completion[]>("completed", [])

  const isCompleted = useCallback(
    (slug: string) => {
      return completed.some((c) => c.slug === slug)
    },
    [completed],
  )

  const toggleCompleted = useCallback(
    (item: Completion) => {
      setCompleted((prev) => {
        const exists = prev.some((c) => c.slug === item.slug)
        if (exists) return prev.filter((c) => c.slug !== item.slug)
        return [...prev, item]
      })
    },
    [setCompleted],
  )

  return { completed, isCompleted, toggleCompleted }
}
