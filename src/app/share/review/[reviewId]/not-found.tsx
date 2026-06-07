import Link from 'next/link';

export default function ShareReviewNotFound() {
  return (
    <section className="rounded-[20px] border border-[var(--pf-border-strong)] bg-surface p-5 text-center shadow-card">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Отзыв не найден</p>
      <h1 className="mt-4 text-[26px] font-semibold leading-tight text-primary">Страница шаблона недоступна</h1>
      <p className="mt-4 text-[14px] leading-6 text-muted">
        Такой отзыв не найден или ссылка устарела. Попробуйте перейти на панель и открыть шаблон из существующего отзыва.
      </p>
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="pf-press inline-flex rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(63,167,255,0.24)]"
        >
          Вернуться в панель
        </Link>
      </div>
    </section>
  );
}
