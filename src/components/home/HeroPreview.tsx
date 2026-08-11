"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { heroShowcase } from "@/content/hero-showcase";
import { useI18n } from "@/i18n/LanguageProvider";

function AssistantMock({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={
        compact
          ? "space-y-2.5 rounded-lg border border-white/10 bg-[#0c0c14]/90 p-3"
          : "min-h-[210px] space-y-3 rounded-lg border border-white/10 bg-[#0c0c14]/90 p-3.5"
      }
    >
      <div className="flex justify-end">
        <div className="max-w-[88%] rounded-2xl rounded-br-md bg-violet-600/25 px-3 py-2 text-[11px] leading-relaxed text-zinc-100">
          <span className="mb-0.5 block text-[9px] tracking-wide text-violet-300/80">
            {t.hero.mockUserLabel}
          </span>
          {t.hero.mockUser}
        </div>
      </div>

      <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-3 py-2.5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="text-[9px] tracking-wide text-zinc-500">
            {t.hero.mockAiLabel}
          </span>
          {!reduceMotion ? (
            <span className="flex items-center gap-1 text-[9px] text-emerald-400/80">
              <span className="h-1 w-1 rounded-full bg-emerald-400/90" />
              {t.hero.mockStreaming}
            </span>
          ) : null}
        </div>
        <div className="space-y-1 text-[11px] leading-relaxed text-zinc-300">
          <p>{t.hero.mockAiLine1}</p>
          <p>{t.hero.mockAiLine2}</p>
          <p>
            {t.hero.mockAiLine3}
            <span
              aria-hidden
              className="hero-sse-cursor ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.12em] bg-violet-300 align-baseline"
            />
          </p>
        </div>
        <div className="mt-2.5 border-t border-white/8 pt-2">
          <p className="text-[9px] tracking-wide text-zinc-600 uppercase">
            {t.hero.mockSourcesLabel}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-400">
              {t.hero.mockSource1}
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-400">
              {t.hero.mockSource2}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Product Showcase — Taylor Studio window + two product cards.
 * Primary card is a readable AI product mock, not a screenshot wall.
 */
export function HeroPreview() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const secondaryMeta = {
    chatai: {
      title: t.hero.previewChatAI,
      hint: t.hero.previewChatAIHint,
    },
    scrm: {
      title: t.hero.previewScrM,
      hint: t.hero.previewScrMHint,
    },
  } as const;

  return (
    <div className="w-full max-w-[560px]">
      {/* Desktop: primary live, secondary static */}
      <div className="relative hidden lg:block">
        <div className="pointer-events-none absolute -inset-8 top-0 h-[70%] rounded-full bg-violet-600/12 blur-3xl" />

        {/* Personal AI — only this card floats / streams */}
        <motion.div
          initial={reduceMotion ? false : { y: 16, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { y: [0, -6, 0], opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0.4 }
              : {
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                  opacity: { duration: 0.65, delay: 0.2 },
                }
          }
          className="relative overflow-hidden rounded-xl border border-white/12 bg-[#090912]/80 shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-2 flex-1 truncate rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] tracking-wide text-zinc-500">
              {t.hero.previewUrl}
            </div>
          </div>

          <div className="p-4 pb-4">
            <p className="text-[10px] tracking-[0.16em] text-violet-300/70 uppercase">
              {t.hero.previewEyebrow}
            </p>
            <div className="mt-1 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-sm text-zinc-100">
                  {t.hero.previewTitle}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {t.hero.previewAssistant}
                  <span className="mx-1.5 text-zinc-700">·</span>
                  {t.hero.previewAssistantHint}
                </p>
              </div>
              <span className="mb-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
            </div>

            <Link
              href={heroShowcase.primary.href}
              className="mt-3 block transition-opacity hover:opacity-95"
            >
              <AssistantMock />
            </Link>
          </div>
        </motion.div>

        {/* ChatAI / SCRM — static commercial showcase */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {heroShowcase.secondary.map((item) => {
            const meta = secondaryMeta[item.id];
            return (
              <Link
                key={item.id}
                href={item.href}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8">
                  <Image
                    src={item.src}
                    alt={meta.title}
                    fill
                    className="object-cover object-top"
                    sizes="240px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090912]/55 to-transparent" />
                </div>
                <div className="px-2.5 py-2">
                  <p className="text-[11px] font-medium text-zinc-300">{meta.title}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-600">{meta.hint}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile: light mock + secondary thumbs */}
      <div className="space-y-2.5 lg:hidden">
        <Link
          href={heroShowcase.primary.href}
          className="block overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
        >
          <div className="border-b border-white/8 px-2.5 py-1.5 text-[10px] text-zinc-500">
            {t.hero.previewAssistant}
            <span className="mx-1 text-zinc-600">·</span>
            {t.hero.previewAssistantHint}
          </div>
          <AssistantMock compact />
        </Link>
        <div className="grid grid-cols-2 gap-2.5">
          {heroShowcase.secondary.map((item) => {
            const meta = secondaryMeta[item.id];
            return (
              <Link
                key={item.id}
                href={item.href}
                className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.src}
                    alt={meta.title}
                    fill
                    className="object-cover object-top"
                    sizes="160px"
                  />
                </div>
                <p className="px-2 py-1.5 text-[10px] text-zinc-400">{meta.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
