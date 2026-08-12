import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "yyw_session";
const MAX_AGE = 60 * 60 * 24 * 30;

export type SessionPayload = {
  email: string;
  role: "admin";
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET is missing or too short");
  }
  return new TextEncoder().encode(secret);
}

function isBcryptHash(value: string) {
  return /^\$2[aby]?\$\d{2}\$/.test(value);
}

/** Quotes + leftover `\$` from .env escaping (Next expands unescaped `$`). */
function normalizeAdminPassword(value: string) {
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\\$/g, "$");
}

export async function verifyCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = normalizeAdminPassword(process.env.ADMIN_PASSWORD ?? "");
  if (!adminEmail || !adminPassword) {
    return { ok: false as const, error: "Admin account is not configured" };
  }
  if (!isBcryptHash(adminPassword)) {
    return {
      ok: false as const,
      error:
        "ADMIN_PASSWORD must be a bcrypt hash. Escape $ as \\$ in .env.local, then restart.",
    };
  }
  if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
    return { ok: false as const, error: "Invalid email or password" };
  }
  const match = await bcrypt.compare(password, adminPassword);
  if (!match) {
    return { ok: false as const, error: "Invalid email or password" };
  }
  return { ok: true as const, role: "admin" as const };
}

export async function createSession(email: string, remember: boolean) {
  const maxAge = remember ? MAX_AGE : 60 * 60 * 24;
  const token = await new SignJWT({
    email,
    role: "admin" satisfies SessionPayload["role"],
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const email = payload.email;
    if (typeof email !== "string") return null;
    const role = "admin" as const;
    return { email, role };
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
