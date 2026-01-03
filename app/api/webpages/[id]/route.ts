import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  const page = await Webpage.findById(params.id);

  if (!page) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(page);
}
