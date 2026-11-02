import { generateV1Tokens, generateV2Tokens, resolveVariantSpec } from "./palettes"
import type { ClaudeThemeSettings } from "./schema"

function formatTokenBlock(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n")
}

function buildSettingsPageUiCss(): string {
  return `
/* === Claude Code Theme Settings Page UI === */
.claude-theme-banner {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 18px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: var(--v2-background-bg-layer-01);
  border: 1px solid var(--v2-border-border-base);
  box-shadow: var(--v2-elevation-raised);
}

.claude-theme-banner-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.claude-theme-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.claude-theme-emblem {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #D97757 0%, #A7472A 100%);
  color: #FAF9F5;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.02em;
  box-shadow: 0 2px 6px rgba(217, 119, 87, 0.28);
  flex-shrink: 0;
}

.claude-theme-brand-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.claude-theme-brand-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--v2-text-text-base);
  display: flex;
  align-items: center;
  gap: 8px;
}

.claude-theme-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  background: color-mix(in srgb, #D97757 15%, transparent);
  color: var(--v2-text-text-accent, #D97757);
  border: 1px solid color-mix(in srgb, #D97757 32%, transparent);
}

.claude-theme-brand-subtitle {
  font-size: 12px;
  color: var(--v2-text-text-muted);
}

.claude-swatch-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 6px;
  border-top: 1px solid var(--v2-border-border-muted);
}

.claude-swatch-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px 3px 5px;
  border-radius: 6px;
  background: var(--v2-background-bg-layer-02);
  border: 1px solid var(--v2-border-border-muted);
  font-size: 11px;
  font-family: var(--font-family-mono, ui-monospace, monospace);
  color: var(--v2-text-text-muted);
}

.claude-swatch-dot {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  border: 1px solid rgba(128, 128, 128, 0.28);
  flex-shrink: 0;
}

.claude-preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 6px;
}

.claude-preset-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 13px;
  border-radius: 10px;
  background: var(--v2-background-bg-layer-01);
  border: 1px solid var(--v2-border-border-base);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, background-color 0.15s ease, transform 0.12s ease;
}

.claude-preset-card:hover {
  background: var(--v2-background-bg-layer-02);
  border-color: var(--v2-border-border-strong);
}

.claude-preset-card[data-active="true"] {
  border-color: var(--claude-accent, #D97757);
  background: color-mix(in srgb, var(--claude-accent, #D97757) 8%, var(--v2-background-bg-layer-01));
  box-shadow: 0 0 0 1px var(--claude-accent, #D97757);
}

.claude-preset-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.claude-preset-card-title {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--v2-text-text-base);
}

.claude-preset-card-desc {
  font-size: 11.5px;
  line-height: 1.4;
  color: var(--v2-text-text-muted);
}

.claude-preset-mini-palettes {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.claude-preset-mini-dot {
  width: 13px;
  height: 13px;
  border-radius: 999px;
  border: 1px solid rgba(128, 128, 128, 0.35);
}

.claude-pill-group {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.claude-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  color: var(--v2-text-text-muted);
  background: var(--v2-background-bg-layer-02);
  border: 1px solid var(--v2-border-border-base);
  cursor: pointer;
  transition: all 0.14s ease;
}

.claude-pill-btn:hover {
  color: var(--v2-text-text-base);
  border-color: var(--v2-border-border-strong);
}

.claude-pill-btn[data-active="true"] {
  color: var(--v2-text-text-base);
  background: color-mix(in srgb, var(--claude-accent, #D97757) 15%, var(--v2-background-bg-layer-02));
  border-color: var(--claude-accent, #D97757);
}

.claude-toggle-btn {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: var(--v2-background-bg-layer-03);
  border: 1px solid var(--v2-border-border-base);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.16s ease, border-color 0.16s ease;
  flex-shrink: 0;
}

.claude-toggle-btn[data-checked="true"] {
  background: var(--claude-accent, #D97757);
  border-color: var(--claude-accent, #D97757);
}

.claude-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #FAF9F5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.28);
  transition: transform 0.16s cubic-bezier(0.22, 1, 0.36, 1);
}

.claude-toggle-btn[data-checked="true"] .claude-toggle-thumb {
  transform: translateX(16px);
}

.claude-reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  color: var(--v2-text-text-base);
  background: var(--v2-background-bg-layer-02);
  border: 1px solid var(--v2-border-border-base);
  cursor: pointer;
  transition: background-color 0.14s ease, border-color 0.14s ease;
}

.claude-reset-btn:hover {
  background: var(--v2-background-bg-layer-03);
  border-color: var(--v2-border-border-strong);
}
`
}

