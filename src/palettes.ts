import { ACCENT_LIST, type ClaudeThemeSettings, type ThemePresetId } from "./schema"

export interface ThemeVariantSpec {
  palette: {
    neutral: string
    ink: string
    primary: string
    accent: string
    success: string
    warning: string
    error: string
    info: string
    interactive: string
    diffAdd?: string
    diffDelete?: string
  }
  overrides: Record<string, string>
  v2Overrides: Record<string, string>
  surfaces: {
    bgBase: string
    bgDeep: string
    bgLayer01: string
    bgLayer02: string
    bgLayer03: string
    bgLayer04: string
    terminalBg: string
    composerBg: string
    borderMuted: string
    borderBase: string
    borderStrong: string
    textBase: string
    textMuted: string
    textFaint: string
    accentPrimary: string
    accentHover: string
    accentSoftBg: string
    diffAddBg: string
    diffDelBg: string
  }
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

function mod360(h: number): number {
  return ((h % 360) + 360) % 360
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "")
  const expanded =
    clean.length === 3 || clean.length === 4
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean
  const rgbHex = expanded.length === 8 ? expanded.slice(0, 6) : expanded
  const num = parseInt(rgbHex, 16)
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const ch = (v: number) =>
    Math.round(clamp(v, 0, 1) * 255)
      .toString(16)
      .padStart(2, "0")
  return `#${ch(r)}${ch(g)}${ch(b)}`
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  const lr = srgbToLinear(r)
  const lg = srgbToLinear(g)
  const lb = srgbToLinear(b)
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const C = Math.sqrt(a * a + b2 * b2)
  let H = (180 / Math.PI) * Math.atan2(b2, a)
  if (H < 0) H += 360
  return { l: L, c: C, h: H }
}

function oklchToRgb(o: { l: number; c: number; h: number }): { r: number; g: number; b: number } {
  const a = o.c * Math.cos((o.h * Math.PI) / 180)
  const b = o.c * Math.sin((o.h * Math.PI) / 180)
  const l_ = o.l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = o.l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = o.l - 0.0894841775 * a - 1.291485548 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  return {
    r: linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  }
}

function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const { r, g, b } = hexToRgb(hex)
  return rgbToOklch(r, g, b)
}

function gamutClipOklch(o: { l: number; c: number; h: number }): { l: number; c: number; h: number } {
  const base = { l: clamp(o.l, 0, 1), c: Math.max(0, o.c), h: mod360(o.h) }
  const first = oklchToRgb(base)
  if (first.r >= 0 && first.r <= 1 && first.g >= 0 && first.g <= 1 && first.b >= 0 && first.b <= 1) {
    return base
  }
  let c = base.c
  for (let i = 0; i < 24; i++) {
    c *= 0.9
    const cand = { ...base, c }
    const rgb = oklchToRgb(cand)
    if (rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1) {
      return cand
    }
  }
  return { ...base, c: 0 }
}

function oklchToHex(o: { l: number; c: number; h: number }): string {
  const { r, g, b } = oklchToRgb(gamutClipOklch(o))
  return rgbToHex(r, g, b)
}

export function shiftOklch(hex: string, delta: { l?: number; c?: number; h?: number }): string {
  const o = hexToOklch(hex)
  return oklchToHex({
    l: o.l + (delta.l ?? 0),
    c: o.c * (delta.c ?? 1),
    h: o.h + (delta.h ?? 0),
  })
}

export function mixHex(hexA: string, hexB: string, weightA: number): string {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  return rgbToHex(
    a.r * weightA + b.r * (1 - weightA),
    a.g * weightA + b.g * (1 - weightA),
    a.b * weightA + b.b * (1 - weightA),
  )
}

