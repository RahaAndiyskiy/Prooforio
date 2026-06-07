import Link from 'next/link';
import type { Review } from '@/entities/review/types';

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M12 4.5v10m0-10 3.4 3.4M12 4.5 8.6 7.9M6.5 12.5v4.2a2.8 2.8 0 0 0 2.8 2.8h5.4a2.8 2.8 0 0 0 2.8-2.8v-4.2"
      />
    </svg>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px] text-[14px] leading-none text-[#ffbe2e]">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewCard({
  review,
  selectionPresetId,
}: {
  review: Review;
  selectionPresetId?: string;
}) {
  const shareHref = `/share/review/${encodeURIComponent(review.id)}?author=${encodeURIComponent(review.author)}&text=${encodeURIComponent(review.text)}&rating=${encodeURIComponent(String(review.rating))}&createdAt=${encodeURIComponent(review.createdAt)}&profileName=${encodeURIComponent(review.author)}&reviewerGender=${encodeURIComponent(review.reviewerGender ?? 'male')}${selectionPresetId ? `&preset=${encodeURIComponent(selectionPresetId)}` : ''}`;
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(review.createdAt));

  return (
    <article className="rounded-[16px] bg-surface px-3 py-3 shadow-soft">
      <div className="grid grid-cols-[42px_minmax(0,1fr)_32px] gap-3">
        <div
          className="h-[42px] w-[42px] rounded-full bg-gradient-to-br from-[#dedede] to-[#cfcfcf]"
          aria-hidden="true"
        />

        <div className="min-w-0 pt-0.5">
          <div className="flex items-center gap-2">
            <p className="truncate text-[14px] font-semibold leading-tight text-primary">
              {review.author}
            </p>
            <span className="text-[11.5px] leading-none text-muted">{formattedDate}</span>
          </div>
          <RatingStars rating={review.rating} />
          <p className="mt-1 line-clamp-2 text-[12px] font-normal leading-[1.28] text-primary/80">
            {review.text}
          </p>
        </div>

        <Link
          href={shareHref}
          aria-label={selectionPresetId ? 'Выбрать отзыв для шаблона' : 'Открыть шаблоны для отзыва'}
          className="pf-press mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface-soft text-muted shadow-control"
        >
          <ShareIcon />
        </Link>
      </div>
    </article>
  );
}
