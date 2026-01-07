import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function POST(req: Request) {
  await dbConnect();

  const { slug, excludeId } = await req.json();
  if (!slug) {
    return NextResponse.json({ slug });
  }

  /* ------------------------------
     1️⃣ Check exact slug match
  ------------------------------ */
  const exactQuery: any = { slug };
  if (excludeId) {
    exactQuery._id = { $ne: excludeId };
  }

  const exactExists = await Webpage.exists(exactQuery);

  // ✅ If exact slug does NOT exist → return as-is
  if (!exactExists) {
    return NextResponse.json({ slug });
  }

  /* ------------------------------
     2️⃣ Exact exists → find next suffix
  ------------------------------ */
  const regex = new RegExp(`^${slug}(?:-\\d+)?$`);

  const query: any = { slug: regex };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await Webpage.find(query).select("slug").lean();

  const numbers = existing.map(p => {
    const m = p.slug.match(/-(\d+)$/);
    return m ? Number(m[1]) : 0;
  });

  const next = Math.max(...numbers) + 1;

  return NextResponse.json({
    slug: `${slug}-${next}`,
  });
}
