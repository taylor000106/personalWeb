import { getSession } from "@/lib/auth";
import { getDb, type LinkItem } from "@/lib/db";
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
  const links = getDb()
    .prepare("SELECT * FROM links ORDER BY created_at DESC")
    .all() as LinkItem[];
  return NextResponse.json(links);
}

export async function POST(request: Request) {
  if (!(await auth())) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const body = await request.json();
  const title = String(body.title || "").trim();
  const url = String(body.url || "").trim();
  const description = String(body.description || "").trim();
  if (!title || !url) {
    return NextResponse.json({ error: "标题和链接必填" }, { status: 400 });
  }
  const now = new Date().toISOString();
  const id = uuid();
  getDb()
    .prepare("INSERT INTO links (id, title, url, description, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(id, title, url, description, now);
  return NextResponse.json({ id, title, url, description, created_at: now });
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
  getDb().prepare("DELETE FROM links WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
