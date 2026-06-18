import { CodeViewer } from "@/components/lab/CodeViewer";
import { DemoFrame } from "@/components/lab/DemoFrame";
import { LabShell } from "@/components/lab/LabShell";
import { getAllLabSlugs, getLabEffect } from "@/data/lab-effects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const effect = getLabEffect(slug);
  if (!effect) return { title: "未找到" };
  return {
    title: effect.title,
    description: effect.summary,
  };
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const effect = getLabEffect(slug);
  if (!effect) notFound();

  const interactionHint =
    effect.slug === "shy-bird-3d" ?
      "在下方区域内移动鼠标：中间的小鸟会看你的光标，盯太久两侧的小鸟会害羞转头。"
    : effect.slug === "hobbiton-hero" ?
      "在下方区域内向下滚动页面，触发镜头推进与标题显现。"
    : effect.slug === "interactive-rocket" ?
      "鼠标悬停改变火箭朝向，按住鼠标左键加速。"
    : effect.interactive ?
      "在下方演示区域内直接操作（鼠标 / 键盘 / 滚动）。"
    : "自动播放动画，无需操作。";

  return (
    <LabShell>
      <main className="mx-auto max-w-4xl px-6 py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {effect.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs text-violet-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{effect.title}</h1>
        <p className="mt-2 text-zinc-400">{effect.subtitle}</p>

        <div
          className="mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          style={{ backgroundColor: effect.previewBg }}
        >
          <div className="relative aspect-video w-full min-h-[280px] md:min-h-[360px]">
            <DemoFrame src={effect.demoPath} title={effect.title} className="absolute inset-0" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
            <p className="text-xs text-zinc-400">{interactionHint}</p>
            <a
              href={effect.demoPath}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-violet-100 transition-colors"
            >
              全屏打开演示
            </a>
          </div>
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-violet-200">简介</h2>
          <p className="leading-relaxed text-zinc-300">{effect.summary}</p>
          <p className="text-sm text-zinc-500">
            收录日期 {effect.publishedAt} · 来源{" "}
            <a
              href={effect.source.url}
              target="_blank"
              rel="noreferrer"
              className="text-violet-300 hover:underline"
            >
              {effect.source.name}
            </a>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-violet-200">技术栈</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {effect.techStack.map((t) => (
              <span key={t} className="rounded-lg bg-white/5 px-3 py-1 text-sm text-zinc-300">
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-violet-200">解析</h2>
          {effect.analysis.map((block) => (
            <div
              key={block.heading}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-medium text-white">{block.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{block.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-violet-200">应用场景</h2>
          <ul className="mt-4 space-y-2">
            {effect.useCases.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-zinc-300">
                <span className="text-violet-400">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-violet-200">完整源码</h2>
            <Link href="/lab" className="text-sm text-zinc-500 hover:text-white">
              ← 更多效果
            </Link>
          </div>
          <CodeViewer src={effect.demoPath} />
        </section>
      </main>
    </LabShell>
  );
}
