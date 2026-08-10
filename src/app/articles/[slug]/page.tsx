import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/articles/ArticleView";
import { LabShell } from "@/components/lab/LabShell";
import { getAllArticleIds, getArticle } from "@/content/articles";
import { loadArticlePage } from "@/lib/articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticleIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article" };
  return {
    title: `${article.title} · Articles`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const page = loadArticlePage(slug);
  if (!page) notFound();

  return (
    <LabShell>
      <ArticleView meta={page.meta} markdown={page.markdown} backLabel="返回文章" />
    </LabShell>
  );
}
