// NusaStat hand-in program (Node 22, standard library only).
//
// The entry is a static site under app/ plus 3-4 screenshots under
// screenshots/. This program hands them in: it copies both folders into
// the output directory and writes dossier.json there, using the kit's
// vendored library (vendor/makefun-frontend.ts, copied unchanged from the
// kit). The grader runs this program twice and requires identical bytes.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const root = fileURLToPath(new URL(".", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const appDir = join(root, "app");
const shotsDir = join(root, "screenshots");

mkdirSync(outDir, { recursive: true });
cpSync(appDir, join(outDir, "app"), { recursive: true });
mkdirSync(join(outDir, "screenshots"), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outDir, "screenshots"), { recursive: true });
}

// Caps mirror the gate: at most 4 screenshots of 256 KiB, app/ at most
// 993 entries and 16 MiB, dossier text at most 160 KiB.
writeFileSync(
  join(outDir, "dossier.json"),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
