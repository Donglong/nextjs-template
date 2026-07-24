# Next.js Template — AI-Ready Production Starter

<div align="center">
  <a href="./README.md"><img alt="README in 中文" src="https://img.shields.io/badge/中文-d9d9d9"></a>
</div>

---

> **In the age of AI, a great project starts with a great template.**  
> This is a Next.js 16 project template deeply optimized for AI collaboration — not a black box for AI, but a **shared context for you and your AI to write code together**.

---

## Why a template when AI can write code?

AI can write code, but **without context, there is no quality**. Raw AI-generated code often suffers from:

- ❌ Inconsistent style across generations (mixed Client/Server Components, chaos)
- ❌ Random dependency choices (one-off ORM, one-off UI library, no system)
- ❌ Architectural drift (every new feature goes its own way, the project gets messier over time)
- ❌ Excessive back-and-forth (AI has to guess your tech stack and preferences every time)

**This template is the answer.** It's a **shared "project constitution" for you and your AI** — tech stack is locked in, conventions are documented, and `CLAUDE.md` tells AI all the rules at a glance. AI reads it once and generates code that fits your project style, without repeated corrections.

---

## Use Cases

| Scenario                          | Description                                                                                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 🚀 **SaaS / Web App Quick Start** | Auth, database, i18n, forms, UI components — all ready out of the box                                           |
| 🧪 **AI-Assisted Development**    | Maximize productivity with Claude / Cursor / Windsurf and other AI coding tools                                 |
| 🏗️ **Team Project Kickoff**       | Unified tech choices, architecture conventions, coding standards — faster onboarding, more consistent AI output |
| 📦 **Indie Dev / Global Launch**  | better-auth + Drizzle + next-intl lets you ship a user system in a day                                          |
| 🎨 **UI-Heavy Projects**          | shadcn/ui + Framer Motion + Tailwind CSS v4, design-system-level experience                                     |

## Target Audience

- **Indie developers** — Builders who don't want to waste time on infrastructure
- **AI-first teams** — Teams that write code with AI but struggle with consistency
- **Startup tech leads** — Those who need a well-thought-out technical foundation
- **Next.js power users** — Developers looking for best practices and production-grade engineering setup

---

## Benefits of Using This Project

### 🧠 AI-Friendly, Ready to Go

Built-in `CLAUDE.md` / `AGENTS.md` — AI coding tools automatically understand after reading:

- Tech stack (Next.js 16 + Drizzle + better-auth + shadcn/ui + …)
- Architecture layers (`app → features → components` unidirectional dependency)
- Coding conventions (Server-first, Server Action Only, Zod validation)
- Directory responsibilities (what goes where, and what doesn't)
- Formatting rules (oxlint + oxfmt)

👉 **AI no longer needs you to hand-hold it through "what framework, how to organize code".**

### ⚡️ Blazing-Fast Toolchain

oxlint (Rust-based linter) + oxfmt (Rust-based formatter) + Turbopack build — formatting and linting complete in milliseconds.

### 🧩 Carefully Curated Tech Stack

| Area             | Choice                          | Why                                               |
| ---------------- | ------------------------------- | ------------------------------------------------- |
| Framework        | **Next.js 16** App Router       | Mature + latest                                   |
| Database         | **Drizzle ORM + PostgreSQL**    | Lightweight, type-safe, full SQL control          |
| Auth             | **better-auth**                 | Lightweight, extensible, multi-provider           |
| UI               | **shadcn/ui + Tailwind CSS v4** | Unstyled, customizable, source-controlled         |
| Animation        | **Framer Motion**               | Smooth, natural page transitions                  |
| Forms            | **TanStack Form + Zod**         | Type-safe form validation                         |
| i18n             | **next-intl**                   | Production-grade i18n, silent single-locale start |
| State Management | **zustand**                     | Only when you really need it                      |

### 📐 Architecture by Convention, Not Willpower

- Server Component first, `"use client"` only at necessary boundaries
- All business logic via Server Actions, **no API routes exposed**
- Strict unidirectional dependency (`app → features → components`)
- Feature modules cohesive, exported via `index.ts`
- Automatic Git Hooks (lint + format before every commit)

---

## Getting Started

### Option 1: Clone (Recommended)

```bash
git clone <your-repo-url> my-project
cd my-project
pnpm install
pnpm dev
```

### Option 2: Use as Template

Click the **"Use this template"** button on the GitHub repository page to create a new repository.

### First Launch

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Install dependencies
pnpm install

# 3. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see it in action.

> 💡 **Pairing with AI**: Drag the project folder into Claude / Cursor / Windsurf. AI will automatically read `CLAUDE.md` and the docs — no extra setup needed to generate code that fits your project style.

---

## Recommended SKILLs

When using AI coding tools, pair with these SKILLs for an even better experience:

| SKILL                                                         | Description                                                                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**ui-ux-pro-max**](https://github.com/akirco/ui-ux-pro-max)  | UI/UX design system enhancement SKILL — quickly generate beautiful, consistent pages and components that work seamlessly with shadcn/ui + Tailwind CSS |
| [**mattpocock/skills**](https://github.com/mattpocock/skills) | TypeScript deep-dive SKILL — rigorous TypeScript best practices to make your type system more robust                                                   |

---

## Sites Built with This Template

| Site                                                 | Description                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [**Retro Vault**](https://retro-vault.aurakit.cc) 🕹️ | Retro gaming news and collection platform, built with this template + AI collaboration       |
| [**GameFlix**](https://gameflix.aurakit.cc) 🎮       | Game discovery and rating community, showcasing this template's full production capabilities |

> Want to showcase your project here? Submit a PR or reach out!

---

## Scripts

| Script              | Description                      |
| ------------------- | -------------------------------- |
| `pnpm add <dep>`    | Install runtime dependency       |
| `pnpm add -D <dep>` | Install dev dependency           |
| `pnpm dev`          | Start dev server (Turbopack)     |
| `pnpm build`        | Build for production             |
| `pnpm start`        | Start production server          |
| `pnpm lint`         | oxlint fast code check           |
| `pnpm lint:fix`     | oxlint auto-fix                  |
| `pnpm format`       | oxfmt format all code            |
| `pnpm format:check` | oxfmt format check               |
| `pnpm type-check`   | TypeScript type checking         |
| `pnpm db:generate`  | Generate Drizzle migration files |
| `pnpm db:push`      | Push schema to database          |
| `pnpm db:studio`    | Open Drizzle Studio              |
| `pnpm clean`        | Clean .next and node_modules     |

## Add shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
```

## Key Docs

- Tech stack: [docs/tech-stack.md](./docs/tech-stack.md)
- Architecture decisions: [docs/architecture.md](./docs/architecture.md)
- Directory layout: [docs/project-structure.md](./docs/project-structure.md)
- Frontend coding guidelines: [docs/frontend-guidelines.md](./docs/frontend-guidelines.md)

---

## Buy Me a Coffee ☕

If this template helps you, scan the QR code to buy me a coffee — your support keeps this project alive and evolving ❤️

<a href='https://ko-fi.com/V5A223RFBM' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

![](./public/wechat_reward.jpeg)

## Contact & Community

| 渠道           | 链接 / 方式                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| 📝 Blog        | [donglong.github.io](https://donglong.github.io)                             |
| 📕 小红书      | [@Donald](https://www.xiaohongshu.com/user/profile/60192936000000000101e417) |
| 🐦 X (Twitter) | [@Donald](https://x.com/zhangdonglong?s=21)                                  |
| 🐙 GitHub      | [提交 Issue / PR](https://github.com/your-org/nextjs-template)               |
