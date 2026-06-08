import { PrismaClient, ProjectCategory, ProjectStatus } from "@prisma/client"
import { getCatalogProjects, projectDefinitions } from "../src/data/project-catalog"

const prisma = new PrismaClient()

async function main() {
  const slugs = projectDefinitions.map((project) => project.slug)

  await prisma.project.deleteMany({
    where: { slug: { notIn: slugs } },
  })

  for (const project of getCatalogProjects()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category as ProjectCategory,
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        status: project.status as ProjectStatus,
        summary: project.summary,
        longDescription: project.longDescription,
        heroImageUrl: project.heroImageUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        images: {
          create: project.images.map((image) => ({
            url: image.url,
            alt: image.alt,
            sortOrder: image.sortOrder,
          })),
        },
      },
      update: {
        title: project.title,
        subtitle: project.subtitle,
        category: project.category as ProjectCategory,
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        status: project.status as ProjectStatus,
        summary: project.summary,
        longDescription: project.longDescription,
        heroImageUrl: project.heroImageUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        images: {
          deleteMany: {},
          create: project.images.map((image) => ({
            url: image.url,
            alt: image.alt,
            sortOrder: image.sortOrder,
          })),
        },
      },
    })
  }

  console.log(`Seeded ${projectDefinitions.length} projects`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
