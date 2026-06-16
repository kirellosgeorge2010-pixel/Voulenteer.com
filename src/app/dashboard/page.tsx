import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function DashboardIndex() {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  // Determine user role and redirect
  const role = (session.user as any)?.role || "STUDENT";
  
  if (role === "ORGANIZATION") {
    redirect("/dashboard/org");
  } else {
    redirect("/dashboard/student");
  }
}
