import fs from "fs"
import path from "path"

export const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"])

export function getProjectImagesDir(slug: string) {
  return path.join(process.cwd(), "public", "projects", slug)
}

export function toPublicImageUrl(slug: string, filename: string) {
  return `/projects/${slug}/${encodeURIComponent(filename)}`
}

function sortImageFiles(files: string[]): string[] {
  return [...files].sort((a, b) => {
    const aIsRender = a.startsWith("file_") || /^[0-9A-Za-z]+\.png$/i.test(a)
    const bIsRender = b.startsWith("file_") || /^[0-9A-Za-z]+\.png$/i.test(b)

    if (aIsRender !== bIsRender) {
      return aIsRender ? -1 : 1
    }

    return a.localeCompare(b, undefined, { numeric: true })
  })
}

export function listProjectImageUrls(slug: string): string[] {
  const projectDir = getProjectImagesDir(slug)

  if (!fs.existsSync(projectDir)) {
    throw new Error(`Missing project assets directory: public/projects/${slug}`)
  }

  const files = sortImageFiles(
    fs
      .readdirSync(projectDir)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())),
  )

  if (files.length === 0) {
    throw new Error(`No images found for project: ${slug}`)
  }

  return files.map((file) => toPublicImageUrl(slug, file))
}

export function saveProjectImage(slug: string, filename: string, data: Buffer) {
  const ext = path.extname(filename).toLowerCase()

  if (!IMAGE_EXTENSIONS.has(ext)) {
    throw new Error(`Unsupported image type: ${ext}`)
  }

  const projectDir = getProjectImagesDir(slug)
  fs.mkdirSync(projectDir, { recursive: true })

  const safeName = path.basename(filename)
  const filePath = path.join(projectDir, safeName)
  fs.writeFileSync(filePath, data)

  return toPublicImageUrl(slug, safeName)
}
