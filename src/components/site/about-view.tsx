"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"

const team = [
  {
    name: "Mads Normann",
    role: "Founding Partner",
    bio: "Previously at BIG and Snøhetta. Graduate of the Royal Danish Academy.",
    image:
      "https://images.unsplash.com/photo-1771814489248-3c56e346db77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Lena Brøgaard",
    role: "Partner, Design",
    bio: "Specialises in civic and cultural buildings. Previously at Herzog & de Meuron.",
    image:
      "https://images.unsplash.com/photo-1711873317324-36e76613be97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Tobias Feld",
    role: "Partner, Technology",
    bio: "Leads computational design and sustainability strategies across all projects.",
    image:
      "https://images.unsplash.com/photo-1765366417033-5d74f04ca77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400",
  },
]

const awards = [
  { year: "2024", name: "Mies van der Rohe Award", project: "Kulturbau Pavilion" },
  { year: "2023", name: "Dezeen Awards — Building of the Year", project: "Nordhaus Residences" },
  { year: "2023", name: "World Architecture Festival — Finalist", project: "Strata Tower" },
  { year: "2022", name: "Nordic Built Award", project: "Veld House" },
  { year: "2021", name: "Architizer A+ Award", project: "Brutform Center" },
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
          <Image src="https://images.unsplash.com/photo-1770892410981-8a6650aa9ee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920" alt="Studio" fill sizes="100vw" />
        </div>
      </section>

      <section className="about-columns">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="overline">Approach</p>
          <p>
            NORM Studio was founded in 2012 on the principle that the best buildings are those that feel inevitable. We resist the arbitrary, decorative, and superficial in favour of structures that earn their place in the landscape and the lives of people who use them.
          </p>
          <p>
            Our work is grounded in close collaboration with clients, contractors, and communities. We believe architecture is a social act as much as a material one.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="overline">Disciplines</p>
          <div>
            {["Architecture", "Interior Design", "Urban Design", "Masterplanning", "Landscape Architecture", "Research & Teaching"].map((discipline, index) => (
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
        <p className="overline">Recognition</p>
        <div>
          {awards.map((award, index) => (
            <motion.div key={`${award.year}-${award.name}`} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
              <span className="mono">{award.year}</span>
              <span>{award.name}</span>
              <span>{award.project}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <Link href="/contact">Start a Conversation ?</Link>
        <Link href="/projects">View All Work ?</Link>
      </section>
    </div>
  )
}