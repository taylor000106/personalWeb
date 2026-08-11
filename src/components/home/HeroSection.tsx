"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroPreview } from "@/components/home/HeroPreview";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/LanguageProvider";

const ParticleCanvas = dynamic(
  () => import("./ParticleCanvas").then((m) => m.ParticleCanvas),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <ParticleCanvas />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_55%)]" />

      <SiteHeader variant="hero" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pb-28 pt-14 md:pt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.15fr)] lg:gap-8 lg:pb-32">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65 }}
            className="font-display text-5xl font-bold tracking-tight md:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 text-lg text-zinc-200 md:text-xl"
          >
            {profile.roleZh}
          </motion.p>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-1 text-sm tracking-wide text-violet-300/90"
          >
            {profile.roleEn}
          </motion.p>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-6 max-w-xl text-base text-zinc-300 md:text-lg"
          >
            {isZh ? profile.taglineZh : profile.taglineEn}
          </motion.p>
          {isZh ? (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-2 max-w-xl text-sm text-zinc-500"
            >
              {profile.taglineEn}
            </motion.p>
          ) : null}

          <motion.ul
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {profile.signals.map((item) => (
              <li
                key={item.id}
                className="border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs tracking-wide text-zinc-300"
              >
                {isZh ? item.zh : item.en}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              className="rounded-full bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-500"
            >
              {t.hero.ctaProjects}
            </a>
            <Link
              href="/lab"
              className="rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-200 transition-colors hover:border-zinc-500"
            >
              {t.hero.ctaLab}
            </Link>
          </motion.div>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <HeroPreview />
        </div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-wide text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <span>{t.hero.scrollCue}</span>
        <span className="motion-safe:animate-bounce text-sm leading-none">↓</span>
      </motion.a>
    </section>
  );
}
