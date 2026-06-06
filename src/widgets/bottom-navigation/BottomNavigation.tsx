'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type PointerEvent, useRef } from 'react';

const ACCENT = 'var(--pf-accent)';

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
  const router = useRouter();
  const pathname = usePathname() || '/';
  const navRef = useRef<HTMLElement>(null);
  const pressedRef = useRef(false);

  const setPressVariables = (x: number, amount: number) => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    nav.style.setProperty('--nav-press-x', x.toFixed(4));
    nav.style.setProperty('--nav-press-amount', amount.toFixed(4));
    nav.style.setProperty('--nav-left-light', x < 0 ? (0.18 * Math.abs(x) * amount).toFixed(4) : '0');
    nav.style.setProperty('--nav-left-dark', x > 0 ? (0.08 * Math.abs(x) * amount).toFixed(4) : '0');
    nav.style.setProperty('--nav-right-light', x > 0 ? (0.18 * Math.abs(x) * amount).toFixed(4) : '0');
    nav.style.setProperty('--nav-right-dark', x < 0 ? (0.08 * Math.abs(x) * amount).toFixed(4) : '0');
  };

  const getNormalizedPressX = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pressedRef.current = true;
    setPressVariables(getNormalizedPressX(event), 1);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!pressedRef.current) {
      return;
    }

    setPressVariables(getNormalizedPressX(event), 1);
  };

  const releasePress = () => {
    pressedRef.current = false;
    setPressVariables(0, 0);
  };

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Основная навигация"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[390px] select-none overflow-hidden rounded-full border px-4 py-2.5 [--nav-left-dark:0] [--nav-left-light:0] [--nav-press-amount:0] [--nav-press-x:0] [--nav-right-dark:0] [--nav-right-light:0] [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] [touch-action:none]"
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerCancel={releasePress}
      onPointerUp={releasePress}
      style={{
        background:
          'linear-gradient(90deg, rgba(255, 253, 248, 0.58) 0%, rgba(247, 248, 250, 0.48) 50%, rgba(211, 219, 231, 0.36) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.42)',
        borderWidth: 0.5,
        boxShadow:
          '0 14px 34px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(4px) saturate(145%) brightness(1.03)',
        WebkitBackdropFilter: 'blur(4px) saturate(145%) brightness(1.03)',
        transform: 'perspective(760px) rotateY(calc(var(--nav-press-x) * var(--nav-press-amount) * 6deg))',
        transformOrigin: '50% 50%',
        transition: 'transform 260ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 z-0 rounded-full transition-opacity duration-200"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,var(--nav-left-light)) 0%, rgba(0,0,0,var(--nav-left-dark)) 12%, transparent 50%, rgba(0,0,0,var(--nav-right-dark)) 88%, rgba(255,255,255,var(--nav-right-light)) 100%)',
          opacity: 'var(--nav-press-amount)',
        }}
      />
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/95" />
      <div className="relative z-10 grid grid-cols-4 gap-1">
        {items.map((item) => {
          const active = item.match(pathname);

          return (
            <button
              key={item.label}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={() => handleNavigate(item.href)}
              className="pf-press flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-full text-[10.5px] font-medium"
              style={{
                color: active ? ACCENT : 'var(--pf-text)',
                textShadow: active
                  ? `0 0 7px rgba(63,167,255,0.30)`
                  : '0 1px 1px rgba(255,255,255,0.45), 0 0 6px rgba(255,255,255,0.28)',
              }}
            >
              <NavIcon icon={item.icon} active={active} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
