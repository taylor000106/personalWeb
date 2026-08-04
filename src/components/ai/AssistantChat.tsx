"use client";

import { useRef, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";

type ChatItem = {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ title: string; source: string }>;
};

const SUGGESTIONS_ZH = [
  "介绍一下你的项目",
  "你为什么选择 Next.js",
  "你的性能优化经验有哪些",
  "你的 AI 应用经验是什么",
];

const SUGGESTIONS_EN = [
  "Introduce your projects",
  "Why did you choose Next.js?",
  "What performance work have you done?",
  "What is your AI experience?",
];

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

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            disabled={streaming}
            onClick={() => ask(s)}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-violet-400/50 hover:text-white disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="min-h-[320px] space-y-4 rounded-2xl border border-white/10 bg-[#080814] p-4 md:p-6">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">{t.assistant.empty}</p>
        ) : (
          items.map((item, idx) => (
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
                      __html: renderLiteMarkdown(item.content),
                    }}
                  />
                ) : (
                  item.content
                )}
                {streaming && idx === items.length - 1 && item.role === "assistant" ? (
                  <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-violet-400 align-middle" />
                ) : null}
              </div>
            </div>
          ))
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
