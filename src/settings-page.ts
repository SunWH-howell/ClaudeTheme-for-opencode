import { createRenderEffect } from "solid-js"
import {
  ACCENT_LIST,
  DEFAULT_SETTINGS,
  PRESET_LIST,
  type AccentStyleId,
  type ClaudeThemeSettings,
  type SurfaceContrastId,
  type ThemePresetId,
} from "./schema"

export interface SettingsPageContext {
  t: (key: string, params?: Record<string, string | number>) => string
  stores: {
    settings: {
      readonly value: ClaudeThemeSettings | undefined
      update: (updater: (draft: ClaudeThemeSettings) => void) => void
      set: (next: ClaudeThemeSettings) => void
    }
  }
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  className?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      node.setAttribute(k, v)
    }
  }
  return node
}

export function renderClaudeSettingsPage(ctx: SettingsPageContext): HTMLElement[] {
  const store = ctx.stores.settings
  const current = (): ClaudeThemeSettings => store.value ?? DEFAULT_SETTINGS

  // 1. Header (.settings-tab-header)
  const header = el("div", undefined, "settings-tab-header")
  const headerRow = el("div", undefined, "settings-tab-header-row")
  const headerTitleCol = el("div", undefined, "flex flex-col gap-1")
  const h2 = el("h2", undefined, "settings-tab-title")
  const subtitle = el("span", undefined, "text-11-regular text-v2-text-text-muted")
  headerTitleCol.append(h2, subtitle)
  headerRow.append(headerTitleCol)
  header.append(headerRow)

  createRenderEffect(() => {
    h2.textContent = ctx.t("page.title")
    subtitle.textContent = ctx.t("page.subtitle")
  })

  // 2. Body (.settings-tab-body.settings-tab-body--sectioned)
  const body = el("div", undefined, "settings-tab-body settings-tab-body--sectioned")

  // Banner Card with Live Palette Swatches & Master Switch
  const banner = el("div", { "data-action": "claude-theme-enabled" }, "claude-theme-banner")
  const bannerTop = el("div", undefined, "claude-theme-banner-top")
  const brand = el("div", undefined, "claude-theme-brand")
  const emblem = el("div", { "aria-hidden": "true" }, "claude-theme-emblem")
  emblem.textContent = "C"

  const brandCopy = el("div", undefined, "claude-theme-brand-copy")
  const brandTitleRow = el("div", undefined, "claude-theme-brand-title")
  const brandName = el("span")
  const statusPill = el("span", undefined, "claude-theme-status-pill")
  brandTitleRow.append(brandName, statusPill)

  const brandDesc = el("div", undefined, "claude-theme-brand-subtitle")
  brandCopy.append(brandTitleRow, brandDesc)
  brand.append(emblem, brandCopy)

  const masterToggle = createToggleButton(
    () => current().enabled,
    (next) => store.update((s) => void (s.enabled = next)),
    () => ctx.t("row.enabled.title"),
  )
  bannerTop.append(brand, masterToggle)

  const swatchStrip = el("div", undefined, "claude-swatch-strip")
  const swatches = [
    { name: "Clay", hex: "#D97757" },
    { name: "Coal", hex: "#262624" },
    { name: "Paper", hex: "#FAF9F5" },
    { name: "Fig", hex: "#D990AA" },
    { name: "Kraft", hex: "#D4A27F" },
    { name: "Olive", hex: "#A5B98C" },
    { name: "Slate Blue", hex: "#8FB0CE" },
  ]
  for (const sw of swatches) {
    const chip = el("span", undefined, "claude-swatch-chip")
    const dot = el("span", undefined, "claude-swatch-dot")
    dot.style.backgroundColor = sw.hex
    const label = el("span")
    label.textContent = `${sw.name} ${sw.hex}`
    chip.append(dot, label)
    swatchStrip.append(chip)
  }

  banner.append(bannerTop, swatchStrip)
  body.append(banner)

  createRenderEffect(() => {
    const s = current()
    brandName.textContent = ctx.t("banner.title")
    statusPill.textContent = s.enabled ? ctx.t("banner.active") : ctx.t("banner.paused")
    brandDesc.textContent = ctx.t("banner.desc")
  })

  // Section 1: Palette Presets & Surface Tuning
  const paletteSection = el("section", undefined, "settings-section")
  const paletteSectionTitle = el("h3", undefined, "settings-section-title")
  createRenderEffect(() => {
    paletteSectionTitle.textContent = ctx.t("section.palette")
  })

  const presetGrid = el("div", { "data-action": "claude-theme-preset" }, "claude-preset-grid")
  for (const preset of PRESET_LIST) {
    const card = el("button", { type: "button" }, "claude-preset-card")
    const cardHeader = el("div", undefined, "claude-preset-card-header")
    const cardTitle = el("span", undefined, "claude-preset-card-title")
    const miniPalettes = el("span", undefined, "claude-preset-mini-palettes")

    for (const col of [preset.darkBg, preset.darkPanel, preset.lightBg, preset.accent]) {
      const dot = el("span", undefined, "claude-preset-mini-dot")
      dot.style.backgroundColor = col
      miniPalettes.append(dot)
    }

    cardHeader.append(cardTitle, miniPalettes)
    const cardDesc = el("span", undefined, "claude-preset-card-desc")
    card.append(cardHeader, cardDesc)

    card.addEventListener("click", () => {
      store.update((s) => {
        s.preset = preset.id as ThemePresetId
      })
    })

    createRenderEffect(() => {
      const active = current().preset === preset.id
      card.setAttribute("data-active", active ? "true" : "false")
      card.setAttribute("aria-pressed", active ? "true" : "false")
      cardTitle.textContent = ctx.t(preset.labelKey)
      cardDesc.textContent = ctx.t(preset.descKey)
    })

    presetGrid.append(card)
  }

  const paletteList = el("div", { "data-component": "settings-list" })

  // Accent Style Row
  const accentPills = el("div", undefined, "claude-pill-group")
  for (const acc of ACCENT_LIST) {
    const btn = el("button", { type: "button" }, "claude-pill-btn")
    const dot = el("span", undefined, "claude-swatch-dot")
    dot.style.backgroundColor = acc.darkHex
    const text = el("span")
    btn.append(dot, text)
    btn.addEventListener("click", () => {
      store.update((s) => {
        s.accentStyle = acc.id as AccentStyleId
      })
    })
    createRenderEffect(() => {
      const active = current().accentStyle === acc.id
      btn.setAttribute("data-active", active ? "true" : "false")
      text.textContent = ctx.t(acc.labelKey)
    })
    accentPills.append(btn)
  }

  paletteList.append(
    createSettingsRow(
      "claude-theme-accent",
      () => ctx.t("row.accent.title"),
      () => ctx.t("row.accent.desc"),
      accentPills,
    ),
  )

  // Surface Contrast Row
  const contrastOptions: readonly { id: SurfaceContrastId; labelKey: string }[] = [
    { id: "soft", labelKey: "contrast.soft" },
    { id: "balanced", labelKey: "contrast.balanced" },
    { id: "crisp", labelKey: "contrast.crisp" },
  ]
  const contrastPills = el("div", undefined, "claude-pill-group")
  for (const opt of contrastOptions) {
    const btn = el("button", { type: "button" }, "claude-pill-btn")
    btn.addEventListener("click", () => {
      store.update((s) => {
        s.surfaceContrast = opt.id
      })
    })
    createRenderEffect(() => {
      const active = current().surfaceContrast === opt.id
      btn.setAttribute("data-active", active ? "true" : "false")
      btn.textContent = ctx.t(opt.labelKey)
    })
    contrastPills.append(btn)
  }

  paletteList.append(
    createSettingsRow(
      "claude-theme-contrast",
      () => ctx.t("row.contrast.title"),
      () => ctx.t("row.contrast.desc"),
      contrastPills,
    ),
  )

  paletteSection.append(paletteSectionTitle, presetGrid, paletteList)
  body.append(paletteSection)

  // Section 2: Signature Component Micro-Styling
  const compSection = el("section", undefined, "settings-section")
  const compSectionTitle = el("h3", undefined, "settings-section-title")
  createRenderEffect(() => {
    compSectionTitle.textContent = ctx.t("section.components")
  })

  const compList = el("div", { "data-component": "settings-list" })

  const toggleRows: readonly {
    actionId: string
    key: keyof Pick<
      ClaudeThemeSettings,
      | "composerPolish"
      | "toolCardPolish"
      | "reasoningPolish"
      | "terminalPolish"
      | "messageBubblePolish"
      | "editorialTypography"
    >
    titleKey: string
    descKey: string
  }[] = [
    {
      actionId: "claude-theme-composer",
      key: "composerPolish",
      titleKey: "row.composer.title",
      descKey: "row.composer.desc",
    },
    {
      actionId: "claude-theme-tools",
      key: "toolCardPolish",
      titleKey: "row.tools.title",
      descKey: "row.tools.desc",
    },
    {
      actionId: "claude-theme-reasoning",
      key: "reasoningPolish",
      titleKey: "row.reasoning.title",
      descKey: "row.reasoning.desc",
    },
    {
      actionId: "claude-theme-terminal",
      key: "terminalPolish",
      titleKey: "row.terminal.title",
      descKey: "row.terminal.desc",
    },
    {
      actionId: "claude-theme-messages",
      key: "messageBubblePolish",
      titleKey: "row.messages.title",
      descKey: "row.messages.desc",
    },
    {
      actionId: "claude-theme-typography",
      key: "editorialTypography",
      titleKey: "row.typography.title",
      descKey: "row.typography.desc",
    },
  ]

  for (const item of toggleRows) {
    const toggle = createToggleButton(
      () => current()[item.key],
      (next) =>
        store.update((s) => {
          s[item.key] = next
        }),
      () => ctx.t(item.titleKey),
    )
    compList.append(
      createSettingsRow(
        item.actionId,
        () => ctx.t(item.titleKey),
        () => ctx.t(item.descKey),
        toggle,
      ),
    )
  }

  // Reset Row
  const resetBtn = el("button", { type: "button" }, "claude-reset-btn")
  resetBtn.addEventListener("click", () => {
    store.set({ ...DEFAULT_SETTINGS })
  })
  createRenderEffect(() => {
    resetBtn.textContent = ctx.t("row.reset.button")
  })

  compList.append(
    createSettingsRow(
      "claude-theme-reset",
      () => ctx.t("row.reset.title"),
      () => ctx.t("row.reset.desc"),
      resetBtn,
    ),
  )

  compSection.append(compSectionTitle, compList)
  body.append(compSection)

  return [header, body]
}

