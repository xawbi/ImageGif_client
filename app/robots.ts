import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/users', '/profile']
      }
    ],
    sitemap: `${process.env.NEXT_PUBLIC_IMAGEGIF_HOST}/sitemap.xml`
  }
}