export function buildClaudeCodeStyles(settings: ClaudeThemeSettings): string {
  const settingsUiCss = buildSettingsPageUiCss()
  if (!settings.enabled) {
    return settingsUiCss
  }

  const darkSpec = resolveVariantSpec(settings, true)
  const lightSpec = resolveVariantSpec(settings, false)

  const darkV1 = generateV1Tokens(darkSpec, true)
  const darkV2 = generateV2Tokens(darkSpec, true)
  const lightV1 = generateV1Tokens(lightSpec, false)
  const lightV2 = generateV2Tokens(lightSpec, false)

  const darkCustomVars: Record<string, string> = {
    "claude-accent": darkSpec.surfaces.accentPrimary,
    "claude-accent-hover": darkSpec.surfaces.accentHover,
    "claude-accent-soft": darkSpec.surfaces.accentSoftBg,
    "claude-terminal-bg": darkSpec.surfaces.terminalBg,
    "claude-composer-bg": darkSpec.surfaces.composerBg,
    "claude-fig": "#D990AA",
    "claude-kraft": "#D4A27F",
    "claude-olive": "#A5B98C",
    "claude-slate-blue": "#8FB0CE",
    "claude-heather": "#CBCADB",
    "claude-rust": "#E88875",
  }

  const lightCustomVars: Record<string, string> = {
    "claude-accent": lightSpec.surfaces.accentPrimary,
    "claude-accent-hover": lightSpec.surfaces.accentHover,
    "claude-accent-soft": lightSpec.surfaces.accentSoftBg,
    "claude-terminal-bg": lightSpec.surfaces.terminalBg,
    "claude-composer-bg": lightSpec.surfaces.composerBg,
    "claude-fig": "#8A3858",
    "claude-kraft": "#7D573B",
    "claude-olive": "#4F653A",
    "claude-slate-blue": "#3F5F87",
    "claude-heather": "#5A5780",
    "claude-rust": "#9A3E35",
  }

  const sections: string[] = [
    settingsUiCss,
    `/* === Claude Code Theme: Dual-Layer V1 + V2 Token Overrides === */
:root[data-color-scheme="dark"],
:root:not([data-color-scheme]) {
${formatTokenBlock(darkV1)}
${formatTokenBlock(darkV2)}
${formatTokenBlock(darkCustomVars)}
}

:root[data-color-scheme="light"] {
${formatTokenBlock(lightV1)}
${formatTokenBlock(lightV2)}
${formatTokenBlock(lightCustomVars)}
}

html[data-color-scheme="dark"],
html[data-color-scheme="dark"] body {
  background-color: ${darkSpec.surfaces.bgBase} !important;
  color: ${darkSpec.surfaces.textBase};
}

html[data-color-scheme="light"],
html[data-color-scheme="light"] body {
  background-color: ${lightSpec.surfaces.bgBase} !important;
  color: ${lightSpec.surfaces.textBase};
}

::selection {
  background-color: color-mix(in srgb, var(--claude-accent) 28%, transparent);
  color: var(--v2-text-text-base);
}`,
  ]

  if (settings.editorialTypography) {
    sections.push(`
/* === Claude Code Editorial Typography & Warm Monospace Rhythm === */
:root[data-color-scheme="dark"],
:root[data-color-scheme="light"] {
  --claude-font-editorial: "Copernicus", "Iowan Old Style", "Newsreader", "Source Serif 4", "Charter", Georgia, "Songti SC", "Noto Serif SC", serif;
}

[data-component="markdown"] {
  line-height: 1.65;
  letter-spacing: -0.004em;
}

[data-component="markdown"] h1,
[data-component="markdown"] h2 {
  font-family: var(--claude-font-editorial);
  font-weight: 600;
  letter-spacing: -0.018em;
  color: var(--v2-text-text-base);
}

[data-component="markdown"] h3 {
  letter-spacing: -0.012em;
  font-weight: 600;
}

[data-slot="basic-tool-tool-title"],
[data-slot="basic-tool-tool-subtitle"] {
  font-feature-settings: "zero" 1, "ss01" 1;
}`)
  }

  if (settings.composerPolish) {
    sections.push(`
/* === Claude Code Composer (dock-prompt) Polish === */
[data-component="dock-prompt"] {
  background-color: var(--claude-composer-bg) !important;
  border: 1px solid var(--v2-border-border-base) !important;
  border-radius: 14px !important;
  box-shadow:
    0 6px 20px -4px rgba(0, 0, 0, 0.18),
    0 2px 6px -1px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.04) !important;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

:root[data-color-scheme="light"] [data-component="dock-prompt"] {
  box-shadow:
    0 8px 24px -6px rgba(31, 30, 29, 0.08),
    0 2px 6px -1px rgba(31, 30, 29, 0.05),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.8) !important;
}

[data-component="dock-prompt"]:focus-within {
  border-color: color-mix(in srgb, var(--claude-accent) 58%, var(--v2-border-border-base)) !important;
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--claude-accent) 14%, transparent),
    0 8px 24px -4px rgba(0, 0, 0, 0.22) !important;
}

[data-component="dock-prompt"] button[type="submit"]:not(:disabled),
[data-component="dock-prompt"] [data-slot="prompt-submit"]:not(:disabled) {
  background-color: var(--claude-accent) !important;
  color: #FAF9F5 !important;
  border-radius: 9px !important;
  transition: background-color 0.15s ease, transform 0.12s ease;
}

[data-component="dock-prompt"] button[type="submit"]:not(:disabled):hover,
[data-component="dock-prompt"] [data-slot="prompt-submit"]:not(:disabled):hover {
  background-color: var(--claude-accent-hover) !important;
}`)
  }

  if (settings.toolCardPolish) {
    sections.push(`
/* === Claude Code Tool Call Cards & Context Groups === */
[data-component="tool-part-wrapper"],
[data-component="task-tool-card"] {
  border-radius: 9px;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

[data-component="collapsible"].tool-collapsible [data-slot="collapsible-trigger"] {
  border-radius: 7px;
  padding-inline: 6px;
  transition: background-color 0.14s ease;
}

[data-component="collapsible"].tool-collapsible [data-slot="collapsible-trigger"]:hover {
  background-color: var(--v2-overlay-simple-overlay-hover);
}

[data-slot="basic-tool-tool-title"] {
  color: var(--v2-text-text-base);
  font-weight: 540;
}

[data-slot="basic-tool-tool-subtitle"] {
  font-family: var(--font-family-mono, ui-monospace, monospace);
  font-size: 11.5px;
  color: var(--v2-text-text-muted);
}

[data-component="tool-part-wrapper"] [data-slot="collapsible-content"] {
  border-inline-start: 2px solid color-mix(in srgb, var(--claude-accent) 34%, var(--v2-border-border-base));
  margin-inline-start: 9px;
  padding-inline-start: 10px;
}`)
  }

  if (settings.reasoningPolish) {
    sections.push(`
/* === Claude Code Reasoning / Thinking Block Editorial Rail === */
[data-component="reasoning-part"] {
  border-inline-start: 2px solid color-mix(in srgb, var(--claude-accent) 42%, var(--v2-border-border-base));
  padding-inline-start: 12px;
  margin-block: 4px;
  border-radius: 0 6px 6px 0;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--claude-accent) 4.5%, transparent) 0%,
    transparent 100%
  );
}

[data-component="reasoning-part"] [data-component="markdown"] {
  color: var(--v2-text-text-muted);
  line-height: 1.58;
}`)
  }

  if (settings.terminalPolish) {
    sections.push(`
/* === Claude Code Terminal & Bash Output Well === */
[data-component="bash-output"],
[data-component="tool-output"],
[data-component="terminal"] {
  background-color: var(--claude-terminal-bg) !important;
  border: 1px solid var(--v2-border-border-base);
  border-radius: 9px;
}

[data-component="markdown"] pre {
  background-color: var(--claude-terminal-bg) !important;
  border: 1px solid var(--v2-border-border-muted) !important;
  border-radius: 9px !important;
}`)
  }

  if (settings.messageBubblePolish) {
    sections.push(`
/* === Claude Code User Message Bubble, Inline Code & Diffs === */
[data-component="user-message"] [data-slot="user-message-text"] {
  background: color-mix(in srgb, var(--claude-accent) 7%, var(--v2-background-bg-layer-02)) !important;
  border: 1px solid color-mix(in srgb, var(--claude-accent) 18%, var(--v2-border-border-base)) !important;
  border-radius: 12px !important;
  padding: 9px 13px !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

[data-component="markdown"] :not(pre) > code {
  background-color: color-mix(in srgb, var(--claude-accent) 9%, var(--v2-background-bg-layer-02)) !important;
  color: var(--claude-accent) !important;
  border: 1px solid color-mix(in srgb, var(--claude-accent) 20%, var(--v2-border-border-muted));
  border-radius: 5px;
  padding: 1px 5px;
  font-size: 0.91em;
}

[data-component="markdown"] blockquote {
  border-inline-start: 2.5px solid var(--claude-accent) !important;
  background: color-mix(in srgb, var(--claude-accent) 5%, transparent);
  padding: 6px 12px;
  border-radius: 0 7px 7px 0;
  color: var(--v2-text-text-muted);
}`)
  }

  return sections.join("\n\n")
}
