import { getSession } from "@/lib/auth";
import { getDb, type Note } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const runtime = "nodejs";

async function auth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await auth())) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const notes = getDb()
    .prepare("SELECT * FROM notes ORDER BY updated_at DESC")
    .all() as Note[];
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  if (!(await auth())) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const body = await request.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "");
  const tags = String(body.tags || "").trim();
  if (!title) {
    return NextResponse.json({ error: "标题不能为空" }, { status: 400 });
  }
  const now = new Date().toISOString();
  const id = uuid();
  getDb()
    .prepare(
      "INSERT INTO notes (id, title, content, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(id, title, content, tags, now, now);
  return NextResponse.json({ id, title, content, tags, created_at: now, updated_at: now });
}

export async function PUT(request: Request) {
  if (!(await auth())) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const body = await request.json();
  const id = String(body.id || "");
  const title = String(body.title || "").trim();
  const content = String(body.content || "");
  const tags = String(body.tags || "").trim();
  if (!id || !title) {
    return NextResponse.json({ error: "参数无效" }, { status: 400 });
  }
  const now = new Date().toISOString();
  const result = getDb()
    .prepare("UPDATE notes SET title = ?, content = ?, tags = ?, updated_at = ? WHERE id = ?")
    .run(title, content, tags, now, id);
  if (result.changes === 0) {
    return NextResponse.json({ error: "笔记不存在" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await auth())) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "缺少 id" }, { status: 400 });
  }
  getDb().prepare("DELETE FROM notes WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
