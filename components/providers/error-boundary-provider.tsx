'use client';

import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error }: { error: unknown }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        {error instanceof Error ? error.message : 'An unexpected error occurred'}
      </p>
      <button
        className="bg-foreground text-background rounded-md px-4 py-2 transition-colors hover:opacity-90"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
}

export function ErrorBoundaryProvider({ children }: PropsWithChildren) {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
