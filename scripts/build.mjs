import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, "..")
const entryFile = resolve(rootDir, "src/gui.ts")
const outDir = resolve(rootDir, "dist")
const outFile = resolve(outDir, "gui-experimental.cjs")

const EXTERNALS = [
  "@opencode/plugin/gui",
  "@opencode/plugin/gui/main",
  "@opencode/plugin/gui/file",
  "@opencode/plugin/gui/review",
  "@opencode/plugin/gui/browser",
  "@opencode/plugin/rpc",
  "@opencode/schema/rpc",
  "@opencode/client",
  "@opencode/client/effect",
  "@opencode/client/solid",
  "effect",
  "solid-js",
  "solid-js/web",
  "solid-js/store",
]

async function run() {
  mkdirSync(outDir, { recursive: true })

  if (typeof globalThis.Bun !== "undefined") {
    const result = await globalThis.Bun.build({
      entrypoints: [entryFile],
      outdir: outDir,
      naming: "gui-experimental.cjs",
      format: "cjs",
      target: "browser",
      external: EXTERNALS,
      minify: false,
    })
    if (!result.success) {
      console.error("Build failed:", result.logs)
      process.exit(1)
    }
    console.log(`Built ${outFile} via Bun.build`)
    return
  }

  // Fallback: invoke OpenCode Desktop's embedded Bun runtime via BUN_BE_BUN=1
  const cliPath = resolve(
    process.env.LOCALAPPDATA ?? "",
    "Programs/ai.opencode.desktop/resources/opencode-cli.exe",
  )

  if (!existsSync(cliPath)) {
    throw new Error(`Cannot find Bun or OpenCode CLI at ${cliPath}`)
  }

  const res = spawnSync(cliPath, [fileURLToPath(import.meta.url)], {
    cwd: rootDir,
    env: { ...process.env, BUN_BE_BUN: "1" },
    stdio: "inherit",
  })

  if (res.status !== 0) {
    process.exit(res.status ?? 1)
  }
}

run()
