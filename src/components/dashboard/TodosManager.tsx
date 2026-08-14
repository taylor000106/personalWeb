"use client";

import { useCallback, useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: number;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export function TodosManager({ readOnly = false }: { readOnly?: boolean }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/todos");
    if (res.ok) setTodos(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  }

  async function toggle(todo: Todo) {
    await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, done: !todo.done }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("确定删除这条待办？")) return;
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-sm text-zinc-500">加载中…</p>;

  const open = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="space-y-6">
      {readOnly ? null : (
        <form onSubmit={add} className="flex flex-col gap-2 sm:flex-row">
          <input
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            placeholder="加一条共享待办，例如：周末一起看项目 Demo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white"
          >
            添加
          </button>
        </form>
      )}

      <section>
        <h2 className="text-sm font-semibold text-zinc-500">进行中 · {open.length}</h2>
        <ul className="mt-3 space-y-2">
          {open.length === 0 ? (
            <li className="rounded-xl border border-dashed border-zinc-200 px-4 py-6 text-sm text-zinc-500">
              还没有待办。两个人都可以在这里记共同事项。
            </li>
          ) : (
            open.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                readOnly={readOnly}
                onToggle={() => toggle(todo)}
                onRemove={() => remove(todo.id)}
              />
            ))
          )}
        </ul>
      </section>

      {done.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold text-zinc-500">已完成 · {done.length}</h2>
          <ul className="mt-3 space-y-2">
            {done.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                readOnly={readOnly}
                onToggle={() => toggle(todo)}
                onRemove={() => remove(todo.id)}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function TodoRow({
  todo,
  readOnly,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  readOnly: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-zinc-200 px-4 py-3">
      <input
        type="checkbox"
        className="mt-1"
        checked={Boolean(todo.done)}
        disabled={readOnly}
        onChange={onToggle}
        aria-label={todo.done ? "标为未完成" : "标为完成"}
      />
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm ${todo.done ? "text-zinc-400 line-through" : "text-zinc-800"}`}
        >
          {todo.title}
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          {todo.created_by || "未知"} ·{" "}
          {new Date(todo.updated_at).toLocaleString("zh-CN")}
        </p>
      </div>
      {readOnly ? null : (
        <button type="button" className="text-xs text-red-600" onClick={onRemove}>
          删除
        </button>
      )}
    </li>
  );
}
