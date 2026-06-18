"use client";

import { useCallback, useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string;
  created_at: string;
  updated_at: string;
};

export function NotesManager() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/notes");
    if (res.ok) setNotes(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, title, content, tags }),
      });
      setEditingId(null);
    } else {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
      });
    }

    setTitle("");
    setContent("");
    setTags("");
    load();
  }

  function startEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
  }

  async function remove(id: string) {
    if (!confirm("确定删除这条笔记？")) return;
    await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-sm text-zinc-500">加载中…</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={save} className="space-y-3 rounded-xl border border-zinc-200 p-4">
        <h2 className="font-semibold">{editingId ? "编辑笔记" : "新建笔记"}</h2>
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="min-h-[120px] w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder="内容（支持多行）"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder="标签，逗号分隔"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex gap-2">
          <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
            {editingId ? "保存" : "添加"}
          </button>
          {editingId ? (
            <button
              type="button"
              className="rounded-lg border px-4 py-2 text-sm"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
                setTags("");
              }}
            >
              取消
            </button>
          ) : null}
        </div>
      </form>

      <ul className="space-y-3">
        {notes.length === 0 ? (
          <li className="text-sm text-zinc-500">还没有笔记，写第一条吧。</li>
        ) : (
          notes.map((note) => (
            <li key={note.id} className="rounded-xl border border-zinc-200 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{note.title}</h3>
                <div className="flex shrink-0 gap-2 text-xs">
                  <button type="button" className="text-violet-600" onClick={() => startEdit(note)}>
                    编辑
                  </button>
                  <button type="button" className="text-red-600" onClick={() => remove(note.id)}>
                    删除
                  </button>
                </div>
              </div>
              {note.tags ? (
                <p className="mt-1 text-xs text-zinc-500">{note.tags}</p>
              ) : null}
              {note.content ? (
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">{note.content}</p>
              ) : null}
              <p className="mt-2 text-xs text-zinc-400">
                更新于 {new Date(note.updated_at).toLocaleString("zh-CN")}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
