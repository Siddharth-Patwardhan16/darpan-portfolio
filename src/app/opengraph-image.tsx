import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { siteInfo } from "@/data/site-info"

export const runtime = "nodejs"
export const alt = `${siteInfo.name} — ${siteInfo.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo.jpeg"))
  const logoSrc = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f3ef",
          gap: 28,
        }}
      >
        <img src={logoSrc} width={280} height={280} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            {siteInfo.name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            {siteInfo.tagline}
          </p>
        </div>
      </div>
    ),
    { ...size },
  )
}
