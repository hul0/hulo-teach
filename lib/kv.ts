const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

async function kvFetch(path: string, init?: RequestInit) {
  if (!KV_URL || !KV_TOKEN) throw new Error("Upstash KV not configured")
  return fetch(`${KV_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })
}

export const kv = {
  async set(key: string, value: unknown, ttlSeconds?: number) {
    const body = { key, value, ...(ttlSeconds ? { ex: ttlSeconds } : {}) }
    const res = await kvFetch("/set", { method: "POST", body: JSON.stringify(body) })
    return res.json()
  },
  async get<T = any>(key: string): Promise<T | null> {
    const res = await kvFetch(`/get/${encodeURIComponent(key)}`, { method: "GET" })
    if (!res.ok) return null
    const data = await res.json()
    return (data?.result ?? null) as T | null
  },
  async del(key: string) {
    return kvFetch("/del", { method: "POST", body: JSON.stringify({ key }) })
  },
}
