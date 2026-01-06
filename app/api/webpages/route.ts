import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();
  const { id, ...data } = body;

  try {
    const page = id
      ? await Webpage.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      )
      : await Webpage.create(data);

    return NextResponse.json(page);
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }
    console.error(err);
    return NextResponse.json(
      { message: "Failed to save webpage" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const pages = await Webpage.find({
      status: { $ne: "deleted" }, // exclude deleted
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      pages,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
