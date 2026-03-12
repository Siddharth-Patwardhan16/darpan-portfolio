"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { api } from "@/trpc/client"

const categories = [
  { label: "All" },
  { label: "Residential", value: "RESIDENTIAL" as const },
  { label: "Cultural", value: "CULTURAL" as const },
  { label: "Commercial", value: "COMMERCIAL" as const },
]

export function ProjectsView() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [hovered, setHovered] = useState<string | null>(null)

  const listInput = useMemo(() => {
    if (!activeCategory.value) {
      return undefined
    }

    return { category: activeCategory.value }
  }, [activeCategory])

  const { data } = api.project.list.useQuery(listInput)

  const hoveredProject = data?.find((project) => project.id === hovered)

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div>
          <p className="overline">Portfolio</p>
          <h1>Selected Work</h1>
        </div>

        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category.label}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={activeCategory.label === category.label ? "is-active" : ""}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-table-wrap">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {data?.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="projects-row"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="mono row-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="row-title">{project.title}</span>
                <span className="row-category">{project.categoryLabel}</span>
                <span className="row-location">{project.location}</span>
                <span className="mono row-year">{project.year}</span>
                <span className="row-arrow">?</span>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="projects-mobile-grid">
        {data?.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="projects-mobile-card">
            <div>
              <Image src={project.thumbnailUrl} alt={project.title} fill sizes="(max-width: 767px) 100vw, 0px" />
            </div>
            <p>{project.title}</p>
            <span>
              {project.categoryLabel} — {project.year}
            </span>
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {hoveredProject ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="hover-preview">
            <Image src={hoveredProject.thumbnailUrl} alt="" fill sizes="288px" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}