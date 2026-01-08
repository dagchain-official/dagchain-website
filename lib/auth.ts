import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AuthUser = {
  id: string;
  role: "admin" | "writer";
};

export function getAuthUser(): AuthUser {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUser;

    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
}
