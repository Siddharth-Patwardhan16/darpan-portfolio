import type { Metadata } from "next"
import { siteInfo } from "@/data/site-info"

const defaultSiteUrl = "https://darpanp.netlify.app"

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || defaultSiteUrl
}

export const seoDefaults = {
  siteName: siteInfo.name,
  title: `${siteInfo.name} — ${siteInfo.tagline}`,
  description:
    "Architecture and interior design by Studio D02 in Nashik, Maharashtra — residential, commercial, and hospitality projects.",
  keywords: [
    "Studio D02",
    "architecture Nashik",
    "interior design Nashik",
    "residential interior design",
    "commercial interior design",
    "hospitality design",
    "Maharashtra architect",
    "Darpan Adhaoo",
  ],
  logoPath: "/logo.jpeg",
  ogImagePath: "/opengraph-image",
  locale: "en_IN",
} as const

function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`
}

function isDefaultShareImage(image: string) {
  return image === seoDefaults.logoPath || image === seoDefaults.ogImagePath
}

interface CreateMetadataOptions {
  title?: string
  description?: string
  path?: string
  image?: string
  imageAlt?: string
  keywords?: string[]
  noIndex?: boolean
}

export function createMetadata({
  title,
  description = seoDefaults.description,
  path = "/",
  image = seoDefaults.ogImagePath,
  imageAlt = `${siteInfo.name} — ${siteInfo.tagline}`,
  keywords = [...seoDefaults.keywords],
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteInfo.name}` : seoDefaults.title
  const canonicalUrl = absoluteUrl(path)
  const useGeneratedOgImage = isDefaultShareImage(image)
  const imageUrl = useGeneratedOgImage ? absoluteUrl(seoDefaults.ogImagePath) : absoluteUrl(image)

  const shareImages = useGeneratedOgImage
    ? undefined
    : [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: image.endsWith(".png") ? "image/png" : "image/jpeg",
        },
      ]

  return {
    title: pageTitle,
    description,
    keywords,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: seoDefaults.locale,
      url: canonicalUrl,
      siteName: seoDefaults.siteName,
      title: pageTitle,
      description,
      ...(shareImages ? { images: shareImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      ...(shareImages ? { images: [imageUrl] } : {}),
    },
  }
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteInfo.name,
    description: seoDefaults.description,
    url: getSiteUrl(),
    logo: absoluteUrl(seoDefaults.logoPath),
    image: absoluteUrl(seoDefaults.ogImagePath),
    email: siteInfo.email,
    telephone: siteInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteInfo.address.join(", "),
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      postalCode: "422008",
      addressCountry: "IN",
    },
    areaServed: "Nashik, Maharashtra, India",
    sameAs: [siteInfo.social.instagram, siteInfo.social.linkedin],
  }
}
