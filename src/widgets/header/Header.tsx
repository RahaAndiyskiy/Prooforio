'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser, signOut } from '@/features/auth/lib/auth';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const currentUser = await getCurrentUser();
      if (!mounted) return;
      setUser(Boolean(currentUser));
      setLoading(false);
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Ошибка при выходе', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-slate-950">
          Proofio
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-600">
          {!loading && user ? (
            <>
              <Link href="/dashboard" className="rounded-full bg-slate-100 px-4 py-2 text-slate-900 transition hover:bg-slate-200">
                Панель
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="transition hover:text-accent">
                Войти
              </Link>
              <Link href="/register" className="rounded-full bg-slate-100 px-4 py-2 text-slate-900 transition hover:bg-slate-200">
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
