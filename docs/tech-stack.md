# 技术栈与选型

本文档汇总项目所使用的核心技术、对应版本及其职责，并提炼贯穿整个技术选型的**选型原则**。

---

## 包管理与基础工具

| 工具                 | 角色       | 说明                                                                         |
| -------------------- | ---------- | ---------------------------------------------------------------------------- |
| **pnpm**             | 包管理器   | 高效、节省磁盘空间的包管理工具。**禁止使用 npm 或 yarn**。                   |
| **TypeScript**       | 语言       | 全局启用严格模式（`strict: true`），确保类型安全。**禁止滥用 `any` 类型**。  |
| **oxlint**           | Linter     | 极速、Rust 编写的 JavaScript/TypeScript 静态分析工具，捕获潜在问题。         |
| **oxfmt**            | Formatter  | 极速、Rust 编写的 JavaScript/TypeScript 代码格式化工具，保持一致的代码风格。 |
| **simple-git-hooks** | Git Hooks  | 轻量 Git 钩子管理工具，在 `git commit` 等操作前触发预定义检查。              |
| **lint-staged**      | 暂存区检查 | 仅对 Git 暂存区（staged）文件执行 Lint/Format，配合 simple-git-hooks 使用。  |

---

## 技术选型明细

| 领域           | 技术                       | 版本 / 说明                      | 职责                                                            |
| -------------- | -------------------------- | -------------------------------- | --------------------------------------------------------------- |
| 前端框架与路由 | **Next.js**                | 16（App Router，Turbopack 构建） | 应用核心框架，采用最新 App Router 架构。                        |
| 国际化         | **next-intl**              | 单语言（`en`）静态配置           | 国际化方案，当前不支持 `[locale]` 动态路由。                    |
| 数据库 ORM     | **Drizzle ORM**            | —                                | 轻量、极速、类型安全的 ORM，完全掌控 SQL，TS 自动补全优秀。     |
| 数据库         | **PostgreSQL**             | —                                | 主数据库。                                                      |
| 身份认证       | **better-auth**            | —                                | 现代、轻量、高可扩展，支持多种登录方式。                        |
| 样式框架       | **Tailwind CSS**           | v4                               | 实用优先 CSS，快速迭代、极致打包体积。                          |
| 基础组件库     | **shadcn/ui**              | 基于 Base UI + Tailwind          | 无样式、可自由定制的组件库，通过 CLI 引入源码。                 |
| 动画           | **Framer Motion (motion)** | —                                | 平滑自然的页面过渡与复杂交互动画。                              |
| 状态管理       | **zustand**                | —                                | 仅用于跨组件高频交互、全局配置、跨页面临时缓存。                |
| 表单管理       | **TanStack Form**          | v1                               | 轻量、无渲染表单方案，原生支持 Standard Schema（Zod）。         |
| Schema 校验    | **Zod**                    | —                                | 声明式校验，用于客户端表单、API 传参与 Server Action 输入防御。 |
| 错误处理       | **react-error-boundary**   | —                                | 声明式 React 错误边界，捕获客户端渲染崩溃并展示备用 UI。        |

---

## 选型原则

以下原则贯穿全部技术选型，是评估新依赖时的统一标尺：

1. **严格类型安全优先**
   TypeScript 全局 `strict: true`，禁止滥用 `any`；ORM、Schema 校验、表单管理均以类型推导与编译期校验为第一目标（Drizzle、Zod、TanStack Form 均原生契合）。

2. **极速工具链**
   优先选择 Rust 编写的极速工具（oxlint、oxfmt）与基于 Turbopack 的构建；减少等待、提升反馈速度。

3. **轻量优先，掌控力优先**
   Drizzle（完全 SQL 掌控）、better-auth（轻量可扩展）、Next.js App Router（原生能力）等均避免重框架与黑盒抽象。

4. **无样式、可定制、组合优于继承**
   shadcn/ui 通过引入源码而非封装依赖，配合 Base UI 的 Slots/SlotProps 实现多态渲染；避免冗余包装与过度嵌套。

5. **Server-first（服务端优先）**
   默认 Server Component；数据获取与写入优先在 Server 端完成（Server Components + Server Actions），仅在必要的客户端交互边界使用 `"use client"`。

6. **局部优先（Locality）**
   组件默认落在最近作用域，仅在真实复用后再晋升；依赖方向单向向下（`app → features → components`），避免巨型全局目录与跨层耦合。

7. **统一约定，减少分支**
   统一包管理器（pnpm）、统一校验（Zod）、统一返回结构（`ActionResult<T>`）、统一类名合并（`cn()`），降低认知负担与协作成本。

## 其他文档

- 架构决策见 [architecture.md](./architecture.md)
- 目录布局见 [project-structure.md](./project-structure.md)
- 前端编码规则见 [frontend-guidelines.md](./frontend-guidelines.md)
