import { describe, expect, it } from "vitest";
import { linkCreateSchema, linkIdQuerySchema } from "./links";

describe("linkCreateSchema", () => {
  it("accepts https urls", () => {
    const result = linkCreateSchema.parse({
      title: "GitHub",
      url: "https://github.com/example",
    });
    expect(result.description).toBe("");
  });

  it("rejects non-http urls", () => {
    expect(() =>
      linkCreateSchema.parse({
        title: "Bad",
        url: "ftp://example.com/file",
      }),
    ).toThrow();
  });
});

describe("linkIdQuerySchema", () => {
  it("requires uuid", () => {
    expect(() => linkIdQuerySchema.parse({ id: "not-a-uuid" })).toThrow();
    expect(
      linkIdQuerySchema.parse({ id: "550e8400-e29b-41d4-a716-446655440000" }).id,
    ).toBe("550e8400-e29b-41d4-a716-446655440000");
  });
});
