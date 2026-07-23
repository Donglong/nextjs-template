---
description: 移动优先响应式设计模式与最佳实践 (Tailwind 断点)
paths:
  - 'app/**/*.{tsx,css}'
  - 'components/**/*.{tsx,css}'
  - 'features/**/*.{tsx,css}'
---

## 核心原则

**始终坚持移动优先**：优先编写移动端样式，随后利用 Tailwind 断点为大屏设备进行增强。

## Tailwind 断点标准

遵循移动优先逻辑：基础样式 (无前缀, <640px) → `sm:` (≥640px) → `md:` (≥768px) → `lg:` (≥1024px) → `xl:` (≥1280px) → `2xl:` (≥1536px)

## 常用模式

- **布局**：`flex flex-col sm:flex-row` (移动端纵向，桌面端横向)。
- **排版**：`text-xl sm:text-2xl md:text-3xl` (由小到大递增)。
- **间距**：`p-4 sm:p-6 md:p-8` (随屏幕增大内边距)。
- **显隐控制**：`block sm:hidden` (仅移动端可见)，`hidden sm:block` (仅桌面端可见)。
- **网格**：`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (单列到多列渐进)。

## 组件示例

- **弹窗**：`w-full h-full sm:w-auto sm:h-auto` (移动端全屏，桌面端自适应居中)。
- **导航**：使用 `sm:hidden` 控制汉堡菜单，`hidden sm:flex` 控制桌面端横向菜单。

## 测试要点

- **优先测试移动端**：使用开发者工具模拟真实尺寸。
- **点击区域**：确保触摸目标 ≥ 44x44px。
- **可读性**：检查文本在小屏下的阅读体验，并测试横屏模式。

## 常见错误

- ❌ **桌面优先**：`flex-row max-md:flex-col` (应避免使用 `max-` 前缀)。
- ❌ **缺失移动端基础**：仅写 `lg:flex lg:gap-4` 而忽略了默认样式。
- ❌ **点击目标过小**：使用 `w-6 h-6` 的按钮 (不利于触屏操作)。
