import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * 1. 服务端环境变量 Schema
   * 这些变量绝对不会泄露给客户端（浏览器）
   */
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),
  },
  /**
   * 2. 客户端环境变量 Schema
   * 必须以 NEXT_PUBLIC_ 开头，否则运行阶段会报错提醒
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  },
  /**
   * 3. 运行时变量映射（关键点）
   * 由于 Next.js 在打包客户端时使用静态字符串替换（Tree-shaking），
   * 我们必须在这里手写一次 process.env.XXX 的显式映射。
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },

  /**
   * 4. 彻底杜绝空字符串漏洞
   * 有时候我们会在 .env 里写 DATABASE_URL=，这行代码会让空字符串变成 undefined，
   * 从而触发 Zod 的必填校验，避免运行时连接空地址。
   */
  emptyStringAsUndefined: true,
});
