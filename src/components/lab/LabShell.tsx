"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useI18n } from "@/i18n/LanguageProvider";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Taylor";

export function LabShell({
  children,
  backHref = "/lab",
  backLabel,
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  const { t } = useI18n();
  const label = backLabel ?? t.lab.back;

  return (
    <div className="min-h-screen bg-[#05050c] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05050c]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-widest text-violet-300 uppercase"
          >
            {siteName}
          </Link>
          <nav className="flex items-center gap-3 text-sm sm:gap-4">
            <Link
              href={backHref}
              className="text-zinc-400 transition-colors hover:text-white"
            >
              ← {label}
            </Link>
            <Link href="/" className="text-zinc-400 transition-colors hover:text-white">
              {t.nav.home}
            </Link>
            <Link
              href="/assistant"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              {t.nav.assistant}
            </Link>
            <LanguageToggle />
            <Link
              href="/login"
              className="rounded-full border border-white/20 px-3 py-1.5 text-zinc-200 transition-colors hover:bg-white/10"
            >
              {t.nav.login}
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
