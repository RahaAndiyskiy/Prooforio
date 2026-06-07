import type { Metadata } from 'next';
import { AppChrome } from '@/widgets/app-chrome/AppChrome';
import { HapticFeedback } from '@/widgets/haptic-feedback/HapticFeedback';
import './globals.css';

export const metadata: Metadata = {
  title: 'Proofio',
  description: 'Собирайте отзывы с помощью персональной ссылки на обзор.',
  applicationName: 'Proofio',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Proofio',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F6F4' },
    { media: '(prefers-color-scheme: dark)', color: '#242F3D' },
  ],
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
    <html lang="ru" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppChrome>{children}</AppChrome>
        <HapticFeedback />
      </body>
    </html>
  );
}
