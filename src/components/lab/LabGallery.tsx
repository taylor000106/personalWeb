"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LabCard } from "@/components/lab/LabCard";
import { labCategories, labEffects, type LabCategory } from "@/data/lab-effects";
import { useI18n } from "@/i18n/LanguageProvider";

function parseCat(raw: string | null): LabCategory | "all" {
  if (raw === "animation" || raw === "performance" || raw === "ai" || raw === "browser") {
    return raw;
  }
  return "all";
}

export function LabGallery() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<LabCategory | "all">(() =>
    parseCat(searchParams.get("cat")),
  );

  useEffect(() => {
    setCategory(parseCat(searchParams.get("cat")));
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (category === "all") return labEffects;
    return labEffects.filter((e) => e.category === category);
  }, [category]);

  function selectCategory(next: LabCategory | "all") {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("cat");
    else params.set("cat", next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {labCategories.map((item) => {
          const active = category === item.id;
          const label = t.lab.categories[item.id];
          const desc = t.lab.categoryDesc[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCategory(item.id)}
              title={desc}
              className={
                active
                  ? "rounded-full bg-violet-600 px-4 py-1.5 text-sm font-medium text-white"
                  : "rounded-full border border-white/15 px-4 py-1.5 text-sm text-zinc-400 hover:border-white/30 hover:text-white"
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((effect) => (
          <LabCard key={effect.slug} effect={effect} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-zinc-500">{t.lab.empty}</p>
      ) : null}
    </div>
  );
}
