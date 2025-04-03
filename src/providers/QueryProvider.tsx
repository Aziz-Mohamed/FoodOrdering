import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

const client = new QueryClient();

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}