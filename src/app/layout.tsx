import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"
import { TRPCProvider } from "@/trpc/provider"
import { SiteFrame } from "@/components/site/site-frame"
import { createMetadata, createOrganizationJsonLd } from "@/lib/seo"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
})

export const metadata: Metadata = createMetadata()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = createOrganizationJsonLd()

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TRPCProvider>
          <SiteFrame>{children}</SiteFrame>
        </TRPCProvider>
      </body>
    </html>
  )
}
