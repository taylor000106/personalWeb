type Box = { x: number; y: number; w: number; h: number; label: string; sub?: string };

function Node({ box, accent = "#7c3aed" }: { box: Box; accent?: string }) {
  return (
    <g>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={8}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={1}
      />
      <line
        x1={box.x}
        y1={box.y}
        x2={box.x + 28}
        y2={box.y}
        stroke={accent}
        strokeWidth={2}
      />
      <text
        x={box.x + 14}
        y={box.sub ? box.y + box.h / 2 - 4 : box.y + box.h / 2 + 4}
        fill="#e4e4e7"
        fontSize={13}
        fontFamily="var(--font-display), sans-serif"
      >
        {box.label}
      </text>
      {box.sub ? (
        <text
          x={box.x + 14}
          y={box.y + box.h / 2 + 14}
          fill="#71717a"
          fontSize={11}
          fontFamily="var(--font-sans), sans-serif"
        >
          {box.sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const midY = (y1 + y2) / 2;
  return (
    <g stroke="#52525b" strokeWidth={1.25} fill="none">
      <path d={`M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`} />
      <path d={`M ${x2 - 4} ${y2 - 6} L ${x2} ${y2} L ${x2 + 4} ${y2 - 6}`} />
    </g>
  );
}

function DiagramShell({
  title,
  children,
  viewBox = "0 0 640 320",
}: {
  title: string;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <div className="overflow-hidden border border-white/10 bg-[#080812]">
      <div className="border-b border-white/10 px-4 py-2.5">
        <p className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">{title}</p>
      </div>
      <svg viewBox={viewBox} className="h-auto w-full" role="img" aria-label={title}>
        {children}
      </svg>
    </div>
  );
}

/** Personal AI Platform: presentation → app layers → data/AI */
export function PersonalWebDiagram() {
  return (
    <DiagramShell title="Layered architecture · data flow">
      <Node box={{ x: 220, y: 16, w: 200, h: 44, label: "Visitor / Recruiter" }} />
      <Arrow x1={320} y1={60} x2={160} y2={92} />
      <Arrow x1={320} y1={60} x2={480} y2={92} />

      <Node
        box={{
          x: 40,
          y: 92,
          w: 240,
          h: 52,
          label: "Public App Router",
          sub: "Portfolio · Lab · Assistant",
        }}
        accent="#7c3aed"
      />
      <Node
        box={{
          x: 360,
          y: 92,
          w: 240,
          h: 52,
          label: "Private Dashboard",
          sub: "JWT · Notes · Links",
        }}
        accent="#8b5cf6"
      />

      <Arrow x1={160} y1={144} x2={160} y2={176} />
      <Arrow x1={480} y1={144} x2={480} y2={176} />

      <Node
        box={{
          x: 40,
          y: 176,
          w: 240,
          h: 52,
          label: "AI Path",
          sub: "Knowledge → Retrieve → SSE",
        }}
        accent="#06b6d4"
      />
      <Node
        box={{
          x: 360,
          y: 176,
          w: 240,
          h: 52,
          label: "API + Repository",
          sub: "Zod · Rate limit · SQLite",
        }}
        accent="#22c55e"
      />

      <Arrow x1={160} y1={228} x2={250} y2={260} />
      <Arrow x1={480} y1={228} x2={390} y2={260} />

      <Node
        box={{
          x: 170,
          y: 260,
          w: 300,
          h: 44,
          label: "Content (Git)  +  data/site.db",
          sub: undefined,
        }}
        accent="#a78bfa"
      />
    </DiagramShell>
  );
}

/** ChatAI: multi-end clients → shared core → adapters */
export function ChatAIDiagram() {
  return (
    <DiagramShell title="Multi-end flow · shared core">
      <Node
        box={{ x: 24, y: 24, w: 120, h: 40, label: "Mini Program" }}
        accent="#0e7490"
      />
      <Node box={{ x: 168, y: 24, w: 100, h: 40, label: "App" }} accent="#0e7490" />
      <Node box={{ x: 292, y: 24, w: 100, h: 40, label: "H5" }} accent="#0e7490" />
      <Node box={{ x: 416, y: 24, w: 100, h: 40, label: "PC" }} accent="#0e7490" />
      <Node box={{ x: 540, y: 24, w: 76, h: 40, label: "Electron" }} accent="#0e7490" />

      {[84, 218, 342, 466, 578].map((x) => (
        <Arrow key={x} x1={x} y1={64} x2={320} y2={100} />
      ))}

      <Node
        box={{
          x: 160,
          y: 100,
          w: 320,
          h: 56,
          label: "uni-app / Vue business layer",
          sub: "Chat session · message list · send/stop",
        }}
        accent="#14b8a6"
      />

      <Arrow x1={240} y1={156} x2={160} y2={196} />
      <Arrow x1={320} y1={156} x2={320} y2={196} />
      <Arrow x1={400} y1={156} x2={480} y2={196} />

      <Node
        box={{
          x: 40,
          y: 196,
          w: 180,
          h: 52,
          label: "SSE / WebSocket",
          sub: "stream · reconnect",
        }}
        accent="#06b6d4"
      />
      <Node
        box={{
          x: 240,
          y: 196,
          w: 160,
          h: 52,
          label: "Auth adapter",
          sub: "per-end login",
        }}
        accent="#6366f1"
      />
      <Node
        box={{
          x: 420,
          y: 196,
          w: 180,
          h: 52,
          label: "Payment adapter",
          sub: "WX / Alipay / Apple",
        }}
        accent="#8b5cf6"
      />

      <text x={320} y={290} textAnchor="middle" fill="#71717a" fontSize={11}>
        One conversation model · platform-specific edges
      </text>
    </DiagramShell>
  );
}

/** WeCom SCRM: surfaces → app → reusable capabilities */
export function WeComScrMDiagram() {
  return (
    <DiagramShell title="Product surfaces · capability reuse">
      <Node
        box={{
          x: 60,
          y: 20,
          w: 220,
          h: 48,
          label: "PC Ops Console",
          sub: "Element Plus · tables · forms",
        }}
        accent="#5b21b6"
      />
      <Node
        box={{
          x: 360,
          y: 20,
          w: 220,
          h: 48,
          label: "WeChat H5",
          sub: "Vant · campaign flows",
        }}
        accent="#7c3aed"
      />

      <Arrow x1={170} y1={68} x2={320} y2={108} />
      <Arrow x1={470} y1={68} x2={320} y2={108} />

      <Node
        box={{
          x: 160,
          y: 108,
          w: 320,
          h: 52,
          label: "Vue3 + TypeScript app shell",
          sub: "Pinia · request layer · shared types",
        }}
        accent="#8b5cf6"
      />

      <Arrow x1={220} y1={160} x2={140} y2={200} />
      <Arrow x1={320} y1={160} x2={320} y2={200} />
      <Arrow x1={420} y1={160} x2={500} y2={200} />

      <Node
        box={{
          x: 24,
          y: 200,
          w: 180,
          h: 52,
          label: "Cycle Task kit",
          sub: "群发 / 单发 / 朋友圈",
        }}
        accent="#22c55e"
      />
      <Node
        box={{
          x: 230,
          y: 200,
          w: 180,
          h: 52,
          label: "Data & lists",
          sub: "virtual list · charts",
        }}
        accent="#06b6d4"
      />
      <Node
        box={{
          x: 436,
          y: 200,
          w: 180,
          h: 52,
          label: "Backend APIs",
          sub: "migrate-friendly",
        }}
        accent="#a78bfa"
      />

      <text x={320} y={290} textAnchor="middle" fill="#71717a" fontSize={11}>
        Shared domain · different interaction shells
      </text>
    </DiagramShell>
  );
}

/** Simple admin stack for archive projects */
export function AdminStackDiagram({
  title,
  top,
  mid,
  bottom,
}: {
  title: string;
  top: string;
  mid: string;
  bottom: string;
}) {
  return (
    <DiagramShell title={title} viewBox="0 0 640 260">
      <Node box={{ x: 180, y: 24, w: 280, h: 44, label: top }} accent="#64748b" />
      <Arrow x1={320} y1={68} x2={320} y2={100} />
      <Node box={{ x: 180, y: 100, w: 280, h: 44, label: mid }} accent="#0f766e" />
      <Arrow x1={320} y1={144} x2={320} y2={176} />
      <Node box={{ x: 180, y: 176, w: 280, h: 44, label: bottom }} accent="#1d4ed8" />
    </DiagramShell>
  );
}

const diagrams: Record<string, () => React.ReactNode> = {
  "personal-web": () => <PersonalWebDiagram />,
  chatai: () => <ChatAIDiagram />,
  linkwechat: () => <WeComScrMDiagram />,
  "prm-license": () => (
    <AdminStackDiagram
      title="Role views · license flow"
      top="Admin / Dealer / Distributor UIs"
      mid="Vue2 + Element · permission routes"
      bottom="Orders · codes · inventory APIs"
    />
  ),
  "kms-console": () => (
    <AdminStackDiagram
      title="Ops console · device path"
      top="Device / Image / Policy screens"
      mid="Vue admin shell · query tables"
      bottom="KMS activate · terminal control APIs"
    />
  ),
  "toc-cms": () => (
    <AdminStackDiagram
      title="Catalog CMS · publish path"
      top="App / carousel / QR ops screens"
      mid="Vue forms · upload · listing switches"
      bottom="Catalog & device content APIs"
    />
  ),
};

export function ProjectArchitectureDiagram({ projectId }: { projectId: string }) {
  const render = diagrams[projectId];
  if (!render) return null;
  return <div className="mt-4">{render()}</div>;
}

export function hasArchitectureDiagram(projectId: string) {
  return Boolean(diagrams[projectId]);
}
