import { v4 as uuid } from "uuid";
import type Database from "better-sqlite3";
import { DEMO_ACCOUNT } from "@/lib/demo-account";

export type UserRole = "admin" | "demo";

export type DbUser = {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
};

export { DEMO_ACCOUNT };

/**
 * Seeded accounts. Password hashes only (no plaintext for private accounts).
 * Demo password is intentionally public: see DEMO_ACCOUNT.
 */
const SEED_USERS: Array<{
  email: string;
  passwordHash: string;
  role: UserRole;
}> = [
  {
    email: "taylor000106@gmail.com",
    passwordHash: "$2b$12$Ysxwg26HIGlOvqNYf61Eb.B1iiUyCtE50.N0B/JMGsMzhi5MPclo.",
    role: "admin",
  },
  {
    email: "yyw211202@gmail.com",
    passwordHash: "$2b$12$Ysxwg26HIGlOvqNYf61Eb.B1iiUyCtE50.N0B/JMGsMzhi5MPclo.",
    role: "admin",
  },
  {
    email: DEMO_ACCOUNT.email,
    passwordHash: "$2b$12$zp1w5cUznYvKWw9W/ARGNOZ8WqjqBuQv/OjQsPuU1rdGdcYPOmNI2",
    role: "demo",
  },
];

export function ensureUsersTable(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'demo')),
      created_at TEXT NOT NULL
    );
  `);
}

/** Upsert seed users so deploys refresh known accounts. */
export function seedUsers(database: Database.Database) {
  const now = new Date().toISOString();
  const upsert = database.prepare(`
    INSERT INTO users (id, email, password_hash, role, created_at)
    VALUES (@id, @email, @password_hash, @role, @created_at)
    ON CONFLICT(email) DO UPDATE SET
      password_hash = excluded.password_hash,
      role = excluded.role
  `);

  const find = database.prepare(`SELECT id FROM users WHERE email = ? COLLATE NOCASE`);

  for (const user of SEED_USERS) {
    const existing = find.get(user.email) as { id: string } | undefined;
    upsert.run({
      id: existing?.id ?? uuid(),
      email: user.email.toLowerCase(),
      password_hash: user.passwordHash,
      role: user.role,
      created_at: now,
    });
  }
}

export function findUserByEmail(
  database: Database.Database,
  email: string,
): DbUser | null {
  const row = database
    .prepare(`SELECT * FROM users WHERE email = ? COLLATE NOCASE`)
    .get(email.trim()) as DbUser | undefined;
  return row ?? null;
}
