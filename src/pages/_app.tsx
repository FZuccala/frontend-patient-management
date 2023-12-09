import React from 'react';
import { AppProps } from 'next/app';
import ErrorBoundary from '@/components/Organism/ErrorBoundary';

function SafeHydrate({ children }: { children: React.ReactNode }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
}
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </SafeHydrate>
  );
}
