import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { uuidv7 } from 'uuidv7';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    database: {
      generateId: () => {
        return uuidv7();
      },
    },
  },
  plugins: [nextCookies()],
});
