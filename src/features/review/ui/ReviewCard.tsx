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
    <div className="flex items-center gap-[2px] text-[12px] leading-none text-[#ffbe2e]">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const shareHref = `/share/review/${encodeURIComponent(review.id)}?author=${encodeURIComponent(review.author)}&text=${encodeURIComponent(review.text)}&rating=${encodeURIComponent(String(review.rating))}&createdAt=${encodeURIComponent(review.createdAt)}&profileName=${encodeURIComponent(review.author)}&reviewerGender=${encodeURIComponent(review.reviewerGender ?? 'male')}`;

  return (
    <article className="rounded-[14px] bg-surface px-3 py-2.5 shadow-soft">
      <div className="grid grid-cols-[38px_minmax(0,1fr)_30px] gap-3">
        <div className="h-[38px] w-[38px] rounded-full bg-gradient-to-br from-[#dedede] to-[#cfcfcf]" aria-hidden="true" />

        <div className="min-w-0 pt-0.5">
          <p className="truncate text-[13px] font-semibold leading-tight text-primary">{review.author}</p>
          <RatingStars rating={review.rating} />
          <p className="mt-1 line-clamp-2 text-[9.5px] font-normal leading-[1.25] text-primary/80">
            {review.text}
          </p>
        </div>

        <Link
          href={shareHref}
          aria-label="Открыть шаблоны для отзыва"
          className="mt-0.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-surface-soft text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_2px_6px_rgba(15,23,42,0.06)] transition active:scale-95"
        >
          <ShareIcon />
        </Link>
      </div>
    </article>
  );
}
