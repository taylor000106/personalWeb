"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  resolveSourceLinks,
  type ResolvedSourceLink,
} from "@/content/knowledge/source-links";
import { useI18n } from "@/i18n/LanguageProvider";

type ChatItem = {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ title: string; source: string }>;
};

const SUGGESTIONS_ZH = [
  "介绍一下 Taylor 的技术方向？",
  "这个个人网站用了哪些技术？",
  "为什么选择 Next.js 开发这个项目？",
];

const SUGGESTIONS_EN = [
  "What is Taylor's technical focus?",
  "What tech stack does this site use?",
  "Why was this project built with Next.js?",
];

/** Strip legacy footer so UI owns citations */
function stripLegacySourceFooter(text: string) {
  return text
    .replace(/\n*---\n+\*\*参考知识库\*\*[\s\S]*$/i, "")
    .replace(/\n*---\n+\*\*Sources?\*\*[\s\S]*$/i, "")
    .trim();
}

function renderLiteMarkdown(text: string) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br/>");
}

function SourceRefs({ links }: { links: ResolvedSourceLink[] }) {
  const { locale } = useI18n();
  if (links.length === 0) return null;
  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      <p className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
        {locale === "zh" ? "参考资料" : "References"}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={`${link.title}-${link.href || "text"}`}>
            {link.href ? (
              <Link
                href={link.href}
                className="inline-flex border border-violet-400/35 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-100 transition-colors hover:border-violet-300/60 hover:bg-violet-500/20"
              >
                {link.title}
              </Link>
            ) : (
              <span className="inline-flex border border-white/10 px-2.5 py-1 text-xs text-zinc-400">
                {link.title}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SuggestionChips({
  suggestions,
  onAsk,
  disabled,
  exclude = [],
}: {
  suggestions: string[];
  onAsk: (q: string) => void;
  disabled: boolean;
  exclude?: string[];
}) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const excluded = new Set(exclude.map((q) => q.trim()));
  const visible = suggestions.filter((s) => !excluded.has(s.trim()));
  const list = visible.length > 0 ? visible : suggestions;

  return (
    <div>
      <p className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
        {isZh ? "推荐问题" : "Suggested questions"}
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {list.map((s) => (
          <button
            key={s}
            type="button"
            disabled={disabled}
            onClick={() => onAsk(s)}
            className="border border-white/15 bg-white/[0.03] px-3 py-2.5 text-left text-sm text-zinc-200 transition-colors hover:border-violet-400/45 hover:bg-violet-500/10 hover:text-white disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyWelcome({
  suggestions,
  onAsk,
  disabled,
}: {
  suggestions: string[];
  onAsk: (q: string) => void;
  disabled: boolean;
}) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="flex min-h-[280px] flex-col justify-center gap-6 py-4">
      <div className="space-y-3">
        <p className="text-base font-medium text-zinc-100">
          {isZh
            ? "你好，我是 Taylor 的技术助手。"
            : "Hi — I'm Taylor's technical assistant."}
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          {isZh
            ? "我基于本站知识库回答，帮助访客快速了解："
            : "I answer from this site's knowledge base so visitors can quickly learn about:"}
        </p>
        <ul className="space-y-1.5 text-sm text-zinc-300">
          <li className="flex gap-2">
            <span className="text-violet-400">·</span>
            {isZh ? "项目经历" : "Project experience"}
          </li>
          <li className="flex gap-2">
            <span className="text-violet-400">·</span>
            {isZh ? "技术方向" : "Technical focus"}
          </li>
          <li className="flex gap-2">
            <span className="text-violet-400">·</span>
            {isZh ? "网站实现" : "How this site is built"}
          </li>
        </ul>
      </div>

      <SuggestionChips suggestions={suggestions} onAsk={onAsk} disabled={disabled} />
    </div>
  );
}

export function AssistantChat() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [items, setItems] = useState<ChatItem[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [mode, setMode] = useState<string>("");
  const [retrieval, setRetrieval] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);

  const suggestions = locale === "zh" ? SUGGESTIONS_ZH : SUGGESTIONS_EN;

  function stop() {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }

  async function ask(question: string) {
    const q = question.trim();
    if (!q || streaming) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStreaming(true);
    setInput("");
    setItems((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setItems((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: String(err.error || "Request failed"),
          };
          return next;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      let sources: ChatItem["sources"] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          try {
            const payload = JSON.parse(data) as {
              text?: string;
              mode?: string;
              retrieval?: string;
              sources?: Array<{ title: string; source: string }>;
              error?: string;
              done?: boolean;
            };
            if (payload.mode) setMode(payload.mode);
            if (payload.retrieval) setRetrieval(payload.retrieval);
            if (payload.sources) sources = payload.sources;
            if (payload.error) {
              assistant += `\n\n${payload.error}`;
            }
            if (payload.text) {
              assistant += payload.text;
              const snapshot = assistant;
              const sourceSnapshot = sources;
              setItems((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  role: "assistant",
                  content: snapshot,
                  sources: sourceSnapshot,
                };
                return next;
              });
            }
          } catch {
            // ignore
          }
        }
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        setItems((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === "assistant") {
            next[next.length - 1] = {
              ...last,
              content: last.content || (locale === "zh" ? "（已停止）" : "(stopped)"),
            };
          }
          return next;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
        <p>{t.assistant.blurb}</p>
        <p className="mt-2 text-xs text-zinc-500">{t.assistant.boundary}</p>
        {mode ? (
          <p className="mt-2 text-xs text-violet-300/90">
            {t.assistant.mode}:{" "}
            {mode === "llm" ? t.assistant.modeLlm : t.assistant.modeLocal}
            {retrieval ? ` · ${retrieval}` : ""}
          </p>
        ) : null}
      </div>

      <div className="min-h-[320px] space-y-4 rounded-2xl border border-white/10 bg-[#080814] p-4 md:p-6">
        {items.length === 0 ? (
          <EmptyWelcome
            suggestions={suggestions}
            onAsk={(q) => void ask(q)}
            disabled={streaming}
          />
        ) : (
          <>
            {items.map((item, idx) => {
              const body =
                item.role === "assistant"
                  ? stripLegacySourceFooter(item.content)
                  : item.content;
              const links =
                item.role === "assistant" && item.sources?.length
                  ? resolveSourceLinks(item.sources)
                  : [];
              const showSources =
                item.role === "assistant" &&
                links.length > 0 &&
                !(streaming && idx === items.length - 1);

              return (
                <div
                  key={`${item.role}-${idx}`}
                  className={item.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={
                      item.role === "user"
                        ? "inline-block max-w-[90%] rounded-2xl bg-violet-600 px-4 py-2 text-sm text-white"
                        : "inline-block max-w-[95%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200"
                    }
                  >
                    {item.role === "assistant" ? (
                      <div
                        className="assistant-md leading-relaxed [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_h1]:mb-2 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mb-1 [&_h3]:font-medium"
                        dangerouslySetInnerHTML={{
                          __html: renderLiteMarkdown(body),
                        }}
                      />
                    ) : (
                      item.content
                    )}
                    {streaming &&
                    idx === items.length - 1 &&
                    item.role === "assistant" ? (
                      <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-violet-400 align-middle" />
                    ) : null}
                    {showSources ? <SourceRefs links={links} /> : null}
                  </div>
                </div>
              );
            })}
            {!streaming ? (
              <SuggestionChips
                suggestions={suggestions}
                onAsk={(q) => void ask(q)}
                disabled={streaming}
                exclude={items
                  .filter((item) => item.role === "user")
                  .map((item) => item.content)}
              />
            ) : null}
          </>
        )}
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void ask(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.assistant.placeholder}
          disabled={streaming}
          className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-400/60"
        />
        {streaming ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-zinc-200 hover:border-white/40"
          >
            {t.assistant.stop}
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-full bg-violet-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:opacity-50"
          >
            {t.assistant.send}
          </button>
        )}
      </form>
    </div>
  );
}
