import type { MetadataRoute } from "next";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export const revalidate = 30;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const pages = await Webpage.find({
    status: "published",
    indexingStatus: "indexed",
  })
    .select("slug updatedAt")
    .lean();

  const baseUrl = process.env.BASE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt ?? new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
