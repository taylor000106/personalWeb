"use client";

import { AssistantChat } from "@/components/ai/AssistantChat";
import { LabShell } from "@/components/lab/LabShell";
import { useI18n } from "@/i18n/LanguageProvider";

export default function AssistantPage() {
  const { t } = useI18n();

  return (
    <LabShell>
      <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-medium text-violet-300">{t.assistant.eyebrow}</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {t.assistant.title}
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-400">{t.assistant.subtitle}</p>
        </div>
        <AssistantChat />
      </main>
    </LabShell>
  );
}
