import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prooforio',
  description: 'Собирайте отзывы с помощью персональной ссылки на обзор.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
