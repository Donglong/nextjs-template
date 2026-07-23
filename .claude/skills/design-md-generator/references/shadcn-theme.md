# shadcn/ui + Tailwind CSS Theme Reference

Use this as the single source of truth for the **Color Variables** and **Radius & Shadows**
sections of `design.md`. shadcn/ui themes are defined as HSL CSS custom properties and
bound into Tailwind via `hsl(var(--token))`.

## Hard rules

- Every color token value is an **HSL triple with no `hsl()` wrapper**: `222 47% 11%`.
- Never write hex (`#1a1a1a`) or `rgb()` in a token. The `hsl()` wrapper is applied in
  the Tailwind config / `var()` call, not in the token itself.
- All 14 base tokens + `--radius` must exist in both `:root` (light) and `.dark` (dark).
- `--radius` is a single length (e.g. `0.5rem`); `lg/md/sm` are derived in the Tailwind config.

## Token vocabulary (14 + radius)

| Token                      | Role                    | Typical light value |
| -------------------------- | ----------------------- | ------------------- |
| `--background`             | App canvas              | `0 0% 100%`         |
| `--foreground`             | Default text            | `222.2 84% 4.9%`    |
| `--card`                   | Card surface            | `0 0% 100%`         |
| `--card-foreground`        | Text on card            | `222.2 84% 4.9%`    |
| `--popover`                | Popover/menu surface    | `0 0% 100%`         |
| `--popover-foreground`     | Text on popover         | `222.2 84% 4.9%`    |
| `--primary`                | Brand / key actions     | `222.2 47.4% 11.2%` |
| `--primary-foreground`     | Text on primary         | `210 40% 98%`       |
| `--secondary`              | Low-emphasis surface    | `210 40% 96.1%`     |
| `--secondary-foreground`   | Text on secondary       | `222.2 47.4% 11.2%` |
| `--muted`                  | Disabled / subtle bg    | `210 40% 96.1%`     |
| `--muted-foreground`       | Hint / placeholder text | `215.4 16.3% 46.9%` |
| `--accent`                 | Hover / highlight       | `210 40% 96.1%`     |
| `--accent-foreground`      | Text on accent          | `222.2 47.4% 11.2%` |
| `--destructive`            | Danger / delete         | `0 84.2% 60.2%`     |
| `--destructive-foreground` | Text on destructive     | `210 40% 98%`       |
| `--border`                 | Default border          | `214.3 31.8% 91.4%` |
| `--input`                  | Input border            | `214.3 31.8% 91.4%` |
| `--ring`                   | Focus ring              | `222.2 84% 4.9%`    |
| `--radius`                 | Base corner radius      | `0.5rem`            |

## Light theme baseline (`:root`)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## Dark theme baseline (`.dark`)

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

## Tailwind config binding

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
```

## Deriving brand colors from a direction

1. Pick the **brand hue** from the visual direction (e.g. calm SaaS → blue `222`,
   fintech trust → indigo `243`, energetic consumer → orange `25`, eco → green `142`).
2. Set `--primary` to that hue at a mid-dark lightness for light mode
   (e.g. `222 70% 50%`); set `--primary-foreground` to near-white.
3. Set `--ring` and `--accent` to the same hue family for consistency.
4. Keep `--background`, `--foreground`, `--muted`, `--border`, `--input` neutral
   (low saturation, high/low lightness) so brand color reads as accent, not noise.
5. For dark mode, invert lightness: `--background` dark, `--foreground` light, and
   lighten `--primary` (e.g. `222 70% 60%`) so it stays visible on dark surfaces.
6. Always verify `--foreground` vs `--background` and `--primary-foreground` vs
   `--primary` meet the target contrast (see design-template §9).
