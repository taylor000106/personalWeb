import type { Locale } from "./config";

export type Messages = {
  nav: {
    projects: string;
    lab: string;
    login: string;
    home: string;
    experience: string;
    playground: string;
    assistant: string;
  };
  hero: {
    ctaProjects: string;
    ctaLab: string;
    scrollCue: string;
    previewEyebrow: string;
    previewTitle: string;
    previewAssistant: string;
    previewAssistantHint: string;
    previewChatAI: string;
    previewChatAIHint: string;
    previewScrM: string;
    previewScrMHint: string;
    previewUrl: string;
    mockUserLabel: string;
    mockAiLabel: string;
    mockUser: string;
    mockAiLine1: string;
    mockAiLine2: string;
    mockAiLine3: string;
    mockSourcesLabel: string;
    mockSource1: string;
    mockSource2: string;
    mockStreaming: string;
  };
  projects: {
    title: string;
    subtitle: string;
    eyebrow: string;
    liveBadge: string;
    screenshotTbd: string;
    viewDetail: string;
    back: string;
    background: string;
    challenge: string;
    contribution: string;
    engineering: string;
    stack: string;
    architecture: string;
    heroCaption: string;
    screenshots: string;
    architectureDiagram: string;
    engPerformance: string;
    engTesting: string;
    engDeployment: string;
    engSecurity: string;
  };
  archive: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  experience: { title: string; subtitle: string };
  labPreview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
  };
  articles: { title: string; subtitle: string; soon: string };
  contact: { title: string; subtitle: string };
  vitals: {
    title: string;
    subtitle: string;
    eyebrow: string;
    target: string;
    live: string;
    waiting: string;
    labHint: string;
    lighthouseEyebrow: string;
    lighthouseNote: string;
    lighthouseMeta: string;
    lighthouseLabNote: string;
    colPage: string;
    colPerf: string;
    colA11y: string;
    colBp: string;
    colSeo: string;
    pageHome: string;
    pageAssistant: string;
    pageLab: string;
  };
  lab: {
    eyebrow: string;
    title: string;
    subtitle: string;
    empty: string;
    back: string;
    categories: {
      all: string;
      animation: string;
      performance: string;
      ai: string;
      browser: string;
    };
    categoryDesc: {
      all: string;
      animation: string;
      performance: string;
      ai: string;
      browser: string;
    };
    interactive: string;
    detail: string;
    originInspired: string;
    originOriginal: string;
    techPoints: string;
    implementation: string;
    sourceLabel: string;
  };
  lang: { switchTo: string; zh: string; en: string };
  assistant: {
    eyebrow: string;
    title: string;
    subtitle: string;
    blurb: string;
    boundary: string;
    empty: string;
    placeholder: string;
    send: string;
    stop: string;
    thinking: string;
    mode: string;
    modeLocal: string;
    modeLlm: string;
  };
};

