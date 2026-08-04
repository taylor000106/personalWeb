"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/content/projects";
import { useI18n } from "@/i18n/LanguageProvider";

export function ProjectsSectionClient({
  items,
}: {
  items: { project: ProjectItem; cover: string | null }[];
}) {
  const { t, locale } = useI18n();

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
      <p className="text-center text-xs tracking-[0.2em] text-violet-300/80 uppercase">
        Featured
      </p>
      <h2 className="mt-2 text-center font-display text-2xl font-semibold md:text-3xl">
        {t.projects.title}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
        {t.projects.subtitle}
      </p>

      <div className="mt-12 space-y-6">
        {items.map(({ project, cover }, index) => (
          <article
            key={project.id}
            className="overflow-hidden border border-white/10 bg-white/[0.03]"
          >
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${project.accent}, transparent)`,
              }}
              aria-hidden
            />
            <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_200px] md:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-xs text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs text-zinc-500">{project.period}</p>
                  {project.live ? (
                    <span className="border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] tracking-wide text-emerald-300 uppercase">
                      Live
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  {project.title}
                </h3>
                {project.titleEn ? (
                  <p className="mt-1 text-sm text-zinc-500">
                    {locale === "zh" ? project.titleEn : null}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {project.summary}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {project.links?.length ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.links.map((link) =>
                      link.href.startsWith("/") ? (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="text-sm font-medium text-violet-300 hover:text-violet-200"
                        >
                          {link.label} →
                        </Link>
                      ) : (
                        <a
                          key={link.href + link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-violet-300 hover:text-violet-200"
                        >
                          {link.label} →
                        </a>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div
                  className="relative aspect-[4/3] overflow-hidden border border-white/10 md:aspect-auto md:min-h-[140px]"
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
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <span className="text-[10px] tracking-wider text-white/45 uppercase">
                        {t.projects.screenshotTbd}
                      </span>
                    </div>
                  )}
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <li
                      key={tag}
                      className="border border-white/10 px-2 py-0.5 text-[11px] text-zinc-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
