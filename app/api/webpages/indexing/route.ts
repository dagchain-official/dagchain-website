import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

const ALLOWED_STATUS = ["indexed", "pending"] as const;

export async function POST(req: Request) {
  await dbConnect();

  const { id, indexingStatus } = await req.json();

  // ✅ 1. Validate inputs
  if (!id || !indexingStatus) {
    return NextResponse.json(
      { message: "id and indexingStatus are required" },
      { status: 400 }
    );
  }

  // ✅ 2. Validate status
  if (!ALLOWED_STATUS.includes(indexingStatus)) {
    return NextResponse.json(
      { message: "Invalid indexingStatus value" },
      { status: 400 }
    );
  }

  // ✅ 3. Update dynamically
  const page = await Webpage.findByIdAndUpdate(
    id,
    { $set: { indexingStatus } },
    {
      new: true,
      runValidators: true, // ensures enum validation
    }
  );

  if (!page) {
    return NextResponse.json(
      { message: "Webpage not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    page
  });
}
