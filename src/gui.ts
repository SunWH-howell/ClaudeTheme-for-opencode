import { Command, Plugin, SettingsPage, Store, Style } from "@opencode/plugin/gui"
import {
  DEFAULT_SETTINGS,
  PRESET_LIST,
  SettingsSchema,
  type ClaudeThemeSettings,
} from "./schema"
import { renderClaudeSettingsPage } from "./settings-page"
import { buildClaudeCodeStyles } from "./styles"

const I18N_EN: Record<string, string> = {
  "page.title": "Claude Code Theme",
  "page.subtitle":
    "Anthropic warm editorial palette (Clay & Parchment), dual-layer V1/V2 tokens, and component micro-styling.",
  "banner.title": "Claude Code Aesthetic Engine",
  "banner.active": "Active",
  "banner.paused": "Paused",
  "banner.desc":
    "Warm coal (#262624), sun-lit parchment (#FAF9F5), and terracotta clay (#D97757) tuned for long coding sessions.",
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
  "toast.presetChanged": "Claude Theme preset: {{preset}}",
}

const I18N_ZH: Record<string, string> = {
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
  "toast.presetChanged": "Claude 主题预设已切换为：{{preset}}",
}

const I18N_ZHT: Record<string, string> = {
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
  "row.reset.button": "重置為預設值",
}

export default Plugin.define({
  stores: {
    settings: Store.global(SettingsSchema, DEFAULT_SETTINGS),
  },
  i18n: {
    en: I18N_EN,
    zh: I18N_ZH,
    zht: I18N_ZHT,
  },
  setup(ctx) {
    const store = ctx.stores.settings
    const getSettings = (): ClaudeThemeSettings => store.value ?? DEFAULT_SETTINGS

    // 1. Reactive dual-layer CSS token & component polish injection
    ctx.add(Style, () => buildClaudeCodeStyles(getSettings()))

    // 2. Standalone SettingsPage in main Settings navigation
    ctx.add(SettingsPage, {
      id: "claude-code-theme",
      icon: "appearance",
      get title() {
        return ctx.t("page.title")
      },
      get entries() {
        return [
          {
            id: "claude-theme-enabled",
            title: ctx.t("row.enabled.title"),
            description: ctx.t("row.enabled.desc"),
            keywords: "claude clay theme warm dark paper terracotta anthropic enable toggle",
          },
          {
            id: "claude-theme-preset",
            title: ctx.t("section.palette"),
            description: ctx.t("preset.clay.desc"),
            keywords: "preset clay slate parchment crisp high contrast palette",
          },
          {
            id: "claude-theme-accent",
            title: ctx.t("row.accent.title"),
            description: ctx.t("row.accent.desc"),
            keywords: "accent terracotta cinnabar kraft olive fig color",
          },
          {
            id: "claude-theme-contrast",
            title: ctx.t("row.contrast.title"),
            description: ctx.t("row.contrast.desc"),
            keywords: "contrast border soft balanced crisp",
          },
          {
            id: "claude-theme-composer",
            title: ctx.t("row.composer.title"),
            description: ctx.t("row.composer.desc"),
            keywords: "composer prompt input dock submit button",
          },
          {
            id: "claude-theme-tools",
            title: ctx.t("row.tools.title"),
            description: ctx.t("row.tools.desc"),
            keywords: "tool card collapsible rail monospace",
          },
          {
            id: "claude-theme-reasoning",
            title: ctx.t("row.reasoning.title"),
            description: ctx.t("row.reasoning.desc"),
            keywords: "reasoning thinking block rail",
          },
          {
            id: "claude-theme-terminal",
            title: ctx.t("row.terminal.title"),
            description: ctx.t("row.terminal.desc"),
            keywords: "terminal bash code block background",
          },
          {
            id: "claude-theme-messages",
            title: ctx.t("row.messages.title"),
            description: ctx.t("row.messages.desc"),
            keywords: "user message bubble inline code blockquote",
          },
          {
            id: "claude-theme-typography",
            title: ctx.t("row.typography.title"),
            description: ctx.t("row.typography.desc"),
            keywords: "serif typography headings markdown font",
          },
          {
            id: "claude-theme-reset",
            title: ctx.t("row.reset.title"),
            description: ctx.t("row.reset.desc"),
            keywords: "reset default restore",
          },
        ]
      },
      render: () => renderClaudeSettingsPage(ctx),
    })

    // 3. Command Palette shortcuts
    ctx.add(Command, () => ({
      id: "open-settings",
      title: ctx.t("command.openSettings"),
      group: ctx.t("command.category"),
      keywords: "claude theme appearance clay settings palette",
      run: () => {
        ctx.layout.settings("claude-code-theme")
      },
    }))

    ctx.add(Command, () => ({
      id: "toggle",
      title: ctx.t("command.toggleTheme"),
      group: ctx.t("command.category"),
      keywords: "claude theme toggle enable disable",
      run: () => {
        const next = !getSettings().enabled
        store.update((s) => {
          s.enabled = next
        })
        ctx.toast.show({
          title: next ? ctx.t("toast.enabled") : ctx.t("toast.disabled"),
          variant: "success",
        })
      },
    }))

    ctx.add(Command, () => ({
      id: "cycle-preset",
      title: ctx.t("command.cyclePreset"),
      group: ctx.t("command.category"),
      keywords: "claude theme preset clay slate parchment crisp cycle",
      run: () => {
        const cur = getSettings().preset
        const idx = PRESET_LIST.findIndex((p) => p.id === cur)
        const nextPreset = PRESET_LIST[(idx + 1) % PRESET_LIST.length]
        store.update((s) => {
          s.preset = nextPreset.id
          s.enabled = true
        })
        ctx.toast.show({
          title: ctx.t("toast.presetChanged", { preset: ctx.t(nextPreset.labelKey) }),
          variant: "success",
        })
      },
    }))
  },
})
