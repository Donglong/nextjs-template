---
name: design-md-generator
description: Generate a design.md design-system document from a project's prd.md when no design.md exists. This skill should be used when the user wants to derive a shadcn/ui + Tailwind CSS theme — brand visual direction, color tokens, typography, spacing, radius/shadows, motion, component specs, and page-generation constraints — from a PRD. Optionally leverages the "ui ux pro max" design skill for the visual/UX reasoning. Triggers include "generate design.md", "create design system from PRD", "design the theme based on prd.md", or any request to produce visual/UX direction when a project lacks a design.md.
agent_created: true
---

# Design.md Generator (PRD → shadcn/ui Theme)

## Overview

Derive a complete, implementation-ready design system document (`design.md`) from an
existing product requirements document (`prd.md`). The output is formatted to drop
directly into a shadcn/ui + Tailwind CSS project: every color value is expressed as an
HSL CSS custom property, and every rule maps to a Tailwind token. When the
**"ui ux pro max"** skill is installed, delegate the creative/visual reasoning to it;
otherwise fall back to the built-in method described in `references/ux-design-method.md`.

This skill is lossless and non-destructive: it never overwrites an existing `design.md`.

## When To Use

- A project has a `prd.md` (or `PRD.md`) but no `design.md`, and the user asks for a
  design system, theme, visual direction, or style guide.
- The user says things like "generate design.md from the PRD", "design the UI theme for
  this project", "create the shadcn theme based on the requirements".
- The user wants brand/visual constraints written down so a page/builder agent can
  generate screens that stay on-brand.

Do **not** use this skill if `design.md` already exists and the user only wants a tweak —
in that case, edit the existing file instead of regenerating.

## Workflow

### Step 1 — Guard: refuse to overwrite

1. Check the project root (and one level of subfolders) for `design.md` / `Design.md`.
2. If found, STOP. Report the path and ask the user whether to (a) update it in place,
   or (b) regenerate from scratch. Never silently overwrite.
3. If absent, continue.

### Step 2 — Locate the PRD

1. Search for `prd.md` / `PRD.md` in the project.
2. If missing, ask the user to point to the PRD file (or paste its contents) before
   continuing. Do not fabricate a design from nothing.

### Step 3 — Extract design signals from the PRD

Read the PRD and capture concrete signals that drive visual decisions. Record them as
internal notes (do not dump them into the output):

- **Product type / domain** — SaaS dashboard, e-commerce, social, dev tool, marketing site, etc.
- **Target audience & context** — who uses it, device (desktop/mobile/both), environment (light office, outdoor, dark "pro" mode).
- **Tone & voice** — playful, trustworthy, premium, minimal, corporate, bold.
- **Brand anchors** — any named colors, logo, competitor references, "must feel like X" lines.
- **Key surfaces** — the screens/pages implied (login, list, detail, settings, dashboard, checkout…).
- **Explicit constraints** — accessibility requirements (WCAG level), required locales/RTL, performance budgets.

### Step 4 — Invoke the design reasoning

Attempt to load the **"ui ux pro max"** skill (via the Skill tool) to perform the
creative direction work: mood/archetype, color psychology, typography pairing, spacing
rhythm, and motion language. Pass it the signals from Step 3 and the shadcn token
vocabulary from `references/shadcn-theme.md`.

If that skill is unavailable, apply the fallback method in `references/ux-design-method.md`
to arrive at the same decisions deterministically. Either path must produce the concrete
HSL values and Tailwind tokens required by Step 5.

### Step 5 — Map direction to shadcn/ui tokens

Translate the chosen direction into the canonical shadcn/ui token set. Use
`references/shadcn-theme.md` as the authoritative token list and Tailwind config. Every
color MUST be an HSL triple (e.g. `222 47% 11%`), never hex/rgb, so it binds to
`hsl(var(--token))`. Provide:

- **Light theme** `:root { … }` block — all 14 base tokens + `--radius`.
- **Dark theme** `.dark { … }` block — all 14 base tokens tuned for dark surfaces.
- A short `tailwind.config` `theme.extend` snippet binding the tokens.
- One value per token; pick `--primary`/`--accent`/`--ring` from the brand hue, keep
  `--background`/`--foreground`/`--muted`/`--border` neutral for contrast.

### Step 6 — Write `design.md`

Create `design.md` at the project root using the structure in
`references/design-template.md`. Fill every required section:

1. **品牌视觉方向 (Brand Visual Direction)** — archetype, mood, adjectives, references, do/don't.
2. **色彩变量 (Color Variables)** — the light + dark `:root`/`.dark` blocks + token table + usage notes.
3. **字体体系 (Typography System)** — font families (sans/mono), scale, weights, line-heights, responsive rules.
4. **间距规则 (Spacing Rules)** — the spacing scale (4px base), section/page padding, grid, container widths.
5. **圆角与阴影 (Radius & Shadows)** — `--radius` and the `lg/md/sm` derivations, elevation/shadow tokens.
6. **动画效果 (Motion)** — duration/easing tokens, entrance/transition patterns, reduced-motion rule.
7. **组件规范 (Component Specs)** — per-component notes for the core shadcn components (Button, Input, Card, Dialog, etc.) referencing the tokens above.
8. **页面生成限制 (Page Generation Constraints)** — hard rules a page/builder agent MUST follow (tokens only, no raw colors, required spacing, accessibility minima, dark-mode parity, prohibited patterns).
9. **图标与可访问性 (Icons & Accessibility)** — icon set, focus states, contrast, WCAG target.

Keep `design.md` self-contained and copy-pasteable: a downstream agent should be able to
implement the UI using only `design.md` + shadcn/ui, without re-reading the PRD.

### Step 7 — Validate & report

1. Confirm `design.md` was created and summarize what was decided (archetype, primary hue, fonts, radius).
2. Note which path produced the design (ui ux pro max skill vs. fallback method).
3. State the one-line rule a page generator must respect (e.g. "Only use the tokens in §2; never hard-code colors").

## Resources

- `references/shadcn-theme.md` — canonical shadcn/ui token vocabulary, HSL format rules, light/dark `:root` baseline, and the Tailwind config binding. **Load this before writing the color/radius sections.**
- `references/ux-design-method.md` — deterministic fallback for visual direction when the "ui ux pro max" skill is unavailable (archetype → palette → type → spacing → motion).
- `references/design-template.md` — the exact section skeleton and headings to write into `design.md`.
