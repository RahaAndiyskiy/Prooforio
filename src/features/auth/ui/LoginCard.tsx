'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
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
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">Вход</p>
        <h1 className="mt-2 text-[32px] font-semibold leading-[1.04] tracking-[-0.03em] text-primary">
          Войдите в Proofio
        </h1>
        <p className="mt-3 text-[14px] leading-6 text-muted">
          Продолжите работу с отзывами, шаблонами и ссылками.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-[14px] bg-[var(--pf-danger-soft)] px-3 py-2 text-[13px] font-medium text-red-500">
            {error}
          </div>
        ) : null}
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-muted">Почта</span>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-muted">Пароль</span>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ваш пароль"
            required
          />
        </label>
        <Button type="submit" disabled={loading} className="h-12 w-full">
          {loading ? 'Входим…' : 'Войти'}
        </Button>
      </form>
      <div className="rounded-[18px] border border-[var(--pf-border-soft)] bg-[var(--pf-control-soft)] p-4 text-center text-[14px] text-muted shadow-soft">
        Нет аккаунта?{' '}
        <Link href="/register" className="font-semibold text-primary hover:text-accent">
          Регистрация
        </Link>
      </div>
    </Card>
  );
}
