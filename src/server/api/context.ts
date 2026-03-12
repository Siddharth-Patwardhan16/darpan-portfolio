import { prisma } from "@/server/db"
import { getSupabaseAdminClient } from "@/lib/supabase-admin"

export async function createTRPCContext(opts: { req: Request }) {
  return {
    req: opts.req,
    prisma,
    supabaseAdmin: getSupabaseAdminClient(),
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>