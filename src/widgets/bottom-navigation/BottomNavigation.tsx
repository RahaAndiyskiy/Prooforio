'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ACCENT = '#3FA7FF';

type NavItem = {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: 'wall' | 'reviews' | 'templates' | 'dashboard';
};

const items: NavItem[] = [
  {
    label: 'Стена',
    href: '/',
    icon: 'wall',
    match: (pathname) => pathname === '/' || pathname.startsWith('/review/'),
  },
  {
    label: 'Отзывы',
    href: '/dashboard#reviews',
    icon: 'reviews',
    match: (pathname) => pathname.startsWith('/dashboard/reviews'),
  },
  {
    label: 'Шаблоны',
    href: '/dashboard',
    icon: 'templates',
    match: (pathname) => pathname.startsWith('/share/'),
  },
  {
    label: 'Панель',
    href: '/dashboard',
    icon: 'dashboard',
    match: (pathname) => pathname.startsWith('/dashboard'),
  },
];

function NavIcon({ icon, active }: { icon: NavItem['icon']; active: boolean }) {
  const color = active ? ACCENT : '#F3F3F3';

  if (icon === 'reviews') {
    return (
      <span className="relative h-6 w-6 rounded-full bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_4px_rgba(0,0,0,0.08)]">
        <span className="absolute left-1.5 top-1.5 h-1.5 w-3 rounded-full bg-current/55" />
        <span className="absolute left-1.5 top-3.5 h-1.5 w-2 rounded-full bg-current/40" />
      </span>
    );
  }

  if (icon === 'templates') {
    return (
      <span className="grid h-6 w-6 grid-cols-2 gap-0.5 rounded-[7px] bg-white/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_4px_rgba(0,0,0,0.08)]">
        <span className="rounded-[3px] bg-current/70" />
        <span className="rounded-[3px] bg-current/45" />
        <span className="rounded-[3px] bg-current/45" />
        <span className="rounded-[3px] bg-current/70" />
      </span>
    );
  }

  if (icon === 'dashboard') {
    return (
      <span className="flex h-6 w-6 items-end justify-center gap-0.5 rounded-full bg-white/70 pb-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_4px_rgba(0,0,0,0.08)]">
        <span className="h-2 w-1 rounded-full bg-current/45" />
        <span className="h-3.5 w-1 rounded-full bg-current/75" />
        <span className="h-2.5 w-1 rounded-full bg-current/55" />
      </span>
    );
  }

  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_4px_rgba(0,0,0,0.08)]">
      <span className="h-3.5 w-3.5 rounded-full border-[3px]" style={{ borderColor: color }} />
    </span>
  );
}

export function BottomNavigation() {
  const pathname = usePathname() || '/';

  return (
    <nav
      aria-label="Основная навигация"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[390px] overflow-hidden rounded-full border px-4 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_0_18px_rgba(255,255,255,0.16)] backdrop-blur-[16px] [backdrop-filter:blur(16px)_saturate(180%)_brightness(1.08)] [-webkit-backdrop-filter:blur(16px)_saturate(180%)_brightness(1.08)]"
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.76) 0%, rgba(246, 246, 246, 0.64) 58%, rgba(232, 232, 232, 0.52) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.70)',
        borderWidth: 0.5,
      }}
    >
      <span className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.75)_1px,transparent_0)] [background-size:3px_3px]" />
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/90" />
      <span className="pointer-events-none absolute left-7 top-0 h-8 w-[44%] -rotate-3 rounded-full bg-white/38 blur-lg" />
      <span className="pointer-events-none absolute inset-x-8 bottom-1 h-7 translate-y-1 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22)_44%,rgba(63,167,255,0.10)_72%,transparent)] blur-[10px]" />
      <div className="relative z-10 grid grid-cols-4 gap-1">
        {items.map((item) => {
          const active = item.match(pathname);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className="flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-full text-[9px] font-medium transition"
              style={{
                color: active ? ACCENT : '#1C1C1B',
                textShadow: active
                  ? `0 0 12px ${ACCENT}`
                  : '0 1px 1px rgba(255,255,255,0.45), 0 0 6px rgba(255,255,255,0.28)',
              }}
            >
              <NavIcon icon={item.icon} active={active} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
