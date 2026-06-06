import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="rounded-[20px] border border-white/65 bg-surface/85 px-4 py-5 shadow-card backdrop-blur-xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Prooforio</p>
      <h1 className="mt-4 text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] text-primary">
        Собирайте отзывы через персональную ссылку.
      </h1>
      <p className="mt-4 text-[14px] leading-6 text-muted">
        Создайте страницу отзывов для продукта, сервиса или компании и управляйте ответами из панели.
      </p>
      <div className="mt-6 grid gap-3">
        <Link href="/login" className="pf-press flex h-11 items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(63,167,255,0.28)]">
          Войти
        </Link>
        <Link href="/dashboard" className="pf-press flex h-11 items-center justify-center rounded-full bg-surface/72 text-[14px] font-semibold text-primary shadow-control ring-1 ring-black/5">
          Панель
        </Link>
      </div>
    </section>
  );
}
