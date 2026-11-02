var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toCommonJS = (from) => {
  var entry = (__moduleCache ??= new WeakMap).get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function") {
    for (var key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(entry, key))
        __defProp(entry, key, {
          get: __accessProp.bind(from, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  __moduleCache.set(from, entry);
  return entry;
};
var __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// src/gui.ts
var exports_gui = {};
__export(exports_gui, {
  default: () => gui_default
});
module.exports = __toCommonJS(exports_gui);
var import_gui = require("@opencode/plugin/gui");

// src/schema.ts
var import_effect = require("effect");
var SettingsSchema = import_effect.Schema.Struct({
  enabled: import_effect.Schema.Boolean,
  preset: import_effect.Schema.Literals(["clay", "slate", "parchment", "high-contrast"]),
  accentStyle: import_effect.Schema.Literals(["terracotta", "cinnabar", "kraft", "olive", "fig"]),
  surfaceContrast: import_effect.Schema.Literals(["soft", "balanced", "crisp"]),
  composerPolish: import_effect.Schema.Boolean,
  toolCardPolish: import_effect.Schema.Boolean,
  reasoningPolish: import_effect.Schema.Boolean,
  terminalPolish: import_effect.Schema.Boolean,
  messageBubblePolish: import_effect.Schema.Boolean,
  editorialTypography: import_effect.Schema.Boolean
});
var DEFAULT_SETTINGS = {
  enabled: true,
  preset: "clay",
  accentStyle: "terracotta",
  surfaceContrast: "balanced",
  composerPolish: true,
  toolCardPolish: true,
  reasoningPolish: true,
  terminalPolish: true,
  messageBubblePolish: true,
  editorialTypography: true
};
var PRESET_LIST = [
  {
    id: "clay",
    labelKey: "preset.clay.label",
    descKey: "preset.clay.desc",
    darkBg: "#262624",
    darkPanel: "#30302E",
    lightBg: "#FAF9F5",
    lightPanel: "#F0EEE6",
    accent: "#D97757"
  },
  {
    id: "slate",
    labelKey: "preset.slate.label",
    descKey: "preset.slate.desc",
    darkBg: "#141413",
    darkPanel: "#222220",
    lightBg: "#F0EEE6",
    lightPanel: "#E8E6DC",
    accent: "#C6613F"
  },
  {
    id: "parchment",
    labelKey: "preset.parchment.label",
    descKey: "preset.parchment.desc",
    darkBg: "#2B2926",
    darkPanel: "#35322E",
    lightBg: "#F7F3E8",
    lightPanel: "#EFE9D8",
    accent: "#D4A27F"
  },
  {
    id: "high-contrast",
    labelKey: "preset.highContrast.label",
    descKey: "preset.highContrast.desc",
    darkBg: "#111110",
    darkPanel: "#1B1B19",
    lightBg: "#FFFFFF",
    lightPanel: "#F4F2EA",
    accent: "#E07B5B"
  }
];
var ACCENT_LIST = [
  {
    id: "terracotta",
    labelKey: "accent.terracotta",
    darkHex: "#D97757",
    darkHover: "#E8A98F",
    lightHex: "#A7472A",
    lightHover: "#8B381E"
  },
  {
    id: "cinnabar",
    labelKey: "accent.cinnabar",
    darkHex: "#C6613F",
    darkHover: "#D97757",
    lightHex: "#9E4224",
    lightHover: "#7D3118"
  },
  {
    id: "kraft",
    labelKey: "accent.kraft",
    darkHex: "#D4A27F",
    darkHover: "#EBDBBC",
    lightHex: "#7D573B",
    lightHover: "#63432B"
  },
  {
    id: "olive",
    labelKey: "accent.olive",
    darkHex: "#A5B98C",
    darkHover: "#C1D3AB",
    lightHex: "#4F653A",
    lightHover: "#3B4D2B"
  },
  {
    id: "fig",
    labelKey: "accent.fig",
    darkHex: "#D990AA",
    darkHover: "#EAB4C7",
    lightHex: "#8A3858",
    lightHover: "#6D2943"
  }
];

// src/settings-page.ts
var import_solid_js = require("solid-js");
function el(tag, attrs, className) {
  const node = document.createElement(tag);
  if (className)
    node.className = className;
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      node.setAttribute(k, v);
    }
  }
  return node;
}
function renderClaudeSettingsPage(ctx) {
  const store = ctx.stores.settings;
  const current = () => store.value ?? DEFAULT_SETTINGS;
  const header = el("div", undefined, "settings-tab-header");
  const headerRow = el("div", undefined, "settings-tab-header-row");
  const headerTitleCol = el("div", undefined, "flex flex-col gap-1");
  const h2 = el("h2", undefined, "settings-tab-title");
  const subtitle = el("span", undefined, "text-11-regular text-v2-text-text-muted");
  headerTitleCol.append(h2, subtitle);
  headerRow.append(headerTitleCol);
  header.append(headerRow);
  import_solid_js.createRenderEffect(() => {
    h2.textContent = ctx.t("page.title");
    subtitle.textContent = ctx.t("page.subtitle");
  });
  const body = el("div", undefined, "settings-tab-body settings-tab-body--sectioned");
  const banner = el("div", { "data-action": "claude-theme-enabled" }, "claude-theme-banner");
  const bannerTop = el("div", undefined, "claude-theme-banner-top");
  const brand = el("div", undefined, "claude-theme-brand");
  const emblem = el("div", { "aria-hidden": "true" }, "claude-theme-emblem");
  emblem.textContent = "C";
  const brandCopy = el("div", undefined, "claude-theme-brand-copy");
  const brandTitleRow = el("div", undefined, "claude-theme-brand-title");
  const brandName = el("span");
  const statusPill = el("span", undefined, "claude-theme-status-pill");
  brandTitleRow.append(brandName, statusPill);
  const brandDesc = el("div", undefined, "claude-theme-brand-subtitle");
  brandCopy.append(brandTitleRow, brandDesc);
  brand.append(emblem, brandCopy);
  const masterToggle = createToggleButton(() => current().enabled, (next) => store.update((s) => void (s.enabled = next)), () => ctx.t("row.enabled.title"));
  bannerTop.append(brand, masterToggle);
  const swatchStrip = el("div", undefined, "claude-swatch-strip");
  const swatches = [
    { name: "Clay", hex: "#D97757" },
    { name: "Coal", hex: "#262624" },
    { name: "Paper", hex: "#FAF9F5" },
    { name: "Fig", hex: "#D990AA" },
    { name: "Kraft", hex: "#D4A27F" },
    { name: "Olive", hex: "#A5B98C" },
    { name: "Slate Blue", hex: "#8FB0CE" }
  ];
  for (const sw of swatches) {
    const chip = el("span", undefined, "claude-swatch-chip");
    const dot = el("span", undefined, "claude-swatch-dot");
    dot.style.backgroundColor = sw.hex;
    const label = el("span");
    label.textContent = `${sw.name} ${sw.hex}`;
    chip.append(dot, label);
    swatchStrip.append(chip);
  }
  banner.append(bannerTop, swatchStrip);
  body.append(banner);
  import_solid_js.createRenderEffect(() => {
    const s = current();
    brandName.textContent = ctx.t("banner.title");
    statusPill.textContent = s.enabled ? ctx.t("banner.active") : ctx.t("banner.paused");
    brandDesc.textContent = ctx.t("banner.desc");
  });
  const paletteSection = el("section", undefined, "settings-section");
  const paletteSectionTitle = el("h3", undefined, "settings-section-title");
  import_solid_js.createRenderEffect(() => {
    paletteSectionTitle.textContent = ctx.t("section.palette");
  });
  const presetGrid = el("div", { "data-action": "claude-theme-preset" }, "claude-preset-grid");
  for (const preset of PRESET_LIST) {
    const card = el("button", { type: "button" }, "claude-preset-card");
    const cardHeader = el("div", undefined, "claude-preset-card-header");
    const cardTitle = el("span", undefined, "claude-preset-card-title");
    const miniPalettes = el("span", undefined, "claude-preset-mini-palettes");
    for (const col of [preset.darkBg, preset.darkPanel, preset.lightBg, preset.accent]) {
      const dot = el("span", undefined, "claude-preset-mini-dot");
      dot.style.backgroundColor = col;
      miniPalettes.append(dot);
    }
    cardHeader.append(cardTitle, miniPalettes);
    const cardDesc = el("span", undefined, "claude-preset-card-desc");
    card.append(cardHeader, cardDesc);
    card.addEventListener("click", () => {
      store.update((s) => {
        s.preset = preset.id;
      });
    });
    import_solid_js.createRenderEffect(() => {
      const active = current().preset === preset.id;
      card.setAttribute("data-active", active ? "true" : "false");
      card.setAttribute("aria-pressed", active ? "true" : "false");
      cardTitle.textContent = ctx.t(preset.labelKey);
      cardDesc.textContent = ctx.t(preset.descKey);
    });
    presetGrid.append(card);
  }
  const paletteList = el("div", { "data-component": "settings-list" });
  const accentPills = el("div", undefined, "claude-pill-group");
  for (const acc of ACCENT_LIST) {
    const btn = el("button", { type: "button" }, "claude-pill-btn");
    const dot = el("span", undefined, "claude-swatch-dot");
    dot.style.backgroundColor = acc.darkHex;
    const text = el("span");
    btn.append(dot, text);
    btn.addEventListener("click", () => {
      store.update((s) => {
        s.accentStyle = acc.id;
      });
    });
    import_solid_js.createRenderEffect(() => {
      const active = current().accentStyle === acc.id;
      btn.setAttribute("data-active", active ? "true" : "false");
      text.textContent = ctx.t(acc.labelKey);
    });
    accentPills.append(btn);
  }
  paletteList.append(createSettingsRow("claude-theme-accent", () => ctx.t("row.accent.title"), () => ctx.t("row.accent.desc"), accentPills));
  const contrastOptions = [
    { id: "soft", labelKey: "contrast.soft" },
    { id: "balanced", labelKey: "contrast.balanced" },
    { id: "crisp", labelKey: "contrast.crisp" }
  ];
  const contrastPills = el("div", undefined, "claude-pill-group");
  for (const opt of contrastOptions) {
    const btn = el("button", { type: "button" }, "claude-pill-btn");
    btn.addEventListener("click", () => {
      store.update((s) => {
        s.surfaceContrast = opt.id;
      });
    });
    import_solid_js.createRenderEffect(() => {
      const active = current().surfaceContrast === opt.id;
      btn.setAttribute("data-active", active ? "true" : "false");
      btn.textContent = ctx.t(opt.labelKey);
    });
    contrastPills.append(btn);
  }
  paletteList.append(createSettingsRow("claude-theme-contrast", () => ctx.t("row.contrast.title"), () => ctx.t("row.contrast.desc"), contrastPills));
  paletteSection.append(paletteSectionTitle, presetGrid, paletteList);
  body.append(paletteSection);
  const compSection = el("section", undefined, "settings-section");
  const compSectionTitle = el("h3", undefined, "settings-section-title");
  import_solid_js.createRenderEffect(() => {
    compSectionTitle.textContent = ctx.t("section.components");
  });
  const compList = el("div", { "data-component": "settings-list" });
  const toggleRows = [
    {
      actionId: "claude-theme-composer",
      key: "composerPolish",
      titleKey: "row.composer.title",
      descKey: "row.composer.desc"
    },
    {
      actionId: "claude-theme-tools",
      key: "toolCardPolish",
      titleKey: "row.tools.title",
      descKey: "row.tools.desc"
    },
    {
      actionId: "claude-theme-reasoning",
      key: "reasoningPolish",
      titleKey: "row.reasoning.title",
      descKey: "row.reasoning.desc"
    },
    {
      actionId: "claude-theme-terminal",
      key: "terminalPolish",
      titleKey: "row.terminal.title",
      descKey: "row.terminal.desc"
    },
    {
      actionId: "claude-theme-messages",
      key: "messageBubblePolish",
      titleKey: "row.messages.title",
      descKey: "row.messages.desc"
    },
    {
      actionId: "claude-theme-typography",
      key: "editorialTypography",
      titleKey: "row.typography.title",
      descKey: "row.typography.desc"
    }
  ];
  for (const item of toggleRows) {
    const toggle = createToggleButton(() => current()[item.key], (next) => store.update((s) => {
      s[item.key] = next;
    }), () => ctx.t(item.titleKey));
    compList.append(createSettingsRow(item.actionId, () => ctx.t(item.titleKey), () => ctx.t(item.descKey), toggle));
  }
  const resetBtn = el("button", { type: "button" }, "claude-reset-btn");
  resetBtn.addEventListener("click", () => {
    store.set({ ...DEFAULT_SETTINGS });
  });
  import_solid_js.createRenderEffect(() => {
    resetBtn.textContent = ctx.t("row.reset.button");
  });
  compList.append(createSettingsRow("claude-theme-reset", () => ctx.t("row.reset.title"), () => ctx.t("row.reset.desc"), resetBtn));
  compSection.append(compSectionTitle, compList);
  body.append(compSection);
  return [header, body];
}
function createSettingsRow(actionId, titleAccessor, descAccessor, controlNode) {
  const wrapper = el("div", { "data-action": actionId });
  const row = el("div", { "data-component": "settings-row" });
  const copy = el("div", { "data-slot": "settings-row-copy" });
  const title = el("div", { "data-slot": "settings-row-title" });
  const desc = el("div", { "data-slot": "settings-row-description" });
  const control = el("div", { "data-slot": "settings-row-control" });
  import_solid_js.createRenderEffect(() => {
    title.textContent = titleAccessor();
    desc.textContent = descAccessor();
  });
  copy.append(title, desc);
  control.append(controlNode);
  row.append(copy, control);
  wrapper.append(row);
  return wrapper;
}
function createToggleButton(checkedAccessor, onChange, ariaLabelAccessor) {
  const btn = el("button", { type: "button", role: "switch" }, "claude-toggle-btn");
  const thumb = el("span", { "aria-hidden": "true" }, "claude-toggle-thumb");
  btn.append(thumb);
  btn.addEventListener("click", () => {
    onChange(!checkedAccessor());
  });
  import_solid_js.createRenderEffect(() => {
    const checked = checkedAccessor();
    btn.setAttribute("data-checked", checked ? "true" : "false");
    btn.setAttribute("aria-checked", checked ? "true" : "false");
    btn.setAttribute("aria-label", ariaLabelAccessor());
  });
  return btn;
}

// src/palettes.ts
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function mod360(h) {
  return (h % 360 + 360) % 360;
}
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const expanded = clean.length === 3 || clean.length === 4 ? clean.split("").map((c) => c + c).join("") : clean;
  const rgbHex = expanded.length === 8 ? expanded.slice(0, 6) : expanded;
  const num = parseInt(rgbHex, 16);
  return {
    r: (num >> 16 & 255) / 255,
    g: (num >> 8 & 255) / 255,
    b: (num & 255) / 255
  };
}
function rgbToHex(r, g, b) {
  const ch = (v) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, "0");
  return `#${ch(r)}${ch(g)}${ch(b)}`;
}
function linearToSrgb(c) {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
}
function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function rgbToOklch(r, g, b) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + b2 * b2);
  let H = 180 / Math.PI * Math.atan2(b2, a);
  if (H < 0)
    H += 360;
  return { l: L, c: C, h: H };
}
function oklchToRgb(o) {
  const a = o.c * Math.cos(o.h * Math.PI / 180);
  const b = o.c * Math.sin(o.h * Math.PI / 180);
  const l_ = o.l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = o.l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = o.l - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return {
    r: linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  };
}
function hexToOklch(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToOklch(r, g, b);
}
function gamutClipOklch(o) {
  const base = { l: clamp(o.l, 0, 1), c: Math.max(0, o.c), h: mod360(o.h) };
  const first = oklchToRgb(base);
  if (first.r >= 0 && first.r <= 1 && first.g >= 0 && first.g <= 1 && first.b >= 0 && first.b <= 1) {
    return base;
  }
  let c = base.c;
  for (let i = 0;i < 24; i++) {
    c *= 0.9;
    const cand = { ...base, c };
    const rgb = oklchToRgb(cand);
    if (rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1) {
      return cand;
    }
  }
  return { ...base, c: 0 };
}
function oklchToHex(o) {
  const { r, g, b } = oklchToRgb(gamutClipOklch(o));
  return rgbToHex(r, g, b);
}
function shiftOklch(hex, delta) {
  const o = hexToOklch(hex);
  return oklchToHex({
    l: o.l + (delta.l ?? 0),
    c: o.c * (delta.c ?? 1),
    h: o.h + (delta.h ?? 0)
  });
}
function mixHex(hexA, hexB, weightA) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(a.r * weightA + b.r * (1 - weightA), a.g * weightA + b.g * (1 - weightA), a.b * weightA + b.b * (1 - weightA));
}
function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}
function interpolateOklch(hexA, hexB, t) {
  const a = hexToOklch(hexA);
  const b = hexToOklch(hexB);
  const dh = ((b.h - a.h) % 360 + 540) % 360 - 180;
  return oklchToHex({
    l: a.l + (b.l - a.l) * t,
    c: a.c + (b.c - a.c) * t,
    h: a.h + dh * t
  });
}
function buildV1ColorRamp(seed, isDark) {
  const o = hexToOklch(seed);
  const lSteps = isDark ? [
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
    0.984
  ] : [0.993, 0.983, 0.962, 0.936, 0.906, 0.866, 0.811, 0.74, o.l, Math.max(0, o.l - 0.036), 0.49, 0.27];
  const cMult = isDark ? [0.52, 0.68, 0.86, 1.02, 1.14, 1.24, 1.36, 1.48, 1.56, 1.64, 1.62, 1.15] : [0.12, 0.24, 0.46, 0.68, 0.84, 0.98, 1.08, 1.16, 1.22, 1.26, 1.18, 0.98];
  return lSteps.map((l, idx) => oklchToHex({ l, c: o.c * cMult[idx], h: o.h }));
}
function buildNeutralRamp(neutral, isDark, ink) {
  const r = hexToOklch(neutral);
  const lift = (t) => oklchToHex({
    l: r.l + (1 - r.l) * t,
    c: r.c * Math.max(0, 1 - t),
    h: r.h
  });
  const start = isDark ? ((t) => oklchToHex({
    l: r.l * (1 - t),
    c: r.c * Math.max(0, 1 - t * 0.12),
    h: r.h
  }))(clamp(0.19 + Math.max(0, r.l - 0.12) * 0.33 + r.c * 1.95, 0.17, 0.27)) : r.l < 0.82 ? lift(0.86) : lift(clamp(0.1 + r.c * 3.2 + Math.max(0, 0.95 - r.l) * 0.35, 0.1, 0.28));
  const stops = isDark ? [0, 0.018, 0.039, 0.064, 0.097, 0.143, 0.212, 0.31, 0.46, 0.649, 0.845, 0.984] : [0, 0.022, 0.042, 0.068, 0.102, 0.146, 0.208, 0.296, 0.432, 0.61, 0.81, 0.965];
  return stops.map((t) => interpolateOklch(start, ink, t));
}
function buildV2ColorRamp(seed, isDark) {
  const n = hexToOklch(seed);
  const r = isDark ? 1 : 1.05;
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
    clamp(n.l - 0.4, 0.08, 0.22)
  ];
  const cMult = [0.28, 0.48, 0.68, 0.86, 1.02, 1.28, 1.34, 1.28, 1.18, 1.08, 0.98, 0.88];
  return lSteps.map((l, idx) => oklchToHex({ l, c: n.c * cMult[idx] * r, h: n.h }));
}
function contrastRatio(hexA, hexB) {
  const lum = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  };
  const l1 = lum(hexA);
  const l2 = lum(hexB);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function pickOnColor(bgHex) {
  return contrastRatio("#ffffff", bgHex) > contrastRatio("#000000", bgHex) ? "#ffffff" : "#000000";
}
function generateV1Tokens(spec, isDark) {
  const n = spec.palette;
  const r = spec.overrides;
  const i = buildNeutralRamp(n.neutral, isDark, n.ink);
  const a = buildV1ColorRamp(n.primary, isDark);
  const o = buildV1ColorRamp(n.accent, isDark);
  const s = buildV1ColorRamp(n.success, isDark);
  const c = buildV1ColorRamp(n.warning, isDark);
  const l = buildV1ColorRamp(n.error, isDark);
  const u = buildV1ColorRamp(n.info, isDark);
  const d = buildV1ColorRamp(n.interactive, isDark);
  const f = buildV1ColorRamp(shiftOklch(n.warning, isDark ? { h: -16, l: -0.058, c: 1.14 } : { h: -22, l: -0.082, c: 0.94 }), isDark);
  const p = buildV1ColorRamp(shiftOklch(n.interactive, { h: -12, l: 0.128, c: 1.12 }), isDark);
  const m = buildV1ColorRamp(n.diffAdd ?? shiftOklch(n.success, { c: isDark ? 0.7 : 0.55, l: isDark ? -0.18 : 0.14 }), isDark);
  const h = buildV1ColorRamp(n.diffDelete ?? shiftOklch(n.error, { c: isDark ? 0.82 : 0.7, l: isDark ? -0.08 : 0.08 }), isDark);
  const g = n.ink;
  const gOklch = hexToOklch(g);
  const v = shiftOklch(g, {
    l: isDark ? Math.max(0, 0.88 - gOklch.l) * 0.4 : -Math.max(0, gOklch.l - 0.18) * 0.24,
    c: isDark ? 1.04 : 1.02
  });
  const te = r["background-base"] ?? i[0];
  const ne = (col, w) => mixHex(col, te, w);
  const w = (lightW, darkW) => ne(g, isDark ? Math.min(1, darkW + 0.104) : Math.min(1, lightW + 0.024));
  const T = (isDark ? [0.038, 0.066, 0.1, 0.142, 0.19, 0.252, 0.334, 0.446, 0.58, 0.718, 0.854, 0.985] : [0.03, 0.06, 0.1, 0.145, 0.2, 0.265, 0.35, 0.47, 0.61, 0.74, 0.86, 0.97]).map((t) => mixHex(i[11], i[0], t));
  const ie = a[8];
  const ae = a[9];
  const oe = d[isDark ? 6 : 4];
  const se = d[isDark ? 7 : 5];
  const ce = d[isDark ? 5 : 3];
  const le = s[isDark ? 6 : 4];
  const ue = s[isDark ? 5 : 3];
  const de = s[10];
  const fe = c[isDark ? 6 : 4];
  const pe = c[isDark ? 5 : 3];
  const E = c[10];
  const me = l[isDark ? 6 : 4];
  const he = l[isDark ? 5 : 3];
  const ge = l[10];
  const _e = u[isDark ? 6 : 4];
  const ve = u[isDark ? 5 : 3];
  const ye = u[10];
  const k = {
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
    ...r
  };
  return k;
}
var V2_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
function mapRampToSteps(prefix, ramp) {
  const out = {};
  for (let idx = 0;idx < V2_STEPS.length; idx++) {
    out[`v2-${prefix}-${V2_STEPS[idx]}`] = ramp[idx];
  }
  return out;
}
function generateV2Tokens(spec, isDark) {
  const n = spec.palette;
  const rawGrey = buildNeutralRamp(n.neutral, isDark, n.ink);
  const greyRamp = isDark ? rawGrey.slice().reverse() : rawGrey;
  const blueRamp = buildV2ColorRamp(n.interactive, isDark);
  const greenRamp = buildV2ColorRamp(n.success, isDark);
  const yellowRamp = buildV2ColorRamp(n.warning, isDark);
  const redRamp = buildV2ColorRamp(n.error, isDark);
  const purpleRamp = buildV2ColorRamp(n.accent, isDark);
  const pinkRamp = buildV2ColorRamp(n.info, isDark);
  const orangeRamp = buildV2ColorRamp(shiftOklch(n.warning, { h: -22, l: -0.082, c: 0.94 }), isDark);
  const cyanRamp = buildV2ColorRamp(shiftOklch(n.info, { h: -12, l: 0.128, c: 1.12 }), isDark);
  const primitives = {
    "v2-grey-50": "#ffffff",
    ...mapRampToSteps("grey", greyRamp),
    ...mapRampToSteps("blue", blueRamp),
    ...mapRampToSteps("green", greenRamp),
    ...mapRampToSteps("yellow", yellowRamp),
    ...mapRampToSteps("red", redRamp),
    ...mapRampToSteps("purple", purpleRamp),
    ...mapRampToSteps("pink", pinkRamp),
    ...mapRampToSteps("orange", orangeRamp),
    ...mapRampToSteps("cyan", cyanRamp)
  };
  const sf = spec.surfaces;
  const semantic = {
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
    "v2-overlay-simple-overlay-hover": isDark ? "rgba(245, 244, 239, 0.055)" : "rgba(31, 30, 29, 0.045)",
    "v2-overlay-simple-overlay-pressed": isDark ? "rgba(245, 244, 239, 0.095)" : "rgba(31, 30, 29, 0.085)",
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
    ...spec.v2Overrides
  };
  return {
    ...primitives,
    ...semantic
  };
}
function buildSyntaxOverrides(isDark, accentHex) {
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
      "markdown-code-block": "#F5F4EF"
    };
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
    "markdown-code-block": "#1F1E1D"
  };
}
function resolveVariantSpec(settings, isDark) {
  const accentDesc = ACCENT_LIST.find((a) => a.id === settings.accentStyle) ?? ACCENT_LIST[0];
  const accentPrimary = isDark ? accentDesc.darkHex : accentDesc.lightHex;
  const accentHover = isDark ? accentDesc.darkHover : accentDesc.lightHover;
  const preset = settings.preset;
  const contrastDelta = settings.surfaceContrast === "soft" ? -1 : settings.surfaceContrast === "crisp" ? 1 : 0;
  let bgBase;
  let bgDeep;
  let bgLayer01;
  let bgLayer02;
  let bgLayer03;
  let bgLayer04;
  let terminalBg;
  let composerBg;
  let borderMuted;
  let borderBase;
  let borderStrong;
  let textBase;
  let textMuted;
  let textFaint;
  let diffAddBg;
  let diffDelBg;
  if (isDark) {
    if (preset === "slate") {
      bgBase = "#141413";
      bgDeep = "#0E0E0D";
      bgLayer01 = "#1E1E1C";
      bgLayer02 = "#262624";
      bgLayer03 = "#30302E";
      bgLayer04 = "#3D3D3A";
      terminalBg = "#10100F";
      composerBg = "#1F1F1D";
      borderMuted = "rgba(232, 230, 220, 0.07)";
      borderBase = "rgba(232, 230, 220, 0.12)";
      borderStrong = "rgba(232, 230, 220, 0.22)";
      textBase = "#E8E6DC";
      textMuted = "#B0AEA5";
      textFaint = "#87867F";
      diffAddBg = "#232E21";
      diffDelBg = "#32201D";
    } else if (preset === "parchment") {
      bgBase = "#2B2926";
      bgDeep = "#22201D";
      bgLayer01 = "#34312D";
      bgLayer02 = "#3E3B36";
      bgLayer03 = "#49453F";
      bgLayer04 = "#56514A";
      terminalBg = "#201E1B";
      composerBg = "#35322E";
      borderMuted = "rgba(245, 240, 228, 0.08)";
      borderBase = "rgba(245, 240, 228, 0.14)";
      borderStrong = "rgba(245, 240, 228, 0.24)";
      textBase = "#F5F0E4";
      textMuted = "#C2BBB0";
      textFaint = "#948E84";
      diffAddBg = "#313C2D";
      diffDelBg = "#402C28";
    } else if (preset === "high-contrast") {
      bgBase = "#111110";
      bgDeep = "#0A0A09";
      bgLayer01 = "#1B1B19";
      bgLayer02 = "#252522";
      bgLayer03 = "#31312D";
      bgLayer04 = "#3F3F3A";
      terminalBg = "#0C0C0B";
      composerBg = "#1C1C1A";
      borderMuted = "rgba(250, 249, 245, 0.12)";
      borderBase = "rgba(250, 249, 245, 0.19)";
      borderStrong = "rgba(250, 249, 245, 0.32)";
      textBase = "#FAF9F5";
      textMuted = "#C7C5BC";
      textFaint = "#96948B";
      diffAddBg = "#243320";
      diffDelBg = "#38211D";
    } else {
      bgBase = "#262624";
      bgDeep = "#1E1E1C";
      bgLayer01 = "#30302E";
      bgLayer02 = "#3A3A37";
      bgLayer03 = "#454541";
      bgLayer04 = "#52524D";
      terminalBg = "#1C1B1A";
      composerBg = "#30302E";
      borderMuted = "rgba(245, 244, 239, 0.075)";
      borderBase = "rgba(245, 244, 239, 0.125)";
      borderStrong = "rgba(245, 244, 239, 0.22)";
      textBase = "#F5F4EF";
      textMuted = "#B7B5AC";
      textFaint = "#8A8880";
      diffAddBg = "#2F3A2C";
      diffDelBg = "#3D2A26";
    }
    if (contrastDelta === -1) {
      borderMuted = "rgba(245, 244, 239, 0.05)";
      borderBase = "rgba(245, 244, 239, 0.09)";
      borderStrong = "rgba(245, 244, 239, 0.16)";
    } else if (contrastDelta === 1) {
      borderMuted = "rgba(245, 244, 239, 0.12)";
      borderBase = "rgba(245, 244, 239, 0.19)";
      borderStrong = "rgba(245, 244, 239, 0.30)";
    }
  } else {
    if (preset === "slate") {
      bgBase = "#F0EEE6";
      bgDeep = "#E8E6DC";
      bgLayer01 = "#FAF9F5";
      bgLayer02 = "#E4E1D6";
      bgLayer03 = "#D8D5C8";
      bgLayer04 = "#C9C6B8";
      terminalBg = "#E8E5DA";
      composerBg = "#FAF9F5";
      borderMuted = "rgba(20, 20, 19, 0.07)";
      borderBase = "rgba(20, 20, 19, 0.12)";
      borderStrong = "rgba(20, 20, 19, 0.22)";
      textBase = "#141413";
      textMuted = "#5E5D59";
      textFaint = "#87867F";
      diffAddBg = "#E1E9DA";
      diffDelBg = "#EFE0DC";
    } else if (preset === "parchment") {
      bgBase = "#F7F3E8";
      bgDeep = "#EFE9D8";
      bgLayer01 = "#FCF9F2";
      bgLayer02 = "#EDE6D5";
      bgLayer03 = "#E2D9C5";
      bgLayer04 = "#D4C9B0";
      terminalBg = "#EFEAD9";
      composerBg = "#FCF9F2";
      borderMuted = "rgba(36, 33, 28, 0.075)";
      borderBase = "rgba(36, 33, 28, 0.13)";
      borderStrong = "rgba(36, 33, 28, 0.23)";
      textBase = "#221F1B";
      textMuted = "#69635A";
      textFaint = "#8F887D";
      diffAddBg = "#E3ECDC";
      diffDelBg = "#F2E0DA";
    } else if (preset === "high-contrast") {
      bgBase = "#FFFFFF";
      bgDeep = "#F4F2EA";
      bgLayer01 = "#FAF9F5";
      bgLayer02 = "#EDEBE2";
      bgLayer03 = "#DFDDD2";
      bgLayer04 = "#CFCCC0";
      terminalBg = "#F4F2EA";
      composerBg = "#FFFFFF";
      borderMuted = "rgba(20, 20, 19, 0.11)";
      borderBase = "rgba(20, 20, 19, 0.18)";
      borderStrong = "rgba(20, 20, 19, 0.30)";
      textBase = "#111110";
      textMuted = "#4F4D48";
      textFaint = "#75736C";
      diffAddBg = "#DFEAD6";
      diffDelBg = "#F2DCD6";
    } else {
      bgBase = "#FAF9F5";
      bgDeep = "#F2F0E8";
      bgLayer01 = "#FFFFFF";
      bgLayer02 = "#F0EEE6";
      bgLayer03 = "#E5E2D9";
      bgLayer04 = "#D8D4C8";
      terminalBg = "#F2EFE6";
      composerBg = "#FFFFFF";
      borderMuted = "rgba(31, 30, 29, 0.07)";
      borderBase = "rgba(31, 30, 29, 0.115)";
      borderStrong = "rgba(31, 30, 29, 0.21)";
      textBase = "#1F1E1D";
      textMuted = "#6B6862";
      textFaint = "#8A8781";
      diffAddBg = "#E6EDDF";
      diffDelBg = "#F3E1DB";
    }
    if (contrastDelta === -1) {
      borderMuted = "rgba(31, 30, 29, 0.045)";
      borderBase = "rgba(31, 30, 29, 0.08)";
      borderStrong = "rgba(31, 30, 29, 0.15)";
    } else if (contrastDelta === 1) {
      borderMuted = "rgba(31, 30, 29, 0.11)";
      borderBase = "rgba(31, 30, 29, 0.18)";
      borderStrong = "rgba(31, 30, 29, 0.28)";
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
      diffDelete: isDark ? "#E88875" : "#9A3E35"
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
      diffDelBg
    }
  };
}

