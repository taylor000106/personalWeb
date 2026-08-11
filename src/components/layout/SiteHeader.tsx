"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/LanguageProvider";

const linkClass = "text-zinc-400 transition-colors hover:text-white";
const activeClass = "text-white";

export function SiteHeader() {
  const { t } = useI18n();
  const pathname = usePathname();
  const onLab = pathname === "/lab" || pathname.startsWith("/lab/");
  const onAssistant = pathname === "/assistant" || pathname.startsWith("/assistant/");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05050c]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-violet-300"
        >
          {profile.name}
        </Link>
        <nav className="flex items-center gap-3 text-sm sm:gap-4">
          <Link href="/#projects" className={linkClass}>
            {t.nav.projects}
          </Link>
          <Link href="/lab" className={onLab ? activeClass : linkClass}>
            {t.nav.lab}
          </Link>
          <Link
            href="/assistant"
            className={`hidden sm:inline ${onAssistant ? activeClass : linkClass}`}
          >
            {t.nav.assistant}
          </Link>
          <LanguageToggle />
          <Link
            href="/login"
            className="rounded-full bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-violet-100"
          >
            {t.nav.login}
          </Link>
        </nav>
      </div>
    </header>
  );
}
