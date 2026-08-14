import { parseJsonBody, requireApiAdmin, requireApiSession } from "@/lib/api";
import { createLink, deleteLink, listLinks, logActivity } from "@/lib/repositories";
import { linkCreateSchema, linkIdQuerySchema } from "@/lib/validations/links";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireApiSession();
  if (!auth.ok) return auth.response;
  return NextResponse.json(listLinks());
}

export async function POST(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody(request, linkCreateSchema);
  if (!parsed.ok) return parsed.response;

  const link = createLink({
    title: parsed.data.title,
    url: parsed.data.url,
    description: parsed.data.description ?? "",
  });
  logActivity({
    action: "create",
    entity: "link",
    entityId: link.id,
    detail: link.title,
  });
  return NextResponse.json(link);
}

export async function DELETE(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const parsed = linkIdQuerySchema.safeParse({ id: searchParams.get("id") });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const ok = deleteLink(parsed.data.id);
  if (!ok) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }
  logActivity({
    action: "delete",
    entity: "link",
    entityId: parsed.data.id,
  });
  return NextResponse.json({ ok: true });
}
