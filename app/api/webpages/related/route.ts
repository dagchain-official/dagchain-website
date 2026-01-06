import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { success: false, message: "slug is required" },
      { status: 400 }
    );
  }

  const pages = await Webpage.find({
    slug: { $ne: slug },          // ❌ exclude current page
    status: "published",          // ✅ only live pages
    // optional SEO-safe guard
    // indexingStatus: "indexed",
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  // 🚫 Do not return if less than 3 articles
  if (!pages || pages.length < 3) {
    return NextResponse.json({
      success: true,
      pages: [],                  // frontend hides automatically
      count: pages.length,
    });
  }

  // ✅ serialize for client safety
  const safePages = pages.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
    indexingAt: p.indexingAt?.toISOString(),
  }));

  return NextResponse.json({
    success: true,
    pages: safePages,
    count: safePages.length,
  });
}
