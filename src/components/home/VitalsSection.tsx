"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { vitalMetrics, vitalsPractices } from "@/content/vitals";
import {
  formatVital,
  readStoredVitals,
} from "@/components/performance/WebVitalsReporter";
import { useI18n } from "@/i18n/LanguageProvider";

type Stored = Record<string, { value: number; rating: string; at: number }>;

export function VitalsSection() {
  const { t } = useI18n();
  const [live, setLive] = useState<Stored>({});

  useEffect(() => {
    setLive(readStoredVitals());
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<Stored>).detail;
      if (detail) setLive({ ...detail });
      else setLive(readStoredVitals());
    };
    window.addEventListener("pw:vitals", onUpdate);
    return () => window.removeEventListener("pw:vitals", onUpdate);
  }, []);

  return (
    <section id="vitals" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
      <p className="text-center text-xs tracking-[0.2em] text-violet-300/80 uppercase">
        Performance
      </p>
      <h2 className="mt-2 text-center font-display text-2xl font-semibold md:text-3xl">
        {t.vitals.title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-500">
        {t.vitals.subtitle}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vitalMetrics.map((metric) => {
          const measured = metric.metricKey ? live[metric.metricKey] : undefined;
          return (
            <div
              key={metric.id}
              className="border border-white/10 bg-white/[0.03] px-4 py-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-sm text-zinc-400">{metric.label}</p>
                <span className="text-[10px] tracking-wide text-zinc-600 uppercase">
                  {measured ? t.vitals.live : t.vitals.target}
                </span>
              </div>
              <p className="mt-3 font-display text-2xl font-semibold text-white">
                {measured ? formatVital(metric.metricKey!, measured.value) : metric.value}
              </p>
              {measured ? (
                <p className="mt-1 text-xs text-zinc-500">
                  {t.vitals.target}: {metric.value} · {measured.rating}
                </p>
              ) : (
                <p className="mt-1 text-xs text-zinc-600">{t.vitals.waiting}</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">{metric.hint}</p>
            </div>
          );
        })}
      </div>

      <ul className="mt-8 space-y-2 text-sm text-zinc-500">
        {vitalsPractices.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-violet-400">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-zinc-600">
        {t.vitals.labHint}{" "}
        <Link
          href="/lab?cat=performance"
          className="text-violet-300 hover:text-violet-200"
        >
          /lab?cat=performance
        </Link>
      </p>
    </section>
  );
}
