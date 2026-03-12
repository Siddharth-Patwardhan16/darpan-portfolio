"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { api } from "@/trpc/client"

const offices = [
  {
    city: "Copenhagen",
    address: "Strandgade 91\n1401 Copenhagen K\nDenmark",
    phone: "+45 32 12 34 56",
    email: "cph@normarch.com",
    primary: true,
  },
  {
    city: "Berlin",
    address: "Brunnenstraße 12\n10119 Berlin\nGermany",
    phone: "+49 30 123 4567",
    email: "ber@normarch.com",
    primary: false,
  },
  {
    city: "Oslo",
    address: "Tjuvholmen allé 11\n0252 Oslo\nNorway",
    phone: "+47 21 98 76 54",
    email: "osl@normarch.com",
    primary: false,
  },
]

export function ContactView() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const createInquiry = api.contact.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
    },
  })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createInquiry.mutateAsync({
      name: formState.name,
      email: formState.email,
      projectType: formState.type || undefined,
      message: formState.message,
    })
  }

  return (
    <div className="contact-page">
      <div className="contact-head">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overline">
          Contact
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Let&apos;s build something
          <br />
          worth remembering.
        </motion.h1>
      </div>

      <div className="contact-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {submitted ? (
            <div className="contact-success">
              <p className="overline">Message Received</p>
              <h2>
                Thank you, {formState.name}.
                <br />
                We&apos;ll be in touch shortly.
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setFormState({ name: "", email: "", type: "", message: "" })
                }}
              >
                ? Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="contact-form">
              <label>
                <span className="overline">Full Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span className="overline">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </label>

              <div>
                <span className="overline">Project Type</span>
                <div className="contact-types">
                  {["Residential", "Cultural", "Commercial", "Urban", "Other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormState((state) => ({ ...state, type }))}
                      className={formState.type === type ? "is-active" : ""}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <label>
                <span className="overline">Message</span>
                <textarea
                  rows={5}
                  value={formState.message}
                  onChange={(event) => setFormState((state) => ({ ...state, message: event.target.value }))}
                  placeholder="Tell us about your project..."
                  required
                />
              </label>

              <button type="submit" className="contact-submit" disabled={createInquiry.isPending}>
                Send Message <span>?</span>
              </button>
            </form>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="overline">Offices</p>
          <div className="office-list">
            {offices.map((office) => (
              <article key={office.city}>
                <div>
                  <p>{office.city}</p>
                  {office.primary ? <span>HQ</span> : null}
                </div>
                <pre>{office.address}</pre>
                <a href={`tel:${office.phone}`}>{office.phone}</a>
                <a href={`mailto:${office.email}`}>{office.email}</a>
              </article>
            ))}
          </div>

          <div className="office-general">
            <p className="overline">General Enquiries</p>
            <a href="mailto:studio@normarch.com">studio@normarch.com</a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}