export function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`
}

function interpolateOklch(hexA: string, hexB: string, t: number): string {
  const a = hexToOklch(hexA)
  const b = hexToOklch(hexB)
  const dh = (((b.h - a.h) % 360) + 540) % 360 - 180
  return oklchToHex({
    l: a.l + (b.l - a.l) * t,
    c: a.c + (b.c - a.c) * t,
    h: a.h + dh * t,
  })
}

function buildV1ColorRamp(seed: string, isDark: boolean): string[] {
  const o = hexToOklch(seed)
  const lSteps = isDark
    ? [
        0.118,
        0.138,
        0.167,
        0.202,
        0.246,
        0.304,
        0.378,
        0.468,
        clamp(o.l * 0.825, 0.53, 0.705),
        clamp(o.l * 0.89, 0.61, 0.79),
        clamp(o.l + 0.033, 0.868, 0.943),
        0.984,
      ]
    : [0.993, 0.983, 0.962, 0.936, 0.906, 0.866, 0.811, 0.74, o.l, Math.max(0, o.l - 0.036), 0.49, 0.27]
  const cMult = isDark
    ? [0.52, 0.68, 0.86, 1.02, 1.14, 1.24, 1.36, 1.48, 1.56, 1.64, 1.62, 1.15]
    : [0.12, 0.24, 0.46, 0.68, 0.84, 0.98, 1.08, 1.16, 1.22, 1.26, 1.18, 0.98]
  return lSteps.map((l, idx) => oklchToHex({ l, c: o.c * cMult[idx], h: o.h }))
}

function buildNeutralRamp(neutral: string, isDark: boolean, ink: string): string[] {
  const r = hexToOklch(neutral)
  const lift = (t: number) =>
    oklchToHex({
      l: r.l + (1 - r.l) * t,
      c: r.c * Math.max(0, 1 - t),
      h: r.h,
    })
  const start = isDark
    ? ((t: number) =>
        oklchToHex({
          l: r.l * (1 - t),
          c: r.c * Math.max(0, 1 - t * 0.12),
          h: r.h,
        }))(clamp(0.19 + Math.max(0, r.l - 0.12) * 0.33 + r.c * 1.95, 0.17, 0.27))
    : r.l < 0.82
      ? lift(0.86)
      : lift(clamp(0.1 + r.c * 3.2 + Math.max(0, 0.95 - r.l) * 0.35, 0.1, 0.28))
  const stops = isDark
    ? [0, 0.018, 0.039, 0.064, 0.097, 0.143, 0.212, 0.31, 0.46, 0.649, 0.845, 0.984]
    : [0, 0.022, 0.042, 0.068, 0.102, 0.146, 0.208, 0.296, 0.432, 0.61, 0.81, 0.965]
  return stops.map((t) => interpolateOklch(start, ink, t))
}

function buildV2ColorRamp(seed: string, isDark: boolean): string[] {
  const n = hexToOklch(seed)
  const r = isDark ? 1 : 1.05
  const lSteps = [
    0.99,
    0.965,
    0.93,
    0.885,
    0.835,
    clamp(n.l, 0.48, 0.72),
    clamp(n.l - 0.07, 0.4, 0.64),
    clamp(n.l - 0.14, 0.32, 0.55),
    clamp(n.l - 0.21, 0.24, 0.46),
    clamp(n.l - 0.28, 0.17, 0.38),
    clamp(n.l - 0.34, 0.12, 0.3),
    clamp(n.l - 0.4, 0.08, 0.22),
  ]
  const cMult = [0.28, 0.48, 0.68, 0.86, 1.02, 1.28, 1.34, 1.28, 1.18, 1.08, 0.98, 0.88]
  return lSteps.map((l, idx) => oklchToHex({ l, c: n.c * cMult[idx] * r, h: n.h }))
}

function contrastRatio(hexA: string, hexB: string): number {
  const lum = (hex: string) => {
    const { r, g, b } = hexToRgb(hex)
    return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  }
  const l1 = lum(hexA)
  const l2 = lum(hexB)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

function pickOnColor(bgHex: string): string {
  return contrastRatio("#ffffff", bgHex) > contrastRatio("#000000", bgHex) ? "#ffffff" : "#000000"
}

export function generateV1Tokens(spec: ThemeVariantSpec, isDark: boolean): Record<string, string> {
  const n = spec.palette
  const r = spec.overrides
  const i = buildNeutralRamp(n.neutral, isDark, n.ink)
  const a = buildV1ColorRamp(n.primary, isDark)
  const o = buildV1ColorRamp(n.accent, isDark)
  const s = buildV1ColorRamp(n.success, isDark)
  const c = buildV1ColorRamp(n.warning, isDark)
  const l = buildV1ColorRamp(n.error, isDark)
  const u = buildV1ColorRamp(n.info, isDark)
  const d = buildV1ColorRamp(n.interactive, isDark)
  const f = buildV1ColorRamp(
    shiftOklch(n.warning, isDark ? { h: -16, l: -0.058, c: 1.14 } : { h: -22, l: -0.082, c: 0.94 }),
    isDark,
  )
  const p = buildV1ColorRamp(shiftOklch(n.interactive, { h: -12, l: 0.128, c: 1.12 }), isDark)
  const m = buildV1ColorRamp(
    n.diffAdd ?? shiftOklch(n.success, { c: isDark ? 0.7 : 0.55, l: isDark ? -0.18 : 0.14 }),
    isDark,
  )
  const h = buildV1ColorRamp(
    n.diffDelete ?? shiftOklch(n.error, { c: isDark ? 0.82 : 0.7, l: isDark ? -0.08 : 0.08 }),
    isDark,
  )
  const g = n.ink
  const gOklch = hexToOklch(g)
  const v = shiftOklch(g, {
    l: isDark ? Math.max(0, 0.88 - gOklch.l) * 0.4 : -Math.max(0, gOklch.l - 0.18) * 0.24,
    c: isDark ? 1.04 : 1.02,
  })
  const te = r["background-base"] ?? i[0]
  const ne = (col: string, w: number) => mixHex(col, te, w)
  const w = (lightW: number, darkW: number) =>
    ne(g, isDark ? Math.min(1, darkW + 0.104) : Math.min(1, lightW + 0.024))
  const T = (
    isDark
      ? [0.038, 0.066, 0.1, 0.142, 0.19, 0.252, 0.334, 0.446, 0.58, 0.718, 0.854, 0.985]
      : [0.03, 0.06, 0.1, 0.145, 0.2, 0.265, 0.35, 0.47, 0.61, 0.74, 0.86, 0.97]
  ).map((t) => mixHex(i[11], i[0], t))

  const ie = a[8]
  const ae = a[9]
  const oe = d[isDark ? 6 : 4]
  const se = d[isDark ? 7 : 5]
  const ce = d[isDark ? 5 : 3]
  const le = s[isDark ? 6 : 4]
  const ue = s[isDark ? 5 : 3]
  const de = s[10]
  const fe = c[isDark ? 6 : 4]
  const pe = c[isDark ? 5 : 3]
  const E = c[10]
  const me = l[isDark ? 6 : 4]
  const he = l[isDark ? 5 : 3]
  const ge = l[10]
  const _e = u[isDark ? 6 : 4]
  const ve = u[isDark ? 5 : 3]
  const ye = u[10]

  const k: Record<string, string> = {
    "background-base": spec.surfaces.bgBase,
    "background-weak": spec.surfaces.bgLayer01,
    "background-strong": spec.surfaces.bgDeep,
    "background-stronger": isDark ? spec.surfaces.bgLayer01 : "#ffffff",
    "surface-base": spec.surfaces.bgLayer01,
    base: spec.surfaces.bgLayer01,
    "surface-base-hover": spec.surfaces.bgLayer02,
    "surface-base-active": spec.surfaces.bgLayer03,
    "surface-base-interactive-active": hexToRgba(d[2], 0.3),
    base2: spec.surfaces.bgLayer01,
    base3: spec.surfaces.bgLayer02,
    "surface-inset-base": spec.surfaces.bgDeep,
    "surface-inset-base-hover": spec.surfaces.bgLayer01,
    "surface-inset-strong": isDark ? hexToRgba(i[0], 0.5) : hexToRgba(i[3], 0.09),
    "surface-inset-strong-hover": isDark ? hexToRgba(i[0], 0.5) : hexToRgba(i[3], 0.09),
    "surface-raised-base": spec.surfaces.bgLayer01,
    "surface-float-base": isDark ? spec.surfaces.bgLayer01 : i[11],
    "surface-float-base-hover": isDark ? spec.surfaces.bgLayer02 : i[10],
    "surface-raised-base-hover": spec.surfaces.bgLayer02,
    "surface-raised-base-active": spec.surfaces.bgLayer03,
    "surface-raised-strong": isDark ? spec.surfaces.bgLayer02 : "#ffffff",
    "surface-raised-strong-hover": isDark ? spec.surfaces.bgLayer03 : "#ffffff",
    "surface-raised-stronger": isDark ? spec.surfaces.bgLayer03 : "#ffffff",
    "surface-raised-stronger-hover": isDark ? spec.surfaces.bgLayer04 : "#ffffff",
    "surface-weak": spec.surfaces.bgLayer02,
    "surface-weaker": spec.surfaces.bgLayer03,
    "surface-strong": isDark ? spec.surfaces.bgLayer04 : "#ffffff",
    "surface-raised-stronger-non-alpha": isDark ? spec.surfaces.bgLayer02 : "#ffffff",
    "surface-brand-base": spec.surfaces.accentPrimary,
    "surface-brand-hover": spec.surfaces.accentHover,
    "surface-interactive-base": oe,
    "surface-interactive-hover": se,
    "surface-interactive-weak": ce,
    "surface-interactive-weak-hover": oe,
    "surface-success-base": le,
    "surface-success-weak": ue,
    "surface-success-strong": de,
    "surface-warning-base": fe,
    "surface-warning-weak": pe,
    "surface-warning-strong": E,
    "surface-critical-base": me,
    "surface-critical-weak": he,
    "surface-critical-strong": ge,
    "surface-info-base": _e,
    "surface-info-weak": ve,
    "surface-info-strong": ye,
    "surface-diff-unchanged-base": isDark ? spec.surfaces.bgBase : "#ffffff00",
    "surface-diff-skip-base": isDark ? spec.surfaces.bgLayer01 : spec.surfaces.bgLayer02,
    "surface-diff-add-base": spec.surfaces.diffAddBg,
    "surface-diff-add-weak": m[isDark ? 3 : 1],
    "surface-diff-add-weaker": m[isDark ? 2 : 0],
    "surface-diff-add-strong": m[4],
    "surface-diff-add-stronger": m[isDark ? 10 : 8],
    "surface-diff-delete-base": spec.surfaces.diffDelBg,
    "surface-diff-delete-weak": h[isDark ? 3 : 1],
    "surface-diff-delete-weaker": h[isDark ? 2 : 0],
    "surface-diff-delete-strong": h[isDark ? 4 : 5],
    "surface-diff-delete-stronger": h[isDark ? 10 : 8],
    "input-base": spec.surfaces.composerBg,
    "input-hover": spec.surfaces.bgLayer02,
    "input-active": isDark ? d[6] : d[0],
    "input-selected": isDark ? d[7] : d[3],
    "input-focus": isDark ? d[6] : d[0],
    "input-disabled": i[3],
    "text-base": spec.surfaces.textBase,
    "text-weak": spec.surfaces.textMuted,
    "text-weaker": spec.surfaces.textFaint,
    "text-strong": isDark ? mixHex("#ffffff", v, 0.92) : shiftOklch(v, { l: -0.07, c: 1.04 }),
    "text-stronger": isDark ? "#ffffff" : "#111110",
    "text-invert-base": isDark ? i[10] : i[1],
    "text-invert-weak": isDark ? i[8] : i[2],
    "text-invert-weaker": isDark ? i[7] : i[3],
    "text-invert-strong": isDark ? i[11] : i[0],
    "text-interactive-base": spec.surfaces.accentPrimary,
    "text-on-brand-base": pickOnColor(ie),
    "text-on-interactive-base": pickOnColor(oe),
    "text-on-interactive-weak": pickOnColor(oe),
    "text-on-success-base": pickOnColor(le),
    "text-on-critical-base": pickOnColor(me),
    "text-on-critical-weak": pickOnColor(me),
    "text-on-critical-strong": pickOnColor(ge),
    "text-on-warning-base": pickOnColor(fe),
    "text-on-info-base": pickOnColor(_e),
    "text-diff-add-base": isDark ? "#A5B98C" : "#4F653A",
    "text-diff-delete-base": isDark ? "#E88875" : "#9A3E35",
    "text-diff-delete-strong": h[11],
    "text-diff-add-strong": m[isDark ? 7 : 11],
    "button-primary-base": spec.surfaces.accentPrimary,
    "button-secondary-base": isDark ? spec.surfaces.bgLayer02 : spec.surfaces.bgLayer01,
    "button-secondary-hover": isDark ? spec.surfaces.bgLayer03 : spec.surfaces.bgLayer02,
    "button-ghost-hover": T[1],
    "button-ghost-hover2": T[2],
    "border-base": spec.surfaces.borderBase,
    "border-hover": spec.surfaces.borderStrong,
    "border-active": spec.surfaces.accentPrimary,
    "border-selected": hexToRgba(spec.surfaces.accentPrimary, 0.9),
    "border-disabled": w(0.18, 0.12),
    "border-focus": spec.surfaces.accentPrimary,
    "border-weak-base": spec.surfaces.borderMuted,
    "border-strong-base": spec.surfaces.borderStrong,
    "border-strong-hover": w(0.4, 0.28),
    "border-strong-active": spec.surfaces.accentPrimary,
    "border-strong-selected": hexToRgba(spec.surfaces.accentPrimary, 0.6),
    "border-strong-disabled": w(0.14, 0.1),
    "border-strong-focus": spec.surfaces.accentPrimary,
    "border-weak-hover": spec.surfaces.borderBase,
    "border-weak-active": spec.surfaces.borderStrong,
    "border-weak-selected": hexToRgba(spec.surfaces.accentPrimary, 0.5),
    "border-weak-disabled": w(0.08, 0.06),
    "border-weak-focus": spec.surfaces.accentPrimary,
    "border-weaker-base": spec.surfaces.borderMuted,
    "border-interactive-base": spec.surfaces.accentPrimary,
    "border-interactive-hover": spec.surfaces.accentHover,
    "border-interactive-active": spec.surfaces.accentPrimary,
    "border-interactive-selected": spec.surfaces.accentPrimary,
    "border-interactive-disabled": i[7],
    "border-interactive-focus": spec.surfaces.accentPrimary,
    "border-success-base": s[6],
    "border-warning-base": c[6],
    "border-critical-base": l[6],
    "border-info-base": u[6],
    "icon-base": spec.surfaces.textMuted,
    "icon-hover": spec.surfaces.textBase,
    "icon-active": spec.surfaces.textBase,
    "icon-selected": spec.surfaces.accentPrimary,
    "icon-disabled": spec.surfaces.textFaint,
    "icon-focus": spec.surfaces.accentPrimary,
    "icon-invert-base": isDark ? spec.surfaces.bgBase : "#ffffff",
    "icon-weak-base": spec.surfaces.textFaint,
    "icon-weak-hover": spec.surfaces.textMuted,
    "icon-weak-active": spec.surfaces.textBase,
    "icon-weak-selected": spec.surfaces.accentPrimary,
    "icon-strong-base": spec.surfaces.textBase,
    "icon-brand-base": spec.surfaces.accentPrimary,
    "icon-interactive-base": spec.surfaces.accentPrimary,
    "icon-success-base": s[isDark ? 8 : 6],
    "icon-warning-base": f[isDark ? 8 : 6],
    "icon-critical-base": l[isDark ? 8 : 9],
    "icon-info-base": u[isDark ? 8 : 6],
    "icon-agent-plan-base": isDark ? "#D990AA" : "#8A3858",
    "icon-agent-docs-base": isDark ? "#D4A27F" : "#7D573B",
    "icon-agent-ask-base": isDark ? "#CBCADB" : "#5A5780",
    "icon-agent-build-base": spec.surfaces.accentPrimary,
    "icon-diff-add-base": isDark ? "#A5B98C" : "#4F653A",
    "icon-diff-delete-base": isDark ? "#E88875" : "#9A3E35",
    "icon-diff-modified-base": isDark ? "#D4A27F" : "#7D573B",
    ...r,
  }
  return k
}

const V2_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200] as const

function mapRampToSteps(prefix: string, ramp: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (let idx = 0; idx < V2_STEPS.length; idx++) {
    out[`v2-${prefix}-${V2_STEPS[idx]}`] = ramp[idx]
  }
  return out
}

export function generateV2Tokens(spec: ThemeVariantSpec, isDark: boolean): Record<string, string> {
  const n = spec.palette
  const rawGrey = buildNeutralRamp(n.neutral, isDark, n.ink)
  const greyRamp = isDark ? rawGrey.slice().reverse() : rawGrey
  const blueRamp = buildV2ColorRamp(n.interactive, isDark)
  const greenRamp = buildV2ColorRamp(n.success, isDark)
  const yellowRamp = buildV2ColorRamp(n.warning, isDark)
  const redRamp = buildV2ColorRamp(n.error, isDark)
  const purpleRamp = buildV2ColorRamp(n.accent, isDark)
  const pinkRamp = buildV2ColorRamp(n.info, isDark)
  const orangeRamp = buildV2ColorRamp(shiftOklch(n.warning, { h: -22, l: -0.082, c: 0.94 }), isDark)
  const cyanRamp = buildV2ColorRamp(shiftOklch(n.info, { h: -12, l: 0.128, c: 1.12 }), isDark)

  const primitives: Record<string, string> = {
    "v2-grey-50": "#ffffff",
    ...mapRampToSteps("grey", greyRamp),
    ...mapRampToSteps("blue", blueRamp),
    ...mapRampToSteps("green", greenRamp),
    ...mapRampToSteps("yellow", yellowRamp),
    ...mapRampToSteps("red", redRamp),
    ...mapRampToSteps("purple", purpleRamp),
    ...mapRampToSteps("pink", pinkRamp),
    ...mapRampToSteps("orange", orangeRamp),
    ...mapRampToSteps("cyan", cyanRamp),
  }

  const sf = spec.surfaces
  const semantic: Record<string, string> = {
    "v2-background-bg-base": sf.bgBase,
    "v2-background-bg-deep": sf.bgDeep,
    "v2-background-bg-layer-01": sf.bgLayer01,
    "v2-background-bg-layer-02": sf.bgLayer02,
    "v2-background-bg-layer-03": sf.bgLayer03,
    "v2-background-bg-layer-04": sf.bgLayer04,
    "v2-background-bg-inverse": isDark ? "#FAF9F5" : "#1F1E1D",
    "v2-background-bg-contrast": sf.accentPrimary,
    "v2-background-bg-icon-button-contrast": sf.accentPrimary,
    "v2-background-bg-button-neutral": isDark ? sf.bgLayer01 : "#FFFFFF",
    "v2-background-bg-accent": sf.accentPrimary,
    "v2-background-bg-code-path": sf.accentSoftBg,
    "v2-text-text-base": sf.textBase,
    "v2-text-text-muted": sf.textMuted,
    "v2-text-text-faint": sf.textFaint,
    "v2-text-text-inverse": isDark ? "#1F1E1D" : "#FAF9F5",
    "v2-text-text-contrast": "#FAF9F5",
    "v2-text-text-accent": sf.accentPrimary,
    "v2-text-text-accent-hover": sf.accentHover,
    "v2-text-text-code-accent": sf.accentPrimary,
    "v2-text-text-code-path": isDark ? "#D4A27F" : "#7D573B",
    "v2-border-border-muted": sf.borderMuted,
    "v2-border-border-base": sf.borderBase,
    "v2-border-border-strong": sf.borderStrong,
    "v2-border-border-inverse": isDark ? "#FAF9F5" : "#1F1E1D",
    "v2-border-border-focus": sf.accentPrimary,
    "v2-icon-icon-base": sf.textBase,
    "v2-icon-icon-muted": sf.textMuted,
    "v2-icon-icon-faint": sf.textFaint,
    "v2-icon-icon-inverse": isDark ? "#1F1E1D" : "#FAF9F5",
    "v2-icon-icon-contrast": "#FAF9F5",
    "v2-icon-icon-accent": sf.accentPrimary,
    "v2-icon-icon-accent-hover": sf.accentHover,
    "v2-overlay-simple-overlay-hover": isDark
      ? "rgba(245, 244, 239, 0.055)"
      : "rgba(31, 30, 29, 0.045)",
    "v2-overlay-simple-overlay-pressed": isDark
      ? "rgba(245, 244, 239, 0.095)"
      : "rgba(31, 30, 29, 0.085)",
    "v2-overlay-simple-overlay-contrast-hover": "rgba(255, 255, 255, 0.14)",
    "v2-overlay-simple-overlay-contrast-pressed": "rgba(255, 255, 255, 0.22)",
    "v2-overlay-simple-overlay-scrim": isDark ? "rgba(14, 14, 13, 0.62)" : "rgba(31, 30, 29, 0.36)",
    "v2-state-bg-success": sf.diffAddBg,
    "v2-state-fg-success": isDark ? "#A5B98C" : "#4F653A",
    "v2-state-border-success": isDark ? "rgba(165, 185, 140, 0.32)" : "rgba(79, 101, 58, 0.28)",
    "v2-state-bg-warning": isDark ? "#382E24" : "#F5EBD8",
    "v2-state-fg-warning": isDark ? "#D4A27F" : "#7D573B",
    "v2-state-border-warning": isDark ? "rgba(212, 162, 127, 0.32)" : "rgba(125, 87, 59, 0.28)",
    "v2-state-bg-danger": sf.diffDelBg,
    "v2-state-fg-danger": isDark ? "#E88875" : "#9A3E35",
    "v2-state-border-danger": isDark ? "rgba(232, 136, 117, 0.32)" : "rgba(154, 62, 53, 0.28)",
    "v2-state-bg-info": isDark ? "#27313B" : "#E6EEF5",
    "v2-state-fg-info": isDark ? "#8FB0CE" : "#3F5F87",
    "v2-state-border-info": isDark ? "rgba(143, 176, 206, 0.32)" : "rgba(63, 95, 135, 0.28)",
    "v2-agent-plan-solid": isDark ? "#D990AA" : "#8A3858",
    "v2-agent-plan-border": isDark ? "rgba(217, 144, 170, 0.25)" : "rgba(138, 56, 88, 0.22)",
    "v2-agent-plan-background": isDark ? "rgba(217, 144, 170, 0.08)" : "rgba(138, 56, 88, 0.06)",
    "v2-agent-build-solid": sf.accentPrimary,
    "v2-agent-build-border": hexToRgba(sf.accentPrimary, 0.26),
    "v2-agent-build-background": hexToRgba(sf.accentPrimary, 0.09),
    "v2-agent-explore-solid": isDark ? "#D4A27F" : "#7D573B",
    "v2-agent-explore-border": isDark ? "rgba(212, 162, 127, 0.25)" : "rgba(125, 87, 59, 0.22)",
    "v2-agent-explore-background": isDark ? "rgba(212, 162, 127, 0.08)" : "rgba(125, 87, 59, 0.06)",
    "v2-agent-review-solid": isDark ? "#A5B98C" : "#4F653A",
    "v2-agent-writer-solid": isDark ? "#CBCADB" : "#5A5780",
    ...spec.v2Overrides,
  }

  return {
    ...primitives,
    ...semantic,
  }
}

function buildSyntaxOverrides(isDark: boolean, accentHex: string): Record<string, string> {
  if (isDark) {
    return {
      "text-weak": "#B7B5AC",
      "syntax-comment": "#8A8880",
      "syntax-keyword": "#D990AA",
      "syntax-string": "#A5B98C",
      "syntax-primitive": "#D4A27F",
      "syntax-variable": "#F5F4EF",
      "syntax-property": "#8FB0CE",
      "syntax-type": "#EBDBBC",
      "syntax-constant": "#D4A27F",
      "syntax-operator": "#B7B5AC",
      "syntax-punctuation": "#B7B5AC",
      "syntax-object": "#F5F4EF",
      "syntax-info": "#8FB0CE",
      "markdown-heading": accentHex,
      "markdown-text": "#F5F4EF",
      "markdown-link": "#8FB0CE",
      "markdown-link-text": "#E8A98F",
      "markdown-code": "#A5B98C",
      "markdown-block-quote": "#B7B5AC",
      "markdown-emph": "#EBDBBC",
      "markdown-strong": "#D4A27F",
      "markdown-horizontal-rule": "#4A4A45",
      "markdown-list-item": accentHex,
      "markdown-list-enumeration": "#D4A27F",
      "markdown-image": "#8FB0CE",
      "markdown-image-text": "#E8A98F",
      "markdown-code-block": "#F5F4EF",
    }
  }
  return {
    "text-weak": "#6B6862",
    "syntax-comment": "#8A8781",
    "syntax-keyword": "#8A3858",
    "syntax-string": "#4F653A",
    "syntax-primitive": "#7D573B",
    "syntax-variable": "#1F1E1D",
    "syntax-property": "#3F5F87",
    "syntax-type": "#5A5780",
    "syntax-constant": "#7D573B",
    "syntax-operator": "#6B6862",
    "syntax-punctuation": "#6B6862",
    "syntax-object": "#1F1E1D",
    "syntax-info": "#3F5F87",
    "markdown-heading": accentHex,
    "markdown-text": "#1F1E1D",
    "markdown-link": "#3F5F87",
    "markdown-link-text": accentHex,
    "markdown-code": "#4F653A",
    "markdown-block-quote": "#6B6862",
    "markdown-emph": "#7D573B",
    "markdown-strong": accentHex,
    "markdown-horizontal-rule": "#E3E1D8",
    "markdown-list-item": accentHex,
    "markdown-list-enumeration": "#7D573B",
    "markdown-image": "#3F5F87",
    "markdown-image-text": accentHex,
    "markdown-code-block": "#1F1E1D",
  }
}

export function resolveVariantSpec(
  settings: ClaudeThemeSettings,
  isDark: boolean,
): ThemeVariantSpec {
  const accentDesc =
    ACCENT_LIST.find((a) => a.id === settings.accentStyle) ?? ACCENT_LIST[0]
  const accentPrimary = isDark ? accentDesc.darkHex : accentDesc.lightHex
  const accentHover = isDark ? accentDesc.darkHover : accentDesc.lightHover

  const preset: ThemePresetId = settings.preset
  const contrastDelta =
    settings.surfaceContrast === "soft"
      ? -1
      : settings.surfaceContrast === "crisp"
        ? 1
        : 0

  let bgBase: string
  let bgDeep: string
  let bgLayer01: string
  let bgLayer02: string
  let bgLayer03: string
  let bgLayer04: string
  let terminalBg: string
  let composerBg: string
  let borderMuted: string
  let borderBase: string
  let borderStrong: string
  let textBase: string
  let textMuted: string
  let textFaint: string
  let diffAddBg: string
  let diffDelBg: string

  if (isDark) {
    if (preset === "slate") {
      bgBase = "#141413"
      bgDeep = "#0E0E0D"
      bgLayer01 = "#1E1E1C"
      bgLayer02 = "#262624"
      bgLayer03 = "#30302E"
      bgLayer04 = "#3D3D3A"
      terminalBg = "#10100F"
      composerBg = "#1F1F1D"
      borderMuted = "rgba(232, 230, 220, 0.07)"
      borderBase = "rgba(232, 230, 220, 0.12)"
      borderStrong = "rgba(232, 230, 220, 0.22)"
      textBase = "#E8E6DC"
      textMuted = "#B0AEA5"
      textFaint = "#87867F"
      diffAddBg = "#232E21"
      diffDelBg = "#32201D"
    } else if (preset === "parchment") {
      bgBase = "#2B2926"
      bgDeep = "#22201D"
      bgLayer01 = "#34312D"
      bgLayer02 = "#3E3B36"
      bgLayer03 = "#49453F"
      bgLayer04 = "#56514A"
      terminalBg = "#201E1B"
      composerBg = "#35322E"
      borderMuted = "rgba(245, 240, 228, 0.08)"
      borderBase = "rgba(245, 240, 228, 0.14)"
      borderStrong = "rgba(245, 240, 228, 0.24)"
      textBase = "#F5F0E4"
      textMuted = "#C2BBB0"
      textFaint = "#948E84"
      diffAddBg = "#313C2D"
      diffDelBg = "#402C28"
    } else if (preset === "high-contrast") {
      bgBase = "#111110"
      bgDeep = "#0A0A09"
      bgLayer01 = "#1B1B19"
      bgLayer02 = "#252522"
      bgLayer03 = "#31312D"
      bgLayer04 = "#3F3F3A"
      terminalBg = "#0C0C0B"
      composerBg = "#1C1C1A"
      borderMuted = "rgba(250, 249, 245, 0.12)"
      borderBase = "rgba(250, 249, 245, 0.19)"
      borderStrong = "rgba(250, 249, 245, 0.32)"
      textBase = "#FAF9F5"
      textMuted = "#C7C5BC"
      textFaint = "#96948B"
      diffAddBg = "#243320"
      diffDelBg = "#38211D"
    } else {
      // Default: Claude Clay (#262624 warm coal)
      bgBase = "#262624"
      bgDeep = "#1E1E1C"
      bgLayer01 = "#30302E"
      bgLayer02 = "#3A3A37"
      bgLayer03 = "#454541"
      bgLayer04 = "#52524D"
      terminalBg = "#1C1B1A"
      composerBg = "#30302E"
      borderMuted = "rgba(245, 244, 239, 0.075)"
      borderBase = "rgba(245, 244, 239, 0.125)"
      borderStrong = "rgba(245, 244, 239, 0.22)"
      textBase = "#F5F4EF"
      textMuted = "#B7B5AC"
      textFaint = "#8A8880"
      diffAddBg = "#2F3A2C"
      diffDelBg = "#3D2A26"
    }

    if (contrastDelta === -1) {
      borderMuted = "rgba(245, 244, 239, 0.05)"
      borderBase = "rgba(245, 244, 239, 0.09)"
      borderStrong = "rgba(245, 244, 239, 0.16)"
    } else if (contrastDelta === 1) {
      borderMuted = "rgba(245, 244, 239, 0.12)"
      borderBase = "rgba(245, 244, 239, 0.19)"
      borderStrong = "rgba(245, 244, 239, 0.30)"
    }
  } else {
    if (preset === "slate") {
      bgBase = "#F0EEE6"
      bgDeep = "#E8E6DC"
      bgLayer01 = "#FAF9F5"
      bgLayer02 = "#E4E1D6"
      bgLayer03 = "#D8D5C8"
      bgLayer04 = "#C9C6B8"
      terminalBg = "#E8E5DA"
      composerBg = "#FAF9F5"
      borderMuted = "rgba(20, 20, 19, 0.07)"
      borderBase = "rgba(20, 20, 19, 0.12)"
      borderStrong = "rgba(20, 20, 19, 0.22)"
      textBase = "#141413"
      textMuted = "#5E5D59"
      textFaint = "#87867F"
      diffAddBg = "#E1E9DA"
      diffDelBg = "#EFE0DC"
    } else if (preset === "parchment") {
      bgBase = "#F7F3E8"
      bgDeep = "#EFE9D8"
      bgLayer01 = "#FCF9F2"
      bgLayer02 = "#EDE6D5"
      bgLayer03 = "#E2D9C5"
      bgLayer04 = "#D4C9B0"
      terminalBg = "#EFEAD9"
      composerBg = "#FCF9F2"
      borderMuted = "rgba(36, 33, 28, 0.075)"
      borderBase = "rgba(36, 33, 28, 0.13)"
      borderStrong = "rgba(36, 33, 28, 0.23)"
      textBase = "#221F1B"
      textMuted = "#69635A"
      textFaint = "#8F887D"
      diffAddBg = "#E3ECDC"
      diffDelBg = "#F2E0DA"
    } else if (preset === "high-contrast") {
      bgBase = "#FFFFFF"
      bgDeep = "#F4F2EA"
      bgLayer01 = "#FAF9F5"
      bgLayer02 = "#EDEBE2"
      bgLayer03 = "#DFDDD2"
      bgLayer04 = "#CFCCC0"
      terminalBg = "#F4F2EA"
      composerBg = "#FFFFFF"
      borderMuted = "rgba(20, 20, 19, 0.11)"
      borderBase = "rgba(20, 20, 19, 0.18)"
      borderStrong = "rgba(20, 20, 19, 0.30)"
      textBase = "#111110"
      textMuted = "#4F4D48"
      textFaint = "#75736C"
      diffAddBg = "#DFEAD6"
      diffDelBg = "#F2DCD6"
    } else {
      // Default: Claude Clay Warm Paper (#FAF9F5)
      bgBase = "#FAF9F5"
      bgDeep = "#F2F0E8"
      bgLayer01 = "#FFFFFF"
      bgLayer02 = "#F0EEE6"
      bgLayer03 = "#E5E2D9"
      bgLayer04 = "#D8D4C8"
      terminalBg = "#F2EFE6"
      composerBg = "#FFFFFF"
      borderMuted = "rgba(31, 30, 29, 0.07)"
      borderBase = "rgba(31, 30, 29, 0.115)"
      borderStrong = "rgba(31, 30, 29, 0.21)"
      textBase = "#1F1E1D"
      textMuted = "#6B6862"
      textFaint = "#8A8781"
      diffAddBg = "#E6EDDF"
      diffDelBg = "#F3E1DB"
    }

    if (contrastDelta === -1) {
      borderMuted = "rgba(31, 30, 29, 0.045)"
      borderBase = "rgba(31, 30, 29, 0.08)"
      borderStrong = "rgba(31, 30, 29, 0.15)"
    } else if (contrastDelta === 1) {
      borderMuted = "rgba(31, 30, 29, 0.11)"
      borderBase = "rgba(31, 30, 29, 0.18)"
      borderStrong = "rgba(31, 30, 29, 0.28)"
    }
  }

  return {
    palette: {
      neutral: bgBase,
      ink: textBase,
      primary: accentPrimary,
      accent: isDark ? "#D990AA" : "#8A3858",
      success: isDark ? "#A5B98C" : "#4F653A",
      warning: isDark ? "#D4A27F" : "#7D573B",
      error: isDark ? "#E88875" : "#9A3E35",
      info: isDark ? "#8FB0CE" : "#3F5F87",
      interactive: accentPrimary,
      diffAdd: isDark ? "#A5B98C" : "#4F653A",
      diffDelete: isDark ? "#E88875" : "#9A3E35",
    },
    overrides: buildSyntaxOverrides(isDark, accentPrimary),
    v2Overrides: {},
    surfaces: {
      bgBase,
      bgDeep,
      bgLayer01,
      bgLayer02,
      bgLayer03,
      bgLayer04,
      terminalBg,
      composerBg,
      borderMuted,
      borderBase,
      borderStrong,
      textBase,
      textMuted,
      textFaint,
      accentPrimary,
      accentHover,
      accentSoftBg: hexToRgba(accentPrimary, isDark ? 0.14 : 0.1),
      diffAddBg,
      diffDelBg,
    },
  }
}
