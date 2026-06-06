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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AppShell>{children}</AppShell>
        <BottomNavigation />
        <HapticFeedback />
      </body>
    </html>
  );
}
