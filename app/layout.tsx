import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Component Tree Builder',
  description: 'Glass Edition'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className="bg-gray-950 antialiased">{children}</body>
    </html>
  );
}
