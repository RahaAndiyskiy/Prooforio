import { RatingDisplay } from '@/shared/ui/rating';
import type { ReviewTemplateProps } from './types';

export function DarkTemplate({ author, text, rating, createdAt, profileName }: ReviewTemplateProps) {
  return (
    <article className="flex h-full w-full flex-col rounded-[2rem] bg-slate-950 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)] text-white ring-1 ring-slate-800/70">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">prooforio</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{profileName}</p>
        </div>
        <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400 shadow-sm">
          отзыв
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-3 rounded-full bg-cyan-500/10 px-4 py-3 text-lg font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
          <span>{rating}</span>
          <span>★</span>
        </div>
        <p className="text-base text-slate-400">
          {new Date(createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </p>
      </div>

      <p className="mt-8 text-lg leading-8 text-slate-100">{text}</p>

      <footer className="mt-auto border-t border-slate-800/80 pt-5 text-sm text-slate-400">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-slate-500">Клиент Prooforio</p>
      </footer>
    </article>
  );
}
