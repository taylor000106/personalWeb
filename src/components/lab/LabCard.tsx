import Link from "next/link";
import type { LabEffect } from "@/data/lab-effects";

export function LabCard({ effect }: { effect: LabEffect }) {
  const interactive = effect.interactive === true;
  const href = `/lab/${effect.slug}`;

  return (
    <article className="group">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 group-hover:border-violet-500/40 group-hover:shadow-violet-900/20"
        style={{ backgroundColor: effect.previewBg }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <iframe
            src={effect.demoPath}
            title={`${effect.title} 预览`}
            className={`absolute left-1/2 top-[58%] h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 scale-[0.42] border-0 origin-center ${
              interactive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            loading="lazy"
            tabIndex={interactive ? 0 : -1}
          />
          {interactive ? (
            <p className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm">
              可在此预览交互
            </p>
          ) : null}
          <Link
            href={href}
            className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm transition-opacity hover:bg-black/70"
          >
            查看详情 →
          </Link>
        </div>
      </div>
      <Link href={href} className="mt-3 block px-1">
        <h2 className="text-center text-base font-semibold text-white group-hover:text-violet-200 transition-colors">
          {effect.title}
        </h2>
        <p className="mt-1 text-center text-xs text-zinc-500">{effect.subtitle}</p>
      </Link>
    </article>
  );
}
