import Link from 'next/link';
import type { Review } from '@/entities/review/types';
import { ReviewCard } from './ReviewCard';

export function ReviewList({
  reviews,
  title = 'Последние отзывы',
  allHref,
}: {
  reviews: Review[];
  title?: string;
  allHref?: string;
}) {
  return (
    <section className="space-y-2.5">
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-[14.5px] font-semibold leading-none text-primary">{title}</h2>
        {allHref ? (
          <Link
            href={allHref}
            className="pf-press flex items-center gap-1 text-[12.5px] font-medium text-primary/80"
          >
            Все
            <span className="text-[17px] leading-none">›</span>
          </Link>
        ) : null}
      </div>

      <div className="grid gap-2.5">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="rounded-[14px] bg-surface px-4 py-5 text-[12.5px] text-primary/70 shadow-soft">
            Отзывов пока нет
          </div>
        )}
      </div>
    </section>
  );
}
