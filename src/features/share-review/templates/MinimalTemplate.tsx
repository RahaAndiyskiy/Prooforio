import { RatingDisplay } from '@/shared/ui/rating';
import type { ReviewTemplateProps } from './types';

export function MinimalTemplate({ author, text, rating, createdAt, profileName }: ReviewTemplateProps) {
  return (
    <article className="flex h-full w-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Prooforio</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{profileName}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
          отзывы
        </span>
      </header>

      <div className="mt-8 flex flex-col gap-6">
        <div className="inline-flex items-center gap-3 rounded-full bg-slate-950/5 px-4 py-3 text-lg font-semibold text-slate-950">
          <span>{rating}</span>
          <span>★</span>
        </div>

        <p className="text-lg leading-8 tracking-normal text-slate-800">{text}</p>
      </div>

      <footer className="mt-auto flex flex-col gap-2 text-sm leading-6 text-slate-500">
        <p className="font-semibold text-slate-900">{author}</p>
        <p className="text-base text-slate-600">{createdAt}</p>
      </footer>
    </article>
  );
}
