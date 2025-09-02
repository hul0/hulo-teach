"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import { useBookmarks, useCompletion } from "@/lib/storage"

type Option = { id: string; text: string; correct?: boolean; explanation?: string }
type Question = {
  id: string
  type: "single" | "multiple"
  question: string
  options: Option[]
}
type QuizData = {
  title: string
  description?: string
  questions: Question[]
}

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load quiz")
    return r.json()
  })

export function QuizPlayer({ slug }: { slug: string }) {
  const { data, error, isLoading } = useSWR<QuizData>(`/quizzes/${slug}.json`, fetcher)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { isCompleted, toggleCompleted } = useCompletion()

  useEffect(() => {
    // Load previous best score if any (not strictly required to show)
    const best = localStorage.getItem(`quiz:${slug}:bestScore`)
    if (best) setScore(Number.parseInt(best, 10))
  }, [slug])

  const onToggle = (qid: string, optionId: string, multiple: boolean) => {
    setAnswers((prev) => {
      const current = prev[qid] || []
      if (multiple) {
        return {
          ...prev,
          [qid]: current.includes(optionId) ? current.filter((x) => x !== optionId) : [...current, optionId],
        }
      } else {
        return { ...prev, [qid]: [optionId] }
      }
    })
  }

  const evaluation = useMemo(() => {
    if (!submitted || !data) return null
    let correctCount = 0
    const details = data.questions.map((q) => {
      const selected = answers[q.id] || []
      const correct = q.options.filter((o) => o.correct).map((o) => o.id)
      const isCorrect = correct.length === selected.length && correct.every((c) => selected.includes(c))
      if (isCorrect) correctCount++
      return { id: q.id, isCorrect, correct, selected }
    })
    return { correctCount, total: data.questions.length, details }
  }, [submitted, data, answers])

  const handleSubmit = () => {
    if (!data) return
    setSubmitted(true)
    const ev = { correctCount: 0, total: 0, details: [] as any[] }
    // compute after state updates? We'll rely on useMemo instead and then set storage in effect:
  }

  useEffect(() => {
    if (!submitted || !data) return
    const details = data.questions.map((q) => {
      const selected = answers[q.id] || []
      const correct = q.options.filter((o) => o.correct).map((o) => o.id)
      const isCorrect = correct.length === selected.length && correct.every((c) => selected.includes(c))
      return { isCorrect }
    })
    const correctCount = details.filter((d) => d.isCorrect).length
    setScore(correctCount)
    const bestKey = `quiz:${slug}:bestScore`
    const prevBest = Number.parseInt(localStorage.getItem(bestKey) || "0", 10)
    if (correctCount > prevBest) localStorage.setItem(bestKey, String(correctCount))
    // Increment points by improvement over previous best (prevents farming)
    const inc = Math.max(0, correctCount - prevBest)
    if (inc > 0) {
      void fetch("/api/points/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta: inc }),
      }).catch(() => {})
    }
    // Mark completed if all correct
    if (correctCount === data.questions.length && !isCompleted(slug)) {
      toggleCompleted({ type: "quiz", slug })
    }
  }, [submitted, data, answers, slug, isCompleted, toggleCompleted])

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading quiz…</div>
  if (error) return <div className="text-sm text-red-600">Failed to load quiz.</div>
  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{data.title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark({ type: "quiz", slug, title: data.title })}
            className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
            aria-pressed={isBookmarked(slug)}
          >
            {isBookmarked(slug) ? "Bookmarked" : "Bookmark"}
          </button>
          <button
            onClick={() => toggleCompleted({ type: "quiz", slug })}
            className="inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-500"
            aria-pressed={isCompleted(slug)}
          >
            {isCompleted(slug) ? "Completed" : "Mark complete"}
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        className="space-y-6"
      >
        {data.questions.map((q) => {
          const multiple = q.type === "multiple"
          const selected = answers[q.id] || []
          return (
            <fieldset key={q.id} className="space-y-3 rounded-lg border p-4">
              <legend className="font-medium">{q.question}</legend>
              <div className="grid gap-2">
                {q.options.map((o) => {
                  const checked = selected.includes(o.id)
                  return (
                    <label
                      key={o.id}
                      className={`flex items-start gap-2 rounded-md border p-2 ${checked ? "bg-accent" : ""}`}
                    >
                      <input
                        type={multiple ? "checkbox" : "radio"}
                        name={q.id}
                        checked={checked}
                        onChange={() => onToggle(q.id, o.id, multiple)}
                        className="mt-1"
                        aria-checked={checked}
                      />
                      <span>{o.text}</span>
                    </label>
                  )
                })}
              </div>

              {submitted ? <QuestionResult question={q} selected={selected} /> : null}
            </fieldset>
          )
        })}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-500"
          >
            Submit
          </button>
          {submitted ? (
            <button
              type="button"
              onClick={() => {
                setAnswers({})
                setSubmitted(false)
              }}
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-accent"
            >
              Reset
            </button>
          ) : null}
        </div>

        {submitted && data ? (
          <div className="rounded-lg border p-4">
            <p className="font-medium">
              Score: {score} / {data.questions.length}
            </p>
            <p className="text-sm text-muted-foreground">Best score saved locally on this device.</p>
          </div>
        ) : null}
      </form>
    </div>
  )
}

function QuestionResult({ question, selected }: { question: Question; selected: string[] }) {
  const correct = question.options.filter((o) => o.correct).map((o) => o.id)
  const isCorrect = correct.length === selected.length && correct.every((c) => selected.includes(c))
  return (
    <div className={`rounded-md border p-2 ${isCorrect ? "border-green-600" : "border-red-600"}`}>
      <p
        className={`text-sm font-medium ${isCorrect ? "text-green-700 dark:text-green-500" : "text-red-700 dark:text-red-500"}`}
      >
        {isCorrect ? "Correct" : "Incorrect"}
      </p>
      <ul className="mt-1 text-sm">
        {question.options.map((o) => (
          <li key={o.id}>
            <span className={`${o.correct ? "text-green-700 dark:text-green-500" : ""}`}>
              {o.correct ? "✓ " : ""}
              {o.text}
            </span>
            {o.explanation ? <span className="text-muted-foreground"> — {o.explanation}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
