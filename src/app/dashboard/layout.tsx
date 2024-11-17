import type { Metadata } from 'next';

import TRPCReactProvider from '@/trcp/react.tsx';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
