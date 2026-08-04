import bcrypt from "bcryptjs";

const password = process.argv.slice(2).join(" ").trim();
if (!password) {
  console.error("Usage: npm run hash-password -- your-plain-password");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const escaped = hash.replaceAll("$", "\\$");
console.log("\nPut this into .env.local (escaped for Next.js):\n");
console.log(`ADMIN_PASSWORD=${escaped}`);
console.log("\nRaw hash (do not paste unescaped into .env):\n");
console.log(hash);
console.log("");
