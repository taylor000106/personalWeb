/**
 * Map knowledge chunk (source file + title) → site page.
 * Static only; no DB. Unmatched entries stay text-only in the UI.
 */

export type SourceRef = {
  title: string;
  source: string;
};

export type ResolvedSourceLink = {
  title: string;
  href?: string;
};

type LinkRule = {
  /** Knowledge file, e.g. projects.md */
  source: string;
  /** Optional substring match on chunk title (case-insensitive) */
  titleIncludes?: string | RegExp;
  /** Display label (never the .md filename) */
  label: string;
  /** Omit when no suitable site page exists */
  href?: string;
};

const RULES: LinkRule[] = [
  {
    source: "projects.md",
    titleIncludes: /chatai|multi-platform/i,
    label: "ChatAI Multi-platform Application",
    href: "/projects/chatai",
  },
  {
    source: "projects.md",
    titleIncludes: /personal|本站|knowledge platform/i,
    label: "Personal AI Knowledge Platform",
    href: "/projects/personal-web",
  },
  {
    source: "projects.md",
    titleIncludes: /wecom|scrm|企微/i,
    label: "Enterprise WeCom SCRM",
    href: "/projects/linkwechat",
  },
  {
    source: "projects.md",
    titleIncludes: /prm|license|授权/i,
    label: "PRM · License & Channel Admin",
    href: "/projects/prm-license",
  },
  {
    source: "projects.md",
    titleIncludes: /kms/i,
    label: "KMS Console · Device Ops",
    href: "/projects/kms-console",
  },
  {
    source: "projects.md",
    titleIncludes: /toc|cms|catalog/i,
    label: "ToC CMS · App Catalog Admin",
    href: "/projects/toc-cms",
  },
  {
    source: "nextjs.md",
    label: "从 Vue 到 Next.js：我的前端技术迁移实践",
    href: "/articles/vue-to-nextjs",
  },
  {
    source: "ai.md",
    label: "SSE 流式 AI 交互在前端的实现",
    href: "/articles/sse-streaming-ai",
  },
  {
    source: "performance.md",
    label: "性能优化实践",
    href: "/lab",
  },
  {
    source: "about.md",
    label: "关于 Taylor",
    // No dedicated profile page — text only
  },
];

function titleMatches(title: string, rule: LinkRule): boolean {
  if (!rule.titleIncludes) return true;
  if (typeof rule.titleIncludes === "string") {
    return title.toLowerCase().includes(rule.titleIncludes.toLowerCase());
  }
  return rule.titleIncludes.test(title);
}

/** Resolve a SSE/meta source into a visitor-facing link chip. */
export function resolveSourceLink(ref: SourceRef): ResolvedSourceLink {
  const file = ref.source.replace(/^.*\//, "");
  const match = RULES.find((r) => r.source === file && titleMatches(ref.title, r));
  if (match) {
    return { title: match.label, href: match.href };
  }
  // Fallback: human title only, never expose .md
  const clean = ref.title.replace(/\s*（[^）]*\.md）\s*$/, "").trim();
  return { title: clean || "相关资料" };
}

export function resolveSourceLinks(refs: SourceRef[]): ResolvedSourceLink[] {
  const seen = new Set<string>();
  const out: ResolvedSourceLink[] = [];
  for (const ref of refs) {
    const resolved = resolveSourceLink(ref);
    const key = `${resolved.title}|${resolved.href || ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(resolved);
  }
  return out;
}
