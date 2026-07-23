# UX Design Method (fallback when "ui ux pro max" is unavailable)

When the **ui ux pro max** skill cannot be loaded, use this deterministic method to turn
PRD signals into concrete design decisions. Work top-to-bottom; each step's output feeds
the next, and the final values must satisfy `shadcn-theme.md`.

## 1. Pick a brand archetype

Match the PRD's tone/domain to one archetype. The archetype fixes the whole mood.

| Archetype              | Mood words                    | Good for                    |
| ---------------------- | ----------------------------- | --------------------------- |
| **Calm / Trustworthy** | professional, reliable, quiet | B2B SaaS, fintech, health   |
| **Friendly / Human**   | warm, approachable, playful   | consumer, social, education |
| **Bold / Energetic**   | confident, vivid, fast        | commerce, sports, marketing |
| **Minimal / Premium**  | refined, restrained, elegant  | luxury, dev tools, pro apps |
| **Playful / Creative** | fun, expressive, colorful     | games, kids, media          |

If the PRD names a competitor or "feel like X", let that override the table.

## 2. Derive the color system

- Choose **one brand hue** from the archetype:
  - Calm/Trust → blue `210–230`
  - Friendly → teal/cyan `190` or soft violet `265`
  - Bold → orange/red `15–25` or magenta `330`
  - Minimal/Premium → near-neutral slate `220` (low saturation) or monochrome
  - Playful → pick two hues (primary + secondary complementary)
- Set saturation/lightness by archetype:
  - Premium/Minimal → low saturation (`8–25%`), mid lightness
  - Bold/Playful → high saturation (`70–95%`), vivid lightness (`50–60%`)
  - Calm/Trust → mid saturation (`40–70%`), mid lightness (`45–55%`)
- Assign to tokens per `shadcn-theme.md` "Deriving brand colors":
  - `--primary`, `--ring`, `--accent` ← brand hue
  - `--background`/`--foreground`/`--muted`/`--border`/`--input` ← neutral
- Define dark mode by inverting lightness (background dark, primary lighter).
- Pick exactly **one** `--radius` (`0.375rem` tight minimal → `0.75rem` soft friendly).

## 3. Choose typography

- **Sans (UI/text):** default to a clean geometric/grotesque stack:
  - `Inter` (general), `Geist` (modern dev), `Plus Jakarta Sans` (friendly),
    `Manrope` (calm), `Schibsted Grotesk` (bold). Fallback: system-ui.
- **Mono (code/data):** `Geist Mono` / `JetBrains Mono` / `ui-monospace`.
- **Scale (1.25 major-third):** `xs 12 / sm 14 / base 16 / lg 18 / xl 20 / 2xl 24 /
3xl 30 / 4xl 36 / 5xl 48`. Line-height `1.5` body, `1.2` display.
- Match weight to archetype: Minimal/Premium → light/regular + one bold display;
  Bold → heavier weights throughout.

## 4. Spacing & layout

- Base unit **4px**. Scale: `0 0 / 1 4 / 2 8 / 3 12 / 4 16 / 6 24 / 8 32 / 12 48 / 16 64`.
- Page padding: desktop `32–64px` gutters, mobile `16–20px`. Max content width
  `1200–1280px` (dashboard) or `720–768px` (reading/docs).
- Grid: 12 columns on desktop, stack on mobile (< `640px`).

## 5. Motion

- Durations: `fast 150ms / base 200ms / slow 300ms`.
- Easing: `ease-out` for entrance, `ease-in-out` for state changes.
- Patterns: fade+slide-up for modals/dialogs, fade for tabs, subtle scale on hover
  (`hover:scale-[1.02]`), no movement longer than `300ms`.
- Always respect `prefers-reduced-motion`: disable transforms/translates, keep opacity.

## 6. Sanity check

Before writing `design.md`, confirm:

- Every color is an HSL triple (no hex/rgb).
- All 14 tokens + `--radius` exist in both `:root` and `.dark`.
- `--foreground`/`--primary-foreground` pass the contrast target vs their surfaces.
- Radius, fonts, and motion all agree with the single chosen archetype.
