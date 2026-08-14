export type LabCategory = "animation" | "performance" | "ai" | "browser";

export type LabEffect = {
  slug: string;
  title: string;
  subtitle: string;
  category: LabCategory;
  tags: string[];
  demoPath: string;
  previewBg: string;
  /** Community-inspired pieces should set source; omit for original lab work */
  source?: {
    name: string;
    url: string;
  };
  publishedAt: string;
  summary: string;
  /** Short tech bullets shown on detail page */
  techPoints?: string[];
  analysis: { heading: string; body: string }[];
  useCases: string[];
  techStack: string[];
  /** interactive demo */
  interactive?: boolean;
};

export function getLabOrigin(effect: LabEffect): "original" | "inspired" {
  return effect.source ? "inspired" : "original";
}

export const labCategories: {
  id: LabCategory | "all";
  label: string;
  description: string;
}[] = [
  { id: "all", label: "All", description: "Animation / Performance / AI / Browser" },
  { id: "animation", label: "Animation", description: "Canvas / CSS / Motion" },
  { id: "performance", label: "Performance", description: "Virtual list / render" },
  { id: "ai", label: "AI", description: "SSE / streaming Markdown" },
  { id: "browser", label: "Browser", description: "Web API / Storage / Worker" },
];

export const labEffects: LabEffect[] = [
  {
    slug: "interactive-rocket",
    category: "animation",
    title: "火箭 Loading",
    subtitle: "纯 CSS 太空火箭 · 悬停转向 · 按住加速",
    interactive: true,
    tags: ["CSS", "Loading", "Animation"],
    demoPath: "/lab/demos/interactive-rocket.html",
    previewBg: "#1c1740",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/interactive-rocket-through-space-css-animation",
    },
    publishedAt: "2026-04-28",
    summary:
      "深空背景下的火箭动画：鼠标悬停时整艘船会转向，按住鼠标加速飞行，星空用 CSS 动画营造景深。适合作为全屏 Loading 或品牌开屏。",
    analysis: [
      {
        heading: "交互怎么驱动动画",
        body: "通过 :hover 改变 CSS 变量或 transform，让火箭朝向鼠标；:active 触发加速态，配合 transition / animation 切换尾焰与位移。",
      },
      {
        heading: "星空层次",
        body: "多层星星用不同 animation-duration 与 scale 模拟远近，成本低、视觉却很「太空」。",
      },
    ],
    useCases: ["全站 Loading / 路由切换等待", "产品发布页、太空主题 landing", "作品集里展示 CSS 动画功底"],
    techStack: ["HTML", "CSS Variables", "@keyframes"],
  },
  {
    slug: "strings-code-cloth",
    category: "animation",
    title: "代码窗帘",
    subtitle: "可拖拽的字符串物理窗帘",
    interactive: true,
    tags: ["Canvas", "Interaction", "Creative"],
    demoPath: "/lab/demos/strings-code-cloth.html",
    previewBg: "#eeeeee",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/strings-code-cloth",
    },
    publishedAt: "2026-04-24",
    summary:
      "把代码行渲染成一根根可互动的「线绳」，鼠标拖动会产生布帘般的物理反馈，视觉抽象又好玩。",
    analysis: [
      {
        heading: "字符串即像素",
        body: "每行源码映射为一条可计算位置的曲线或线段，通过鼠标位置施加力场，形成整体窗帘效果。",
      },
      {
        heading: "体验要点",
        body: "适合大屏展示；移动端需测试触控性能，粒子/线段过多时要控制帧率。",
      },
    ],
    useCases: ["程序员主题首页背景", "技术大会签到页互动墙", "博客关于页的趣味装饰"],
    techStack: ["HTML", "Canvas / DOM", "JavaScript"],
  },
  {
    slug: "periodic-table-3d",
    category: "animation",
    title: "元素周期表",
    subtitle: "Anime.js 驱动的 3D 布局切换",
    interactive: true,
    tags: ["Anime.js", "3D", "Data Viz"],
    demoPath: "/lab/demos/periodic-table-3d.html",
    previewBg: "#252423",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/animejs-periodic-table-3d-layout-animation",
    },
    publishedAt: "2026-03-13",
    summary:
      "化学元素周期表在表格、球体、螺旋、网格四种 3D 布局间平滑切换，点击元素可展开详情，是数据可视化 + 动效的典型案例。",
    analysis: [
      {
        heading: "布局 morph",
        body: "每个元素卡片持有目标坐标，Anime.js 统一补间 transform，切换布局时形成「整体变形」而非简单淡入淡出。",
      },
      {
        heading: "信息密度",
        body: "118 个元素同时动画对 GPU 有一定压力，适合桌面端；可作为学习 anime.js timeline 的范例。",
      },
    ],
    useCases: ["教育类科普站", "数据可视化作品集", "讲解 JS 动画库的教学 demo"],
    techStack: ["HTML", "CSS 3D", "Anime.js"],
  },
  {
    slug: "ai-billiards",
    category: "animation",
    title: "和 AI 打台球",
    subtitle: "Canvas + Matter.js 物理引擎",
    interactive: true,
    tags: ["Canvas", "Game", "Matter.js"],
    demoPath: "/lab/demos/ai-billiards.html",
    previewBg: "#292929",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/ai-billiards-physics-canvas-game",
    },
    publishedAt: "2026-02-12",
    summary:
      "浏览器里的 8 球台球：真实碰撞、击球力度、回合判定与简易 AI 对手，即开即玩的小游戏。",
    analysis: [
      {
        heading: "物理与渲染分离",
        body: "Matter.js 负责刚体碰撞与速度，Canvas 每帧同步绘制球桌与球体；AI 根据球位计算击球向量。",
      },
      {
        heading: "嵌入注意",
        body: "游戏需占用较多交互（拖拽瞄准），详情页建议全屏体验；iframe 内也可玩但空间越大越好。",
      },
    ],
    useCases: ["站内小游戏放松角", "前端物理引擎学习示例", "活动页留存的互动模块"],
    techStack: ["HTML5 Canvas", "Matter.js", "JavaScript"],
  },
  {
    slug: "shy-bird-3d",
    category: "animation",
    title: "害羞鸡",
    subtitle: "Three.js + GSAP 3D 互动小鸟",
    interactive: true,
    tags: ["Three.js", "GSAP", "WebGL"],
    demoPath: "/lab/demos/shy-bird-3d.html",
    previewBg: "#e0dacd",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/threejs-interactive-3d-bird-animation",
    },
    publishedAt: "2026-01-29",
    summary:
      "三只 Low Poly 小鸟：中间一只跟随鼠标注视，两侧在你盯太久时会「害羞」转头、变色。展示 WebGL 角色互动与 GSAP 补间。",
    analysis: [
      {
        heading: "注视逻辑",
        body: "鼠标位置映射为 horizontal / vertical angle，驱动瞳孔、身体顶点变形；side bird 监听中间鸟角度触发 lookAway / stare。",
      },
      {
        heading: "依赖 CDN",
        body: "使用 Three.js r70 与 GSAP 1.x CDN，部署需保证外网可访问；现代项目可升级版本但 API 会有差异。",
      },
    ],
    useCases: ["趣味 404 / 关于页吉祥物", "WebGL 入门教学", "展示「角色有性格」的 micro-interaction"],
    techStack: ["Three.js", "GSAP", "WebGL"],
  },
  {
    slug: "day-night-fox",
    category: "animation",
    title: "一只狐狸",
    subtitle: "纯 CSS 日夜切换 · 会害羞的狐狸",
    interactive: true,
    tags: ["CSS", "Toggle", "无 JS"],
    demoPath: "/lab/demos/day-night-fox.html",
    previewBg: "#ffffff",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/css-day-night-toggle-animation",
    },
    publishedAt: "2026-01-27",
    summary:
      "圆形视窗里住着一只狐狸：拨动开关，背景从白昼变黑夜，狐狸毛色与表情随之变化，悬停时还会眯眼。全程 checkbox + CSS 兄弟选择器。",
    analysis: [
      {
        heading: "无 JS 的状态机",
        body: "隐藏 checkbox 作为状态源，:checked 配合 ~ 选择器切换 .c-window 背景、太阳/月亮显示与狐狸配色。",
      },
      {
        heading: "微交互",
        body: ":hover 改变眼睛高度与 bottom 位移，用 transition 做出「探头」感，适合主题切换组件灵感。",
      },
    ],
    useCases: ["站点深色模式开关装饰", "儿童向 / 可爱风 landing", "CSS 选择器教学案例"],
    techStack: ["HTML", "CSS", ":checked"],
  },
  {
    slug: "ascii-ripple",
    category: "animation",
    title: "ASCII 文字波纹",
    subtitle: "悬停链接触发字符涟漪",
    interactive: true,
    tags: ["JavaScript", "Creative", "Typography"],
    demoPath: "/lab/demos/ascii-ripple.html",
    previewBg: "#121211",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/ascii-glitch-ripple-hover-effect",
    },
    publishedAt: "2026-01-23",
    summary:
      "鼠标划过链接时，文字像水面一样荡起一圈圈 ASCII 符号扰动，松开后恢复原文。适合书单、目录、导航列表的趣味强化。",
    analysis: [
      {
        heading: "波前算法",
        body: "每次 mousemove 在光标位置 push 一个 wave 对象，requestAnimationFrame 根据时间与距离把字符替换成 cfg.chars 里的符号。",
      },
      {
        heading: "布局稳定",
        body: "动画开始前锁定元素 width，避免字符宽度变化导致列表抖动，是落地时很容易忽略的细节。",
      },
    ],
    useCases: ["博客文章目录", "作品集链接列表", "赛博 / 终端风个人站"],
    techStack: ["JavaScript", "Canvas/DOM", "requestAnimationFrame"],
  },
  {
    slug: "error-face-404",
    category: "animation",
    title: "404 错误脸",
    subtitle: "SVG 描边动画拼出表情",
    tags: ["SVG", "CSS", "404"],
    demoPath: "/lab/demos/error-face-404.html",
    previewBg: "#f2f2f4",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/animated-404-error-face-page",
    },
    publishedAt: "2026-01-21",
    summary:
      "数字 404 的笔画通过 stroke-dashoffset 与 transform 动画，先组成脸再眨眼、转眼、咧嘴，是极简却很有性格的 404 页方案。",
    analysis: [
      {
        heading: "SVG  stroke 动画",
        body: "polyline / path 用 stroke-dasharray 控制可见长度，keyframes 改变 dashoffset 实现「画出来」的效果。",
      },
      {
        heading: "无障碍",
        body: "svg 带 aria-label 描述动画含义；支持 light-dark() 随系统主题变色，可直接当 404 模板。",
      },
    ],
    useCases: ["自定义 404 页面", "错误态空状态插图", "SVG 动画教学"],
    techStack: ["SVG", "CSS @keyframes", "light-dark()"],
  },
  {
    slug: "cat-select",
    category: "animation",
    title: "猫选择器",
    subtitle: "SVG 下拉框 · 悬停逗猫",
    interactive: true,
    tags: ["SVG", "CSS", "Interaction"],
    demoPath: "/lab/demos/cat-select.html",
    previewBg: "#f5f5f5",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/interactive-cat-select-ui",
    },
    publishedAt: "2026-01-13",
    summary:
      "把原生 select 换成猫咪主题 UI：展开选项、悬停不同小猫会有表情变化，展示纯前端创意组件能做多细。",
    analysis: [
      {
        heading: "结构",
        body: "多层 SVG + CSS 控制耳朵、眼睛、尾巴；选项切换用 radio/checkbox 或 details 模拟，无需重型框架。",
      },
      {
        heading: "可访问性提醒",
        body: "趣味组件需保留键盘可达与读屏文案；若用于生产，建议叠加真实 select 或 ARIA 列表框模式。",
      },
    ],
    useCases: ["趣味表单 / 调查页", "宠物、文创品牌站", "UI 组件灵感库"],
    techStack: ["HTML", "SVG", "CSS"],
  },
  {
    slug: "hobbiton-hero",
    category: "animation",
    title: "哈比村卷轴",
    subtitle: "GSAP ScrollTrigger 电影感首屏",
    interactive: true,
    tags: ["GSAP", "ScrollTrigger", "Parallax"],
    demoPath: "/lab/demos/hobbiton-hero.html",
    previewBg: "#1f1f1f",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/image-zoom-scrolltrigger-hero-animation",
    },
    publishedAt: "2026-01-07",
    summary:
      "固定首屏随滚动推进：洞门图片放大、雾效消散、标题清晰显现，模仿电影片头。依赖 GSAP ScrollTrigger / ScrollSmoother。",
    analysis: [
      {
        heading: "滚动时间轴",
        body: "scrollTrigger pin + scrub 把滚动距离映射为 timeline 进度，多属性同步补间（scale、blur、opacity）。",
      },
      {
        heading: "嵌入提示",
        body: "必须在详情页内**向下滚动**才能看到效果；卡片预览只能看到静帧，建议全屏体验。",
      },
    ],
    useCases: ["品牌官网首屏", "摄影 / 旅行作品集", "GSAP 滚动动画学习"],
    techStack: ["GSAP", "ScrollTrigger", "ScrollSmoother"],
  },
  {
    slug: "pixel-puzzle",
    category: "animation",
    title: "像素风解谜",
    subtitle: "HTML5 Canvas 推箱子式关卡",
    interactive: true,
    tags: ["Canvas", "Game", "Pixel"],
    demoPath: "/lab/demos/pixel-puzzle.html",
    previewBg: "#000000",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/html5-pixel-puzzle-game",
    },
    publishedAt: "2026-02-02",
    summary:
      "16×16 瓦片地图的像素解谜：键盘或触控移动，包含箭头、冰面、机关与出口，强调路径规划。",
    analysis: [
      {
        heading: "自研小引擎",
        body: "地图、实体、规则在 Canvas 上逐帧更新；关卡数据可 JSON 化，方便扩展更多谜题。",
      },
      {
        heading: "移动端",
        body: "作者做了触控支持，合集内建议全屏游玩，避免 iframe 高度不足遮挡操作区。",
      },
    ],
    useCases: ["站内休闲小游戏", "像素风 UI 主题配套", "Canvas 游戏逻辑学习"],
    techStack: ["HTML5 Canvas", "JavaScript"],
  },
  {
    slug: "css-3d-voxel-chicken",
    category: "animation",
    title: "一只小鸡",
    subtitle: "纯 CSS 3D 体素动画",
    tags: ["CSS", "3D", "Animation", "无 JS"],
    demoPath: "/lab/demos/css-3d-voxel-chicken.html",
    previewBg: "#15803d",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/css-3d-voxel-chicken-animation",
    },
    publishedAt: "2026-03-03",
    summary:
      "用大量 div 方块拼出立体小鸡，配合 preserve-3d 与 keyframes 实现蹦跳。全程无 JavaScript，适合作为 CSS 3D 入门案例。",
    analysis: [
      {
        heading: "体素是怎么「立起来」的",
        body: "每个部件由 6 个面组成立方体，父级 preserve-3d + translate3d / rotate 摆进 3D 空间。",
      },
      {
        heading: "动画节奏",
        body: "full-body 控制弹跳，left-leg / right-leg 交替摆动，500ms ease-out 循环。",
      },
    ],
    useCases: [
      "Loading / 404 页趣味吉祥物",
      "纯 CSS 能力展示",
      "CSS 3D transform 教学",
    ],
    techStack: ["HTML", "CSS 3D Transforms", "@keyframes"],
  },
  {
    slug: "3d-glowing-bell",
    category: "animation",
    title: "3D 发光铃铛",
    subtitle: "纯 CSS 可开关发光铃铛 · 点击切换",
    interactive: true,
    tags: ["CSS", "3D", "Lighting"],
    demoPath: "/lab/demos/3d-glowing-bell.html",
    previewBg: "#000000",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/3d-glowing-bell-animation",
    },
    publishedAt: "2026-06-03",
    summary:
      "纯 CSS 实现的 3D 发光铃铛：点击可开关发光效果，铃身由多层渐变与阴影构建，伴有微弱的摇晃动画和粒子噪点纹理，营造出金属质感与暖色光晕。",
    analysis: [
      {
        heading: "纯 CSS 3D 构建",
        body: "铃铛的立体感完全通过 border-radius、box-shadow 和 radial-gradient 模拟，未使用任何 3D transform 或 JavaScript 绘图。",
      },
      {
        heading: "开关机制",
        body: "通过 classList.toggle('off') 控制发光层、光晕和铃铛内部高光的显示/隐藏，CSS transition 实现平滑切换。",
      },
    ],
    useCases: ["品牌页面趣味交互组件", "夜间模式开关装饰", "CSS 光照效果学习案例"],
    techStack: ["HTML", "CSS", "CSS Gradients", "box-shadow"],
  },
  {
    slug: "interactive-character-heads",
    category: "animation",
    title: "交互角色头像",
    subtitle: "CSS 卡通角色 · 按压/点击互动",
    interactive: true,
    tags: ["CSS", "Interaction", "Animation"],
    demoPath: "/lab/demos/interactive-character-heads.html",
    previewBg: "#f4e9ea",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/interactive-character-heads",
    },
    publishedAt: "2026-06-02",
    summary:
      "两个纯 CSS 卡通角色头像：第一个按住时螺旋桨旋转+眨眼，松开后动画自然结束；第二个点击触发眨眼+挑眉，适合做趣味按钮或交互反馈。",
    analysis: [
      {
        heading: "CSS 动画控制",
        body: "通过 classList 添加/移除动画类名，animationiteration 事件监听让动画在完整循环后停止，避免中途截断。",
      },
      {
        heading: "纯 CSS 角色",
        body: "角色五官、耳朵、头发全部用 CSS 伪元素和渐变绘制，无需任何图片资源。",
      },
    ],
    useCases: ["趣味按钮/开关组件", "加载状态装饰", "儿童向 UI 元素"],
    techStack: ["HTML", "CSS", "CSS Animations", "JavaScript"],
  },
  {
    slug: "art-cube-gallery",
    category: "animation",
    title: "创意 3D 魔方画廊",
    subtitle: "滚动驱动的 3D 立方体 · 深色/浅色主题",
    interactive: true,
    tags: ["3D", "Scroll", "Gallery", "CSS 3D"],
    demoPath: "/lab/demos/art-cube-gallery.html",
    previewBg: "#1c1814",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/art-cube-gallery",
    },
    publishedAt: "2026-06-01",
    summary:
      "滚动驱动的大型 3D 立方体画廊：六个面分别展示 AI 生成的艺术作品，滚动时立方体平滑旋转切换面，配有进度指示、深色/浅色主题切换和文字卡片。",
    analysis: [
      {
        heading: "滚动驱动动画",
        body: "使用 requestAnimationFrame 将滚动位置映射为立方体的 rotateX/rotateY 角度，配合 easeInOut 缓动实现流畅的翻面效果。",
      },
      {
        heading: "主题切换",
        body: "通过 data-theme 属性切换深色/浅色主题，图片也会随主题切换为对应的 dark/light 版本。",
      },
    ],
    useCases: ["创意作品集展示", "品牌故事页", "滚动交互教学案例"],
    techStack: ["HTML", "CSS 3D Transforms", "JavaScript", "IntersectionObserver"],
  },
  {
    slug: "fancy-avatar-hover",
    category: "animation",
    title: "鼠标悬停 3D 头像",
    subtitle: "CSS 3D 透视 · 悬停立体翻转",
    interactive: true,
    tags: ["CSS", "3D", "Hover", "Avatar"],
    demoPath: "/lab/demos/fancy-avatar-hover.html",
    previewBg: "#1a1a2e",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/fancy-avatar-hover-effect",
    },
    publishedAt: "2025-12-15",
    summary:
      "鼠标悬停时头像产生 3D 立体翻转效果，配合光影变化和视角跟随，让静态头像变得生动有趣。",
    analysis: [
      {
        heading: "3D 透视原理",
        body: "通过 CSS perspective 和 transform-style: preserve-3d 构建 3D 空间，鼠标位置映射为 rotateX/rotateY 角度。",
      },
      {
        heading: "光影跟随",
        body: "利用伪元素和渐变模拟光照，悬停时光源位置随鼠标移动变化，增强立体感。",
      },
    ],
    useCases: ["个人头像 / 团队展示", "作品集卡片", "用户资料页"],
    techStack: ["HTML", "CSS 3D Transforms", "CSS", "JavaScript"],
  },
  {
    slug: "play-othello",
    category: "animation",
    title: "黑白棋",
    subtitle: "Canvas 双人对战 · 简易 AI",
    interactive: true,
    tags: ["Game", "AI", "Canvas"],
    demoPath: "/lab/demos/play-othello.html",
    previewBg: "#42b964",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/play-othello-online",
    },
    publishedAt: "2025-11-27",
    summary:
      "经典黑白棋（Othello）游戏：8×8 棋盘，你和电脑轮流落子，包含计分板和胜负判定，AI 会优先抢占角落并评估对手走法。",
    analysis: [
      {
        heading: "AI 策略",
        body: "AI 使用两层搜索：先模拟己方走法，再预测对手的最佳回应，选择限制对手走法最多的落子位置，优先抢占角落。",
      },
      {
        heading: "走法验证",
        body: "每个落子需检查 8 个方向是否存在可翻转的棋子，通过循环遍历方向向量实现高效的合法性判断。",
      },
    ],
    useCases: ["站内小游戏", "AI 算法学习", "休闲娱乐"],
    techStack: ["HTML", "JavaScript", "jQuery", "AI"],
  },
  {
    slug: "css-3d-chess",
    category: "animation",
    title: "3D 国际象棋",
    subtitle: "纯 CSS 3D 国际象棋模型 · 自动旋转",
    tags: ["CSS", "3D", "Animation", "无 JS"],
    demoPath: "/lab/demos/css-3d-chess.html",
    previewBg: "#1d1e22",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/css-shi-xian-3d-guo-ji-xiang-qi-mo-xing",
    },
    publishedAt: "2025-11-26",
    summary:
      "纯 CSS 构建的 3D 国际象棋棋盘，包含全部 32 枚棋子的立体模型（兵、车、马、象、后、王），棋盘自动旋转展示，可开关动画。",
    analysis: [
      {
        heading: "纯 CSS 3D 建模",
        body: "每种棋子通过 CSS 伪元素和 transform 构建立体模型，兵、车、马等各有不同的几何结构，全部使用 CSS 而非 Three.js。",
      },
      {
        heading: "棋盘渲染",
        body: "使用 repeating-conic-gradient 生成 8×8 棋盘格，preserve-3d 保持 3D 空间，rotateX 实现俯视角度。",
      },
    ],
    useCases: ["CSS 3D 能力展示", "棋类主题页面装饰", "CSS 教学案例"],
    techStack: ["HTML", "CSS 3D Transforms", "@keyframes", "conic-gradient"],
  },
  {
    slug: "responsive-grid-gallery",
    category: "animation",
    title: "响应式网格画廊",
    subtitle: "CSS Grid 自适应布局 · 圆形焦点",
    tags: ["CSS", "Grid", "Responsive", "Gallery"],
    demoPath: "/lab/demos/responsive-grid-gallery.html",
    previewBg: "#000000",
    source: {
      name: "前端嘛 · Code Fun",
      url: "https://www.fecoder.cn/code-fun/responsive-grid-image-gallery",
    },
    publishedAt: "2025-10-30",
    summary:
      "纯 CSS Grid 实现的响应式图片画廊：移动端为 2 列瀑布流，桌面端自动重排为 4 列布局，最后一张图片以圆形焦点图突出显示。",
    analysis: [
      {
        heading: "响应式网格",
        body: "通过 @media 查询改变 grid-template-rows 和 grid-area 分配，实现移动端到桌面端的布局切换，无需 JavaScript。",
      },
      {
        heading: "图片处理",
        body: "使用 object-fit: cover 和 contain: size 防止图片溢出，object-position 控制焦点区域。",
      },
    ],
    useCases: ["摄影作品集", "电商商品展示", "博客文章配图"],
    techStack: ["HTML", "CSS Grid", "CSS", "Responsive"],
  },
  {
    slug: "virtual-list",
    title: "虚拟列表",
    subtitle: "1 万行数据只渲染可视区 · 滚动复用 DOM",
    category: "performance",
    interactive: true,
    tags: ["Performance", "Virtual List", "Scroll"],
    demoPath: "/lab/demos/virtual-list.html",
    previewBg: "#0b1220",
    publishedAt: "2026-08-03",
    summary:
      "模拟大列表场景：生成 10,000 条数据，但只渲染视口内 + overscan 的行。滚动时复用 DOM 节点，避免一次性插入数万节点导致卡顿。",
    analysis: [
      {
        heading: "为什么要虚拟化",
        body: "长列表的主要成本在 DOM 与布局，不是数据本身。只保持可视行，可以把渲染量从 O(n) 降到 O(视口)。",
      },
      {
        heading: "实现要点",
        body: "用绝对定位摆放可视行；根据 scrollTop 计算 startIndex；overscan 减少快速滚动时的白屏。",
      },
    ],
    useCases: ["运营后台大表格", "聊天记录 / 日志流", "移动端长列表性能优化"],
    techStack: ["HTML", "JavaScript", "DOM recycling"],
    techPoints: ["可视区 + overscan 渲染", "绝对定位复用行 DOM", "scrollTop → startIndex"],
  },
  {
    slug: "sse-stream",
    title: "SSE 流式输出",
    subtitle: "EventSource + Markdown 逐字渲染 · 可中断",
    category: "ai",
    interactive: true,
    tags: ["AI", "SSE", "Streaming", "Markdown"],
    demoPath: "/lab/demos/sse-stream.html",
    previewBg: "#111827",
    publishedAt: "2026-08-03",
    summary:
      "演示 AI 对话常用的 Server-Sent Events：前端用 EventSource 接收字节流，逐段拼接并做轻量 Markdown 渲染；支持中断。后端为 Next.js Route Handler。",
    analysis: [
      {
        heading: "为什么用 SSE",
        body: "相比 WebSocket，SSE 在「服务端 → 客户端单向流」场景更轻；HTTP 友好、重连语义清晰，适合 LLM token 流式输出。",
      },
      {
        heading: "前端体验",
        body: "流式拼接文本、粗粒度 Markdown（标题/代码块/粗体）、展示连接状态；关闭 EventSource 模拟用户点击停止。",
      },
    ],
    useCases: ["AI 对话流式回答", "日志 / 构建进度推送", "知识库问答演示"],
    techStack: ["EventSource", "SSE", "Next.js Route Handler", "Markdown"],
    techPoints: ["EventSource 消费 SSE", "流式拼接与可中断", "轻量 Markdown 渲染"],
  },
  {
    slug: "storage-playground",
    title: "Web Storage Playground",
    subtitle: "localStorage / sessionStorage 读写与差异",
    category: "browser",
    interactive: true,
    tags: ["Web API", "Storage", "Browser"],
    demoPath: "/lab/demos/storage-playground.html",
    previewBg: "#0c1222",
    publishedAt: "2026-08-04",
    summary:
      "对比 localStorage 与 sessionStorage 的写入、读取、清理与刷新后的持久化差异。适合讲清楚「浏览器状态放哪」这类基础工程题。",
    techPoints: [
      "Storage API 读写与枚举",
      "local vs session 生命周期",
      "配额失败时的错误处理",
    ],
    analysis: [
      {
        heading: "什么时候用哪种",
        body: "主题、语言偏好适合 localStorage；一次性向导状态更适合 sessionStorage。敏感令牌不要明文放 Storage。",
      },
      {
        heading: "工程注意点",
        body: "setItem 可能因配额抛错；读写都要做兜底。跨标签页可用 storage 事件同步（本 Demo 聚焦单页读写）。",
      },
    ],
    useCases: ["主题 / 语言偏好", "草稿与临时向导状态", "前端面试 Web API 演示"],
    techStack: ["localStorage", "sessionStorage", "Web API"],
  },
  {
    slug: "web-worker-sort",
    title: "Web Worker Sort",
    subtitle: "主线程卡顿 vs Worker 后台计算",
    category: "browser",
    interactive: true,
    tags: ["Web API", "Worker", "Performance"],
    demoPath: "/lab/demos/web-worker-sort.html",
    previewBg: "#0b1020",
    publishedAt: "2026-08-04",
    summary:
      "对大批量数组排序：放在主线程会卡住 Ping；放进 Worker 后 UI 仍可响应。用可感知的对比讲清「重计算离主线程」。",
    techPoints: [
      "Worker 创建与终止",
      "Transferable 传 ArrayBuffer",
      "主线程保活与卡顿对比",
    ],
    analysis: [
      {
        heading: "为什么 Worker 有用",
        body: "JS 主线程同时负责渲染与交互。重 CPU 任务会拖垮 FPS 与点击响应；Worker 把计算移出主线程。",
      },
      {
        heading: "传输细节",
        body: "本 Demo 用 transferable 转移 Float64Array buffer，避免结构化克隆大数组的额外拷贝成本。",
      },
    ],
    useCases: ["大数据预处理", "客户端加密 / 压缩", "解释长任务与卡顿成因"],
    techStack: ["Web Worker", "ArrayBuffer", "performance.now"],
  },
  {
    slug: "china-3d-map",
    category: "animation",
    title: "全国 3D 地图",
    subtitle: "省级轮廓挤出 · 悬停高亮 · 城际飞线",
    interactive: true,
    tags: ["Three.js", "GeoJSON", "Dataviz"],
    demoPath: "/lab/demos/china-3d-map.html",
    previewBg: "#050814",
    source: {
      name: "knight-L / sc-datav（思路参考）",
      url: "https://github.com/knight-L/sc-datav",
    },
    publishedAt: "2026-08-14",
    summary:
      "把中国省级 GeoJSON 挤出成 Three.js 三维地图：轨道旋转、省份悬停高亮、主要城市之间的飞线粒子。适合作为数据大屏方向的 Lab 起步版。",
    techPoints: [
      "GeoJSON Polygon / MultiPolygon → ExtrudeGeometry",
      "经纬度简易投影与挤出高度",
      "Raycaster 省份拾取与飞线动画",
    ],
    analysis: [
      {
        heading: "从 2D 边界到 3D 地图",
        body: "读取省级 FeatureCollection，将每个 ring 建成 Shape 再 Extrude；旋转到 XZ 平面后形成「地图地形」。全国数据比单省更密，边界可后续再做简化降面数。",
      },
      {
        heading: "交互与飞线",
        body: "Raycaster 做悬停高亮；城际飞线用二次贝塞尔曲线 + 沿曲线运动的点，模拟跨区域流向——先假数据，后续可接真实业务指标。",
      },
      {
        heading: "和 sc-datav 的关系",
        body: "灵感来自 sc-datav 的 3D 大屏路线（Three.js + 地理轮廓），本 Demo 改为全国省级，并做成可嵌入 Lab 的单页体验，未整仓引入其依赖。",
      },
    ],
    useCases: ["作品集展示数据可视化兴趣", "讲解 GeoJSON → 3D 管线", "后续扩展省下钻 / 真实指标大屏"],
    techStack: ["Three.js", "GeoJSON", "OrbitControls", "Raycaster"],
  },
];

export function getLabEffect(slug: string) {
  return labEffects.find((e) => e.slug === slug);
}

export function getAllLabSlugs() {
  return labEffects.map((e) => e.slug);
}

export function getLabEffectsByCategory(category: LabCategory | "all") {
  if (category === "all") return labEffects;
  return labEffects.filter((e) => e.category === category);
}
