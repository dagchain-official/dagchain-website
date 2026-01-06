import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function SlugPage({ params }: { params: { slug: string } }) {
  if (!params?.slug) {
    throw new Error("Slug missing in production");
  }

  redirect(`/${params.slug}/webpage`);
}
