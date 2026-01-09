import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const user = getAuthUser();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const filter: any = { _id: params.id };

    if (user.role !== "admin") {
      filter.createdBy = new mongoose.Types.ObjectId(user.id);

    }

    const page = await Webpage.findOne(filter);

    if (!page) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 403 }
    );
  }
}
