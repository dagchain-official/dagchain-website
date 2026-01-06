import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

import "@/public/admin/css/header.css";
import "@/public/admin/css/menu.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/admin/login");
  }

  return (
    <>
      {/* ================= LAYOUT ================= */}
      <AdminHeader />
      <AdminSidebar />
      {children}
    </>
  );
}
