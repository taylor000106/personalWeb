import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_KEYS = ["display_name", "bio", "location", "github", "email_public"];

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const rows = getDb().prepare("SELECT key, value FROM profile").all() as {
    key: string;
    value: string;
  }[];
  const profile: Record<string, string> = {};
  for (const row of rows) {
    profile[row.key] = row.value;
  }
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const body = await request.json();
  const upsert = getDb().prepare(
    "INSERT INTO profile (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
  );
  for (const key of ALLOWED_KEYS) {
    if (key in body) {
      upsert.run(key, String(body[key] ?? ""));
    }
  }
  return NextResponse.json({ ok: true });
}
