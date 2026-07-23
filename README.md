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
