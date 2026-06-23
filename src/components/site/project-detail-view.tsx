"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { api } from "@/trpc/client"

interface ProjectDetailViewProps {
  slug: string
}

export function ProjectDetailView({ slug }: ProjectDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const projectQuery = api.project.bySlug.useQuery({ slug })
  const listQuery = api.project.list.useQuery()

  useEffect(() => {
    if (lightboxIndex === null) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null)
        return
      }

      const images = projectQuery.data?.images ?? []
      if (images.length < 2) {
        return
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current === null ? 0 : (current + 1) % images.length))
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null ? 0 : (current - 1 + images.length) % images.length,
        )
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [lightboxIndex, projectQuery.data?.images])

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
  const galleryImages = project.images.length > 1 ? project.images.slice(1) : project.images
  const lightboxImage = lightboxIndex === null ? null : project.images[lightboxIndex]

  return (
    <div>
      <section className="project-hero">
        <motion.button
          type="button"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="project-hero-media project-image-trigger"
          onClick={() => setLightboxIndex(0)}
          aria-label={`View full image of ${project.title}`}
        >
          <Image src={project.heroImageUrl} alt={project.title} fill priority sizes="100vw" />
        </motion.button>
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
          {galleryImages.map((image, index) => {
            const imageIndex = project.images.length > 1 ? index + 1 : index

            return (
              <motion.button
                key={image.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="project-gallery-item project-image-trigger"
                onClick={() => setLightboxIndex(imageIndex)}
                aria-label={`View full image ${imageIndex + 1} of ${project.title}`}
              >
                <Image src={image.url} alt={image.alt ?? project.title} fill sizes="(max-width: 767px) 100vw, 50vw" />
              </motion.button>
            )
          })}
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

      <AnimatePresence>
        {lightboxImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="project-lightbox"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} image viewer`}
          >
            <button
              type="button"
              className="project-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image viewer"
            >
              Close
            </button>

            {project.images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="project-lightbox-nav project-lightbox-prev"
                  onClick={(event) => {
                    event.stopPropagation()
                    setLightboxIndex((current) =>
                      current === null ? 0 : (current - 1 + project.images.length) % project.images.length,
                    )
                  }}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="project-lightbox-nav project-lightbox-next"
                  onClick={(event) => {
                    event.stopPropagation()
                    setLightboxIndex((current) =>
                      current === null ? 0 : (current + 1) % project.images.length,
                    )
                  }}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            ) : null}

            <div className="project-lightbox-stage" onClick={(event) => event.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightboxImage.url} alt={lightboxImage.alt ?? project.title} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
