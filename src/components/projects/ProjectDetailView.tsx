"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectItem, ProjectMedia } from "@/content/projects";
import { useI18n } from "@/i18n/LanguageProvider";
import {
  hasArchitectureDiagram,
  ProjectArchitectureDiagram,
} from "@/components/projects/ArchitectureDiagrams";

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24 border-t border-white/10 pt-10">
      {eyebrow ? (
        <p className="text-[11px] tracking-[0.18em] text-violet-300/80 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-display text-xl font-semibold text-white">{title}</h2>
      <div className="mt-5 text-sm leading-relaxed text-zinc-400">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function EngBlock({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="border border-white/10 bg-white/[0.02] p-4">
      <h3 className="text-xs font-medium tracking-wide text-zinc-300 uppercase">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-zinc-400">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MediaFrame({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#0a0a12]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function ProjectDetailView({
  project,
  cover,
  gallery,
}: {
  project: ProjectItem;
  cover: string | null;
  gallery: ProjectMedia[];
}) {
  const { t, locale } = useI18n();
  const eng = project.engineering;
  const showArchitecture = hasArchitectureDiagram(project.id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        href="/#projects"
        className="text-sm text-zinc-500 transition-colors hover:text-white"
      >
        ← {t.projects.back}
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs text-zinc-500">{project.period}</p>
          {project.live ? (
            <span className="border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] tracking-wide text-emerald-300 uppercase">
              Live
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        {project.titleEn && locale === "zh" ? (
          <p className="mt-2 text-sm text-zinc-500">{project.titleEn}</p>
        ) : null}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
          {project.summary}
        </p>

        {project.links?.length ? (
          <div className="mt-6 flex flex-wrap gap-4">
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
      </header>

      {cover ? (
        <div className="mt-10">
          <MediaFrame
            src={cover}
            alt={`${project.title} hero`}
            caption={t.projects.heroCaption}
            priority
          />
        </div>
      ) : null}

      {(gallery.length > 0 || showArchitecture) && (
        <div className="mt-10 space-y-6">
          {gallery.length > 0 ? (
            <section>
              <p className="text-[11px] tracking-[0.18em] text-violet-300/80 uppercase">
                {t.projects.screenshots}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {gallery.map((item) => (
                  <MediaFrame
                    key={item.src + (item.caption || "")}
                    src={item.src}
                    alt={item.caption || project.title}
                    caption={item.caption}
                  />
                ))}
              </div>
            </section>
          ) : null}
          {showArchitecture ? (
            <section>
              <p className="text-[11px] tracking-[0.18em] text-violet-300/80 uppercase">
                {t.projects.architectureDiagram}
              </p>
              <ProjectArchitectureDiagram projectId={project.id} />
            </section>
          ) : null}
        </div>
      )}

      <div className="mt-12 space-y-2">
        <Section eyebrow="01" title={t.projects.background}>
          <p>{project.background}</p>
        </Section>

        <Section eyebrow="02" title={t.projects.stack}>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tag) => (
              <li
                key={tag}
                className="border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs tracking-[0.14em] text-zinc-500 uppercase">
            {t.projects.architecture}
          </p>
          <div className="mt-3">
            <BulletList items={project.architecture} />
          </div>
        </Section>

        <Section eyebrow="03" title={t.projects.challenge}>
          <BulletList items={project.challenge} />
        </Section>

        <Section eyebrow="04" title={t.projects.contribution}>
          <BulletList items={project.contribution} />
        </Section>

        <Section eyebrow="05" title={t.projects.engineering}>
          <div className="grid gap-3 sm:grid-cols-2">
            <EngBlock title={t.projects.engPerformance} items={eng.performance} />
            <EngBlock title={t.projects.engTesting} items={eng.testing} />
            <EngBlock title={t.projects.engDeployment} items={eng.deployment} />
            <EngBlock title={t.projects.engSecurity} items={eng.security} />
          </div>
        </Section>
      </div>
    </main>
  );
}
