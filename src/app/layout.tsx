import type { Metadata } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { WebVitalsReporter } from "@/components/performance/WebVitalsReporter";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Taylor";

export const metadata: Metadata = {
  title: {
    default: `${siteName} · 前端开发工程师`,
    template: `%s · ${siteName}`,
  },
  description:
    "前端开发工程师作品集与知识平台 — Vue / React / Next.js · 实验室 · AI 助手",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <WebVitalsReporter />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
