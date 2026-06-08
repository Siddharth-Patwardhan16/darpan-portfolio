import { ContactView } from "@/components/site/contact-view"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Studio D02 in Nashik. Call 9370277275 or email info.studiod02@gmail.com to start your project.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactView />
}
