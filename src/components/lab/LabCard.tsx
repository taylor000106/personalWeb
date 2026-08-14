"use client";

import Image from "next/image";
import Link from "next/link";
import { getLabOrigin, type LabEffect } from "@/data/lab-effects";
import { useI18n } from "@/i18n/LanguageProvider";

export function LabCard({ effect }: { effect: LabEffect }) {
  const { t } = useI18n();
  const interactive = effect.interactive === true;
  const href = `/lab/${effect.slug}`;
  const categoryLabel = t.lab.categories[effect.category];
  const origin = getLabOrigin(effect);
  const originLabel = origin === "inspired" ? t.lab.originInspired : t.lab.originOriginal;
  const useCover = Boolean(effect.externalSite && effect.previewImage);

  return (
    <article className="group">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 group-hover:border-violet-500/40 group-hover:shadow-violet-900/20"
        style={{ backgroundColor: effect.previewBg }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {useCover ? (
            <Image
              src={effect.previewImage!}
              alt={effect.title}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <iframe
              src={effect.demoPath}
              title={effect.title}
              className={`absolute top-[58%] left-1/2 h-[520px] w-[720px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.42] border-0 ${
                interactive ? "pointer-events-auto" : "pointer-events-none"
              }`}
              loading="lazy"
              tabIndex={interactive ? 0 : -1}
            />
          )}
          <p className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/55 px-2 py-0.5 text-[10px] tracking-wide text-white/90 uppercase backdrop-blur-sm">
            {categoryLabel}
            {interactive ? ` · ${t.lab.interactive}` : ""}
          </p>
          <p className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-white/75 backdrop-blur-sm">
            {originLabel}
          </p>
          <Link
            href={href}
            className="absolute right-3 bottom-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm transition-opacity hover:bg-black/70"
          >
            {t.lab.detail}
          </Link>
        </div>
      </div>
      <Link href={href} className="mt-3 block px-1">
        <h2 className="text-center text-base font-semibold text-white transition-colors group-hover:text-violet-200">
          {effect.title}
        </h2>
        <p className="mt-1 text-center text-xs text-zinc-500">{effect.subtitle}</p>
      </Link>
    </article>
  );
}
