import { AboutView } from "@/components/site/about-view"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about Studio D02 — a Nashik-based architecture and interior design practice led by Darpan Adhaoo.",
  path: "/about",
})

export default function AboutPage() {
  return <AboutView />
}
