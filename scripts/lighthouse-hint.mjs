/**
 * Print how to run Lighthouse against production or a local production server.
 *
 * Usage:
 *   npm run lighthouse
 *   LIGHTHOUSE_URL=https://yywtaylor.cyou npm run lighthouse
 */
const url = (process.env.LIGHTHOUSE_URL || "https://yywtaylor.cyou").replace(/\/$/, "");

console.log(`
Lighthouse checklist
--------------------
Production (recommended):
  npx lighthouse ${url}/ --only-categories=performance,accessibility,best-practices,seo --view
  npx lighthouse ${url}/assistant --only-categories=performance,accessibility,best-practices,seo --view
  npx lighthouse ${url}/lab --only-categories=performance,accessibility,best-practices,seo --view

Local production build:
  npm run build && npm run start
  LIGHTHOUSE_URL=http://127.0.0.1:3000 npm run lighthouse

Archive notes:
  docs/lighthouse.md
  docs/lighthouse-raw/*.json

Bundle analysis:
  ANALYZE=1 npm run build

Web Vitals on the site:
  Open / → scroll & interact → Performance section shows live LCP/CLS/INP
  + archived Lighthouse table (production scores)
`);
