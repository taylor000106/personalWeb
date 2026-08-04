import { spawnSync } from "node:child_process";

process.env.ANALYZE = "1";
const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  env: process.env,
  shell: true,
});
process.exit(result.status ?? 1);
