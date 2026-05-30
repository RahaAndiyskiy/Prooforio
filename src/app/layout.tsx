import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prooforio',
  description: 'Collect feedback with a personal review link.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
