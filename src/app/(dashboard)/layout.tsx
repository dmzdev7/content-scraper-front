import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar user={session.user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
