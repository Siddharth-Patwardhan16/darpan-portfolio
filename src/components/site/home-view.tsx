"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { api } from "@/trpc/client"
import { siteInfo } from "@/data/site-info"

const heroSlides = [
  {
    image: "/projects/d02-lounge/file_000000001378720789a2a03abe334edb.png",
    label: "Selected Work — 2026",
    title: "D02\nLounge",
  },
  {
    image: "/projects/elo-cafe/file_000000000ba471f8bbe670156850f92d.png",
    label: "Selected Work — 2026",
    title: "Elo\nCafe",
  },
  {
    image: "/projects/kokan-home/20260410_172747.jpg.jpeg",
    label: "Selected Work — 2026",
    title: "Kokan\nHome",
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
          Studio D02 is a Nashik-based architecture and interior design practice working across residential, commercial, and hospitality projects — guided by material honesty, spatial clarity, and designs built for everyday life.
        </motion.p>
      </section>

      <section className="container featured-section">
        <div className="section-head">
          <p className="overline">Selected Work</p>
          <Link href="/projects" className="tiny-link">
            View All <span>→</span>
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
        {siteInfo.stats.map((item, index) => (
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
          Get in Touch <span>→</span>
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
        <span>→</span>
      </div>
    </Link>
  )
}