'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { getCurrentUser, signUp } from '@/features/auth/lib/auth';

export function RegisterCard() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
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
    console.log('RegisterCard submit', { email, username, fullName, passwordPresent: password.length > 0 });
    setError(null);
    setLoading(true);

    try {
      await signUp({ email, password, username, fullName });
      router.replace('/dashboard');
    } catch (err) {
      console.log('RegisterCard error', err);
      setError(err instanceof Error ? err.message : 'Не удалось зарегистрироваться');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-24 sm:px-6">
          <Card className="w-full max-w-xl p-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Проверка</p>
            <p className="mt-4 text-slate-600">Проверяем вашу сессию...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-xl mx-auto mt-10 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Регистрация</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">Создайте аккаунт Prooforio</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        {error ? <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Имя</span>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-accent/20"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Имя пользователя</span>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-accent/20"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Почта</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-accent/20"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-accent/20"
            required
          />
        </label>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Регистрация…' : 'Создать аккаунт'}
        </Button>
      </form>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="font-semibold text-slate-950 hover:text-accent">
          Войти
        </Link>
      </div>
    </Card>
  );
}
