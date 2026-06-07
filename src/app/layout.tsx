import type { Metadata } from 'next';
import { AppShell } from '@/widgets/app-shell/AppShell';
import { BottomNavigation } from '@/widgets/bottom-navigation/BottomNavigation';
import { HapticFeedback } from '@/widgets/haptic-feedback/HapticFeedback';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prooforio',
  description: 'Собирайте отзывы с помощью персональной ссылки на обзор.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const themeScript = `
try {
  const savedTheme = window.localStorage.getItem('prooforio:theme');
  document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';
} catch {
  document.documentElement.dataset.theme = 'light';
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
        <BottomNavigation />
        <HapticFeedback />
      </body>
    </html>
  );
}
