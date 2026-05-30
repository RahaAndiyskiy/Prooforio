import { RatingDisplay } from '@/shared/ui/rating';
import type { Review } from '@/entities/review/types';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">{review.author}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{review.createdAt}</p>
        </div>
        <RatingDisplay rating={review.rating} />
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">{review.text}</p>
    </article>
  );
}
