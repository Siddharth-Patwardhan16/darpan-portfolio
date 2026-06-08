import type { Metadata } from "next"
import { ProjectDetailView } from "@/components/site/project-detail-view"
import { getCatalogProjectBySlug } from "@/data/project-catalog"
import { createMetadata } from "@/lib/seo"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getCatalogProjectBySlug(slug)

  if (!project) {
    return createMetadata({
      title: "Project Not Found",
      path: `/projects/${slug}`,
      noIndex: true,
    })
  }

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.heroImageUrl,
    imageAlt: `${project.title} — ${project.categoryLabel} project by Studio D02`,
    keywords: [project.title, project.categoryLabel, "Studio D02", "Nashik", ...project.tags],
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  return <ProjectDetailView slug={slug} />
}
