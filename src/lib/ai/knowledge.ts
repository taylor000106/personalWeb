import fs from "fs";
import path from "path";
import { getDocMeta, type KnowledgeDocMeta } from "@/content/knowledge/manifest";

export type KnowledgeChunk = {
  id: string;
  source: string;
  title: string;
  text: string;
  topic?: KnowledgeDocMeta["topic"];
  tags: string[];
  aliases: string[];
};

let cache: KnowledgeChunk[] | null = null;

function splitChunks(source: string, markdown: string): KnowledgeChunk[] {
  const meta = getDocMeta(source);
  const parts = markdown
    .split(/\n(?=#{1,3}\s)/)
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.map((part, index) => {
    const titleMatch = part.match(/^#{1,3}\s+(.+)$/m);
    const title = titleMatch?.[1]?.trim() || meta?.title || source;
    return {
      id: `${source}#${index}`,
      source,
      title,
      text: part,
      topic: meta?.topic,
      tags: meta?.tags ?? [],
      aliases: meta?.aliases ?? [],
    };
  });
}

export function loadKnowledgeChunks(): KnowledgeChunk[] {
  if (cache) return cache;
  const dir = path.join(process.cwd(), "src", "content", "knowledge");
  if (!fs.existsSync(dir)) {
    cache = [];
    return cache;
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
  const chunks: KnowledgeChunk[] = [];
  for (const file of files) {
    const markdown = fs.readFileSync(path.join(dir, file), "utf8");
    chunks.push(...splitChunks(file, markdown));
  }
  cache = chunks;
  return chunks;
}

export function invalidateKnowledgeCache() {
  cache = null;
}
