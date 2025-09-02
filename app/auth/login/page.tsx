"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const r = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const payload = {
      studentId: String(form.get("studentId") || "").trim(),
      password: String(form.get("password") || ""),
    }
    try {
      const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      r.push("/profile")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-pretty">Welcome back to Hulo</h1>
      <p className="text-sm text-muted-foreground mt-1">Sign in with your student ID.</p>
      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Student ID</span>
          <input
            name="studentId"
            required
            className="h-10 rounded-md border bg-background px-3"
            placeholder="Your student ID"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            name="password"
            type="password"
            required
            className="h-10 rounded-md border bg-background px-3"
            placeholder="••••••••"
          />
        </label>
        <button
          disabled={loading}
          className="h-10 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>
      <p className="text-sm mt-6">
        New to Hulo?{" "}
        <a className="text-primary hover:underline" href="/auth/signup">
          Create an account
        </a>
      </p>
    </main>
  )
}
