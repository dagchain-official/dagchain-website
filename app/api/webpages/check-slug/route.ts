import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function POST(req: Request) {
  await dbConnect();

  const { slug, excludeId } = await req.json();
  if (!slug) {
    return NextResponse.json({ slug });
  }

  const regex = new RegExp(`^${slug}(?:-\\d+)?$`);

  const query: any = { slug: regex };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await Webpage
    .find(query)
    .select("slug")
    .lean();

  if (!existing.length) {
    return NextResponse.json({ slug });
  }

  const numbers = existing
    .map(p => {
      const m = p.slug.match(/-(\d+)$/);
      return m ? Number(m[1]) : 0;
    });

  const next = Math.max(...numbers) + 1;

  return NextResponse.json({
    slug: `${slug}-${next}`,
  });
}
