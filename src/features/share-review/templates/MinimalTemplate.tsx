import { RatingDisplay } from '@/shared/ui/rating';
import type { ReviewTemplateProps } from './types';

export function MinimalTemplate({ author, text, rating, createdAt, profileName }: ReviewTemplateProps) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Prooforio</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">{profileName}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
          отзывы
        </span>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <RatingDisplay rating={rating} />
      </div>

      <p className="mt-6 text-base leading-8 text-slate-800">{text}</p>

      <div className="mt-8 flex flex-col gap-1 text-sm text-slate-500">
        <p className="font-medium text-slate-900">{author}</p>
        <p>{createdAt}</p>
      </div>
    </article>
  );
}
