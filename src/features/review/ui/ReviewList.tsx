import Link from 'next/link';
import type { Review } from '@/entities/review/types';
import { ReviewCard } from './ReviewCard';

export function ReviewList({
  reviews,
  title = 'Последние отзывы',
  allHref,
  selectionPresetId,
}: {
  reviews: Review[];
  title?: string;
  allHref?: string;
  selectionPresetId?: string;
}) {
  return (
    <section className="space-y-2.5">
      {title || allHref ? (
        <div className="flex items-center justify-between px-0.5">
          {title ? <h2 className="text-[15px] font-semibold leading-none text-primary">{title}</h2> : <span />}
          {allHref ? (
            <Link
              href={allHref}
              className="pf-press flex items-center gap-1 text-[13px] font-medium text-primary/80"
            >
              Все
              <span className="text-[17px] leading-none">›</span>
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-2.5">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} selectionPresetId={selectionPresetId} />
          ))
        ) : (
          <div className="rounded-[16px] bg-surface px-4 py-5 text-[13px] text-muted shadow-soft">
            Отзывов пока нет
          </div>
        )}
      </div>
    </section>
  );
}
