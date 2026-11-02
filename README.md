# Claude Code Theme for OpenCode (`claude-code-theme`)

**English** | **[简体中文](./README_CN.md)**

Anthropic **Claude Code** / **Claude.ai** warm editorial appearance plugin for **OpenCode Desktop V2 (`v2.2.1+`)** and **OpenCode TUI**.

Designed around Anthropic's signature **Claude Clay (`#262624` warm coal / `#FAF9F5` parchment paper / `#D97757` terracotta clay)** palette, featuring a dual-layer V1 + V2 OKLCH token engine, signature component micro-styling, and a dedicated reactive Settings page.

---

## ✨ Features

1. **Dual-Layer Color Engine (`L1`)**
   - Generates all **~260 V1 (`--background-*`, `--surface-*`, `--text-*`, `--border-*`, `--icon-*`, `--syntax-*`, `--markdown-*`)** and **V2 (`--bg-surface-*`, `--text-on-*`, `--border-outline-*`, `--action-fill-*`, `--palette-*`)** CSS variables using OpenCode Desktop's OKLCH perceptual color pipeline.
   - Automatically adapts to OpenCode Desktop's Dark / Light / System color scheme via `:root[data-color-scheme="dark"]` and `:root[data-color-scheme="light"]`.

2. **4 Built-in Claude Color Presets**
   - **Claude Clay (Default)**: Warm coal `#262624` dark & `#FAF9F5` parchment light with `#D97757` terracotta clay.
   - **Claude Slate**: Deep ink `#141413` dark & warm stone `#F0EEE6` light with `#C6613F` cinnabar.
   - **Editorial Parchment**: Literary paper warmth (`#2B2926` / `#F7F3E8`) with soft kraft & sepia undertones.
   - **Claude Studio Crisp**: High-contrast obsidian `#111110` & studio white `#FFFFFF` with crisp borders.

3. **5 Brand Accent Tones & 3 Border Contrast Levels**
   - **Accents**: Terracotta (`#D97757`), Cinnabar (`#C6613F`), Kraft Gold (`#D4A27F`), Sage Olive (`#A5B98C`), Editorial Fig (`#D990AA`).
   - **Border Contrast**: Soft, Balanced, Crisp.

4. **Signature Component Micro-Styling (`L2`)** *(individually toggleable)*
   - **Composer Card Polish**: Floating `14px` rounded `[data-component="dock-prompt"]`, warm focus glow, and terracotta submit button.
   - **Tool Call Card Refinement**: Monospace parameter subtitles, warm surface transitions, and terracotta left guide rail on expanded tool cards.
   - **Reasoning / Thinking Editorial Rail**: Terracotta-tinted vertical guide rail and warm book-paper gradient for model thinking blocks.
   - **Recessed Terminal & Code Wells**: Deep warm coal (`#1C1B1A`) / paper well (`#F2EFE6`) for terminal output and code blocks.
   - **User Message Bubble & Inline Code**: Warm clay-tinted user message bubbles, inline code pills, and editorial blockquotes.
   - **Editorial Serif Headings**: Literary serif typography (`Copernicus`, `Newsreader`, `Tiempos Text`, `Georgia`, `Songti SC`) for Markdown H1/H2 headings.

5. **Dedicated Settings Page & Command Palette (`L4`)**
   - Adds **Claude Code 主题 (`Claude Code Theme`)** to OpenCode Desktop's left Settings sidebar (with full global settings search indexing and `zh` / `zht` / `en` localization).
   - Persists preferences in `Store.global`.
   - Registers 3 Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) commands:
     - `Claude Theme: Open Appearance Settings` (`claude-code-theme:open-settings`)
     - `Claude Theme: Toggle Enable / Disable` (`claude-code-theme:toggle`)
     - `Claude Theme: Cycle Color Preset` (`claude-code-theme:cycle-preset`)

---

## 🚀 Installation

### 1. OpenCode Desktop GUI Plugin

Clone this repository locally and add its path to your `~/.config/opencode/opencode.jsonc` (or `opencode.json`):

```bash
git clone https://github.com/SunWH-howell/ClaudeTheme-for-opencode.git
```

In `~/.config/opencode/opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "/absolute/path/to/ClaudeTheme-for-opencode"
  ]
}
```

Then reload OpenCode (`opencode reload` or restart OpenCode Desktop) and open **Settings → Claude Code 主题** to customize presets, accents, and component styles in real time.

### 2. Standalone Theme JSON (TUI & Desktop Theme Picker)

You can also copy `themes/claude-clay.json` into `~/.config/opencode/themes/claude-clay.json` to select **Claude Clay** directly in the TUI (`/theme`) or `~/.config/opencode/cli.json`:

```json
{
  "$schema": "https://opencode.ai/v2/cli.json",
  "theme": {
    "name": "claude-clay"
  }
}
```

---

## 📁 Directory Structure

```text
ClaudeTheme-for-opencode/
├── package.json              # Exports ./gui-experimental -> ./dist/gui-experimental.cjs
├── tsconfig.json
├── scripts/
│   └── build.mjs             # Bundles src/gui.ts into dist/gui-experimental.cjs via Bun
├── src/
│   ├── schema.ts             # Effect Schema store definition & preset/accent metadata
│   ├── palettes.ts           # OKLCH color math + V1/V2 token generator + Claude palettes
│   ├── styles.ts             # Reactive CSS builder (tokens + component polish + settings UI)
│   ├── settings-page.ts      # Solid-reactive SettingsPage renderer
│   └── gui.ts                # Plugin.define entry (Store, Style, SettingsPage, Command, i18n)
├── themes/
│   └── claude-clay.json      # Reference standalone OpenCode desktop/TUI theme JSON
└── dist/
    └── gui-experimental.cjs  # Prebuilt GUI bundle loaded by OpenCode Desktop
```

---

## 🛠️ Building from Source

```bash
npm run build
# or
bun ./scripts/build.mjs
```

## 📄 License

[MIT](./LICENSE)
