import { MetadataRoute } from "next";
import { FileDTO } from "@/api/dto/file.dto";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_HOST
  const response = await fetch(`${host}/public/files?userId=&all=yes&sort=newest&page=1&per_page=100`)
  const files: FileDTO[] = await response.json()

  const fileEntries: MetadataRoute.Sitemap = files.map((file) => ({
    url: `${process.env.NEXT_PUBLIC_IMAGEGIF_HOST}/gallery/${file.id}`
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_IMAGEGIF_HOST}/gallery`
    },
    ...fileEntries
  ]
}