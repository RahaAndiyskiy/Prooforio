'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/features/auth/lib/auth';

export function MobileHeader() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="relative flex items-center justify-between px-0.5 pb-3.5 pt-10">
      <p className="text-[21px] font-normal tracking-[-0.02em] text-primary">proofio</p>

      <div ref={menuRef}>
        <button
          type="button"
          aria-label="Меню аккаунта"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="pf-press flex h-9 w-14 items-center justify-start rounded-full bg-surface/95 pl-1.5 shadow-control"
        >
          <span className="h-7 w-7 rounded-full bg-surface-strong ring-1 ring-accent/45" />
          <span className="ml-1 text-[10px] text-primary/42">⌄</span>
        </button>

        {menuOpen ? (
          <div className="absolute right-0 top-[78px] z-40 w-48 overflow-hidden rounded-[18px] border border-white/70 bg-surface/88 p-1.5 text-[13px] text-primary shadow-[0_16px_40px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.80)] backdrop-blur-xl">
            <button type="button" className="pf-press flex h-10 w-full items-center rounded-[13px] px-3 text-left hover:bg-black/5">
              Аккаунт
            </button>
            <button type="button" className="pf-press flex h-10 w-full items-center rounded-[13px] px-3 text-left hover:bg-black/5">
              Настройки
            </button>
            <button type="button" className="pf-press flex h-10 w-full items-center rounded-[13px] px-3 text-left hover:bg-black/5">
              Тема
            </button>
            <div className="my-1 h-px bg-black/8" />
            <button
              type="button"
              onClick={handleSignOut}
              className="pf-press flex h-10 w-full items-center rounded-[13px] px-3 text-left text-red-600 hover:bg-red-50"
            >
              Выйти
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
