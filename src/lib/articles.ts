import fs from "fs";
import path from "path";
import { getArticle, type ArticleItem } from "@/content/articles";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export function loadArticleMarkdown(id: string): string | null {
  const meta = getArticle(id);
  if (!meta || meta.status !== "live") return null;
  const filePath = path.join(ARTICLES_DIR, meta.file);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

export function loadArticlePage(id: string): {
  meta: ArticleItem;
  markdown: string;
} | null {
  const meta = getArticle(id);
  if (!meta || meta.status !== "live") return null;
  const markdown = loadArticleMarkdown(id);
  if (!markdown) return null;
  return { meta, markdown };
}
