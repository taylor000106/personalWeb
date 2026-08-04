"use client";

import { Suspense } from "react";
import { LabGallery } from "@/components/lab/LabGallery";
import { LabShell } from "@/components/lab/LabShell";
import { useI18n } from "@/i18n/LanguageProvider";

export default function LabIndexPage() {
  const { t } = useI18n();

  return (
    <LabShell backHref="/" backLabel={t.nav.home}>
      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-violet-300">{t.lab.eyebrow}</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {t.lab.title}
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-400">{t.lab.subtitle}</p>
        </div>
        <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
          <LabGallery />
        </Suspense>
      </main>
    </LabShell>
  );
}
