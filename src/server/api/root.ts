import { createTRPCRouter } from "@/server/api/trpc"
import { projectRouter } from "@/server/api/routers/project"
import { contactRouter } from "@/server/api/routers/contact"

export const appRouter = createTRPCRouter({
  project: projectRouter,
  contact: contactRouter,
})

export type AppRouter = typeof appRouter