'use client';

import { usePathname } from 'next/navigation';
import { BottomNavigation } from '@/widgets/bottom-navigation/BottomNavigation';
import { MobileHeader } from '@/widgets/mobile-header/MobileHeader';
import { proofioUi } from '@/shared/design/proofio-design';

function PublicHeader() {
  return (
    <header className={proofioUi.layout.stickyHeader}>
      <p className={proofioUi.typography.brand}>proofio</p>
    </header>
  );
}

function isPrivateRoute(pathname: string) {
  return pathname === '/dashboard' || pathname.startsWith('/dashboard/') || pathname.startsWith('/share/');
}

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const privateRoute = isPrivateRoute(pathname);

  return (
    <>
      <div
        className={`${proofioUi.layout.appShell} ${
          privateRoute ? proofioUi.layout.appShellPrivate : proofioUi.layout.appShellPublic
        }`}
      >
        {privateRoute ? <MobileHeader /> : <PublicHeader />}
        <div className={proofioUi.layout.pageStack}>{children}</div>
      </div>
      {privateRoute ? <BottomNavigation /> : null}
    </>
  );
}
