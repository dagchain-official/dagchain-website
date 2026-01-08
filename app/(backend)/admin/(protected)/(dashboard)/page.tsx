import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
  redirect("/admin/webpages");
  return <DashboardClient />;
}