export const messages: Record<Locale, Messages> = {
  zh: {
    nav: {
      projects: "项目",
      lab: "实验室",
      login: "登录",
      home: "首页",
      experience: "经历",
      playground: "小实验",
      assistant: "AI助手",
    },
    hero: {
      ctaProjects: "查看项目",
      ctaLab: "前往实验室",
      scrollCue: "探索精选项目",
      previewEyebrow: "产品展示",
      previewTitle: "Taylor Studio",
      previewAssistant: "本站 AI 助手",
      previewAssistantHint: "问答 · 流式 · 引用",
      previewChatAI: "ChatAI",
      previewChatAIHint: "流式对话",
      previewScrM: "企微 SCRM",
      previewScrMHint: "运营看板",
      previewUrl: "yywtaylor.cyou · Taylor Studio",
      mockUserLabel: "你",
      mockAiLabel: "AI",
      mockUser: "介绍一下本站技术栈",
      mockAiLine1: "本站基于现代 Web 工程独立搭建。",
      mockAiLine2: "支持 SSE 流式输出与知识库问答。",
      mockAiLine3: "回答可附带引用来源。",
      mockSourcesLabel: "Sources",
      mockSource1: "本站架构",
      mockSource2: "AI 助手",
      mockStreaming: "生成中",
    },
    projects: {
      title: "精选项目",
      subtitle: "代表交付：本站平台、AI 多端产品、ToB SaaS",
      eyebrow: "精选",
      liveBadge: "已上线",
      screenshotTbd: "截图待补充",
      viewDetail: "查看详情",
      back: "返回项目",
      background: "项目背景",
      challenge: "核心挑战",
      contribution: "我的贡献",
      engineering: "工程实践",
      stack: "技术栈",
      architecture: "架构选择原因",
      heroCaption: "产品界面",
      screenshots: "更多截图",
      architectureDiagram: "架构示意",
      engPerformance: "性能",
      engTesting: "测试",
      engDeployment: "部署",
      engSecurity: "安全",
    },
    archive: {
      eyebrow: "早期项目",
      title: "更多项目",
      subtitle: "晟为数科时期 ToB 交付归档，不占用精选主叙事",
    },
    experience: {
      title: "经历",
      subtitle: "能力时间轴：从企业后台到 AI 应用，再到现代全栈平台",
    },
    labPreview: {
      eyebrow: "前端工程实验室",
      title: "前端实验室",
      subtitle:
        "记录有趣的交互效果、动画实验与技术探索。部分灵感来自社区作品，重在审美、交互与工程拆解，而非包装成原创作品集。",
      viewAll: "查看全部实验 →",
    },
    articles: {
      title: "文章",
      subtitle: "技术迁移 · SSE 流式交互 · 全栈部署",
      soon: "撰写中",
    },
    contact: {
      title: "联系",
      subtitle: "欢迎通过 GitHub 或 AI 助手了解项目细节",
    },
    vitals: {
      title: "性能与体验",
      subtitle:
        "上方：目标阈值 + 本会话实测。下方：生产站 Lighthouse 归档分数（非模拟）。",
      eyebrow: "性能",
      target: "目标",
      live: "实测",
      waiting: "浏览页面后自动采集",
      labHint: "性能 Demo 见",
      lighthouseEyebrow: "Lighthouse · 生产环境",
      lighthouseNote:
        "在 yywtaylor.cyou 用 Lighthouse CLI（手机端）实测四维分数；完整记录见仓库 docs/lighthouse.md。",
      lighthouseMeta: "{origin} · 手机端 · {tool} · {date}",
      lighthouseLabNote:
        "实验室页性能分偏低，主要来自实验页主线程占用（总阻塞时间），不作为作品集首屏指标。",
      colPage: "页面",
      colPerf: "性能 Perf",
      colA11y: "无障碍 A11y",
      colBp: "最佳实践 BP",
      colSeo: "搜索优化 SEO",
      pageHome: "首页",
      pageAssistant: "AI 助手",
      pageLab: "实验室",
    },
    lab: {
      eyebrow: "Creative Frontend Experiments",
      title: "实验室",
      subtitle:
        "交互 UI 实验与前端探索合集：动效、性能、AI、Browser API。点击卡片查看演示、技术点与来源。",
      empty: "该分类暂无 Demo",
      back: "返回合集",
      categories: {
        all: "全部",
        animation: "动效",
        performance: "性能",
        ai: "AI",
        browser: "Browser",
      },
      categoryDesc: {
        all: "动效 / 性能 / AI / Browser",
        animation: "Canvas / CSS / 动效",
        performance: "虚拟列表 / 渲染优化",
        ai: "SSE / 流式交互",
        browser: "Web API / Storage / Worker",
      },
      interactive: "可交互",
      detail: "查看详情 →",
      originInspired: "社区灵感",
      originOriginal: "原创实验",
      techPoints: "技术点",
      implementation: "实现说明",
      sourceLabel: "来源",
    },
    lang: { switchTo: "English", zh: "中文", en: "EN" },
    assistant: {
      eyebrow: "AI Knowledge Assistant",
      title: "AI助手",
      subtitle:
        "基于结构化 Markdown 知识库：本地混合检索（关键词 + 轻量向量）+ SSE；配置 AI_API_KEY 后可切 LLM，可选远程 Embedding。",
      blurb: "基于本站知识库：了解项目经历、技术方向与网站实现。",
      boundary: "范围：本站相关的项目、技术选型、性能与 AI 实践；超出范围会明确说明。",
      empty: "还没有对话，点下面建议问题或直接输入。",
      placeholder: "输入你的问题…",
      send: "发送",
      stop: "停止",
      thinking: "生成中…",
      mode: "模式",
      modeLocal: "本地混合检索",
      modeLlm: "LLM 流式",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      lab: "Lab",
      login: "Login",
      home: "Home",
      experience: "Experience",
      playground: "Playground",
      assistant: "AI Assistant",
    },
    hero: {
      ctaProjects: "Explore Projects",
      ctaLab: "Explore Lab",
      scrollCue: "Explore Selected Projects",
      previewEyebrow: "Product showcase",
      previewTitle: "Taylor Studio",
      previewAssistant: "AI Assistant",
      previewAssistantHint: "Q&A · Stream · Sources",
      previewChatAI: "ChatAI",
      previewChatAIHint: "Streaming chat",
      previewScrM: "WeCom SCRM",
      previewScrMHint: "Ops dashboard",
      previewUrl: "yywtaylor.cyou · Taylor Studio",
      mockUserLabel: "You",
      mockAiLabel: "AI",
      mockUser: "Introduce this site's stack",
      mockAiLine1: "Built independently as a modern web product.",
      mockAiLine2: "SSE streaming and knowledge-base Q&A.",
      mockAiLine3: "Answers include source citations.",
      mockSourcesLabel: "Sources",
      mockSource1: "Architecture",
      mockSource2: "AI Assistant",
      mockStreaming: "Streaming",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "This platform, ChatAI multi-end, and WeCom SaaS delivery",
      eyebrow: "Featured",
      liveBadge: "Live",
      screenshotTbd: "Screenshot TBD",
      viewDetail: "View details",
      back: "Back to projects",
      background: "Background",
      challenge: "Challenges",
      contribution: "My contribution",
      engineering: "Engineering practice",
      stack: "Stack",
      architecture: "Architecture decisions",
      heroCaption: "Product UI",
      screenshots: "Screenshots",
      architectureDiagram: "Architecture",
      engPerformance: "Performance",
      engTesting: "Testing",
      engDeployment: "Deployment",
      engSecurity: "Security",
    },
    archive: {
      eyebrow: "Earlier work",
      title: "More projects",
      subtitle: "Shengwei-era ToB delivery — archived, outside the Featured narrative",
    },
    experience: {
      title: "Experience",
      subtitle: "Capability timeline: enterprise systems → AI apps → modern full-stack",
    },
    labPreview: {
      eyebrow: "Frontend Engineering Lab",
      title: "Frontend Experiments",
      subtitle:
        "Interactive UI experiments and frontend explorations. Some pieces are community-inspired; the point is taste, interaction, and engineering notes — not claiming original art direction.",
      viewAll: "Explore Frontend Experiments →",
    },
    articles: {
      title: "Articles",
      subtitle: "Migration · Streaming AI UX · Full-stack deploy",
      soon: "Soon",
    },
    contact: {
      title: "Contact",
      subtitle: "Reach me via GitHub, or ask the AI assistant about the work",
    },
    vitals: {
      title: "Performance",
      subtitle:
        "Above: targets + live session web-vitals. Below: archived production Lighthouse scores (not mocked).",
      eyebrow: "Performance",
      target: "Target",
      live: "Live",
      waiting: "Interact with the page to collect",
      labHint: "Performance demos at",
      lighthouseEyebrow: "Lighthouse · production",
      lighthouseNote:
        "Scores from Lighthouse CLI (mobile) against yywtaylor.cyou. Full notes in docs/lighthouse.md.",
      lighthouseMeta: "{origin} · mobile · {tool} · {date}",
      lighthouseLabNote:
        "Lab Performance is lower due to demo-page main-thread cost (TBT); not a homepage KPI.",
      colPage: "Page",
      colPerf: "Perf",
      colA11y: "A11y",
      colBp: "Best Practices",
      colSeo: "SEO",
      pageHome: "Home",
      pageAssistant: "Assistant",
      pageLab: "Lab",
    },
    lab: {
      eyebrow: "Creative Frontend Experiments",
      title: "Lab",
      subtitle:
        "A collection of interactive UI experiments and frontend explorations. Open a card for demo, notes, and source attribution.",
      empty: "No demos in this category yet.",
      back: "Back to lab",
      categories: {
        all: "All",
        animation: "Animation",
        performance: "Performance",
        ai: "AI",
        browser: "Browser",
      },
      categoryDesc: {
        all: "Animation / Performance / AI / Browser",
        animation: "Canvas / CSS / Motion",
        performance: "Virtual list / render",
        ai: "SSE / streaming UX",
        browser: "Web API / Storage / Worker",
      },
      interactive: "interactive",
      detail: "Details →",
      originInspired: "Community-inspired",
      originOriginal: "Original experiment",
      techPoints: "Tech points",
      implementation: "How it works",
      sourceLabel: "Source",
    },
    lang: { switchTo: "中文", zh: "中文", en: "EN" },
    assistant: {
      eyebrow: "AI Knowledge Assistant",
      title: "AI Assistant",
      subtitle:
        "Structured Markdown knowledge base: local hybrid retrieval (keywords + light vectors) + SSE. Set AI_API_KEY for LLM; optional remote embeddings.",
      blurb: "Ask about project experience, technical focus, and how this site is built.",
      boundary:
        "Scope: projects, stack choices, performance, and AI practice on this site. Out-of-scope questions are declined clearly.",
      empty: "No messages yet. Try a suggestion or type your question.",
      placeholder: "Ask a question...",
      send: "Send",
      stop: "Stop",
      thinking: "Thinking...",
      mode: "Mode",
      modeLocal: "Local hybrid retrieval",
      modeLlm: "LLM stream",
    },
  },
};
