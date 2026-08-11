"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/content/projects";
import { getProjectTitles } from "@/content/projects";
import { useI18n } from "@/i18n/LanguageProvider";

export function ArchiveSectionClient({
  items,
}: {
  items: { project: ProjectItem; cover: string | null }[];
}) {
  const { t, locale } = useI18n();

  return (
    <section id="archive" className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-4">
      <p className="text-center text-xs tracking-[0.2em] text-zinc-500 uppercase">
        {t.archive.eyebrow}
      </p>
      <h2 className="mt-2 text-center font-display text-xl font-semibold text-zinc-200 md:text-2xl">
        {t.archive.title}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
        {t.archive.subtitle}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map(({ project, cover }) => {
          const names = getProjectTitles(project, locale);
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20"
            >
              <div
                className="relative aspect-[16/10] overflow-hidden border-b border-white/10"
                style={
                  cover
                    ? undefined
                    : {
                        background: `linear-gradient(145deg, ${project.accent}55, #05050c 70%)`,
                      }
                }
              >
                {cover ? (
                  <Image
                    src={cover}
                    alt={names.primary}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-white">
                  {names.primary}
                </h3>
                {names.secondary ? (
                  <p className="mt-1 text-[11px] text-zinc-600">{names.secondary}</p>
                ) : null}
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                  {project.summary}
                </p>
                <p className="mt-3 text-xs text-violet-300/90">
                  {t.projects.viewDetail} →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
