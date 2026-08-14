/**
 * Normalize ADMIN_PASSWORD from env.
 * bcrypt hashes contain `$`, which Next.js / Docker Compose often expand away.
 *
 * Supported forms:
 * - `b64:<base64(hash)>`  — recommended for Docker / VPS
 * - hash with `\$`        — Next.js .env.local escaping
 * - hash with `$$`        — Docker Compose escaping
 * - raw `$2a$12$...`      — if the runtime left `$` intact
 */
export function normalizeAdminPassword(value: string) {
  let normalized = value.trim().replace(/^["']|["']$/g, "");

  if (normalized.startsWith("b64:")) {
    try {
      normalized = Buffer.from(normalized.slice(4), "base64").toString("utf8").trim();
    } catch {
      return "";
    }
  }

  return normalized.replace(/\\\$/g, "$").replace(/\$\$/g, "$");
}

export function isBcryptHash(value: string) {
  return /^\$2[aby]?\$\d{2}\$/.test(value);
}

export function adminPasswordConfigError(raw: string, normalized: string) {
  if (!raw.trim()) {
    return "ADMIN_PASSWORD is empty. Set a bcrypt hash (npm run hash-password), then restart.";
  }
  if (!normalized.includes("$") && !raw.startsWith("b64:")) {
    return "ADMIN_PASSWORD looks like plaintext. Run: npm run hash-password -- your-password";
  }
  if (/^2[aby]\$\d{2}\$/.test(normalized) || normalized.startsWith("2a$")) {
    return "ADMIN_PASSWORD lost leading $. On VPS/Docker use b64:... or escape $ as $$ in .env";
  }
  return "ADMIN_PASSWORD must be a bcrypt hash. Prefer ADMIN_PASSWORD=b64:... (see npm run hash-password).";
}
