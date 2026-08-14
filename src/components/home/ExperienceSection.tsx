"use client";

import { experienceOverview, timeline } from "@/content/timeline";
import { useI18n } from "@/i18n/LanguageProvider";
import { localizePeriod } from "@/i18n/localizePeriod";

export function ExperienceSection() {
  const { t, locale } = useI18n();

  return (
    <section id="experience" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
      <h2 className="mt-2 text-center font-display text-2xl font-semibold md:text-3xl">
        {t.experience.title}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
        {t.experience.subtitle}
      </p>

      <div className="mt-8 text-center">
        <p className="font-display text-sm text-violet-300/90">
          {localizePeriod(experienceOverview.period, locale)}
        </p>
        <p className="mt-1 text-zinc-300">
          {locale === "zh" ? "前端工程师" : experienceOverview.role}
        </p>
      </div>

      <ol className="mt-12 space-y-0 border-l border-white/10 pl-6 md:pl-8">
        {timeline.map((node) => (
          <li key={node.id} className="relative pb-10 last:pb-0">
            <span className="absolute top-1.5 -left-[1.91rem] h-2.5 w-2.5 rounded-full bg-violet-500 ring-4 ring-[#05050c] md:-left-[2.41rem]" />
            <p className="font-display text-sm text-zinc-500">
              {locale === "zh" ? (node.yearZh ?? node.year) : node.year}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              {locale === "zh" ? node.titleZh : node.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {node.keywords.map((kw) => (
                <li
                  key={kw}
                  className="border border-white/10 px-2 py-0.5 text-[11px] text-zinc-400"
                >
                  {kw}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">{node.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
