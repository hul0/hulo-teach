import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { getSession } from "@/lib/session"

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { delta } = await req.json().catch(() => ({ delta: 0 }))
  const increment = Number.isFinite(delta) ? Math.max(0, Math.floor(delta)) : 0
  if (increment <= 0) return NextResponse.json({ error: "Invalid delta" }, { status: 400 })

  const supa = createAdminClient()
  const { data, error } = await supa
    .from("users")
    .update({ points: null as any }) // placeholder to satisfy types
    .eq("id", session.userId)
    .select("points")
  // We'll do it with RPC to be atomic:
}
