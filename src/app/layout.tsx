import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"
import { TRPCProvider } from "@/trpc/provider"
import { SiteFrame } from "@/components/site/site-frame"

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

export const metadata: Metadata = {
  title: "Studio D02 — Architecture & Interior Design",
  description:
    "Architecture and interior design by Studio D02 in Nashik, Maharashtra — residential, commercial, and hospitality projects.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <TRPCProvider>
          <SiteFrame>{children}</SiteFrame>
        </TRPCProvider>
      </body>
    </html>
  )
}