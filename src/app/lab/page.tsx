import { LabCard } from "@/components/lab/LabCard";
import { LabShell } from "@/components/lab/LabShell";
import { labEffects } from "@/data/lab-effects";

export default function LabIndexPage() {
  return (
    <LabShell backHref="/" backLabel="首页">
      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-violet-300">Code Lab</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">动效合集</h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            收集自公众号、前端嘛等渠道的有趣前端效果。每张卡片可预览，点击进入详情查看完整演示、解析与源码。
            分类功能等条目多了再加。
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {labEffects.map((effect) => (
            <LabCard key={effect.slug} effect={effect} />
          ))}
        </div>

        {labEffects.length === 0 ? (
          <p className="text-center text-zinc-500 py-20">还没有收录效果，敬请期待。</p>
        ) : null}
      </main>
    </LabShell>
  );
}
