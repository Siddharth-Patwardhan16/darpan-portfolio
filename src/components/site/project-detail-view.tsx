"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { api } from "@/trpc/client"

interface ProjectDetailViewProps {
  slug: string
}

export function ProjectDetailView({ slug }: ProjectDetailViewProps) {
  const projectQuery = api.project.bySlug.useQuery({ slug })
  const listQuery = api.project.list.useQuery()

  if (projectQuery.isLoading) {
    return <div className="project-loading">Loading project...</div>
  }

  if (!projectQuery.data) {
    return (
      <div className="project-not-found">
        <p>Project not found.</p>
        <Link href="/projects">Back to Projects</Link>
      </div>
    )
  }

  const project = projectQuery.data
  const list = listQuery.data ?? []
  const currentIndex = list.findIndex((item) => item.slug === slug)
  const nextProject = list[currentIndex >= 0 ? (currentIndex + 1) % list.length : 0]

  return (
    <div>
      <section className="project-hero">
        <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="project-hero-media">
          <Image src={project.heroImageUrl} alt={project.title} fill priority sizes="100vw" />
        </motion.div>
        <div className="project-hero-mask" />

        <div className="project-hero-content">
          <p className="mono overline on-dark">
            {project.categoryLabel} — {project.year}
          </p>
          <h1>{project.title}</h1>
        </div>

        <Link href="/projects" className="project-back-link">
          ← All Work
        </Link>
      </section>

      <section className="project-info-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {[
            { label: "Location", value: project.location },
            { label: "Year", value: String(project.year) },
            { label: "Size", value: project.sizeLabel },
            { label: "Status", value: project.statusLabel },
            { label: "Type", value: project.categoryLabel },
          ].map((item) => (
            <div key={item.label} className="project-meta-row">
              <p className="overline">{item.label}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="project-summary">{project.summary}</p>
          <p className="project-description">{project.longDescription}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <p className="overline">Tags</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="project-gallery">
        <div>
          {(project.images.length > 1 ? project.images.slice(1) : project.images).map((image, index) => (
            <motion.div key={image.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 }} className="project-gallery-item">
              <Image src={image.url} alt={image.alt ?? project.title} fill sizes="(max-width: 767px) 100vw, 50vw" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="next-project">
        <p className="overline">Next Project</p>
        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`}>
            <h2>{nextProject.title}</h2>
            <span>→</span>
          </Link>
        ) : null}
      </section>
    </div>
  )
}