import { parseJsonBody, requireApiAdmin, requireApiSession } from "@/lib/api";
import { getProfile, logActivity, updateProfile } from "@/lib/repositories";
import { PROFILE_KEYS, profileUpdateSchema } from "@/lib/validations/profile";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireApiSession();
  if (!auth.ok) return auth.response;
  return NextResponse.json(getProfile());
}

export async function PUT(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  const parsed = await parseJsonBody(request, profileUpdateSchema);
  if (!parsed.ok) return parsed.response;

  const fields: Record<string, string> = {};
  for (const key of PROFILE_KEYS) {
    if (key in parsed.data && parsed.data[key] !== undefined) {
      fields[key] = parsed.data[key] ?? "";
    }
  }

  updateProfile(fields);
  logActivity({
    action: "update",
    entity: "profile",
    detail: Object.keys(fields).join(", "),
  });
  return NextResponse.json({ ok: true });
}
