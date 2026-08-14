import type { Locale } from "@/i18n/config";

/** Localize open-ended date markers in period strings. */
export function localizePeriod(period: string, locale: Locale): string {
  if (locale === "zh") {
    return period.replace(/\bPresent\b/g, "至今");
  }
  return period.replace(/至今/g, "Present");
}
