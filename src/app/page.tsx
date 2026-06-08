import { HomeView } from "@/components/site/home-view"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  path: "/",
})

export default function HomePage() {
  return <HomeView />
}
