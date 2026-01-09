import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Webpage from "@/lib/models/Webpage";
import { getAuthUser } from "@/lib/auth";
import "@/lib/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const user = await getAuthUser();

    /* ---------------- MATCH ---------------- */
    const matchStage: any = {
      status: "published",
      slug: { $exists: true, $ne: "" },
    };

    // 🔐 Role-based restriction
    if (user.role !== "admin") {
      matchStage.createdBy = new mongoose.Types.ObjectId(user.id);
    }

      const data = await Webpage.aggregate(
      [
      { $match: matchStage },

      {
        $lookup: {
          from: "users",
          let: { createdById: "$createdBy" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$createdById" }]
                }
              }
            },
            { $project: { email: 1,teamName:1 } }
          ],
          as: "user"
        },
      },

      /* ---------- Keep docs even if user missing ---------- */
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },

      /* ---------- Group per user ---------- */
      {
        $group: {
          _id: {
            $cond: [
              { $ifNull: ["$createdBy", false] },
              { $ifNull: ["$user.teamName", "Unknown User"] },
              "System / Legacy Content (Super Admin)",
            ],
          },

          webpageCount: {
            $sum: { $cond: [{ $eq: ["$type", "webpage"] }, 1, 0] },
          },

          knowledgeCount: {
            $sum: { $cond: [{ $eq: ["$type", "knowledge"] }, 1, 0] },
          },

          webpageUrls: {
            $push: {
              $cond: [{ $eq: ["$type", "webpage"] }, "$slug", null],
            },
          },

          knowledgeUrls: {
            $push: {
              $cond: [{ $eq: ["$type", "knowledge"] }, "$slug", null],
            },
          },
        },
      },

      /* ---------- Clean output ---------- */
      {
        $project: {
          _id: 0,
          email: "$_id",
          webpageCount: 1,
          knowledgeCount: 1,
          webpageUrls: {
            $filter: {
              input: "$webpageUrls",
              as: "u",
              cond: { $ne: ["$$u", null] },
            },
          },
          knowledgeUrls: {
            $filter: {
              input: "$knowledgeUrls",
              as: "u",
              cond: { $ne: ["$$u", null] },
            },
          },
        },
      },

      { $sort: { email: 1 } },
    ]);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard aggregation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard summary" },
      { status: 500 }
    );
  }
}
