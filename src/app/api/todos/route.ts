import { parseJsonBody, requireApiAdmin, requireApiSession } from "@/lib/api";
import {
  createTodo,
  deleteTodo,
  listTodos,
  logActivity,
  setTodoDone,
} from "@/lib/repositories";
import {
  todoCreateSchema,
  todoIdQuerySchema,
  todoUpdateSchema,
} from "@/lib/validations/todos";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireApiSession();
  if (!auth.ok) return auth.response;
  return NextResponse.json(listTodos());
}

export async function POST(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody(request, todoCreateSchema);
  if (!parsed.ok) return parsed.response;

  const todo = createTodo({
    title: parsed.data.title,
    createdBy: auth.session.email,
  });
  logActivity({
    action: "create",
    entity: "todo",
    entityId: todo.id,
    detail: todo.title,
  });
  return NextResponse.json(todo);
}

export async function PUT(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody(request, todoUpdateSchema);
  if (!parsed.ok) return parsed.response;

  const ok = setTodoDone(parsed.data.id, parsed.data.done);
  if (!ok) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  logActivity({
    action: "update",
    entity: "todo",
    entityId: parsed.data.id,
    detail: parsed.data.done ? "done" : "reopen",
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const parsed = todoIdQuerySchema.safeParse({ id: searchParams.get("id") });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const ok = deleteTodo(parsed.data.id);
  if (!ok) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  logActivity({
    action: "delete",
    entity: "todo",
    entityId: parsed.data.id,
  });
  return NextResponse.json({ ok: true });
}
