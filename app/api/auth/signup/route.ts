import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { createSession } from "@/lib/session"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { studentId, email, username, name, password } = await req.json()
    if (!studentId || !email || !username || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (String(password).length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }
    const supa = createAdminClient()

    // Check uniqueness
    const { data: existing, error: checkErr } = await supa
      .from("users")
      .select("id")
      .or(`student_id.eq.${studentId},email.eq.${email},username.eq.${username}`)
      .maybeSingle()
    if (checkErr) throw checkErr
    if (existing) return NextResponse.json({ error: "Student ID, email, or username already in use" }, { status: 409 })

    const password_hash = await bcrypt.hash(password, 10)
    const { data: user, error: insertErr } = await supa
      .from("users")
      .insert({
        student_id: studentId,
        email,
        username,
        full_name: name,
        password_hash,
      })
      .select("id, student_id, email, username, full_name, points")
      .single()
    if (insertErr) throw insertErr

    // Create blank profile row
    const { error: profileErr } = await supa.from("user_profiles").insert({ user_id: user.id })
    if (profileErr) throw profileErr

    await createSession(user.id)
    return NextResponse.json({ user }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Signup failed" }, { status: 500 })
  }
}
