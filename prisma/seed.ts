import { PrismaClient, ProjectCategory, ProjectStatus } from "@prisma/client"
import { listProjectImageUrls } from "../src/lib/local-images"

const prisma = new PrismaClient()

interface ProjectDefinition {
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory
  year: number
  location: string
  sizeLabel: string
  status: ProjectStatus
  summary: string
  longDescription: string
  tags: string[]
  featured: boolean
  sortOrder: number
}

const projectDefinitions: ProjectDefinition[] = [
  {
    slug: "d02-lounge",
    title: "D02 Lounge",
    subtitle: "Hospitality Interior",
    category: ProjectCategory.COMMERCIAL,
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: ProjectStatus.COMPLETED,
    summary:
      "A lounge interior defined by layered lighting, rich material textures, and a warm, intimate atmosphere for evening hospitality.",
    longDescription:
      "D02 Lounge transforms a compact hospitality program into an immersive spatial experience. Custom seating, ambient lighting, and a refined material palette create distinct zones for conversation and relaxation while maintaining a cohesive visual identity throughout.",
    tags: ["Commercial", "Hospitality", "Interior", "Lounge"],
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "elo-cafe",
    title: "Elo Cafe",
    subtitle: "Cafe Interior",
    category: ProjectCategory.COMMERCIAL,
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: ProjectStatus.COMPLETED,
    summary:
      "A contemporary cafe interior balancing openness and warmth, designed for all-day dining and social gathering.",
    longDescription:
      "Elo Cafe brings together natural finishes, soft lighting, and flexible seating to support both quick visits and longer stays. The layout prioritizes flow and visibility while creating intimate pockets within the larger open plan.",
    tags: ["Commercial", "Cafe", "Interior", "F&B"],
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "kokan-home",
    title: "Kokan Home",
    subtitle: "Private Residence",
    category: ProjectCategory.RESIDENTIAL,
    year: 2026,
    location: "Kokan, India",
    sizeLabel: "—",
    status: ProjectStatus.COMPLETED,
    summary:
      "A residential interior rooted in regional character, with calm proportions and tactile finishes suited to everyday living.",
    longDescription:
      "Kokan Home responds to its coastal context through a palette of natural materials, generous daylight, and carefully composed interior volumes. Each room is designed for comfort and clarity, with storage and circulation integrated seamlessly into the plan.",
    tags: ["Residential", "Interior", "Home"],
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "premier-office",
    title: "Premier Office",
    subtitle: "Workplace Interior",
    category: ProjectCategory.COMMERCIAL,
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: ProjectStatus.COMPLETED,
    summary:
      "A professional office environment combining clarity, function, and a polished material language for focused work.",
    longDescription:
      "Premier Office organizes collaborative and individual work zones within a disciplined spatial framework. Clean lines, integrated storage, and consistent detailing create a workplace that feels both efficient and elevated.",
    tags: ["Commercial", "Office", "Interior", "Workplace"],
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "s1-63",
    title: "S1 63",
    subtitle: "Residential Interior",
    category: ProjectCategory.RESIDENTIAL,
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: ProjectStatus.COMPLETED,
    summary:
      "A refined residential interior with custom joinery, balanced lighting, and a contemporary material palette.",
    longDescription:
      "S1 63 maximizes spatial efficiency through built-in storage, layered lighting, and a restrained finish palette. The design creates a sense of openness while defining clear zones for living, dining, and rest.",
    tags: ["Residential", "Interior", "Apartment"],
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "smokin-joes",
    title: "Smokin Joe's",
    subtitle: "Restaurant Interior",
    category: ProjectCategory.COMMERCIAL,
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: ProjectStatus.COMPLETED,
    summary:
      "A bold restaurant interior with energetic character, designed to support dining flow and brand presence.",
    longDescription:
      "Smokin Joe's combines strong visual identity with practical restaurant planning. Seating layouts, service paths, and feature lighting work together to create an engaging dining environment with a distinct personality.",
    tags: ["Commercial", "Restaurant", "Interior", "F&B"],
    featured: false,
    sortOrder: 6,
  },
]

async function main() {
  const slugs = projectDefinitions.map((project) => project.slug)

  await prisma.project.deleteMany({
    where: { slug: { notIn: slugs } },
  })

  for (const project of projectDefinitions) {
    const images = listProjectImageUrls(project.slug)
    const heroImageUrl = images[0]!

    await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        status: project.status,
        summary: project.summary,
        longDescription: project.longDescription,
        heroImageUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        images: {
          create: images.map((url, index) => ({
            url,
            alt: `${project.title} image ${index + 1}`,
            sortOrder: index,
          })),
        },
      },
      update: {
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        year: project.year,
        location: project.location,
        sizeLabel: project.sizeLabel,
        status: project.status,
        summary: project.summary,
        longDescription: project.longDescription,
        heroImageUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        images: {
          deleteMany: {},
          create: images.map((url, index) => ({
            url,
            alt: `${project.title} image ${index + 1}`,
            sortOrder: index,
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
