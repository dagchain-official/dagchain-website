// app/(frontend)/[slug]/page.tsx
import { redirect } from "next/navigation";

export default function SlugIndex({ params }: { params: { slug: string } }) {
  redirect(`/${params.slug}/webpage`);
}
