import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,           // 👈 deletes cookie
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
