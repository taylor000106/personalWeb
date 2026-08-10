import { describe, expect, it } from "vitest";
import { invalidateKnowledgeCache } from "./knowledge";
import { invalidateRetrievalCache, retrieveDetailed } from "./retrieve";
import { cosineSimilarity, embedText, buildVocab } from "./embed-local";
import { buildLocalAnswer } from "./answer";

describe("local embedding", () => {
  it("ranks similar texts higher", () => {
    const vocab = buildVocab([
      "next.js app router portfolio",
      "炒股理财基金收益",
      "vue react sse streaming chat",
    ]);
    const q = embedText("为什么选择 next.js", vocab);
    const a = embedText("next.js app router portfolio", vocab);
    const b = embedText("炒股理财基金收益", vocab);
    expect(cosineSimilarity(q, a)).toBeGreaterThan(cosineSimilarity(q, b));
  });
});

describe("retrieveDetailed", () => {
  it("retrieves project-related chunks", () => {
    invalidateKnowledgeCache();
    invalidateRetrievalCache();
    const result = retrieveDetailed("ChatAI 流式对话项目", 3);
    expect(result.method).toBe("hybrid-local");
    expect(result.hits.length).toBeGreaterThan(0);
    expect(
      result.hits.some((h) =>
        /project|ai|chat/i.test(`${h.chunk.source}${h.chunk.text}`),
      ),
    ).toBe(true);
  });
});

describe("buildLocalAnswer boundaries", () => {
  it("answers in-scope project questions", () => {
    invalidateKnowledgeCache();
    invalidateRetrievalCache();
    const { text, meta } = buildLocalAnswer("介绍一下你的项目");
    expect(meta.inScope).toBe(true);
    expect(text).toMatch(/项目|ChatAI|SCRM|Next/i);
    expect(meta.sources.length).toBeGreaterThan(0);
    expect(text).not.toMatch(/参考知识库|\.md/);
  });

  it("rejects out-of-scope questions", () => {
    invalidateKnowledgeCache();
    invalidateRetrievalCache();
    const { text, meta } = buildLocalAnswer("今天上海天气怎么样适合出去玩吗");
    expect(meta.inScope).toBe(false);
    expect(text).toMatch(/超出|范围/);
  });
});
