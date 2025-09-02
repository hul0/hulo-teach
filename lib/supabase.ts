import { cookies, headers } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export function createAnonClient() {
  const cookieStore = cookies()
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
    headers: {
      get(key: string) {
        return (headers() as any).get?.(key)
      },
    },
  })
}

// Admin client for trusted server mutations. Note: bypasses RLS.
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    // Service-role tokens should never be exposed to client cookies/headers
    {
      cookies: {
        get() {
          return undefined
        },
        set() {},
        remove() {},
      } as any,
    },
  )
}
