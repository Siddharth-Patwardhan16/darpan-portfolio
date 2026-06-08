import { prisma } from "@/server/db"

export async function createTRPCContext(opts: { req: Request }) {
  return {
    req: opts.req,
    prisma,
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>