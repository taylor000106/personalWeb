"use client";

import Link from "next/link";
import { articles } from "@/content/articles";
import { useI18n } from "@/i18n/LanguageProvider";

export function ArticlesSection() {
  const { t, locale } = useI18n();

  return (
    <section id="articles" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-center font-display text-2xl font-semibold md:text-3xl">
        {t.articles.title}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
        {t.articles.subtitle}
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={article.href}
            className="border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-2">
              <ul className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-[10px] tracking-wide text-zinc-500 uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {article.status === "soon" ? (
                <span className="text-[10px] text-zinc-600">{t.articles.soon}</span>
              ) : null}
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-white">
              {locale === "zh" ? article.title : article.titleEn}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {locale === "zh" ? article.summary : article.summaryEn}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
