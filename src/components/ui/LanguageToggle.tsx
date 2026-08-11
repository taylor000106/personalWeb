"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/config";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  const item = (code: Locale, label: string) => {
    const active = locale === code;
    return (
      <button
        type="button"
        onClick={() => setLocale(code)}
        className={
          active
            ? "rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
            : "rounded-full px-2.5 py-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300"
        }
        aria-pressed={active}
        aria-label={label}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={
        className || "inline-flex items-center rounded-full border border-white/15 p-0.5"
      }
      role="group"
      aria-label={t.lang.switchTo}
    >
      {item("zh", t.lang.zh)}
      {item("en", t.lang.en)}
    </div>
  );
}
