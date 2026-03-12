import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

const inputSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  projectType: z.string().min(2).max(64).optional(),
  message: z.string().min(10).max(4000),
})

export const contactRouter = createTRPCRouter({
  create: publicProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const inquiry = await ctx.prisma.contactInquiry.create({
      data: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        projectType: input.projectType?.trim() || null,
        message: input.message.trim(),
      },
      select: {
        id: true,
        createdAt: true,
      },
    })

    return {
      ok: true,
      inquiryId: inquiry.id,
      createdAt: inquiry.createdAt,
    }
  }),
})