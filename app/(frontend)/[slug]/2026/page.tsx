import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";
import ClientWebpage from "./ClientPage";

/* -----------------------------------------
   🚨 FORCE DYNAMIC FOR PROD (CRITICAL)
------------------------------------------ */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

/* -----------------------------------------
   Dynamic SEO Metadata
------------------------------------------ */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview?: string };
}): Promise<Metadata> {
  await dbConnect();

  if (!params?.slug) {
    return {};
  }

  const page = await Webpage.findOne({ slug: params.slug }).lean();
  if (!page) return {};

  const isPreview = searchParams.preview === "true";
  const isVisible = page.status === "published";

  const isIndexable =
    isVisible &&
    page.indexingStatus === "indexed" &&
    !isPreview;

  return {
    title: page.meta?.metaTitle || page.title || "Default Page Title",
    description:
      page.meta?.metaDescription || "Default page description",

    keywords: page.meta?.metaKeywords?.length
      ? page.meta.metaKeywords.join(", ")
      : undefined,

    openGraph: {
      title: page.meta?.metaTitle || page.title,
      description: page.meta?.metaDescription,
      type: "article",
    },

    robots: {
      index: isIndexable,
      follow: isIndexable,
      nocache: !isIndexable,
    },
  };
}

/* -----------------------------------------
   Page Component
------------------------------------------ */
export default async function WebpagePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview?: string };
}) {
  await dbConnect();

  if (!params?.slug) {
    notFound();
  }

  const page = await Webpage.findOne({ slug: params.slug }).lean();
  if (!page) notFound();

  const isPreview = searchParams.preview === "true";
  const isVisible = page.status === "published";

  if (!isVisible && !isPreview) {
    notFound();
  }

  return (
    <ClientWebpage
      page={{
        ...page,
        _id: page._id.toString(),
        createdAt: page.createdAt?.toISOString(),
        updatedAt: page.updatedAt?.toISOString(),
        indexingAt: page.indexingAt?.toISOString(),
      }}
    />
  );
}
