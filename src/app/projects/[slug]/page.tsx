import { ProjectDetailView } from "@/components/site/project-detail-view"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  return <ProjectDetailView slug={slug} />
}