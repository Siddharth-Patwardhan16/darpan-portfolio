import { z } from "zod"
import { TRPCError } from "@trpc/server"
import {
  getCatalogProjectBySlug,
  getFeaturedProjects,
  listCatalogProjects,
  type ProjectCategory,
} from "@/data/project-catalog"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

const categoryInput = z.enum(["RESIDENTIAL", "CULTURAL", "COMMERCIAL"])

export const projectRouter = createTRPCRouter({
  featured: publicProcedure.query(() => {
    return getFeaturedProjects().map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      categoryLabel: project.categoryLabel,
      year: project.year,
      heroImageUrl: project.heroImageUrl,
      thumbnailUrl: project.thumbnailUrl,
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
    .query(({ input }) => {
      const projects = listCatalogProjects(input?.category as ProjectCategory | undefined)

      return projects.map((project) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        categoryLabel: project.categoryLabel,
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        statusLabel: project.statusLabel,
        summary: project.summary,
        heroImageUrl: project.heroImageUrl,
        thumbnailUrl: project.thumbnailUrl,
      }))
    }),

  bySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      }),
    )
    .query(({ input }) => {
      const project = getCatalogProjectBySlug(input.slug)

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
      }

      return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        categoryLabel: project.categoryLabel,
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        statusLabel: project.statusLabel,
        summary: project.summary,
        longDescription: project.longDescription,
        heroImageUrl: project.heroImageUrl,
        tags: project.tags,
        images: project.images,
      }
    }),
})
