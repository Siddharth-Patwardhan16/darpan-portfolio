"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { api } from "@/trpc/client"

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1770892410981-8a6650aa9ee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920",
    label: "Selected Work — 2024",
    title: "Architecture\nas Landscape",
  },
  {
    image:
      "https://images.unsplash.com/photo-1761287347782-f3b433c0cee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920",
    label: "Selected Work — 2023",
    title: "Material\nand Memory",
  },
  {
    image:
      "https://images.unsplash.com/photo-1769328728802-0ae52ebd7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920",
    label: "Selected Work — 2022",
    title: "Urban\nPrecision",
  },
]

const expertise = [
  "Architecture",
  "Urban Design",
  "Interiors",
  "Research",
  "Masterplanning",
  "Landscape",
  "Civic",
  "Residential",
]

const stats = [
  { value: "2012", label: "Founded" },
  { value: "48+", label: "Built Works" },
  { value: "12", label: "Awards" },
  { value: "3", label: "Offices" },
]

export function HomeView() {
  const [current, setCurrent] = useState(0)
  const { data: featured } = api.project.featured.useQuery()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <section className="home-hero">
        {heroSlides.map((slide, index) => (
          <div key={slide.label} className={`home-hero-slide ${index === current ? "is-active" : ""}`}>
            <Image src={slide.image} alt="" fill priority={index === 0} sizes="100vw" className="home-hero-slide-image" />
            <div className="home-hero-mask" />
          </div>
        ))}

        <div className="home-hero-text">
          <motion.p
            key={`hero-label-${current}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mono overline on-dark"
          >
            {heroSlides[current]?.label}
          </motion.p>

          <motion.h1
            key={`hero-title-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heroSlides[current]?.title}
          </motion.h1>
        </div>

        <div className="home-hero-indicators">
          {heroSlides.map((slide, index) => (
            <button key={slide.label} type="button" onClick={() => setCurrent(index)} className={index === current ? "is-active" : ""} />
          ))}
        </div>

        <div className="home-hero-scroll">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
        </div>
      </section>

      <section className="container intro-section">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          NORM Studio is a Copenhagen-based architecture practice working across scales — from intimate residences to civic infrastructure — guided by a belief in the enduring power of material honesty and spatial clarity.
        </motion.p>
      </section>

      <section className="container featured-section">
        <div className="section-head">
          <p className="overline">Selected Work</p>
          <Link href="/projects" className="tiny-link">
            View All <span>?</span>
          </Link>
        </div>

        <div className="featured-grid">
          {featured?.[0] ? (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="featured-large">
              <FeaturedCard project={featured[0]} large />
            </motion.div>
          ) : null}

          <div className="featured-stack">
            {featured?.slice(1, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.1 }}
              >
                <FeaturedCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="marquee-strip">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="marquee-row">
          {[0, 1].map((block) => (
            <span key={block}>
              {expertise.map((item) => (
                <span key={`${block}-${item}`}>{item}</span>
              ))}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="stats-section">
        {stats.map((item, index) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
            <p className="mono stat-value">{item.value}</p>
            <p className="overline">{item.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="cta-section">
        <div>
          <p className="overline">New Commission?</p>
          <h2>
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
        </div>

        <Link href="/contact" className="cta-button">
          Get in Touch <span>?</span>
        </Link>
      </section>
    </div>
  )
}

interface FeaturedProject {
  id: string
  slug: string
  title: string
  categoryLabel: string
  year: number
  thumbnailUrl: string
}

function FeaturedCard({ project, large = false }: { project: FeaturedProject; large?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="featured-card">
      <div className="featured-media">
        <Image src={project.thumbnailUrl} alt={project.title} fill sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"} />
      </div>
      <div className="featured-meta">
        <div>
          <p className={`featured-title ${large ? "is-large" : ""}`}>{project.title}</p>
          <p className="overline muted">
            {project.categoryLabel} — {project.year}
          </p>
        </div>
        <span>?</span>
      </div>
    </Link>
  )
}