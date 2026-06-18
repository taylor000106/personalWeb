import { getSession } from "@/lib/auth";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login?from=/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 md:flex-row">
      <DashboardNav email={session.email} />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
