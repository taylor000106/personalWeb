import { describe, expect, it } from "vitest";
import { normalizeAdminPassword } from "@/lib/admin-password";

describe("normalizeAdminPassword", () => {
  const hash = "$2a$12$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUV";

  it("passes through raw bcrypt hash", () => {
    expect(normalizeAdminPassword(hash)).toBe(hash);
  });

  it("unescapes Next.js \\$ sequences", () => {
    const escaped = hash.replaceAll("$", "\\$");
    expect(normalizeAdminPassword(escaped)).toBe(hash);
  });

  it("collapses Docker Compose $$ sequences", () => {
    const escaped = hash.replaceAll("$", "$$");
    expect(normalizeAdminPassword(escaped)).toBe(hash);
  });

  it("decodes b64: prefix", () => {
    const b64 = Buffer.from(hash, "utf8").toString("base64");
    expect(normalizeAdminPassword(`b64:${b64}`)).toBe(hash);
  });

  it("strips wrapping quotes", () => {
    expect(normalizeAdminPassword(`"${hash}"`)).toBe(hash);
  });
});
