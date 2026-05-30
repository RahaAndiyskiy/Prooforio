import { RatingDisplay } from '@/shared/ui/rating';
import type { Review } from '@/entities/review/types';

function formatReviewDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">{review.author}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{formatReviewDate(review.createdAt)}</p>
        </div>
        <RatingDisplay rating={review.rating} />
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">{review.text}</p>
    </article>
  );
}