// src/styles.ts
function formatTokenBlock(tokens) {
  return Object.entries(tokens).map(([key, value]) => `  --${key}: ${value};`).join(`
`);
}
function buildSettingsPageUiCss() {
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
`;
}
function buildClaudeCodeStyles(settings) {
  const settingsUiCss = buildSettingsPageUiCss();
  if (!settings.enabled) {
    return settingsUiCss;
  }
  const darkSpec = resolveVariantSpec(settings, true);
  const lightSpec = resolveVariantSpec(settings, false);
  const darkV1 = generateV1Tokens(darkSpec, true);
  const darkV2 = generateV2Tokens(darkSpec, true);
  const lightV1 = generateV1Tokens(lightSpec, false);
  const lightV2 = generateV2Tokens(lightSpec, false);
  const darkCustomVars = {
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
    "claude-rust": "#E88875"
  };
  const lightCustomVars = {
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
    "claude-rust": "#9A3E35"
  };
  const sections = [
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
}`
  ];
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
}`);
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
}`);
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
}`);
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
}`);
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
}`);
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
}`);
  }
  return sections.join(`

`);
}

// src/gui.ts
var I18N_EN = {
  "page.title": "Claude Code Theme",
  "page.subtitle": "Anthropic warm editorial palette (Clay & Parchment), dual-layer V1/V2 tokens, and component micro-styling.",
  "banner.title": "Claude Code Aesthetic Engine",
  "banner.active": "Active",
  "banner.paused": "Paused",
  "banner.desc": "Warm coal (#262624), sun-lit parchment (#FAF9F5), and terracotta clay (#D97757) tuned for long coding sessions.",
  "section.palette": "Color Presets & Surface Tuning",
  "section.components": "Signature Component Micro-Styling",
  "preset.clay.label": "Claude Clay (Default)",
  "preset.clay.desc": "Warm coal #262624 dark & #FAF9F5 paper light with terracotta clay #D97757.",
  "preset.slate.label": "Claude Slate",
  "preset.slate.desc": "Deep ink #141413 dark & warm stone #F0EEE6 light with cinnabar #C6613F.",
  "preset.parchment.label": "Editorial Parchment",
  "preset.parchment.desc": "Book-paper warmth (#2B2926 / #F7F3E8) with soft kraft & sepia undertones.",
  "preset.highContrast.label": "Claude Studio Crisp",
  "preset.highContrast.desc": "High-contrast obsidian #111110 & studio white #FFFFFF with crisp borders.",
  "accent.terracotta": "Terracotta (#D97757)",
  "accent.cinnabar": "Cinnabar (#C6613F)",
  "accent.kraft": "Kraft Gold (#D4A27F)",
  "accent.olive": "Sage Olive (#A5B98C)",
  "accent.fig": "Editorial Fig (#D990AA)",
  "contrast.soft": "Soft",
  "contrast.balanced": "Balanced",
  "contrast.crisp": "Crisp",
  "row.enabled.title": "Enable Claude Code Theme",
  "row.enabled.desc": "Apply warm Claude Code color tokens and component refinements globally.",
  "row.accent.title": "Brand Accent Tone",
  "row.accent.desc": "Primary interactive color for focus rings, active tabs, links, and submit buttons.",
  "row.contrast.title": "Border & Surface Contrast",
  "row.contrast.desc": "Adjust hairline border visibility between sidebar, panels, and cards.",
  "row.composer.title": "Composer Card Polish",
  "row.composer.desc": "Floating 14px rounded prompt dock, warm focus glow, and terracotta submit button.",
  "row.tools.title": "Tool Call Card Refinement",
  "row.tools.desc": "Monospace parameters, subtle hover states, and terracotta left guide rail on expanded tools.",
  "row.reasoning.title": "Reasoning / Thinking Editorial Rail",
  "row.reasoning.desc": "Warm terracotta-tinted vertical guide rail and soft gradient for model thinking blocks.",
  "row.terminal.title": "Recessed Terminal & Code Wells",
  "row.terminal.desc": "Deep warm coal (#1C1B1A) / paper well (#F2EFE6) for terminal output and code blocks.",
  "row.messages.title": "User Message Bubble & Inline Code",
  "row.messages.desc": "Warm clay-tinted user prompt bubbles, inline code pills, and editorial blockquotes.",
  "row.typography.title": "Editorial Serif Headings",
  "row.typography.desc": "Use literary serif typography (Copernicus / Newsreader / Georgia) for Markdown H1/H2 headings.",
  "row.reset.title": "Restore Default Claude Clay Settings",
  "row.reset.desc": "Reset preset, accent tone, contrast, and all component switches back to defaults.",
  "row.reset.button": "Reset to Defaults",
  "command.category": "Claude Theme",
  "command.openSettings": "Claude Theme: Open Appearance Settings",
  "command.toggleTheme": "Claude Theme: Toggle Enable / Disable",
  "command.cyclePreset": "Claude Theme: Cycle Color Preset (Clay / Slate / Parchment / Crisp)",
  "toast.enabled": "Claude Code Theme enabled",
  "toast.disabled": "Claude Code Theme paused",
  "toast.presetChanged": "Claude Theme preset: {{preset}}"
};
var I18N_ZH = {
  "page.title": "Claude Code 主题",
  "page.subtitle": "Anthropic 温润陶土与羊皮纸审美体系、V1/V2 双层色彩引擎与标志性组件精修。",
  "banner.title": "Claude Code 视觉美学引擎",
  "banner.active": "已启用",
  "banner.paused": "已暂停",
  "banner.desc": "以暖炭黑 (#262624)、暖羊皮纸 (#FAF9F5) 与赤陶橙 (#D97757) 打造沉浸式低视觉疲劳编程体验。",
  "section.palette": "色彩预设与表面层次微调",
  "section.components": "标志性组件微整形 (Component Polish)",
  "preset.clay.label": "Claude Clay 温润陶土（默认）",
  "preset.clay.desc": "经典暖炭黑 #262624 暗色与 #FAF9F5 羊皮纸亮色，搭配 #D97757 陶土主色。",
  "preset.slate.label": "Claude Slate 深邃暖岩",
  "preset.slate.desc": "深墨黑 #141413 暗色与暖石米灰 #F0EEE6 亮色，搭配 #C6613F 朱砂赤陶。",
  "preset.parchment.label": "Editorial Parchment 典藏书页",
  "preset.parchment.desc": "复古书籍纸张暖调 (#2B2926 / #F7F3E8)，柔和牛皮纸金与暖棕底色。",
  "preset.highContrast.label": "Claude Studio Crisp 高对比",
  "preset.highContrast.desc": "黑曜石 #111110 与纯白工作室亮色，强化边框与文字锐度。",
  "accent.terracotta": "赤陶橙 Terracotta (#D97757)",
  "accent.cinnabar": "朱砂红 Cinnabar (#C6613F)",
  "accent.kraft": "牛皮纸金 Kraft (#D4A27F)",
  "accent.olive": "鼠尾草绿 Olive (#A5B98C)",
  "accent.fig": "无花果紫 Fig (#D990AA)",
  "contrast.soft": "柔和 (Soft)",
  "contrast.balanced": "均衡 (Balanced)",
  "contrast.crisp": "锐利 (Crisp)",
  "row.enabled.title": "启用 Claude Code 主题",
  "row.enabled.desc": "全局应用 Claude Code 双层色彩变量与组件微整形样式。",
  "row.accent.title": "品牌强调色 (Accent Tone)",
  "row.accent.desc": "控制焦点光环、激活标签、链接、发送按钮及高亮徽章的主色调。",
  "row.contrast.title": "边框与层级对比度",
  "row.contrast.desc": "调节侧边栏、面板、工具卡片与输入框细线边框的清晰度。",
  "row.composer.title": "底部输入框精修 (Composer Polish)",
  "row.composer.desc": "14px 悬浮圆角输入舱、赤陶橙柔光聚焦环与专属发送按钮样式。",
  "row.tools.title": "工具调用卡片精修 (Tool Cards)",
  "row.tools.desc": "等宽字体参数副标题、温润悬停态与展开内容的赤陶左侧引导线。",
  "row.reasoning.title": "深度思考区块书卷导轨 (Reasoning Rail)",
  "row.reasoning.desc": "为模型思考过程添加赤陶渐变左侧边线与暖调书卷阅读排版。",
  "row.terminal.title": "内凹暖炭终端与代码槽 (Terminal Wells)",
  "row.terminal.desc": "为终端输出与代码块提供 #1C1B1A / #F2EFE6 专属内凹深邃底色。",
  "row.messages.title": "用户消息气泡与行内代码精修",
  "row.messages.desc": "暖陶土微染用户提问气泡、精致行内代码胶囊与引用块左边框。",
  "row.typography.title": "人文衬线标题排版 (Editorial Serif)",
  "row.typography.desc": "在 Markdown 一/二级标题启用优雅衬线字体 (Copernicus / Newsreader / 宋体)。",
  "row.reset.title": "恢复默认 Claude Clay 配置",
  "row.reset.desc": "将色彩预设、强调色、对比度及所有组件精修开关重置为初始推荐状态。",
  "row.reset.button": "重置为默认值",
  "command.category": "Claude 主题",
  "command.openSettings": "Claude 主题：打开外观设置页",
  "command.toggleTheme": "Claude 主题：开启 / 关闭主题",
  "command.cyclePreset": "Claude 主题：切换色彩预设 (Clay / Slate / Parchment / Crisp)",
  "toast.enabled": "已启用 Claude Code 主题",
  "toast.disabled": "已暂停 Claude Code 主题",
  "toast.presetChanged": "Claude 主题预设已切换为：{{preset}}"
};
var I18N_ZHT = {
  ...I18N_ZH,
  "page.title": "Claude Code 主題",
  "page.subtitle": "Anthropic 溫潤陶土與羊皮紙審美體系、V1/V2 雙層色彩引擎與標誌性組件精修。",
  "banner.title": "Claude Code 視覺美學引擎",
  "banner.active": "已啟用",
  "banner.paused": "已暫停",
  "section.palette": "色彩預設與表面層次微調",
  "section.components": "標誌性組件微整形 (Component Polish)",
  "row.enabled.title": "啟用 Claude Code 主題",
  "row.accent.title": "品牌強調色 (Accent Tone)",
  "row.contrast.title": "邊框與層級對比度",
  "row.reset.button": "重置為預設值"
};
var gui_default = import_gui.Plugin.define({
  stores: {
    settings: import_gui.Store.global(SettingsSchema, DEFAULT_SETTINGS)
  },
  i18n: {
    en: I18N_EN,
    zh: I18N_ZH,
    zht: I18N_ZHT
  },
  setup(ctx) {
    const store = ctx.stores.settings;
    const getSettings = () => store.value ?? DEFAULT_SETTINGS;
    ctx.add(import_gui.Style, () => buildClaudeCodeStyles(getSettings()));
    ctx.add(import_gui.SettingsPage, {
      id: "claude-code-theme",
      icon: "appearance",
      get title() {
        return ctx.t("page.title");
      },
      get entries() {
        return [
          {
            id: "claude-theme-enabled",
            title: ctx.t("row.enabled.title"),
            description: ctx.t("row.enabled.desc"),
            keywords: "claude clay theme warm dark paper terracotta anthropic enable toggle"
          },
          {
            id: "claude-theme-preset",
            title: ctx.t("section.palette"),
            description: ctx.t("preset.clay.desc"),
            keywords: "preset clay slate parchment crisp high contrast palette"
          },
          {
            id: "claude-theme-accent",
            title: ctx.t("row.accent.title"),
            description: ctx.t("row.accent.desc"),
            keywords: "accent terracotta cinnabar kraft olive fig color"
          },
          {
            id: "claude-theme-contrast",
            title: ctx.t("row.contrast.title"),
            description: ctx.t("row.contrast.desc"),
            keywords: "contrast border soft balanced crisp"
          },
          {
            id: "claude-theme-composer",
            title: ctx.t("row.composer.title"),
            description: ctx.t("row.composer.desc"),
            keywords: "composer prompt input dock submit button"
          },
          {
            id: "claude-theme-tools",
            title: ctx.t("row.tools.title"),
            description: ctx.t("row.tools.desc"),
            keywords: "tool card collapsible rail monospace"
          },
          {
            id: "claude-theme-reasoning",
            title: ctx.t("row.reasoning.title"),
            description: ctx.t("row.reasoning.desc"),
            keywords: "reasoning thinking block rail"
          },
          {
            id: "claude-theme-terminal",
            title: ctx.t("row.terminal.title"),
            description: ctx.t("row.terminal.desc"),
            keywords: "terminal bash code block background"
          },
          {
            id: "claude-theme-messages",
            title: ctx.t("row.messages.title"),
            description: ctx.t("row.messages.desc"),
            keywords: "user message bubble inline code blockquote"
          },
          {
            id: "claude-theme-typography",
            title: ctx.t("row.typography.title"),
            description: ctx.t("row.typography.desc"),
            keywords: "serif typography headings markdown font"
          },
          {
            id: "claude-theme-reset",
            title: ctx.t("row.reset.title"),
            description: ctx.t("row.reset.desc"),
            keywords: "reset default restore"
          }
        ];
      },
      render: () => renderClaudeSettingsPage(ctx)
    });
    ctx.add(import_gui.Command, () => ({
      id: "open-settings",
      title: ctx.t("command.openSettings"),
      group: ctx.t("command.category"),
      keywords: "claude theme appearance clay settings palette",
      run: () => {
        ctx.layout.settings("claude-code-theme");
      }
    }));
    ctx.add(import_gui.Command, () => ({
      id: "toggle",
      title: ctx.t("command.toggleTheme"),
      group: ctx.t("command.category"),
      keywords: "claude theme toggle enable disable",
      run: () => {
        const next = !getSettings().enabled;
        store.update((s) => {
          s.enabled = next;
        });
        ctx.toast.show({
          title: next ? ctx.t("toast.enabled") : ctx.t("toast.disabled"),
          variant: "success"
        });
      }
    }));
    ctx.add(import_gui.Command, () => ({
      id: "cycle-preset",
      title: ctx.t("command.cyclePreset"),
      group: ctx.t("command.category"),
      keywords: "claude theme preset clay slate parchment crisp cycle",
      run: () => {
        const cur = getSettings().preset;
        const idx = PRESET_LIST.findIndex((p) => p.id === cur);
        const nextPreset = PRESET_LIST[(idx + 1) % PRESET_LIST.length];
        store.update((s) => {
          s.preset = nextPreset.id;
          s.enabled = true;
        });
        ctx.toast.show({
          title: ctx.t("toast.presetChanged", { preset: ctx.t(nextPreset.labelKey) }),
          variant: "success"
        });
      }
    }));
  }
});
