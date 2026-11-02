import { Schema } from "effect"

export type ThemePresetId = "clay" | "slate" | "parchment" | "high-contrast"
export type AccentStyleId = "terracotta" | "cinnabar" | "kraft" | "olive" | "fig"
export type SurfaceContrastId = "soft" | "balanced" | "crisp"

export interface ClaudeThemeSettings {
  enabled: boolean
  preset: ThemePresetId
  accentStyle: AccentStyleId
  surfaceContrast: SurfaceContrastId
  composerPolish: boolean
  toolCardPolish: boolean
  reasoningPolish: boolean
  terminalPolish: boolean
  messageBubblePolish: boolean
  editorialTypography: boolean
}

export const SettingsSchema = Schema.Struct({
  enabled: Schema.Boolean,
  preset: Schema.Literals(["clay", "slate", "parchment", "high-contrast"]),
  accentStyle: Schema.Literals(["terracotta", "cinnabar", "kraft", "olive", "fig"]),
  surfaceContrast: Schema.Literals(["soft", "balanced", "crisp"]),
  composerPolish: Schema.Boolean,
  toolCardPolish: Schema.Boolean,
  reasoningPolish: Schema.Boolean,
  terminalPolish: Schema.Boolean,
  messageBubblePolish: Schema.Boolean,
  editorialTypography: Schema.Boolean,
})

export const DEFAULT_SETTINGS: ClaudeThemeSettings = {
  enabled: true,
  preset: "clay",
  accentStyle: "terracotta",
  surfaceContrast: "balanced",
  composerPolish: true,
  toolCardPolish: true,
  reasoningPolish: true,
  terminalPolish: true,
  messageBubblePolish: true,
  editorialTypography: true,
}

export interface PresetDescriptor {
  id: ThemePresetId
  labelKey: string
  descKey: string
  darkBg: string
  darkPanel: string
  lightBg: string
  lightPanel: string
  accent: string
}

export const PRESET_LIST: readonly PresetDescriptor[] = [
  {
    id: "clay",
    labelKey: "preset.clay.label",
    descKey: "preset.clay.desc",
    darkBg: "#262624",
    darkPanel: "#30302E",
    lightBg: "#FAF9F5",
    lightPanel: "#F0EEE6",
    accent: "#D97757",
  },
  {
    id: "slate",
    labelKey: "preset.slate.label",
    descKey: "preset.slate.desc",
    darkBg: "#141413",
    darkPanel: "#222220",
    lightBg: "#F0EEE6",
    lightPanel: "#E8E6DC",
    accent: "#C6613F",
  },
  {
    id: "parchment",
    labelKey: "preset.parchment.label",
    descKey: "preset.parchment.desc",
    darkBg: "#2B2926",
    darkPanel: "#35322E",
    lightBg: "#F7F3E8",
    lightPanel: "#EFE9D8",
    accent: "#D4A27F",
  },
  {
    id: "high-contrast",
    labelKey: "preset.highContrast.label",
    descKey: "preset.highContrast.desc",
    darkBg: "#111110",
    darkPanel: "#1B1B19",
    lightBg: "#FFFFFF",
    lightPanel: "#F4F2EA",
    accent: "#E07B5B",
  },
]

export interface AccentDescriptor {
  id: AccentStyleId
  labelKey: string
  darkHex: string
  darkHover: string
  lightHex: string
  lightHover: string
}

export const ACCENT_LIST: readonly AccentDescriptor[] = [
  {
    id: "terracotta",
    labelKey: "accent.terracotta",
    darkHex: "#D97757",
    darkHover: "#E8A98F",
    lightHex: "#A7472A",
    lightHover: "#8B381E",
  },
  {
    id: "cinnabar",
    labelKey: "accent.cinnabar",
    darkHex: "#C6613F",
    darkHover: "#D97757",
    lightHex: "#9E4224",
    lightHover: "#7D3118",
  },
  {
    id: "kraft",
    labelKey: "accent.kraft",
    darkHex: "#D4A27F",
    darkHover: "#EBDBBC",
    lightHex: "#7D573B",
    lightHover: "#63432B",
  },
  {
    id: "olive",
    labelKey: "accent.olive",
    darkHex: "#A5B98C",
    darkHover: "#C1D3AB",
    lightHex: "#4F653A",
    lightHover: "#3B4D2B",
  },
  {
    id: "fig",
    labelKey: "accent.fig",
    darkHex: "#D990AA",
    darkHover: "#EAB4C7",
    lightHex: "#8A3858",
    lightHover: "#6D2943",
  },
]
