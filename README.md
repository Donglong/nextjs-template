# Next.js Template — AI-Ready Production Starter

<div align="center">
  <a href="./README-en.md"><img alt="README in English" src="https://img.shields.io/badge/English-d9d9d9"></a>
</div>

---

> **AI 时代，好项目从好模板开始。**  
> 这是一个为 AI 协作深度优化的 Next.js 16 项目模板 — 不是给 AI 用的黑盒子，而是**你和 AI 一起写代码的共享上下文**。

---

## 为什么有 AI 还需要模板？

AI 可以写代码，但 **没有上下文就没有质量**。裸写 AI 生成的代码常见问题：

- ❌ 每次生成的风格不一致（有的 Client Component、有的 Server Component，混乱）
- ❌ 依赖选择随缘（Random ORM、Random UI 库，毫无体系）
- ❌ 架构持续漂移（每个新功能自成一派，项目越久越乱）
- ❌ 大量无意义往返（AI 每次都要重新猜测你的技术栈和偏好）

**这个模板就是答案。** 它是一份 **与 AI 共享的「项目宪法」**—— 技术栈固定、约定文档化、CLAUDE.md 告诉 AI 项目的全部规则。AI 读一遍就能写出符合项目风格的代码，无需反复纠正。

---

## 适用场景

| 场景                           | 说明                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| 🚀 **SaaS / Web App 快速启动** | 认证、数据库、国际化、表单、UI 组件一应俱全，开箱即用         |
| 🧪 **AI 辅助开发实验**         | 配合 Claude/Cursor/Windsurf 等 AI 编码工具，最大化生产力      |
| 🏗️ **团队项目启动**            | 统一的技术选型、架构约定、编码规范，新人上手更快，AI 输出更稳 |
| 📦 **独立开发 / 出海**         | better-auth + Drizzle + next-intl 让你一天搭好用户系统        |
| 🎨 **UI 重交互项目**           | shadcn/ui + Framer Motion + Tailwind CSS v4，设计系统级的体验 |

## 目标用户

- **独立开发者** — 不想在基建上浪费时间的 Builders
- **AI 优先团队** — 用 AI 写代码但苦于一致性问题的团队
- **Startup 技术负责人** — 需要一套经得起推敲的技术底座
- **Next.js 进阶用户** — 想参考最佳实践和工程化配置的开发者

---

## 使用这个项目的好处

### 🧠 AI 友好，开箱即用

项目内置 `CLAUDE.md` / `AGENTS.md`，AI 编码工具读完之后自动理解：

- 技术栈（Next.js 16 + Drizzle + better-auth + shadcn/ui + …）
- 架构分层（`app → features → components` 单向依赖）
- 编码规范（Server-first、Server Action Only、Zod 校验）
- 目录职责（每个文件该放哪，不该放哪）
- 格式化规则（oxlint + oxfmt）

👉 **AI 不再需要你手把手告诉它「用什么框架、怎么组织代码」。**

### ⚡️ 极速工具链

oxlint（Rust 写的 Linter）+ oxfmt（Rust 写的 Formatter）+ Turbopack 构建 — 格式化、检查均在毫秒级完成。

### 🧩 精心搭配的技术栈

| 领域     | 选型                            | 为什么                       |
| -------- | ------------------------------- | ---------------------------- |
| 框架     | **Next.js 16** App Router       | 成熟 + 最新                  |
| 数据库   | **Drizzle ORM + PostgreSQL**    | 轻量、类型安全、全 SQL 掌控  |
| 认证     | **better-auth**                 | 轻量可扩展，支持多种登录方式 |
| UI       | **shadcn/ui + Tailwind CSS v4** | 无样式、可定制、源码可控     |
| 动画     | **Framer Motion**               | 流畅自然的页面过渡           |
| 表单     | **TanStack Form + Zod**         | 类型安全的表单校验           |
| 国际化   | **next-intl**                   | 生产级 i18n，静默单语言起步  |
| 状态管理 | **zustand**                     | 只在真正需要时使用           |

### 📐 架构约定，不靠自觉

