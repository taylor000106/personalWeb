"use client";

import Link from "next/link";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/LanguageProvider";

export function ContactSection() {
  const { t } = useI18n();

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-5xl px-6 py-16">
      <div className="border-t border-white/10 pt-12 text-center">
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500">
          {t.contact.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-300 hover:text-violet-200"
          >
            GitHub
          </a>
          <Link href="/assistant" className="text-violet-300 hover:text-violet-200">
            {t.nav.assistant}
          </Link>
          {profile.email ? (
            <a
              href={`mailto:${profile.email}`}
              className="text-violet-300 hover:text-violet-200"
            >
              {profile.email}
            </a>
          ) : null}
        </div>
        <p className="mt-4 text-xs text-zinc-600">{profile.location}</p>
      </div>
    </section>
  );
}
