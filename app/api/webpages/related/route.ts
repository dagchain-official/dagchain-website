import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  if (!slug) {
    return NextResponse.json(
      { success: false, message: "slug is required" },
      { status: 400 }
    );
  }

  if (!type) {
    return NextResponse.json(
      { success: false, message: "type is required" },
      { status: 400 }
    );
  }

  const pages = await Webpage.find(
    {
      slug: { $ne: slug },
      type,
      status: "published",
      indexingStatus: "indexed",
    },
    {
      title: 1,
      slug: 1,
      bannerImage: 1,
      createdAt: 1,
    }
  )
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  // not return if less than 3 articles
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
