# 前端开发规范（Next.js）

本文档为 `app/`、`components/`、`features/` 下所有 `.tsx/.ts/.css` 文件的开发规范。
---

## 核心原则

- **局部优先**：组件默认放在最近的作用域，仅在真实复用后才允许晋升。
- **依赖方向**：`app → features → components`（单向向下）。

---

## 组件归属

| 类型             | 位置                             | 说明                                                                                                |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| **页面组件**     | `app/**/_components/`            | 仅单页面使用，页面私有，不对外导出。                                                                |
| **业务组件**     | `features/<feature>/components/` | 同一业务模块内多页面复用，仅属于一个业务领域。                                                      |
| **通用 UI 组件** | `components/ui/`                 | 无业务含义，纯展示，不调用 API、不依赖 Feature，可在任何项目直接复用。                              |
| **功能组件**     | `components/<category>/`         | 按职责划分（layout、form、table），跨多 Feature/Page 复用的职能组件，不含业务逻辑、不依赖 Feature。 |

---

## Feature 结构

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

Feature 通过 `index.ts` 统一暴露公共 API，**禁止跨 Feature 深层导入**。

---

## 导入优先级

按以下顺序选择组件来源：

1. 当前目录
2. 当前 Feature
3. 全局 `components`

**禁止为了统一而直接引用全局组件**，应优先使用局部组件。

---

## 晋升路径

组件复用范围扩大时，按此路径晋升：

```
页面组件 → Feature 组件 → 全局组件
```

- **晋升条件**：至少两个独立模块真实复用，且抽象稳定。
- 页面组件**禁止直接升级**为全局组件。只有完全没有业务含义时，才能进入 `components/ui`。

---

## 业务逻辑归属

**业务逻辑只能存在于 Feature 层**，UI 组件仅负责展示。

禁止放入 UI 组件的内容：

- API 请求
- 登录逻辑与权限判断
- 价格计算与支付逻辑
- 数据转换与业务校验

---

## Server / Client Component

默认使用 **Server Component**。

仅以下情况才使用 `"use client"`：

- 需要 `useState`、`useEffect`
- 需要使用浏览器 API 或事件处理

尽量缩小 Client Component 的范围：将客户端交互封装在独立的边界组件中，避免大面积标记 `"use client"`。

---

## Server Action 与 Hook 归属

**Server Action**

- Feature 独有：`features/<feature>/actions/`
- 页面独有：`app/**/actions.ts`
- 全局通用：`actions/`

**Hook**

- 页面独有：`app/**/_hooks/`
- 业务独有：`features/<feature>/hooks/`
- 全局通用：`hooks/`

---

## 数据与状态

- **数据获取**：优先在 Server Components 中执行，减少客户端请求。
- **数据写入**：优先使用 Server Actions 处理表单提交和数据写入。对接第三方 API、Webhook 或复杂业务流程时，通过 Route Handlers 或后端服务处理。
- **页面状态**：优先使用 URL Search Params 管理可分享、可恢复的状态（分页、排序、筛选、搜索等）。
- **本地 UI 状态**：使用 `useState` 管理组件本地交互状态（弹窗、下拉菜单、Tabs、Accordion 等）。
- **跨组件状态**：避免使用 Context 存储可通过 Props、Server Components 或 URL 传递的数据。仅用于跨组件共享且稳定的客户端状态（主题、国际化、认证上下文）。
- **逻辑封装**：将复杂客户端交互逻辑封装为自定义 Hook，保持组件职责单一。

---

## 样式标准（Tailwind CSS）

- 遵循原子化 CSS 原则，**严禁使用内联 `style` 属性**。
- 使用 `cn()` 函数（基于 clsx 与 tailwind-merge）合并和覆写动态类名。
- 使用 `cva`（Class Variance Authority）声明和管理组件变体（主题、尺寸状态）。
- 严格引用全局 Design Tokens，**禁止在类名中使用硬编码数值**。

---

## 基础组件（shadcn/ui）

- 依赖 CLI 安装基础组件，**禁止随意修改 `@/components/ui` 目录下的底层实现**。
- 遵循**组合优于继承**模式，在业务组件中组合引入基础组件。
- 利用 Base UI 提供的插槽（Slots）和插槽属性（SlotProps）控制多态渲染，避免冗余 HTML 包装元素与过度嵌套。

---

## 决策流程

按以下顺序判断组件归属：

1. 仅一个页面使用？ → `app/**/_components/`
2. 属于一个业务模块？ → `features/<feature>/components/`
3. 完全没有业务含义，可在任何项目复用？ → `components/ui/`
4. 有特定非业务职能，但全局通用？ → `components/<category>/`
5. 属于布局？ → `components/layout`

默认禁止直接放入全局 `components` 目录。

---

## 禁止事项

- ❌ 一个巨大的 `components` 目录
- ❌ UI 组件包含业务逻辑
- ❌ Feature 之间深层引用
- ❌ 全局组件依赖 Feature
- ❌ 页面组件跨页面复用
- ❌ Page 目录存放公共工具函数
- ❌ 导出页面内部组件
- ❌ 内联匿名 Props 类型

---

## 组件设计约束

- **显式 Props 类型**：显式定义并导出所有组件的 `Props` 接口类型，**严禁内联匿名类型**。
- **单一职责**：保持组件职责单一。发现条件分支导致 DOM 结构差异过大时，强制拆分组件。
- **防止过度碎片化**：严禁脱离实际复用价值进行盲目拆分。若部分视图结构或子组件仅服务于当前父组件且逻辑紧密耦合，必须将其作为私有组件定义在**同一个文件内**，通过高内聚避免文件数量膨胀引发的维护灾难。

## 其他文档

- 技术栈见 [tech-stack.md](./tech-stack.md)
- 架构决策见 [architecture.md](./architecture.md)
- 目录布局见 [project-structure.md](./project-structure.md)
