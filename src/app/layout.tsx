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
    default: `${siteName} · Frontend Engineer`,
    template: `%s · ${siteName}`,
  },
  description:
    "AI-powered Frontend Developer Portfolio & Knowledge Platform — Vue / React / Next.js · Lab · AI Assistant",
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
