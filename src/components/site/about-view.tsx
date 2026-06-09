"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { aboutImages } from "@/data/about-images"
import { siteInfo } from "@/data/site-info"

const team = [
  {
    name: "Darpan Adhaoo",
    role: "Founder & Principal Architect",
    bio: "Leads Studio D02 across residential, commercial, and hospitality interior projects in Nashik and beyond.",
    image: aboutImages.leadership,
  },
]

export function AboutView() {
  return (
    <div className="about-page">
      <section className="about-statement">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overline">
          Studio
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          We build with the conviction that architecture shapes not just space, but time — the way people inhabit, remember, and move through the world.
        </motion.h1>
      </section>

      <section className="about-hero-image">
        <div>
          <Image src={aboutImages.hero} alt="D02 Lounge by Studio D02" fill sizes="100vw" />
        </div>
      </section>

      <section className="about-gallery">
        {aboutImages.gallery.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="about-gallery-item"
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, 33vw" />
          </motion.div>
        ))}
      </section>

      <section className="about-columns">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="overline">Approach</p>
          <p>
            {siteInfo.name} is a Nashik-based architecture and interior design practice working across residential, commercial, and hospitality projects. We focus on material honesty, spatial clarity, and designs that feel purposeful in everyday use.
          </p>
          <p>
            Our work is grounded in close collaboration with clients and contractors. From concept to completion, we shape spaces that reflect each client&apos;s vision while remaining practical, refined, and enduring.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="overline">Disciplines</p>
          <div>
            {["Architecture", "Interior Design", "Residential", "Commercial", "Hospitality", "Workplace"].map((discipline, index) => (
              <div key={discipline} className="about-discipline-row">
                <span>{discipline}</span>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="about-team">
        <p className="overline">Leadership</p>
        <div>
          {team.map((member, index) => (
            <motion.article key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <div className="about-team-media">
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 767px) 100vw, 33vw" />
              </div>
              <p>{member.name}</p>
              <span>{member.role}</span>
              <small>{member.bio}</small>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="about-awards">
        <p className="overline">Visit Us</p>
        <div>
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="mono">01</span>
            <span>{siteInfo.address.join(", ")}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.07 }}>
            <span className="mono">02</span>
            <a href={siteInfo.phoneHref}>{siteInfo.phone}</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}>
            <span className="mono">03</span>
            <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
          </motion.div>
        </div>
      </section>

      <section className="about-cta">
        <Link href="/contact">Start a Conversation →</Link>
        <Link href="/projects">View All Work →</Link>
      </section>
    </div>
  )
}
