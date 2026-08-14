import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getContentInventory } from "@/lib/content-stats";
import {
  getDashboardStats,
  listOpenTodos,
  listRecentActivity,
  listRecentLinks,
  listRecentNotes,
} from "@/lib/repositories";

export const metadata = { title: "概览" };
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
  todo: "待办",
};

function greeting(now = new Date()) {
  const hour = now.getHours();
  if (hour < 11) return "早上好";
  if (hour < 14) return "中午好";
  if (hour < 18) return "下午好";
  return "晚上好";
}

export default async function DashboardHome() {
  const session = await getSession();
  const stats = getDashboardStats();
  const recent = listRecentActivity(6);
  const notes = listRecentNotes(4);
  const links = listRecentLinks(4);
  const todos = listOpenTodos(5);
  const content = getContentInventory();
  const readOnly = session?.role === "demo";
  const name = session?.email?.split("@")[0] ?? "朋友";

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {greeting()}，{name}
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            这是你们的共享私人空间：待办一起记，笔记和链接各自沉淀，公开站点内容在下方一眼看到。
          </p>
        </div>
        {readOnly ? null : (
          <div className="flex flex-wrap gap-2">
            <QuickLink href="/dashboard/todos" label="加待办" />
            <QuickLink href="/dashboard/notes" label="写笔记" />
            <QuickLink href="/dashboard/links" label="收藏链接" />
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="待办进行中"
          value={stats.todosOpen}
          hint={`共 ${stats.todosTotal} 条`}
          href="/dashboard/todos"
        />
        <StatCard label="笔记" value={stats.notes} href="/dashboard/notes" />
        <StatCard label="链接" value={stats.links} href="/dashboard/links" />
        <StatCard label="近期活动" value={stats.activities} href="/dashboard" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-zinc-200 p-5 xl:col-span-1">
          <SectionHeader title="共享待办" href="/dashboard/todos" />
          {todos.length === 0 ? (
            <Empty
              text="还没有待办。"
              actionHref={readOnly ? undefined : "/dashboard/todos"}
              actionLabel="去添加"
            />
          ) : (
            <ul className="mt-3 space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-800"
                >
                  {todo.title}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-zinc-200 p-5 xl:col-span-1">
          <SectionHeader title="最近笔记" href="/dashboard/notes" />
          {notes.length === 0 ? (
            <Empty
              text="还没有笔记。"
              actionHref={readOnly ? undefined : "/dashboard/notes"}
              actionLabel="去写一条"
            />
          ) : (
            <ul className="mt-3 space-y-3">
              {notes.map((note) => (
                <li key={note.id} className="border-b border-zinc-100 pb-3 last:border-0">
                  <p className="text-sm font-medium text-zinc-900">{note.title}</p>
                  {note.content ? (
                    <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                      {note.content}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-zinc-200 p-5 xl:col-span-1">
          <SectionHeader title="最近链接" href="/dashboard/links" />
          {links.length === 0 ? (
            <Empty
              text="还没有收藏。"
              actionHref={readOnly ? undefined : "/dashboard/links"}
              actionLabel="去收藏"
            />
          ) : (
            <ul className="mt-3 space-y-3">
              {links.map((link) => (
                <li key={link.id} className="border-b border-zinc-100 pb-3 last:border-0">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-violet-700 hover:underline"
                  >
                    {link.title}
                  </a>
                  <p className="mt-1 truncate text-xs text-zinc-500">{link.url}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 p-5">
          <h2 className="font-semibold">最近活动</h2>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">
              暂无活动，先写一条笔记或加一条待办。
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
                    {new Date(item.created_at).toLocaleString("zh-CN")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="font-semibold">公开站快捷入口</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <PublicLink href="/" label="首页" desc="作品集主页" />
            <PublicLink href="/lab" label="Lab" desc={`${content.lab.total} 个实验`} />
            <PublicLink
              href="/assistant"
              label="AI 助手"
              desc={`${content.knowledge.docs} 篇知识库`}
            />
            <PublicLink
              href="/#projects"
              label="项目"
              desc={`${content.projects.featured} Featured`}
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            公开内容走 Git（项目 / Lab / 文章）；私人内容走 SQLite（待办 / 笔记 /
            链接），两边分开维护。
          </p>
        </section>
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
    >
      {label}
    </Link>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-semibold">{title}</h2>
      <Link href={href} className="text-xs text-violet-700 hover:underline">
        查看全部
      </Link>
    </div>
  );
}

function Empty({
  text,
  actionHref,
  actionLabel,
}: {
  text: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mt-3 rounded-lg border border-dashed border-zinc-200 px-4 py-6 text-sm text-zinc-500">
      <p>{text}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-2 inline-block text-violet-700 hover:underline"
        >
          {actionLabel} →
        </Link>
      ) : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  hint,
}: {
  label: string;
  value: number;
  href: string;
  hint?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-zinc-200 p-5 transition-shadow hover:shadow-md"
    >
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-zinc-400">{hint}</p> : null}
    </Link>
  );
}

function PublicLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-zinc-300"
    >
      <p className="text-sm font-medium text-zinc-900">{label}</p>
      <p className="mt-1 text-xs text-zinc-500">{desc}</p>
    </Link>
  );
}
