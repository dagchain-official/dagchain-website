import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  await dbConnect();

  const user = getAuthUser();

  const { id, status } = await req.json();

  // ✅ 1. Validate inputs
  if (!id || !status) {
    return NextResponse.json(
      { message: "id and status are required" },
      { status: 400 }
    );
  }

  // ✅ 2. Validate status
  if (!Webpage.schema.path("status")?.enumValues.includes(status)) {
    return NextResponse.json(
      { message: "Invalid status value" },
      { status: 400 }
    );
  }

  // ✅ 3. Update dynamically
  const page = await Webpage.findByIdAndUpdate(
    id,
    { $set: { status, updatedBy: user.id } },
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
    page,
  });
}
