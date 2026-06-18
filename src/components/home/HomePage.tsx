"use client";

import { LabCard } from "@/components/lab/LabCard";
import { labEffects } from "@/data/lab-effects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Taylor";

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050c] text-white">
      <ParticleCanvas />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_55%)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="text-sm font-semibold tracking-widest uppercase text-violet-300">
          {siteName}
        </span>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors">
            动效合集
          </Link>
          <a href="#playground" className="text-zinc-400 hover:text-white transition-colors">
            小实验
          </a>
          <Link
            href="/login"
            className="rounded-full bg-white px-4 py-2 font-medium text-black hover:bg-violet-100 transition-colors"
          >
            登录
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm text-violet-300/90"
        >
          访客模式 · 随便逛逛
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight md:text-6xl"
        >
          你好，我是
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            {" "}
            {siteName}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-zinc-400"
        >
          这里是公开首页：粒子连线会跟着鼠标走。登录后可以管理你的私人笔记、收藏链接和个人资料。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/login"
            className="rounded-full bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 transition-colors"
          >
            进入私人空间
          </Link>
          <Link
            href="/lab"
            className="rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-200 hover:border-zinc-500 transition-colors"
          >
            动效合集
          </Link>
        </motion.div>
      </main>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">动效合集</h2>
            <p className="mt-1 text-sm text-zinc-500">点击卡片查看演示、解析与源码</p>
          </div>
          <Link
            href="/lab"
            className="text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            查看全部 →
          </Link>
        </div>
        <div className="mx-auto grid max-w-sm gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          {labEffects.slice(0, 6).map((effect) => (
            <LabCard key={effect.slug} effect={effect} />
          ))}
        </div>
      </section>

      <section id="playground" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-8 text-center text-2xl font-semibold">互动小实验</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <MagneticCard title="悬浮卡片" desc="鼠标移上去会有轻微跟随" />
          <GlowCard title="光晕按钮" desc="适合放你的社交链接" />
          <WaveCard title="波纹条" desc="纯 CSS 动画，不耗性能" />
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {siteName} · yywtaylor.cyou
      </footer>
    </div>
  );
}

function MagneticCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: -0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <h3 className="font-semibold text-violet-200">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{desc}</p>
    </motion.div>
  );
}

function GlowCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="font-semibold text-violet-200">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{desc}</p>
      <button
        type="button"
        className="mt-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium shadow-[0_0_24px_rgba(139,92,246,0.45)] hover:opacity-90 transition-opacity"
      >
        点我发光
      </button>
    </div>
  );
}

function WaveCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-hidden">
      <h3 className="font-semibold text-violet-200">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{desc}</p>
      <div className="mt-4 flex h-8 items-end gap-1">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className="w-2 rounded-full bg-violet-400/80 animate-pulse"
            style={{
              height: `${20 + (i % 3) * 12}px`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
