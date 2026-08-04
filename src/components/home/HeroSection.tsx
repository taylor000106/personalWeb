"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/LanguageProvider";

const ParticleCanvas = dynamic(
  () => import("./ParticleCanvas").then((m) => m.ParticleCanvas),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <ParticleCanvas />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_55%)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-violet-300">
          {profile.name}
        </span>
        <nav className="flex items-center gap-3 text-sm sm:gap-4">
          <a
            href="#projects"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            {t.nav.projects}
          </a>
          <Link href="/lab" className="text-zinc-400 transition-colors hover:text-white">
            {t.nav.lab}
          </Link>
          <Link
            href="/assistant"
            className="hidden text-zinc-400 transition-colors hover:text-white sm:inline"
          >
            {t.nav.assistant}
          </Link>
          <LanguageToggle />
          <Link
            href="/login"
            className="rounded-full bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-violet-100"
          >
            {t.nav.login}
          </Link>
        </nav>
      </header>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-24">
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
          className="mt-6 max-w-xl text-base text-zinc-400 md:text-lg"
        >
          {profile.taglineEn}
        </motion.p>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-8"
        >
          <p className="text-xs tracking-wider text-zinc-500 uppercase">
            {t.hero.focusLabel}
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {profile.focus.map((item) => (
              <li
                key={item}
                className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.ul
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {profile.keywords.map((kw) => (
            <li key={kw} className="px-2 text-xs tracking-wide text-zinc-500 uppercase">
              {kw}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
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
    </section>
  );
}
