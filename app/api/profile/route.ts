import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { getSession } from "@/lib/session"
import { kv } from "@/lib/kv"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const cacheKey = `user:profile:${session.userId}`
  const cached = await kv.get(cacheKey)
  if (cached) return NextResponse.json(cached)

  const supa = createAdminClient()
  const { data, error } = await supa
    .from("users")
    .select("id, student_id, email, username, full_name, points, user_profiles(*)")
    .eq("id", session.userId)
    .single()
  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await kv.set(cacheKey, data, 60) // cache 60s
  return NextResponse.json(data)
}

export async function PATCH(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()

  const supa = createAdminClient()
  // Upsert profile
  const upsert = {
    user_id: session.userId,
    college: body.college ?? null,
    stream: body.stream ?? null,
    branch: body.branch ?? null,
    department: body.department ?? null,
    year: body.year ?? null,
    phone: body.phone ?? null,
    date_of_birth: body.date_of_birth ?? null,
    about: body.about ?? null,
  }

  const { error } = await supa.from("user_profiles").upsert(upsert, { onConflict: "user_id" })
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 400 })

  await kv.del(`user:profile:${session.userId}`)
  return NextResponse.json({ ok: true })
}
