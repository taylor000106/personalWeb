import { createSession, verifyCredentials } from "@/lib/auth";
import { clientIp, parseJsonBody } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit({
      key: `login:${ip}`,
      limit: 8,
      windowMs: 15 * 60 * 1000,
    });
    if (!limited.ok) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Try again later.",
          retryAfterSec: limited.retryAfterSec,
        },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const parsed = await parseJsonBody(request, loginSchema);
    if (!parsed.ok) return parsed.response;

    const result = await verifyCredentials(parsed.data.email, parsed.data.password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    await createSession(parsed.data.email, Boolean(parsed.data.remember), result.role);
    return NextResponse.json({ ok: true, role: result.role });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
