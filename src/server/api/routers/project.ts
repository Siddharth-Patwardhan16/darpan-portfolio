import { z } from "zod"
import { TRPCError } from "@trpc/server"
import type { ProjectCategory, ProjectStatus } from "@prisma/client"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

const categoryInput = z.enum(["RESIDENTIAL", "CULTURAL", "COMMERCIAL"])

function categoryLabel(category: ProjectCategory) {
  const labels: Record<ProjectCategory, string> = {
    RESIDENTIAL: "Residential",
    CULTURAL: "Cultural",
    COMMERCIAL: "Commercial",
  }

  return labels[category]
}

function statusLabel(status: ProjectStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

export const projectRouter = createTRPCRouter({
  featured: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      where: { featured: true },
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
      },
      orderBy: { sortOrder: "asc" },
      take: 3,
    })

    return projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      categoryLabel: categoryLabel(project.category),
      year: project.year,
      heroImageUrl: project.heroImageUrl,
      thumbnailUrl: project.images[0]?.url ?? project.heroImageUrl,
    }))
  }),

  list: publicProcedure
    .input(
      z
        .object({
          category: categoryInput.optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.findMany({
        where: {
          category: input?.category,
        },
        include: {
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
        },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
      })

      return projects.map((project) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        categoryLabel: categoryLabel(project.category),
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        statusLabel: statusLabel(project.status),
        summary: project.summary,
        heroImageUrl: project.heroImageUrl,
        thumbnailUrl: project.images[0]?.url ?? project.heroImageUrl,
      }))
    }),

  bySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { slug: input.slug },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
        },
      })

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
      }

      return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        categoryLabel: categoryLabel(project.category),
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        statusLabel: statusLabel(project.status),
        summary: project.summary,
        longDescription: project.longDescription,
        heroImageUrl: project.heroImageUrl,
        tags: project.tags,
        images: project.images,
      }
    }),
})