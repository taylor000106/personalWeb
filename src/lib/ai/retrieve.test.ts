import { describe, expect, it } from "vitest";
import { buildContext, retrieveChunks } from "./retrieve";
import { invalidateKnowledgeCache } from "./knowledge";

describe("retrieveChunks", () => {
  it("returns relevant chunks for project queries", () => {
    invalidateKnowledgeCache();
    const chunks = retrieveChunks("LinkWeChat 项目介绍", 3);
    expect(chunks.length).toBeGreaterThan(0);
    expect(
      chunks.some((c) =>
        /project|linkwechat|项目/i.test(`${c.source}${c.title}${c.text}`),
      ),
    ).toBe(true);
  });

  it("buildContext formats numbered sources", () => {
    const context = buildContext([
      {
        id: "1",
        source: "about.md",
        title: "About",
        text: "Hello",
        tags: [],
        aliases: [],
      },
    ]);
    expect(context).toContain("[#1 about.md / About]");
    expect(context).toContain("Hello");
  });
});
