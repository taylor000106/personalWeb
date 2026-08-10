"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
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

      <SiteHeader variant="hero" />

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
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.28 }}
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
