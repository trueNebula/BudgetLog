import type { Metadata } from 'next';
import { exo2 } from './fonts/fonts';
import TRPCReactProvider from '@/trcp/react.tsx';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BudgetLog',
  description: 'Welcome to BudgetLog!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.className} antialiased`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
