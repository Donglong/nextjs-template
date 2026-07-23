import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { routing } from '@/lib/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // 跳过 Next.js 内部路径和静态文件
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
