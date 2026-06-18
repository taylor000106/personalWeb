"use client";

import { useEffect, useState } from "react";

const fields = [
  { key: "display_name", label: "显示名称" },
  { key: "bio", label: "简介", textarea: true },
  { key: "location", label: "所在地" },
  { key: "github", label: "GitHub 用户名" },
  { key: "email_public", label: "公开邮箱" },
] as const;

export function ProfileForm() {
  const [data, setData] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <p className="text-sm text-zinc-500">加载中…</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="mb-1 block text-sm font-medium">{f.label}</label>
          {"textarea" in f && f.textarea ? (
            <textarea
              className="min-h-[100px] w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              value={data[f.key] || ""}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
            />
          ) : (
            <input
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              value={data[f.key] || ""}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
        保存
      </button>
      {saved ? <span className="ml-3 text-sm text-green-600">已保存</span> : null}
    </form>
  );
}
