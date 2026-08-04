/**
 * Print how to run Lighthouse against a local production server.
 * Kept as docs-in-script so CI stays light; run manually when needed.
 *
 * Usage:
 *   npm run build && npm run start
 *   npm run lighthouse
 */
const url = process.env.LIGHTHOUSE_URL || "http://127.0.0.1:3000";

console.log(`
Lighthouse checklist (P3)
-------------------------
1. Terminal A:  npm run build && npm run start
2. Terminal B:  npx lighthouse ${url} --only-categories=performance,accessibility,best-practices,seo --view

Bundle analysis:
  ANALYZE=1 npm run build

Web Vitals on the site:
  Open /  → scroll & interact → Performance section shows live LCP/CLS/INP
`);
