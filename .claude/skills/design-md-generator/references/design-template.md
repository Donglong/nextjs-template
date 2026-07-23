# design.md Template

Copy this skeleton into the project root as `design.md` and fill every section. Keep all
color values as HSL triples and every rule binding to a Tailwind token so a page/builder
agent can implement the UI from this file alone.

---

# Design System — <Project Name>

> Generated from `prd.md` on <date>. Conforms to shadcn/ui + Tailwind CSS theming.
> One rule for generators: **use only the tokens defined here; never hard-code colors.**

## 1. 品牌视觉方向 (Brand Visual Direction)

- **Archetype:** <Calm/Trust | Friendly/Human | Bold/Energetic | Minimal/Premium | Playful>
- **Mood words:** <3–5 adjectives>
- **Reference / "feel like":** <competitor or inspiration, if any>
- **Do:** <what the UI should express>
- **Don't:** <what to avoid>

## 2. 色彩变量 (Color Variables)

### 2.1 Light theme

```css
:root {
  --background: <H S% L%>;
  --foreground: <H S% L%>;
  --card: <H S% L%>;
  --card-foreground: <H S% L%>;
  --popover: <H S% L%>;
  --popover-foreground: <H S% L%>;
  --primary: <H S% L%>;
  --primary-foreground: <H S% L%>;
  --secondary: <H S% L%>;
  --secondary-foreground: <H S% L%>;
  --muted: <H S% L%>;
  --muted-foreground: <H S% L%>;
  --accent: <H S% L%>;
  --accent-foreground: <H S% L%>;
  --destructive: <H S% L%>;
  --destructive-foreground: <H S% L%>;
  --border: <H S% L%>;
  --input: <H S% L%>;
  --ring: <H S% L%>;
  --radius: <0.5rem>;
}
```

### 2.2 Dark theme

```css
.dark {
  --background: <H S% L%>;
  --foreground: <H S% L%>;
  --card: <H S% L%>;
  --card-foreground: <H S% L%>;
  --popover: <H S% L%>;
  --popover-foreground: <H S% L%>;
  --primary: <H S% L%>;
  --primary-foreground: <H S% L%>;
  --secondary: <H S% L%>;
  --secondary-foreground: <H S% L%>;
  --muted: <H S% L%>;
  --muted-foreground: <H S% L%>;
  --accent: <H S% L%>;
  --accent-foreground: <H S% L%>;
  --destructive: <H S% L%>;
  --destructive-foreground: <H S% L%>;
  --border: <H S% L%>;
  --input: <H S% L%>;
  --ring: <H S% L%>;
}
```

### 2.3 Token usage notes

| Token           | Use it for                                |
| --------------- | ----------------------------------------- |
| `--primary`     | primary buttons, active states, key links |
| `--secondary`   | secondary buttons, toolbars               |
| `--muted`       | backgrounds of disabled/subtle areas      |
| `--accent`      | hover highlights, selected rows           |
| `--destructive` | delete/error actions only                 |
| `--ring`        | focus outline                             |

## 3. 字体体系 (Typography System)

- **Sans (UI/text):** `<family>` — fallback `system-ui, sans-serif`
- **Mono (code/data):** `<family>` — fallback `ui-monospace, monospace`
- **Scale:** xs 12 / sm 14 / base 16 / lg 18 / xl 20 / 2xl 24 / 3xl 30 / 4xl 36 / 5xl 48
- **Weights:** `<regular 400, medium 500, semibold 600, bold 700>`
- **Line-height:** body `1.5`, headings `1.2`
- **Responsive:** mobile base 14–15px, desktop 16px; headings scale down one step on mobile.

## 4. 间距规则 (Spacing Rules)

- **Base unit:** 4px. Scale: `1:4 2:8 3:12 4:16 6:24 8:32 12:48 16:64`.
- **Page padding:** desktop `<32–64px>` gutters; mobile `<16–20px>`.
- **Max content width:** `<1200–1280px>` (or `<720px>` for reading layouts).
- **Grid:** 12 columns desktop; single column below `640px`.

## 5. 圆角与阴影 (Radius & Shadows)

- **`--radius`:** `<value>` → `rounded-lg`. `rounded-md = radius - 2px`, `rounded-sm = radius - 4px`.
- **Elevation (shadows):**
  - `shadow-sm` — cards at rest
  - `shadow-md` — hovered cards / popovers
  - `shadow-lg` — dialogs / modals
  - Use `shadow-none` on flat surfaces; avoid heavy shadows for Minimal/Premium.

## 6. 动画效果 (Motion)

- **Durations:** fast `150ms`, base `200ms`, slow `300ms`.
- **Easing:** entrance `ease-out`, state change `ease-in-out`.
- **Patterns:** dialogs fade+slide-up; tabs cross-fade; buttons `hover:scale-[1.02]`;
  no transition > `300ms`.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, disable transforms/translates,
  keep opacity-only fades.

## 7. 组件规范 (Component Specs)

For each core shadcn component, note the tokens/behavior to use:

- **Button:** primary → `bg-primary text-primary-foreground`; secondary → `bg-secondary`;
  destructive → `bg-destructive`; radius `rounded-md`; hover `opacity-90` / `scale`.
- **Input / Textarea:** border `border-input`, focus `ring-ring`; radius `rounded-md`.
- **Card:** `bg-card text-card-foreground shadow-sm`; radius `rounded-lg`; padding `p-6`.
- **Dialog / Sheet:** overlay `bg-black/50`, content `bg-popover shadow-lg` + entrance motion.
- **Badge:** uses `secondary`/`destructive`/`outline` variants; radius `rounded-full` or `sm`.
- **Table:** header `muted-foreground`, row hover `bg-muted`, border `border-border`.
- **Tabs / Navigation:** active `text-primary` + `border-primary` underline; inactive `muted-foreground`.
- _(Add project-specific components from the PRD here.)_

## 8. 页面生成限制 (Page Generation Constraints)

Hard rules a page/builder agent MUST obey:

1. Use **only** tokens from §2–§5. Never introduce hex/rgb or Tailwind color names
   (`red-500`, `blue-600`) outside the mapped tokens.
2. Every surface uses `bg-background`/`bg-card`; text uses `text-foreground`/
   `text-muted-foreground`. Primary actions use `bg-primary`.
3. Honor the spacing scale (§4) — no arbitrary `p-[37px]`.
4. Dark mode is mandatory: every screen must render correctly under `.dark` with the
   §2.2 tokens; never color something for light mode only.
5. Maintain contrast: body text ≥ `4.5:1`, large text ≥ `3:1` (target `<WCAG level>`).
6. Respect `prefers-reduced-motion` (§6).
7. Buttons/links must show a visible `focus-visible:ring` (use `--ring`).
8. Use the §3 font stack only; no new font families without updating §3.
9. Mobile-first: design at `<640px` then enhance; never desktop-only layouts.

## 9. 图标与可访问性 (Icons & Accessibility)

- **Icon set:** `<lucide / heroicons / ...>`; stroke `currentColor`, size `16/20/24`.
- **Focus:** `focus-visible:ring-2 ring-ring` on all interactive elements.
- **Contrast target:** `<WCAG 2.1 AA / AAA>`.
- **Other:** `<RTL? locale? reduced-data?>` from PRD.
