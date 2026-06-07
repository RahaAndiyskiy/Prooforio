'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/features/auth/lib/auth';
import { proofioUi } from '@/shared/design/proofio-design';

export function MobileHeader() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Ошибка при выходе', error);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('prooforio:theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className={proofioUi.layout.stickyHeader}>
      <p className={proofioUi.typography.brand}>proofio</p>

      <div ref={menuRef}>
        <button
          type="button"
          aria-label="Меню аккаунта"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="pf-press flex h-9 w-14 items-center justify-start rounded-full bg-[var(--pf-control)] pl-1.5 shadow-control"
        >
          <span className="h-7 w-7 rounded-full bg-surface-strong ring-1 ring-accent/45" />
          <span className="ml-1 text-[10px] text-primary/42">⌄</span>
        </button>

        {menuOpen ? (
          <div className={`absolute right-0 top-[78px] z-40 w-52 ${proofioUi.surface.glassMenu}`}>
            <button type="button" className={proofioUi.button.menuItem}>
              Аккаунт
            </button>
            <button type="button" className={proofioUi.button.menuItem}>
              Настройки
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={`${proofioUi.button.menuItem} justify-between`}
            >
              <span>{theme === 'dark' ? 'Темная тема' : 'Светлая тема'}</span>
              <span
                className={`relative h-6 w-10 rounded-full border border-[var(--pf-border-soft)] transition ${
                  theme === 'dark' ? 'bg-accent' : 'bg-surface-soft'
                }`}
              >
                <span
                  className={`absolute inset-y-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition ${
                    theme === 'dark' ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </span>
            </button>
            <div className="my-1 h-px bg-[var(--pf-border-soft)]" />
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-10 w-full items-center rounded-[13px] px-3 text-left text-red-500 hover:bg-[var(--pf-danger-soft)]"
            >
              Выйти
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
