"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={
        className ||
        "rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-200 transition-colors hover:bg-white/10"
      }
      aria-label={t.lang.switchTo}
      title={t.lang.switchTo}
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
