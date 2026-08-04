import { describe, expect, it } from "vitest";
import { loginSchema } from "./auth";

describe("loginSchema", () => {
  it("accepts email/username + password", () => {
    const result = loginSchema.parse({
      email: "yywtaylor.cyou",
      password: "secret",
    });
    expect(result.email).toBe("yywtaylor.cyou");
    expect(result.remember).toBe(false);
  });

  it("trims email and defaults remember", () => {
    const result = loginSchema.parse({
      email: "  admin@example.com  ",
      password: "x",
      remember: true,
    });
    expect(result.email).toBe("admin@example.com");
    expect(result.remember).toBe(true);
  });

  it("rejects empty password", () => {
    expect(() => loginSchema.parse({ email: "a@b.c", password: "" })).toThrow();
  });
});
