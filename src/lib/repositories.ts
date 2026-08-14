import { getDb, type LinkItem, type Note, type TodoItem } from "@/lib/db";
import { v4 as uuid } from "uuid";

export function listNotes(): Note[] {
  return getDb().prepare("SELECT * FROM notes ORDER BY updated_at DESC").all() as Note[];
}

export function listRecentNotes(limit = 5): Note[] {
  return getDb()
    .prepare("SELECT * FROM notes ORDER BY updated_at DESC LIMIT ?")
    .all(limit) as Note[];
}

export function createNote(input: {
  title: string;
  content: string;
  tags: string;
}): Note {
  const now = new Date().toISOString();
  const id = uuid();
  getDb()
    .prepare(
      "INSERT INTO notes (id, title, content, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(id, input.title, input.content, input.tags, now, now);
  return {
    id,
    title: input.title,
    content: input.content,
    tags: input.tags,
    created_at: now,
    updated_at: now,
  };
}

export function updateNote(input: {
  id: string;
  title: string;
  content: string;
  tags: string;
}): boolean {
  const now = new Date().toISOString();
  const result = getDb()
    .prepare(
      "UPDATE notes SET title = ?, content = ?, tags = ?, updated_at = ? WHERE id = ?",
    )
    .run(input.title, input.content, input.tags, now, input.id);
  return result.changes > 0;
}

export function deleteNote(id: string): boolean {
  const result = getDb().prepare("DELETE FROM notes WHERE id = ?").run(id);
  return result.changes > 0;
}

export function countNotes(): number {
  return (getDb().prepare("SELECT COUNT(*) as c FROM notes").get() as { c: number }).c;
}

export function listLinks(): LinkItem[] {
  return getDb()
    .prepare("SELECT * FROM links ORDER BY created_at DESC")
    .all() as LinkItem[];
}

export function listRecentLinks(limit = 5): LinkItem[] {
  return getDb()
    .prepare("SELECT * FROM links ORDER BY created_at DESC LIMIT ?")
    .all(limit) as LinkItem[];
}

export function createLink(input: {
  title: string;
  url: string;
  description: string;
}): LinkItem {
  const now = new Date().toISOString();
  const id = uuid();
  getDb()
    .prepare(
      "INSERT INTO links (id, title, url, description, created_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(id, input.title, input.url, input.description, now);
  return {
    id,
    title: input.title,
    url: input.url,
    description: input.description,
    created_at: now,
  };
}

export function deleteLink(id: string): boolean {
  const result = getDb().prepare("DELETE FROM links WHERE id = ?").run(id);
  return result.changes > 0;
}

export function countLinks(): number {
  return (getDb().prepare("SELECT COUNT(*) as c FROM links").get() as { c: number }).c;
}

export function listTodos(): TodoItem[] {
  return getDb()
    .prepare("SELECT * FROM todos ORDER BY done ASC, updated_at DESC")
    .all() as TodoItem[];
}

export function listOpenTodos(limit = 6): TodoItem[] {
  return getDb()
    .prepare("SELECT * FROM todos WHERE done = 0 ORDER BY updated_at DESC LIMIT ?")
    .all(limit) as TodoItem[];
}

export function createTodo(input: { title: string; createdBy: string }): TodoItem {
  const now = new Date().toISOString();
  const id = uuid();
  getDb()
    .prepare(
      "INSERT INTO todos (id, title, done, created_by, created_at, updated_at) VALUES (?, ?, 0, ?, ?, ?)",
    )
    .run(id, input.title, input.createdBy, now, now);
  return {
    id,
    title: input.title,
    done: 0,
    created_by: input.createdBy,
    created_at: now,
    updated_at: now,
  };
}

export function setTodoDone(id: string, done: boolean): boolean {
  const now = new Date().toISOString();
  const result = getDb()
    .prepare("UPDATE todos SET done = ?, updated_at = ? WHERE id = ?")
    .run(done ? 1 : 0, now, id);
  return result.changes > 0;
}

export function deleteTodo(id: string): boolean {
  const result = getDb().prepare("DELETE FROM todos WHERE id = ?").run(id);
  return result.changes > 0;
}

export function countTodos() {
  const row = getDb()
    .prepare(
      "SELECT COUNT(*) as total, SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END) as open FROM todos",
    )
    .get() as { total: number; open: number | null };
  return { total: row.total, open: row.open ?? 0 };
}

export function getProfile(): Record<string, string> {
  const rows = getDb().prepare("SELECT key, value FROM profile").all() as {
    key: string;
    value: string;
  }[];
  const profile: Record<string, string> = {};
  for (const row of rows) profile[row.key] = row.value;
  return profile;
}

export function updateProfile(fields: Record<string, string>) {
  const upsert = getDb().prepare(
    "INSERT INTO profile (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
  );
  const tx = getDb().transaction((entries: [string, string][]) => {
    for (const [key, value] of entries) upsert.run(key, value);
  });
  tx(Object.entries(fields));
}

export type ActivityItem = {
  id: string;
  action: string;
  entity: string;
  entity_id: string | null;
  detail: string;
  created_at: string;
};

export function logActivity(input: {
  action: string;
  entity: string;
  entityId?: string | null;
  detail?: string;
}) {
  const id = uuid();
  const createdAt = new Date().toISOString();
  getDb()
    .prepare(
      "INSERT INTO activity_log (id, action, entity, entity_id, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(
      id,
      input.action,
      input.entity,
      input.entityId ?? null,
      input.detail ?? "",
      createdAt,
    );
}

export function listRecentActivity(limit = 8): ActivityItem[] {
  return getDb()
    .prepare(
      "SELECT id, action, entity, entity_id, detail, created_at FROM activity_log ORDER BY created_at DESC LIMIT ?",
    )
    .all(limit) as ActivityItem[];
}

export function getDashboardStats() {
  const todos = countTodos();
  return {
    notes: countNotes(),
    links: countLinks(),
    todosOpen: todos.open,
    todosTotal: todos.total,
    activities: (
      getDb().prepare("SELECT COUNT(*) as c FROM activity_log").get() as { c: number }
    ).c,
  };
}
