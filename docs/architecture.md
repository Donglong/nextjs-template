# 系统架构

本文档描述系统的组织方式、模块边界、依赖关系、数据流以及关键架构决策。

---

## 架构总览

系统采用 **Next.js App Router + Server-first** 的分层架构：

- **展示与路由层（`app`）**：页面入口，默认 Server Component，负责组装数据并渲染。
- **业务层（`features`）**：按业务领域划分，承载所有业务逻辑、Server Actions、Hooks、Schema。
- **通用层（`components` / `lib`）**：无业务含义的 UI 原子组件、职能组件，以及数据库、认证、国际化等基础设施实例化。

整体遵循「**依赖单向向下、业务逻辑收敛于 Feature、服务端优先**」的原则，避免循环依赖与逻辑散落。

---

## 模块边界与依赖关系

### 单向依赖

依赖方向严格单向向下，禁止反向与跨层穿透：

```
app  →  features  →  components
```

- `app` 可依赖 `features` 与 `components`；
- `features` 可依赖 `components` 与 `lib`；
- `components`（含 `components/ui`）**不得依赖 `features`**；
- **禁止 Feature 之间的深层引用**，跨 Feature 调用应通过各自的 `index.ts` 公共 API。

### 业务逻辑归属

**业务逻辑只能存在于 Feature 层**，UI 组件仅负责展示。以下逻辑严禁放入 UI 组件：

- API 请求
- 登录逻辑与权限判断
- 价格计算与支付逻辑
- 数据转换与业务校验

### 组件晋升路径与条件

组件复用范围扩大时，按以下路径晋升，**禁止跳级**：

```
页面组件  →  Feature 组件  →  全局组件
```

- **晋升条件**：至少两个独立模块真实复用，且抽象稳定。
- 页面组件**禁止直接升级**为全局组件；只有完全没有业务含义时，才允许进入 `components/ui`。

---

## 数据流

| 场景             | 方案              | 说明                                                                                                       |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **数据获取**     | Server Components | 优先在服务端执行，减少客户端请求。                                                                         |
| **数据写入**     | Server Actions    | 优先用于表单提交与数据写入；第三方 API/Webhook/复杂流程走 Route Handler 或后端服务。                       |
| **页面状态**     | URL Search Params | 可分享、可恢复的状态（分页、排序、筛选、搜索）。                                                           |
| **本地 UI 状态** | `useState`        | 组件本地交互（弹窗、下拉、Tabs、Accordion 等）。                                                           |
| **跨组件状态**   | Context（谨慎）   | 仅用于跨组件共享且稳定的客户端状态（主题、国际化、认证），避免传递可通过 Props / Server / URL 获取的数据。 |

**原则**：绝大多数状态通过 URL Query Params 或 React 本地状态解决；`zustand` 仅在跨组件高频交互、全局配置、跨页面临时缓存时使用。

---

## 核心架构决策

### 1. 全面拥抱 Server Action（禁用 Route Handlers）

- 除第三方库（如 better-auth 回调）必须使用的路由外，**所有业务逻辑通过 Server Action 实现**。
- **无 API 接口暴露**：不再编写 `/api/...` 路由文件，前端直接调用导出的异步 Server Action 函数。
- **严格的输入校验**：每个 Server Action 必须在首行通过 Zod Schema 对客户端传入参数进行严格校验。
- **统一的返回格式**：Server Action 统一返回 `ActionResult<T>` 结构化对象（`success: boolean`、`data?: T`、`error?: string`），严禁直接抛出未捕获的错误。

### 2. 国际化（next-intl）采用无 `[locale]` 设计

- **无前缀路由（Prefixless Routing）**：不使用 `app/[locale]/page.tsx` 嵌套，直接使用 `app/page.tsx`。
- **静态配置**：next-intl 配置绑定 `locale: "en"`，在 proxy 中配置默认语言为 `en` 且不进行路由重定向，便于后续平滑扩展多语言。

### 3. 数据库连接懒加载

- 数据库连接在**首次使用时**初始化，避免构建期初始化导致的错误，兼容边缘部署场景。
- 详见 `lib/db/index.ts`（懒加载实例）与 `lib/db/schema.ts`（Drizzle Schema）。

---

## 模块职责与开发工作流

### 1. 数据库与数据建模

- Schema 在 `lib/db/schema.ts` 中定义，利用 Drizzle 的 TS 类型推导。
- 使用 Drizzle Kit 进行迁移与原型调试（`drizzle.config.ts`）。

### 2. 表单开发与校验

- 所有输入项与表单数据统一使用 Zod 定义 Schema。
- 客户端表单由 TanStack Form 接管，结合 Zod 在字段级与提交级进行双重校验。
- 提交时直接触发预先定义好的 Server Action。

### 3. 交互与动画

- 基础布局与响应式基于 Tailwind CSS v4。
- 交互组件通过 `pnpm dlx shadcn@latest add` 动态引入。
- 复杂状态切换、页面过渡统一使用 Framer Motion。

### 4. 错误处理体系

- 全局渲染层级错误由 `react-error-boundary` 捕获。
- 业务级异步错误由 Server Action 返回的 `success: false` 与 `error` 信息捕获，通过客户端局部状态友好提示。

### 5. 代码质量

- **oxlint**：JavaScript/TypeScript 静态分析，捕获潜在问题。
- **oxfmt**：代码格式化，保持一致的代码风格。

## 其他文档

- 技术栈见 [tech-stack.md](./tech-stack.md)
- 目录布局见 [project-structure.md](./project-structure.md)；
- 前端编码规则见 [frontend-guidelines.md](./frontend-guidelines.md)
