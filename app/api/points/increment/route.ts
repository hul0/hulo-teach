import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { getSession } from "@/lib/session"

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { delta } = await req.json().catch(() => ({ delta: 0 }))
  const inc = Number.isFinite(delta) ? Math.max(0, Math.floor(delta)) : 0
  if (inc <= 0) return NextResponse.json({ error: "Invalid delta" }, { status: 400 })

  const supa = createAdminClient()
  const { data, error } = await supa.rpc("hulo_increment_points", { p_user_id: session.userId, p_delta: inc })
  if (error) return NextResponse.json({ error: "Increment failed" }, { status: 400 })

  return NextResponse.json({ points: data })
}
