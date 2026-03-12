import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"
import type { TRPCContext } from "@/server/api/context"

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()
  const result = await next()
  const duration = Date.now() - start

  if (process.env.NODE_ENV === "development") {
    console.info(`[tRPC] ${path} (${duration}ms)`)
  }

  return result
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure.use(timingMiddleware)