"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/dashboard", label: "概览" },
  { href: "/dashboard/notes", label: "笔记" },
  { href: "/dashboard/links", label: "链接" },
  { href: "/dashboard/profile", label: "资料" },
];

export function DashboardNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-zinc-200 bg-zinc-50 md:min-h-screen md:w-56 md:border-b-0 md:border-r">
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">私人空间</p>
        <p className="mt-1 truncate text-sm font-semibold text-zinc-900">{email}</p>
      </div>
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
        {links.map((link) => {
          const active =
            link.href === "/dashboard" ?
              pathname === "/dashboard"
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex gap-2 border-t border-zinc-200 p-3">
        <Link href="/" className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-center text-sm hover:bg-white">
          访客首页
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-700"
        >
          退出
        </button>
      </div>
    </aside>
  );
}
