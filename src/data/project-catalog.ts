import { listProjectImageUrls } from "@/lib/local-images"

export type ProjectCategory = "RESIDENTIAL" | "CULTURAL" | "COMMERCIAL"
export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "CONCEPT"

export interface ProjectDefinition {
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

export const projectDefinitions: ProjectDefinition[] = [
  {
    slug: "d02-lounge",
    title: "D02 Lounge",
    subtitle: "Hospitality Interior",
    category: "COMMERCIAL",
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: "COMPLETED",
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
    category: "COMMERCIAL",
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: "COMPLETED",
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
    category: "RESIDENTIAL",
    year: 2026,
    location: "Kokan, India",
    sizeLabel: "—",
    status: "COMPLETED",
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
    category: "COMMERCIAL",
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: "COMPLETED",
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
    category: "RESIDENTIAL",
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: "COMPLETED",
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
    category: "COMMERCIAL",
    year: 2026,
    location: "India",
    sizeLabel: "—",
    status: "COMPLETED",
    summary:
      "A bold restaurant interior with energetic character, designed to support dining flow and brand presence.",
    longDescription:
      "Smokin Joe's combines strong visual identity with practical restaurant planning. Seating layouts, service paths, and feature lighting work together to create an engaging dining environment with a distinct personality.",
    tags: ["Commercial", "Restaurant", "Interior", "F&B"],
    featured: false,
    sortOrder: 6,
  },
]

export function categoryLabel(category: ProjectCategory) {
  const labels: Record<ProjectCategory, string> = {
    RESIDENTIAL: "Residential",
    CULTURAL: "Cultural",
    COMMERCIAL: "Commercial",
  }

  return labels[category]
}

export function statusLabel(status: ProjectStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

export interface CatalogProject {
  id: string
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory
  categoryLabel: string
  year: number
  location: string
  sizeLabel: string
  status: ProjectStatus
  statusLabel: string
  summary: string
  longDescription: string
  heroImageUrl: string
  thumbnailUrl: string
  tags: string[]
  featured: boolean
  sortOrder: number
  images: Array<{ id: string; url: string; alt: string; sortOrder: number }>
}

function resolveProject(definition: ProjectDefinition): CatalogProject {
  const imageUrls = listProjectImageUrls(definition.slug)

  return {
    id: definition.slug,
    slug: definition.slug,
    title: definition.title,
    subtitle: definition.subtitle,
    category: definition.category,
    categoryLabel: categoryLabel(definition.category),
    year: definition.year,
    location: definition.location,
    sizeLabel: definition.sizeLabel,
    status: definition.status,
    statusLabel: statusLabel(definition.status),
    summary: definition.summary,
    longDescription: definition.longDescription,
    heroImageUrl: imageUrls[0]!,
    thumbnailUrl: imageUrls[0]!,
    tags: definition.tags,
    featured: definition.featured,
    sortOrder: definition.sortOrder,
    images: imageUrls.map((url, index) => ({
      id: `${definition.slug}-${index}`,
      url,
      alt: `${definition.title} image ${index + 1}`,
      sortOrder: index,
    })),
  }
}

let cachedProjects: CatalogProject[] | null = null

export function getCatalogProjects() {
  if (!cachedProjects) {
    cachedProjects = projectDefinitions.map(resolveProject)
  }

  return cachedProjects
}

export function getFeaturedProjects() {
  return getCatalogProjects()
    .filter((project) => project.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3)
}

export function listCatalogProjects(category?: ProjectCategory) {
  return getCatalogProjects()
    .filter((project) => !category || project.category === category)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder)
}

export function getCatalogProjectBySlug(slug: string) {
  return getCatalogProjects().find((project) => project.slug === slug) ?? null
}
