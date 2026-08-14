import bcrypt from "bcryptjs";

const password = process.argv.slice(2).join(" ").trim();
if (!password) {
  console.error("Usage: npm run hash-password -- your-plain-password");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const nextEscaped = hash.replaceAll("$", "\\$");
const composeEscaped = hash.replaceAll("$", () => "$$");
const b64 = Buffer.from(hash, "utf8").toString("base64");

console.log("\n=== Recommended (works in Next.js + Docker, no $ escaping) ===\n");
console.log(`ADMIN_PASSWORD=b64:${b64}`);

console.log("\n=== Or: Next.js .env.local (escape $ as \\$) ===\n");
console.log(`ADMIN_PASSWORD=${nextEscaped}`);

console.log("\n=== Or: Docker Compose .env (escape $ as $$) ===\n");
console.log(`ADMIN_PASSWORD=${composeEscaped}`);

console.log("\n=== Raw hash (debug only) ===\n");
console.log(hash);
console.log("");
