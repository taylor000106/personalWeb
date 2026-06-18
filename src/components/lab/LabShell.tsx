import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Taylor";

export function LabShell({
  children,
  backHref = "/lab",
  backLabel = "返回合集",
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="min-h-screen bg-[#05050c] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05050c]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-widest uppercase text-violet-300">
            {siteName}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href={backHref} className="text-zinc-400 hover:text-white transition-colors">
              ← {backLabel}
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              首页
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/20 px-3 py-1.5 text-zinc-200 hover:bg-white/10 transition-colors"
            >
              登录
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
