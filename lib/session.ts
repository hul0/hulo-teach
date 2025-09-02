import { cookies } from "next/headers"
import { kv } from "./kv"
import { SignJWT, jwtVerify } from "jose"

const SESSION_COOKIE = "hulo_session"
const SESSION_TTL = 60 * 60 * 24 * 7 // 7 days

function getSecret() {
  const secret = process.env.HULO_SESSION_SECRET
  if (!secret) throw new Error("HULO_SESSION_SECRET missing")
  return new TextEncoder().encode(secret)
}

export type SessionData = {
  userId: string
}

export async function createSession(userId: string) {
  const payload = { userId }
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL}s`)
    .sign(getSecret())

  await kv.set(`session:${jwt}`, { userId }, SESSION_TTL)
  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_TTL,
  })
}

export async function destroySession() {
  const cookieStore = cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) {
    await kv.del(`session:${token}`)
    cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 })
  }
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  // Quick KV check
  const cached = await kv.get<SessionData>(`session:${token}`)
  if (cached?.userId) return cached

  try {
    const { payload } = await jwtVerify(token, getSecret())
    const data = { userId: String(payload.userId) }
    await kv.set(`session:${token}`, data, SESSION_TTL)
    return data
  } catch {
    await kv.del(`session:${token}`)
    cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 })
    return null
  }
}
