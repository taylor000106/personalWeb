import Link from "next/link";
import { getDb } from "@/lib/db";

export const metadata = { title: "概览" };

export const dynamic = "force-dynamic";

export default function DashboardHome() {
  const noteCount = (
    getDb().prepare("SELECT COUNT(*) as c FROM notes").get() as { c: number }
  ).c;
  const linkCount = (
    getDb().prepare("SELECT COUNT(*) as c FROM links").get() as { c: number }
  ).c;

  return (
    <div>
      <h1 className="text-2xl font-bold">欢迎回来</h1>
      <p className="mt-2 text-zinc-600">这是你的私人数据面板，数据保存在服务器 SQLite 数据库中。</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard label="笔记" value={noteCount} href="/dashboard/notes" />
        <StatCard label="收藏链接" value={linkCount} href="/dashboard/links" />
      </div>

      <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="font-semibold">快速开始</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-600">
          <li>在「笔记」里记录想法、待办或日记</li>
          <li>在「链接」里收藏常用网站</li>
          <li>在「资料」里填写对外展示的个人信息</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-md"
    >
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-4xl font-bold">{value}</p>
    </Link>
  );
}
