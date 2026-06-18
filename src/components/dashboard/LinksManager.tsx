"use client";

import { useCallback, useEffect, useState } from "react";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  created_at: string;
};

export function LinksManager() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/links");
    if (res.ok) setLinks(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, description }),
    });
    setTitle("");
    setUrl("");
    setDescription("");
    load();
  }

  async function remove(id: string) {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/links?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-3 rounded-xl border border-zinc-200 p-4">
        <h2 className="font-semibold">添加链接</h2>
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder="名称"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder="https://..."
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder="备注（可选）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
          添加
        </button>
      </form>

      <ul className="space-y-3">
        {links.length === 0 ? (
          <li className="text-sm text-zinc-500">暂无链接</li>
        ) : (
          links.map((item) => (
            <li key={item.id} className="rounded-xl border border-zinc-200 p-4">
              <div className="flex justify-between gap-2">
                <div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-violet-700 hover:underline"
                  >
                    {item.title}
                  </a>
                  <p className="mt-1 break-all text-xs text-zinc-500">{item.url}</p>
                  {item.description ? (
                    <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
                  ) : null}
                </div>
                <button type="button" className="text-xs text-red-600" onClick={() => remove(item.id)}>
                  删除
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
