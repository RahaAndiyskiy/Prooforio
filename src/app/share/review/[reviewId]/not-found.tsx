import Link from 'next/link';

export default function ShareReviewNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Отзыв не найден</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Страница шаблона недоступна</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Такой отзыв не найден или ссылка устарела. Попробуйте перейти на панель и открыть шаблон из существующего отзыва.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Вернуться в панель
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