function createSettingsRow(
  actionId: string,
  titleAccessor: () => string,
  descAccessor: () => string,
  controlNode: HTMLElement,
): HTMLElement {
  const wrapper = el("div", { "data-action": actionId })
  const row = el("div", { "data-component": "settings-row" })
  const copy = el("div", { "data-slot": "settings-row-copy" })
  const title = el("div", { "data-slot": "settings-row-title" })
  const desc = el("div", { "data-slot": "settings-row-description" })
  const control = el("div", { "data-slot": "settings-row-control" })

  createRenderEffect(() => {
    title.textContent = titleAccessor()
    desc.textContent = descAccessor()
  })

  copy.append(title, desc)
  control.append(controlNode)
  row.append(copy, control)
  wrapper.append(row)
  return wrapper
}

function createToggleButton(
  checkedAccessor: () => boolean,
  onChange: (next: boolean) => void,
  ariaLabelAccessor: () => string,
): HTMLButtonElement {
  const btn = el("button", { type: "button", role: "switch" }, "claude-toggle-btn")
  const thumb = el("span", { "aria-hidden": "true" }, "claude-toggle-thumb")
  btn.append(thumb)

  btn.addEventListener("click", () => {
    onChange(!checkedAccessor())
  })

  createRenderEffect(() => {
    const checked = checkedAccessor()
    btn.setAttribute("data-checked", checked ? "true" : "false")
    btn.setAttribute("aria-checked", checked ? "true" : "false")
    btn.setAttribute("aria-label", ariaLabelAccessor())
  })

  return btn
}
