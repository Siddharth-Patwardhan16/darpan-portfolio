import { ProjectsView } from "@/components/site/projects-view"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Work",
  description:
    "Explore selected architecture and interior design projects by Studio D02 — residential, commercial, and hospitality work in Nashik.",
  path: "/projects",
})

export default function ProjectsPage() {
  return <ProjectsView />
}
