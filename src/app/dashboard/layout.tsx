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
      <DashboardNav email={session.email} role={session.role} />
      <main className="flex-1 p-6 md:p-10">
        {session.role === "demo" ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            当前为演示账号（只读）：可浏览待办 / 笔记 / 链接 / 资料，不能新增或修改。
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
