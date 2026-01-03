import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  await dbConnect();

  const page = await Webpage.findOne({ slug: params.slug }).lean();

  if (
    !page ||
    page.status !== "published" ||
    page.indexingStatus !== "indexed"
  ) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: page.meta?.metaTitle || page.title,
    description: page.meta?.metaDescription,
  };
}
