import { parseJsonBody, requireApiAdmin, requireApiSession } from "@/lib/api";
import {
  createNote,
  deleteNote,
  listNotes,
  logActivity,
  updateNote,
} from "@/lib/repositories";
import {
  idQuerySchema,
  noteCreateSchema,
  noteUpdateSchema,
} from "@/lib/validations/notes";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireApiSession();
  if (!auth.ok) return auth.response;
  return NextResponse.json(listNotes());
}

export async function POST(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody(request, noteCreateSchema);
  if (!parsed.ok) return parsed.response;

  const note = createNote(parsed.data);
  logActivity({
    action: "create",
    entity: "note",
    entityId: note.id,
    detail: note.title,
  });
  return NextResponse.json(note);
}

export async function PUT(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody(request, noteUpdateSchema);
  if (!parsed.ok) return parsed.response;

  const ok = updateNote(parsed.data);
  if (!ok) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  logActivity({
    action: "update",
    entity: "note",
    entityId: parsed.data.id,
    detail: parsed.data.title,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const parsed = idQuerySchema.safeParse({ id: searchParams.get("id") });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const ok = deleteNote(parsed.data.id);
  if (!ok) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  logActivity({
    action: "delete",
    entity: "note",
    entityId: parsed.data.id,
  });
  return NextResponse.json({ ok: true });
}
