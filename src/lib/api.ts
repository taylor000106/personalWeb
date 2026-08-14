import { NextResponse } from "next/server";
import type { z, ZodTypeAny } from "zod";
import { getSession } from "@/lib/auth";
import type { UserRole } from "@/lib/users";

export type SessionUser = {
  email: string;
  role: UserRole;
};

export async function requireApiSession(): Promise<
  { ok: true; session: SessionUser } | { ok: false; response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return {
    ok: true,
    session: { email: session.email, role: session.role },
  };
}

export async function requireApiAdmin(): Promise<
  { ok: true; session: SessionUser } | { ok: false; response: NextResponse }
> {
  const auth = await requireApiSession();
  if (!auth.ok) return auth;
  if (auth.session.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Demo account is read-only" },
        { status: 403 },
      ),
    };
  }
  return auth;
}

export async function parseJsonBody<S extends ZodTypeAny>(
  request: Request,
  schema: S,
): Promise<{ ok: true; data: z.output<S> } | { ok: false; response: NextResponse }> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
    };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      ),
    };
  }
  return { ok: true, data: parsed.data };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
