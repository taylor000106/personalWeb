import { describe, expect, it } from "vitest";
import { noteCreateSchema, noteUpdateSchema } from "./notes";

describe("note schemas", () => {
  it("creates with defaults", () => {
    const result = noteCreateSchema.parse({ title: "Idea" });
    expect(result.content).toBe("");
    expect(result.tags).toBe("");
  });

  it("updates require uuid id", () => {
    expect(() =>
      noteUpdateSchema.parse({
        id: "bad",
        title: "x",
      }),
    ).toThrow();
  });
});
