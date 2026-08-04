import Link from "next/link";
import { getContentInventory } from "@/lib/content-stats";
import { getDashboardStats, listRecentActivity } from "@/lib/repositories";

export const metadata = { title: "Overview" };
export const dynamic = "force-dynamic";

const actionLabel: Record<string, string> = {
  create: "创建",
  update: "更新",
  delete: "删除",
};

const entityLabel: Record<string, string> = {
  note: "笔记",
  link: "链接",
  profile: "资料",
};

export default function DashboardHome() {
  const stats = getDashboardStats();
  const recent = listRecentActivity(8);
  const content = getContentInventory();

  return (
    <div>
      <h1 className="text-2xl font-bold">概览</h1>
      <p className="mt-2 text-zinc-600">
        私人面板（SQLite）与公开内容（Git / Markdown）分开：不引入 Prisma 全量
        CMS，保持个人站可维护。
      </p>

      <h2 className="mt-8 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
        私人数据
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <StatCard label="笔记" value={stats.notes} href="/dashboard/notes" />
        <StatCard label="链接" value={stats.links} href="/dashboard/links" />
        <StatCard label="活动" value={stats.activities} href="/dashboard" />
      </div>

      <h2 className="mt-10 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
        公开内容平台（只读）
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          label="Featured 项目"
          value={`${content.projects.featured} / ${content.projects.total}`}
          hint="编辑 src/content/projects.ts"
        />
        <InfoCard
          label="知识库文档"
          value={String(content.knowledge.docs)}
          hint={content.knowledge.files.join(" · ")}
        />
        <InfoCard
          label="Lab 实验"
          value={String(content.lab.total)}
          hint={`原创 ${content.lab.original} · 社区灵感 ${content.lab.inspired}`}
        />
        <InfoCard
          label="Articles 入口"
          value={`${content.articles.live} live`}
          hint="编辑 src/content/articles.ts"
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="font-semibold">架构边界</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-600">
            <li>公开 Portfolio / Lab / AI 知识库 → Git 内容层，发版即更新</li>
            <li>私人笔记 / 链接 / 资料 → SQLite + JWT，不进仓库</li>
            <li>不上 Prisma：表少、单人、SQL 已够用</li>
            <li>
              访客入口：
              <Link href="/" className="text-violet-700 hover:underline">
                首页
              </Link>
              {" · "}
              <Link href="/lab" className="text-violet-700 hover:underline">
                Lab
              </Link>
              {" · "}
              <Link href="/assistant" className="text-violet-700 hover:underline">
                AI 助手
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-zinc-200 p-6">
          <h2 className="font-semibold">最近活动</h2>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">
              暂无活动，先写一条笔记或收藏链接。
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {recent.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-sm text-zinc-800">
                    {actionLabel[item.action] ?? item.action}{" "}
                    {entityLabel[item.entity] ?? item.entity}
                    {item.detail ? ` · ${item.detail}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
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

function InfoCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-zinc-900">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{hint}</p>
    </div>
  );
}
