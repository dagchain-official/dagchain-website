import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isProd ? "/" : "",
        disallow: isProd
          ? ["/admin", "/api", "/preview"]
          : ["/"],
      },
    ],
    sitemap: "https://www.dagchain.network/sitemap.xml",
  };
}
