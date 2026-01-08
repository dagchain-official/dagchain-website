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

const BRAND_REGEX = /\bdagchain\b/gi;

export function normalizeDagChain(text?: string): string | undefined {
  if (!text) return text;
  return text.replace(BRAND_REGEX, "DagChain");
}

function normalizeHtmlFields<T extends Record<string, any>>(
  obj: T,
  fields: (keyof T)[]
): T {
  const copy = { ...obj };
  fields.forEach((field) => {
    if (typeof copy[field] === "string") {
      copy[field] = normalizeDagChain(copy[field]) as T[keyof T];
    }
  });
  return copy;
}

function normalizeQuestions(
  questions?: { title?: string; answer?: string }[]
) {
  if (!Array.isArray(questions)) return questions;

  return questions.map((q) => ({
    ...q,
    title: normalizeDagChain(q.title),
    answer: normalizeDagChain(q.answer),
  }));
}

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
  if (process.env.NODE_ENV !== "production") {
    return {};
  }
  await dbConnect();
  if (!params?.slug) return {};
  const page = await Webpage.findOne({ slug: params.slug }).lean();
  if (!page) return {};
  const isPreview = searchParams.preview === "true";
  const isVisible = page.status === "published";
  const isIndexable =
    isVisible &&
    page.indexingStatus === "indexed" &&
    !isPreview;
  return {
    title: normalizeDagChain(page.meta?.metaTitle || page.title),
    description: normalizeDagChain(page.meta?.metaDescription),

    keywords: page.meta?.metaKeywords?.length
      ? page.meta.metaKeywords.map((k: string) => normalizeDagChain(k)).join(", ")
      : undefined,

    openGraph: {
      title: normalizeDagChain(page.meta?.metaTitle || page.title),
      description: normalizeDagChain(page.meta?.metaDescription),
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

  const normalizedPage = (() => {
    let updatedPage: any = {
      ...page,
      title: normalizeDagChain(page.title),
      topic: normalizeDagChain(page.topic),
      content: normalizeDagChain(page.content),
      meta: {
        ...page.meta,
        metaTitle: normalizeDagChain(page.meta?.metaTitle),
        metaDescription: normalizeDagChain(page.meta?.metaDescription),
        metaKeywords: page.meta?.metaKeywords?.length
          ? page.meta.metaKeywords.map((k: string) => normalizeDagChain(k))
          : [],
      },
      banner: {
        ...page.banner,
        heading: normalizeDagChain(page.banner?.heading),
        subheading: normalizeDagChain(page.banner?.subheading),
        description: normalizeDagChain(page.banner?.description),
      },
    };

    if (page.type === "webpage") {
      updatedPage = normalizeHtmlFields(updatedPage, [
        "content_1",
        "content_2",
        "content_3",
      ]);
    }

    if (page.type === "knowledge") {
      updatedPage.questions = normalizeQuestions(page.questions);
    }

    return updatedPage;
  })();

  return (
    <ClientWebpage
      page={{
        ...normalizedPage,
        _id: page._id.toString(),
        createdAt: page.createdAt?.toISOString(),
        updatedAt: page.updatedAt?.toISOString(),
        indexingAt: page.indexingAt?.toISOString(),
      }}
    />
  );
}
