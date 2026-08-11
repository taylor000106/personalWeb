"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";

const categories = [
  { id: "animation", href: "/lab?cat=animation" },
  { id: "performance", href: "/lab?cat=performance" },
  { id: "ai", href: "/lab?cat=ai" },
  { id: "browser", href: "/lab?cat=browser" },
] as const;

export function LabPreviewSection() {
  const { t } = useI18n();

  return (
    <section id="lab" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
      <div className="border border-white/10 bg-white/[0.03] px-6 py-10 md:px-10">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          {t.labPreview.title}
        </h2>
        <p className="mt-2 text-sm tracking-wide text-violet-300/80">
          {t.labPreview.titleEn}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {t.labPreview.subtitle}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="border border-white/10 px-4 py-5 transition-colors hover:border-violet-500/40 hover:bg-violet-500/5"
            >
              <p className="font-display text-sm font-medium text-white">
                {t.lab.categories[cat.id]}
              </p>
              <p className="mt-2 text-xs text-zinc-500">{t.lab.categoryDesc[cat.id]}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/lab"
          className="mt-8 inline-flex text-sm font-medium text-violet-300 hover:text-violet-200"
        >
          {t.labPreview.viewAll}
        </Link>
      </div>
    </section>
  );
}
