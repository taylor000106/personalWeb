import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  adminPasswordConfigError,
  isBcryptHash,
  normalizeAdminPassword,
} from "@/lib/admin-password";
import { getDb } from "@/lib/db";
import { findUserByEmail, type UserRole } from "@/lib/users";

const COOKIE_NAME = "yyw_session";
const MAX_AGE = 60 * 60 * 24 * 30;

export type SessionPayload = {
  email: string;
  role: UserRole;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET is missing or too short");
  }
  return new TextEncoder().encode(secret);
}

function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "demo";
}

/** Prefer SQLite users; fall back to legacy ADMIN_EMAIL / ADMIN_PASSWORD env. */
export async function verifyCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const dbUser = findUserByEmail(getDb(), normalizedEmail);

  if (dbUser) {
    if (!isBcryptHash(dbUser.password_hash)) {
      return { ok: false as const, error: "User password hash is invalid" };
    }
    const match = await bcrypt.compare(password, dbUser.password_hash);
    if (!match) {
      return { ok: false as const, error: "Invalid email or password" };
    }
    return { ok: true as const, role: dbUser.role };
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const rawAdminPassword = process.env.ADMIN_PASSWORD ?? "";
  const adminPassword = normalizeAdminPassword(rawAdminPassword);

  if (!adminEmail || !adminPassword) {
    return { ok: false as const, error: "Invalid email or password" };
  }
  if (!isBcryptHash(adminPassword)) {
    return {
      ok: false as const,
      error: adminPasswordConfigError(rawAdminPassword, adminPassword),
    };
  }
  if (normalizedEmail !== adminEmail) {
    return { ok: false as const, error: "Invalid email or password" };
  }
  const match = await bcrypt.compare(password, adminPassword);
  if (!match) {
    return { ok: false as const, error: "Invalid email or password" };
  }
  return { ok: true as const, role: "admin" as const };
}

export async function createSession(
  email: string,
  remember: boolean,
  role: UserRole = "admin",
) {
  const maxAge = remember ? MAX_AGE : 60 * 60 * 24;
  const token = await new SignJWT({
    email,
    role,
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
    const role = isUserRole(payload.role) ? payload.role : "admin";
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