- Server Component 优先，仅在必要边界使用 `"use client"`
- 全部业务逻辑走 Server Action，**不暴露 API 路由**
- 目录结构严格单向依赖（`app → features → components`）
- Feature 模块内聚，通过 `index.ts` 暴露公共接口
- 自动 Git Hooks（提交前自动 lint + format）

---

## 如何开始使用

### 方式一：直接克隆（推荐）

```bash
git clone <your-repo-url> my-project
cd my-project
pnpm install
pnpm dev
```

### 方式二：作为模板仓库

点击 GitHub 仓库页面的 「Use this template」 按钮创建新仓库。

### 首次启动

```bash
# 1. 复制环境变量
cp .env.example .env

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可看到效果。

> 💡 **搭配 AI 使用**：将项目目录拖入 Claude / Cursor / Windsurf，AI 会自动读取 `CLAUDE.md` 和文档，无需额外配置即可写出符合项目风格的代码。

---

## 推荐 SKILL

在使用 AI 编码工具时，搭配以下 SKILL 可进一步提升开发体验：

| SKILL                                                         | 说明                                                                                                |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [**ui-ux-pro-max**](https://github.com/akirco/ui-ux-pro-max)  | UI/UX 设计系统增强 Skill — 帮你快速生成美观、一致的页面和组件，与 shadcn/ui + Tailwind CSS 无缝配合 |
| [**mattpocock/skills**](https://github.com/mattpocock/skills) | TypeScript 深度 Skill — 提供严格的 TypeScript 最佳实践，让你的类型系统更加健壮                      |

---

## 使用本模板构建的网站

| 网站                                              | 截图 | 简介                                                 |
| ------------------------------------------------- | ---- | ---------------------------------------------------- |
| [**Retro Vault**](https://retro-vault.aurakit.cc) | 🕹️   | 复古游戏资讯与收藏平台，基于本模板 + AI 协作构建     |
| [**GameFlix**](https://gameflix.aurakit.cc)       | 🎮   | 游戏发现与评分社区，展示本模板在生产环境中的完整能力 |

> 想在这里展示你的项目？欢迎提交 PR 或联系我们！

---

## 脚本

| 脚本                | 说明                       |
| ------------------- | -------------------------- |
| `pnpm add <dep>`    | 安装运行时依赖             |
| `pnpm add -D <dep>` | 安装开发依赖               |
| `pnpm dev`          | 启动开发服务器 (Turbopack) |
| `pnpm build`        | 构建生产版本               |
| `pnpm start`        | 启动生产服务器             |
| `pnpm lint`         | oxlint 快速代码检查        |
| `pnpm lint:fix`     | oxlint 自动修复            |
| `pnpm format`       | oxfmt 格式化所有代码       |
| `pnpm format:check` | oxfmt 格式检查             |
| `pnpm type-check`   | TypeScript 类型检查        |
| `pnpm db:generate`  | 生成 Drizzle 迁移文件      |
| `pnpm db:push`      | 推送 Schema 到数据库       |
| `pnpm db:studio`    | 打开 Drizzle Studio        |
| `pnpm clean`        | 清理 .next 和 node_modules |

## 添加 shadcn/ui 组件

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
```

## 关键文档

- 技术栈见 [tech-stack.md](./docs/tech-stack.md)
- 架构决策见 [architecture.md](./docs/architecture.md)
- 目录布局见 [project-structure.md](./docs/project-structure.md)
- 前端编码规则见 [frontend-guidelines.md](./docs/frontend-guidelines.md)

---

## 请喝杯奶茶 ☕

如果这个模板对你有帮助，欢迎扫码请作者喝杯奶茶 —— 你的支持是持续迭代的动力 ❤️

![](./public/wechat_reward.jpeg)

<a href='https://ko-fi.com/V5A223RFBM' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## 联系与社群

| 渠道           | 链接 / 方式                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| 📝 Blog        | [donglong.github.io](https://donglong.github.io)                             |
| 📕 小红书      | [@Donald](https://www.xiaohongshu.com/user/profile/60192936000000000101e417) |
| 🐦 X (Twitter) | [@Donald](https://x.com/zhangdonglong?s=21)                                  |
| 🐙 GitHub      | [提交 Issue / PR](https://github.com/your-org/nextjs-template)               |
