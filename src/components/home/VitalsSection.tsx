"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lighthouseSnapshot, vitalMetrics, vitalsPractices } from "@/content/vitals";
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

  const pageLabel: Record<string, string> = {
    "/": t.vitals.pageHome,
    "/assistant": t.vitals.pageAssistant,
    "/lab": t.vitals.pageLab,
  };

  const metaLine = t.vitals.lighthouseMeta
    .replace("{origin}", lighthouseSnapshot.origin)
    .replace("{tool}", lighthouseSnapshot.tool)
    .replace("{date}", lighthouseSnapshot.testedAt);

  return (
    <section id="vitals" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
      <p className="text-center text-xs tracking-[0.2em] text-violet-300/80 uppercase">
        {t.vitals.eyebrow}
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
          const name = t.vitals.metricName[metric.id as keyof typeof t.vitals.metricName];
          return (
            <div
              key={metric.id}
              className="border border-white/10 bg-white/[0.03] px-4 py-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm text-zinc-200">{metric.label}</p>
                  {name ? (
                    <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
                      {name}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 text-[10px] tracking-wide text-zinc-600 uppercase">
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

      <div className="mt-10 border border-white/10 bg-white/[0.03] p-5">
        <p className="text-[11px] tracking-[0.16em] text-violet-300/80 uppercase">
          {t.vitals.lighthouseEyebrow}
        </p>
        <p className="mt-2 text-sm text-zinc-400">{t.vitals.lighthouseNote}</p>
        <p className="mt-2 text-xs text-zinc-600">{metaLine}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-zinc-500">
                <th className="py-2 pr-3 font-medium">{t.vitals.colPage}</th>
                <th className="py-2 pr-3 font-medium">{t.vitals.colPerf}</th>
                <th className="py-2 pr-3 font-medium">{t.vitals.colA11y}</th>
                <th className="py-2 pr-3 font-medium">{t.vitals.colBp}</th>
                <th className="py-2 font-medium">{t.vitals.colSeo}</th>
              </tr>
            </thead>
            <tbody>
              {lighthouseSnapshot.pages.map((page) => (
                <tr key={page.path} className="border-b border-white/5 text-zinc-300">
                  <td className="py-2.5 pr-3">
                    <span className="text-zinc-200">
                      {pageLabel[page.path] || page.label}
                    </span>
                    <span className="ml-2 text-xs text-zinc-600">{page.path}</span>
                  </td>
                  <td className="py-2.5 pr-3 font-display">{page.performance}</td>
                  <td className="py-2.5 pr-3 font-display">{page.accessibility}</td>
                  <td className="py-2.5 pr-3 font-display">{page.bestPractices}</td>
                  <td className="py-2.5 font-display">{page.seo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-zinc-600">{t.vitals.lighthouseLabNote}</p>
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
