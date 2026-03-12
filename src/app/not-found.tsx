import Link from "next/link"

export default function NotFoundPage() {
  return (
    <section className="project-not-found">
      <p>Page not found.</p>
      <Link href="/">Back to Home</Link>
    </section>
  )
}