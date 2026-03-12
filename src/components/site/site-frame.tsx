"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

interface SiteFrameProps {
  children: ReactNode
}

const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function SiteFrame({ children }: SiteFrameProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="site-root">
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <nav className="site-nav">
          <Link href="/" className="site-logo">
            NORM Studio
          </Link>

          <div className="site-nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-link ${pathname === link.href ? "site-nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`site-menu-btn ${menuOpen ? "site-menu-btn-open" : ""}`}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="site-mobile-overlay"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
              >
                <Link href={link.href} className="site-mobile-link">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="site-footer">
        <div className="site-footer-grid">
          <div>
            <p className="site-footer-brand">NORM Studio</p>
            <p className="site-footer-copy">Architecture & Urban Design</p>
            <p className="site-footer-copy">Copenhagen — Berlin — Oslo</p>
          </div>

          <div>
            <p className="site-footer-label">Contact</p>
            <a href="mailto:studio@normarch.com" className="site-footer-link">
              studio@normarch.com
            </a>
            <a href="tel:+4532123456" className="site-footer-link">
              +45 32 12 34 56
            </a>
          </div>

          <div>
            <p className="site-footer-label">Follow</p>
            <a href="#" className="site-footer-link">
              Instagram
            </a>
            <a href="#" className="site-footer-link">
              LinkedIn
            </a>
            <a href="#" className="site-footer-link">
              Dezeen
            </a>
          </div>

          <div className="site-footer-right">
            <p>
              © {new Date().getFullYear()} NORM Studio.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}