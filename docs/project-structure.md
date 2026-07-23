# 目录结构规范

本文档定义项目的目录布局与各目录的职责边界。架构决策见 [`architecture.md`](./architecture.md)；技术选型见 [`tech-stack.md`](./tech-stack.md)；编码规则见 [`frontend-guidelines.md`](./frontend-guidelines.md)。

---

## 目录总览

采用 **非 src 目录结构**：`app`、`components`、`lib` 等核心文件夹直接放置在项目根目录下（详见 [`frontend-guidelines.md`](./frontend-guidelines.md) 中 `app/**/_components`、`app/**/_hooks` 的私有目录约定）。

```
├── app/                      # Next.js App Router 核心
│   ├── dashboard/            # 页面（示例）
│   │   ├── components/      # 页面私有组件（不对外导出）
│   │   ├── hooks/           # 页面私有 Hook
│   │   ├── actions.ts        # 页面私有 Server Actions
│   │   └── page.tsx          # 页面入口（默认 Server Component）
│   ├── api/auth/[...all]/    # better-auth 回调（唯一允许的 Route Handler）
│   ├── error.tsx             # 框架层级全局错误边界
│   ├── globals.css           # Tailwind CSS 样式入口
│   ├── layout.tsx            # 根布局（集成 next-intl & Providers）
│   └── page.tsx              # 业务首页面
│
├── components/               # UI 组件库
│   ├── <category>/           # 功能组件（按职责：layout / form / table ...）
│   └── ui/                   # 基础原子组件（Button, Input, Card 等，shadcn/ui 引入）
│
├── features/                 # 业务模块目录
│   └── <feature>/            # 业务目录（见下方 Feature 结构）
│
├── lib/                      # 基础底层库实例化
│   ├── auth/                 # better-auth 相关
│   │   ├── index.ts          # 服务端 auth 实例
│   │   └── client.ts         # 客户端 auth hooks
│   ├── db/                   # 数据库相关
│   │   ├── index.ts          # 数据库实例（懒加载）
│   │   ├── schema.ts         # Drizzle Schema 定义
│   │   └── services/         # 数据库复用操作
│   ├── i18n/                 # 国际化配置
│   │   ├── messages/en.json  # 英语翻译文件
│   │   ├── navigation.ts     # 导航辅助
│   │   └── request.ts        # 服务端请求配置
│   └── utils.ts              # cn 类名合并工具
│
├── docs/                     # 项目文档
│   ├── tech-stack.md         # 技术栈与选型
│   ├── architecture.md       # 系统架构
│   ├── project-structure.md  # 本文档
│   └── frontend-guidelines.md# 前端开发规范
│
├── proxy.ts                  # next-intl proxy（Next.js 16 替代 middleware）
├── drizzle.config.ts         # Drizzle 迁移与同步工具配置
├── next.config.ts            # Next.js 进阶配置
├── tsconfig.json             # TypeScript 配置（含 @/* 根路径映射）
├── oxlintrc.config.ts        # oxlint 配置
├── .eslintrc.json            # 严格代码风格规范
└── .env.example              # 环境变量模板
```

> 说明：页面私有目录使用下划线前缀（`_components`、`_hooks`）以明确其私有性与不导出约定；`action.ts` 的规范命名为 `actions.ts`（页面级 Server Actions 集合）。

---

## 顶层目录职责

| 目录 / 文件   | 职责                                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `app/`        | 路由与页面入口。默认 Server Component；页面私有组件、`_hooks`、`actions.ts` 仅服务当前页面，不对外导出。                            |
| `components/` | UI 组件库。**仅存放无业务含义的通用组件**：`ui/`（原子组件）与 `<category>/`（职能组件）。禁止直接把业务组件丢进全局 `components`。 |
| `features/`   | 业务模块。每个 `<feature>` 内聚自身组件、Hooks、Server Actions、Schema 与类型，通过 `index.ts` 统一暴露。                           |
| `lib/`        | 基础设施实例化：认证、数据库、国际化、通用工具（`cn`）。                                                                            |
| `docs/`       | 项目相关文档。                                                                                                                      |
| `proxy.ts`    | next-intl 的 proxy 配置，替代传统 `middleware.ts`。                                                                                 |
| `*.config.ts` | 各工具链配置（Drizzle、Next、oxlint、TS）。                                                                                         |

---

## 关键子目录详细规范

### `lib/auth/`

- `index.ts`：服务端 `auth` 实例（仅在服务端导入）。
- `client.ts`：客户端 auth hooks（仅在客户端组件导入）。

### `lib/db/`

- `index.ts`：数据库实例，**懒加载**，首次使用时初始化。
- `schema.ts`：Drizzle Schema 定义，利用 TS 类型推导。
- `services/`：可复用的数据库操作封装。

### `lib/i18n/`

- `messages/en.json`：英语翻译文件（当前唯一语言）。
- `navigation.ts`：导航辅助（基于 next-intl routing）。
- `request.ts`：服务端请求配置（绑定 `locale: "en"`）。

### `features/<feature>/`

```
features/<feature>/
├── api/          # API 调用
├── components/   # 业务组件
├── hooks/        # 业务 Hook
├── actions/      # Server Action
├── schemas/      # 校验 Schema
├── types.ts      # 类型定义
└── index.ts      # 统一对外暴露接口
```

Feature 通过 `index.ts` 统一暴露公共 API；**禁止跨 Feature 深层导入**。

## 其他文档

- 技术栈见 [tech-stack.md](./tech-stack.md)
- 架构决策见 [architecture.md](./architecture.md)
- 前端编码规则见 [frontend-guidelines.md](./frontend-guidelines.md)。
