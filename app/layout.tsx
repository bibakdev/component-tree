import type { Metadata } from 'next';
import './globals.css';
import PwaRegistrar from '@/shared/components/PwaRegistrar';

export const metadata: Metadata = {
  title: 'Component Tree Builder',
  description: 'Glass Edition',
  manifest: '/manifest.json' // این خط باعث می‌شود Next.js خود لینک manifest را در head بگذارد
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className="bg-gray-950 antialiased">
        {children}
        <PwaRegistrar />
      </body>
    </html>
  );
}
