'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { getCurrentUser, signIn } from '@/features/auth/lib/auth';

export function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const user = await getCurrentUser();
      if (!mounted) return;
      if (user) {
        router.replace('/dashboard');
      } else {
        setCheckingAuth(false);
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn({ email, password });
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <Card className="text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Проверка</p>
        <p className="mt-4 text-[14px] text-muted">Проверяем вашу сессию...</p>
      </Card>
    );
  }

  return (
    <Card className="space-y-5">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Вход</p>
        <h1 className="mt-3 text-[28px] font-semibold leading-tight text-primary">Войдите в Proofio</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-[18px] border border-[var(--pf-border-soft)] bg-surface-soft p-4">
        {error ? <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        <label className="block">
          <span className="text-[14px] font-medium text-muted">Почта</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2"
            required
          />
        </label>
        <label className="block">
          <span className="text-[14px] font-medium text-muted">Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2"
            required
          />
        </label>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Входим…' : 'Войти'}
        </Button>
      </form>
      <div className="rounded-[18px] border border-[var(--pf-border-soft)] bg-surface p-4 text-[14px] text-muted">
        Нет аккаунта?{' '}
        <Link href="/register" className="font-semibold text-primary hover:text-accent">
          Регистрация
        </Link>
      </div>
    </Card>
  );
}
