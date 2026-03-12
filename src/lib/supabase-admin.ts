import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { env } from "@/server/env"

let adminClient: SupabaseClient | null = null

export function getSupabaseAdminClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY || !env.NEXT_PUBLIC_SUPABASE_URL) {
    return null
  }

  if (!adminClient) {
    adminClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return adminClient
}