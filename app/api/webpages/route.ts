import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";
import { getAuthUser } from "@/lib/auth";
import "@/lib/models/User";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();
  const { id, ...data } = body;

  try {
    const user = getAuthUser();

    const page = id
      ? await Webpage.findByIdAndUpdate(
        id,
        {
          $set: {
            ...data,
            updatedBy: user.id
          }
        },
        { new: true }
      )
      : await Webpage.create({
        ...data,
        createdBy: user.id,
        updatedBy: user.id
      });

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

export async function GET(req: Request) {
  try {
    await dbConnect();

    const user = getAuthUser();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const query: any = {
      slug: { $exists: true, $ne: "" },
      status: { $ne: "deleted" }
    };

    if (user.role !== "admin") {
      query.createdBy = new mongoose.Types.ObjectId(user.id);
    }

    if (type) {
      query.type = type;
    }

    const pages = await Webpage.find(query)
      .populate({ path: "createdBy", select: "email" })
      .populate({ path: "updatedBy", select: "email" })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({
      success: true,
      pages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
