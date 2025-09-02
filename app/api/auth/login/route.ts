import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { createSession } from "@/lib/session"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { studentId, password } = await req.json()
    if (!studentId || !password) {
      return NextResponse.json({ error: "Missing studentId or password" }, { status: 400 })
    }
    const supa = createAdminClient()
    const { data: user, error } = await supa
      .from("users")
      .select("id, password_hash")
      .eq("student_id", studentId)
      .single()
    if (error || !user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

    await createSession(user.id)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Login failed" }, { status: 500 })
  }
}
