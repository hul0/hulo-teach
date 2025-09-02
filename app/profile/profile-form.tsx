"use client"
import useSWR from "swr"
import type React from "react"

import { useState } from "react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ProfileForm() {
  const { data, isLoading, mutate } = useSWR("/api/profile", fetcher)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  if (isLoading) return <div className="mt-6 text-sm text-muted-foreground">Loading profile…</div>
  if (!data || data.error) return <div className="mt-6 text-sm text-destructive">Unable to load profile.</div>

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    const form = new FormData(e.currentTarget)
    const body = Object.fromEntries(form.entries())
    const res = await fetch("/api/profile", { method: "PATCH", body: JSON.stringify(body) })
    const out = await res.json()
    if (res.ok) {
      setMsg("Profile saved")
      mutate()
    } else {
      setMsg(out.error || "Save failed")
    }
    setSaving(false)
  }

  const p = data.user_profiles ?? {}

  return (
    <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ReadOnly label="Student ID" value={data.student_id} />
      <ReadOnly label="Email" value={data.email} />
      <Input name="college" label="College" defaultValue={p.college || ""} />
      <Input name="stream" label="Stream" defaultValue={p.stream || ""} />
      <Input name="branch" label="Branch" defaultValue={p.branch || ""} />
      <Input name="department" label="Department" defaultValue={p.department || ""} />
      <Input name="year" label="Year" defaultValue={p.year || ""} />
      <Input name="phone" label="Phone" defaultValue={p.phone || ""} />
      <label className="grid gap-1 sm:col-span-2">
        <span className="text-sm font-medium">Date of birth</span>
        <input
          name="date_of_birth"
          type="date"
          defaultValue={p.date_of_birth || ""}
          className="h-10 rounded-md border bg-background px-3"
        />
      </label>
      <label className="grid gap-1 sm:col-span-2">
        <span className="text-sm font-medium">About</span>
        <textarea
          name="about"
          rows={4}
          defaultValue={p.about || ""}
          className="rounded-md border bg-background px-3 py-2"
        />
      </label>

      <div className="sm:col-span-2 flex items-center gap-3 pt-2">
        <button
          disabled={saving}
          className="h-10 rounded-md bg-primary text-primary-foreground px-4 hover:opacity-90 transition"
        >
          {saving ? "Saving…" : "Save profile"}
        </button>
        {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
      </div>
    </form>
  )
}

function Input({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input name={name} defaultValue={defaultValue} className="h-10 rounded-md border bg-background px-3" />
    </label>
  )
}

function ReadOnly({ label, value }: { label: string; value?: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input value={value || ""} readOnly className="h-10 rounded-md border bg-muted px-3 text-muted-foreground" />
    </label>
  )
}
