"use client";

import { useReportWebVitals } from "next/web-vitals";

type VitalName = "CLS" | "FCP" | "INP" | "LCP" | "TTFB";

const STORAGE_KEY = "pw-web-vitals";

function persist(name: string, value: number, rating: string) {
  try {
    const prev = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as Record<
      string,
      { value: number; rating: string; at: number }
    >;
    prev[name] = { value, rating, at: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    window.dispatchEvent(new CustomEvent("pw:vitals", { detail: prev }));
  } catch {
    // ignore
  }
}

/**
 * Collects Core Web Vitals via Next.js helper.
 * Values are stored in sessionStorage for the homepage Vitals panel.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const name = metric.name as VitalName | string;
    if (!["CLS", "FCP", "INP", "LCP", "TTFB"].includes(name)) return;
    persist(name, metric.value, metric.rating);
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[web-vital] ${name}`,
        metric.value.toFixed(name === "CLS" ? 3 : 0),
        metric.rating,
      );
    }
  });

  return null;
}

export function readStoredVitals() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as Record<
      string,
      { value: number; rating: string; at: number }
    >;
  } catch {
    return {};
  }
}

export function formatVital(name: string, value: number) {
  if (name === "CLS") return value.toFixed(3);
  if (value >= 1000) return `${(value / 1000).toFixed(2)}s`;
  return `${Math.round(value)}ms`;
}
