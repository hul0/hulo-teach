"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"

export default function SignupPage() {
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
      email: String(form.get("email") || "").trim(),
      username: String(form.get("username") || "").trim(),
      name: String(form.get("name") || "").trim(),
      password: String(form.get("password") || ""),
    }
    try {
      const res = await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Signup failed")
      r.push("/profile")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-pretty">Create your Hulo account</h1>
      <p className="text-sm text-muted-foreground mt-1">Use your student ID to sign in later.</p>
      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Student ID</span>
          <input
            name="studentId"
            required
            className="h-10 rounded-md border bg-background px-3"
            placeholder="e.g., 22BCS1234"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            className="h-10 rounded-md border bg-background px-3"
            placeholder="you@college.edu"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Username</span>
          <input
            name="username"
            required
            className="h-10 rounded-md border bg-background px-3"
            placeholder="your handle"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Full name</span>
          <input name="name" required className="h-10 rounded-md border bg-background px-3" placeholder="Your name" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="h-10 rounded-md border bg-background px-3"
            placeholder="At least 8 characters"
          />
        </label>
        <button
          disabled={loading}
          className="h-10 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>
      <p className="text-sm mt-6">
        Already have an account?{" "}
        <a className="text-primary hover:underline" href="/auth/login">
          Sign in
        </a>
      </p>
    </main>
  )
}
