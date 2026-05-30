import Link from 'next/link';
import { Header } from '@/widgets/header/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col justify-center px-4 py-10 sm:px-6">
        <div className="rounded-[3rem] border border-slate-200 bg-white/90 p-8 shadow-card sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Prooforio</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Собирайте отзывы с помощью персональной ссылки.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Создайте публичную страницу отзывов для вашего продукта, сервиса или кампании и смотрите ответы в своей панели.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
              Войти
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300">
              Панель
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
