import Link from "next/link";
import type { ArticleItem } from "@/content/articles";

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineFormat(text: string) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/** Minimal markdown → HTML for article bodies (no extra deps). */
export function articleMarkdownToHtml(markdown: string): string {
  const src = markdown.replace(/\r\n/g, "\n").trim();
  const blocks = src.split(/\n{2,}/);
  const out: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("```")) {
      const body = trimmed.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
      out.push(`<pre><code>${escapeHtml(body)}</code></pre>`);
      continue;
    }

    // Page already renders title — skip H1
    if (/^#\s+/.test(trimmed) && !/^##/.test(trimmed)) {
      const rest = trimmed.split("\n").slice(1).join("\n").trim();
      if (rest) out.push(`<p>${inlineFormat(rest.replace(/\n/g, " "))}</p>`);
      continue;
    }

    if (/^##\s+/.test(trimmed)) {
      const lines = trimmed.split("\n");
      out.push(`<h2>${inlineFormat(lines[0].replace(/^##\s+/, ""))}</h2>`);
      const rest = lines.slice(1).join("\n").trim();
      if (rest) out.push(...blockToHtml(rest));
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      const lines = trimmed.split("\n");
      out.push(`<h3>${inlineFormat(lines[0].replace(/^###\s+/, ""))}</h3>`);
      const rest = lines.slice(1).join("\n").trim();
      if (rest) out.push(...blockToHtml(rest));
      continue;
    }

    out.push(...blockToHtml(trimmed));
  }

  return out.join("\n");
}

function blockToHtml(trimmed: string): string[] {
  if (trimmed.startsWith("> ")) {
    return [
      `<blockquote><p>${inlineFormat(trimmed.replace(/^>\s?/gm, ""))}</p></blockquote>`,
    ];
  }

  const lines = trimmed.split("\n");

  if (lines.every((l) => l.includes("|")) && lines.some((l) => /^\|/.test(l))) {
    const rows = lines.filter((l) => !/^\|\s*-+/.test(l));
    const htmlRows = rows.map((row, idx) => {
      const cells = row
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      const tag = idx === 0 ? "th" : "td";
      return `<tr>${cells.map((c) => `<${tag}>${inlineFormat(c)}</${tag}>`).join("")}</tr>`;
    });
    return [
      `<table><thead>${htmlRows[0] || ""}</thead><tbody>${htmlRows.slice(1).join("")}</tbody></table>`,
    ];
  }

  if (lines.every((l) => /^[-*]\s+/.test(l) || l.trim() === "")) {
    const items = lines
      .filter((l) => /^[-*]\s+/.test(l))
      .map((l) => `<li>${inlineFormat(l.replace(/^[-*]\s+/, ""))}</li>`);
    return [`<ul>${items.join("")}</ul>`];
  }

  if (lines.every((l) => /^\d+\.\s+/.test(l) || l.trim() === "")) {
    const items = lines
      .filter((l) => /^\d+\.\s+/.test(l))
      .map((l) => `<li>${inlineFormat(l.replace(/^\d+\.\s+/, ""))}</li>`);
    return [`<ol>${items.join("")}</ol>`];
  }

  return [`<p>${inlineFormat(trimmed.replace(/\n/g, " "))}</p>`];
}

export function ArticleView({
  meta,
  markdown,
  backLabel,
}: {
  meta: ArticleItem;
  markdown: string;
  backLabel: string;
}) {
  const html = articleMarkdownToHtml(markdown);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        href="/#articles"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        ← {backLabel}
      </Link>

      <header className="mt-8 border-b border-white/10 pb-8">
        <ul className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <li
              key={tag}
              className="text-[11px] tracking-[0.14em] text-violet-300/80 uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{meta.summary}</p>
        <p className="mt-3 text-xs text-zinc-600">{meta.date}</p>
      </header>

      <article
        className="article-body mt-10 space-y-4 text-[15px] leading-7 text-zinc-300 [&_a]:text-violet-300 [&_a]:underline-offset-2 hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-violet-400/40 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-400 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:text-violet-100 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-zinc-100 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:text-zinc-300 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-[#080814] [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:text-zinc-300 [&_strong]:font-semibold [&_strong]:text-zinc-100 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:border-white/10 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/[0.04] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-zinc-200 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
