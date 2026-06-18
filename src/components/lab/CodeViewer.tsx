"use client";

import { useCallback, useEffect, useState } from "react";

export function CodeViewer({ src }: { src: string }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(src, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setCode(await res.text());
    } catch {
      setError("源码加载失败");
      setCode("");
    } finally {
      setLoading(false);
    }
  }, [src]);

  useEffect(() => {
    load();
  }, [load]);

  const lines = code ? code.split("\n").length : 0;
  const preview =
    code ?
      expanded ?
        code
      : code.split("\n").slice(0, 48).join("\n") + (lines > 48 ? "\n…" : "")
    : "";

  async function copy() {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/80 overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="text-xs text-zinc-500">
          {loading ? "加载源码中…" : error ? error : `共 ${lines} 行 · HTML + CSS`}
        </span>
        <div className="flex gap-2">
          {lines > 48 ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              disabled={!code}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs text-zinc-300 hover:bg-white/5 disabled:opacity-40"
            >
              {expanded ? "收起" : "展开全部"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={copy}
            disabled={!code}
            className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-500 disabled:opacity-40"
          >
            {copied ? "已复制" : "复制源码"}
          </button>
        </div>
      </div>
      <pre className="max-h-[min(70vh,520px)] overflow-auto p-4 text-xs leading-relaxed text-zinc-300">
        <code>{loading ? "请稍候…" : error || preview}</code>
      </pre>
    </div>
  );
}
