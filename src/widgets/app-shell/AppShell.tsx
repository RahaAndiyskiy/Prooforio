import { MobileHeader } from '@/widgets/mobile-header/MobileHeader';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-[390px] bg-background px-3 pb-24 text-primary">
      <MobileHeader />
      <div className="space-y-3.5">{children}</div>
    </div>
  );
}
