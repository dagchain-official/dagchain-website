import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  const token = cookies().get("admin_token")?.value;

  if (token) {
    redirect("/admin");
  }

  return <LoginClient />;
}
