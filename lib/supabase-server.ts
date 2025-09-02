import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export function getServiceSupabase() {
  const cookieStore = cookies()
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      set: () => {},
      remove: () => {},
    },
  })
}
