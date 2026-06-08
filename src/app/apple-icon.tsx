import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const runtime = "nodejs"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default async function AppleIcon() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo.jpeg"))
  const logoSrc = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f3ef",
        }}
      >
        <img src={logoSrc} width={150} height={150} alt="" />
      </div>
    ),
    { ...size },
  )
}
