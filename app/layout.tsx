import './global.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';

import { ErrorBoundaryProvider } from '@/components/providers/error-boundary-provider';
import { env } from '@/env';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Template',
  description: 'A modern Next.js template with all the bells and whistles.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const gaId = env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundaryProvider>{children}</ErrorBoundaryProvider>
        </NextIntlClientProvider>

        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
