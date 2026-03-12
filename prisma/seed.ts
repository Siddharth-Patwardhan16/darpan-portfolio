import { PrismaClient, ProjectCategory, ProjectStatus } from "@prisma/client"

const prisma = new PrismaClient()

interface SeedProject {
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
  heroImageUrl: string
  images: string[]
  tags: string[]
  featured: boolean
  sortOrder: number
}

const projects: SeedProject[] = [
  {
    slug: "nordhaus-residences",
    title: "Nordhaus Residences",
    subtitle: "Private Dwelling",
    category: ProjectCategory.RESIDENTIAL,
    year: 2024,
    location: "Copenhagen, Denmark",
    sizeLabel: "320 m²",
    status: ProjectStatus.COMPLETED,
    summary:
      "A family home defined by raw materiality and the play of natural light across poured concrete and aged timber.",
    longDescription:
      "Nordhaus Residences emerges from the Danish landscape as a studied composition of horizontals and verticals. The program organizes itself around a central courtyard, drawing light deep into the plan. Exposed concrete walls, sustainably sourced timber ceilings, and floor-to-ceiling glazing create a dialogue between interior and exterior that shifts with the seasons.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1761479373595-f4371d0b3ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1761479373595-f4371d0b3ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711873317324-36e76613be97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1771814489248-3c56e346db77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Residential", "Concrete", "Timber", "Nordic"],
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "kulturbau-pavilion",
    title: "Kulturbau Pavilion",
    subtitle: "Cultural Infrastructure",
    category: ProjectCategory.CULTURAL,
    year: 2023,
    location: "Berlin, Germany",
    sizeLabel: "1,800 m²",
    status: ProjectStatus.COMPLETED,
    summary:
      "A pavilion conceived as a threshold between city and nature, permanence and impermanence.",
    longDescription:
      "The Kulturbau Pavilion is designed to dissolve the boundary between landscape and program. A single continuous roof plane extends over an open plan that adapts to exhibitions, performances, and civic gathering. The material palette of weathering steel, raw concrete, and crushed gravel ages gracefully with the building's context.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1769854488175-1f58938baacf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1769854488175-1f58938baacf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1770892410981-8a6650aa9ee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Cultural", "Pavilion", "Steel", "Landscape"],
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "strata-tower",
    title: "Strata Tower",
    subtitle: "Mixed-Use Development",
    category: ProjectCategory.COMMERCIAL,
    year: 2023,
    location: "Oslo, Norway",
    sizeLabel: "12,400 m²",
    status: ProjectStatus.COMPLETED,
    summary:
      "Layered floor plates read as geological strata, anchoring the tower within its Nordic urban context.",
    longDescription:
      "Strata Tower rethinks the commercial high-rise as a vertical neighborhood. Staggered terraces create a series of accessible outdoor spaces at every third floor, giving tenants a direct relationship with the sky and city below. The facade is composed of precast concrete panels with an embedded aggregate of local stone.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1769328728802-0ae52ebd7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1769328728802-0ae52ebd7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1771814489248-3c56e346db77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Commercial", "Tower", "Urban", "Concrete"],
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "veld-house",
    title: "Veld House",
    subtitle: "Rural Retreat",
    category: ProjectCategory.RESIDENTIAL,
    year: 2022,
    location: "Jutland, Denmark",
    sizeLabel: "180 m²",
    status: ProjectStatus.COMPLETED,
    summary:
      "A low-lying shelter anchored in open landscape, with rammed earth walls and a living moss roof.",
    longDescription:
      "Veld House sits close to the ground, almost as if it grew from it. The building is organized as a single linear volume that tracks the movement of the sun from east to west. Rammed earth walls provide thermal mass, while a green roof of local moss integrates the structure into the surrounding heath.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1771945042006-0b50f06aaf3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1771945042006-0b50f06aaf3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1761479373595-f4371d0b3ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Residential", "Rural", "Earth", "Landscape"],
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "atelier-blanc",
    title: "Atelier Blanc",
    subtitle: "Creative Workspace",
    category: ProjectCategory.COMMERCIAL,
    year: 2022,
    location: "Stockholm, Sweden",
    sizeLabel: "640 m²",
    status: ProjectStatus.COMPLETED,
    summary:
      "A creative studio interior stripped back to its essentials: light, proportion, and silence.",
    longDescription:
      "Atelier Blanc occupies a former industrial building in central Stockholm. The intervention is deliberately minimal: polished concrete floors, whitewashed brick walls, and a roof monitor that floods the space with diffused northern light. Existing columns and beams are retained and celebrated as structural sculpture.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1765366417033-5d74f04ca77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1765366417033-5d74f04ca77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711873317324-36e76613be97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Commercial", "Interior", "Adaptive Reuse", "Studio"],
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "brutform-center",
    title: "Brutform Center",
    subtitle: "Civic Institution",
    category: ProjectCategory.CULTURAL,
    year: 2021,
    location: "Helsinki, Finland",
    sizeLabel: "3,200 m²",
    status: ProjectStatus.COMPLETED,
    summary:
      "Board-formed concrete meets glazed courtyards in a civic building that mediates between monumental and intimate scales.",
    longDescription:
      "The Brutform Center explores the poetics of raw concrete in a civic context. The building is organized around two interlocking courtyards, one enclosed and shaded, the other open and flooded with light. Board-formed concrete walls record the grain of timber formwork and age visibly over time.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1761287347782-f3b433c0cee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1761287347782-f3b433c0cee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1770892410981-8a6650aa9ee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Cultural", "Civic", "Concrete", "Courtyards"],
    featured: false,
    sortOrder: 6,
  },
]

async function main() {
  for (const project of projects) {
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
        heroImageUrl: project.heroImageUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        images: {
          create: project.images.map((url, index) => ({
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
        heroImageUrl: project.heroImageUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        images: {
          deleteMany: {},
          create: project.images.map((url, index) => ({
            url,
            alt: `${project.title} image ${index + 1}`,
            sortOrder: index,
          })),
        },
      },
    })
  }

  console.log(`Seeded ${projects.length} projects`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })