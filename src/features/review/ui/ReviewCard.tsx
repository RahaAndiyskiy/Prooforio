import Link from 'next/link';
import type { Review } from '@/entities/review/types';

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        fill="currentColor"
        d="M12 3.4 17.1 8.5l-1.4 1.4L13 7.2V15h-2V7.2L8.3 9.9 6.9 8.5 12 3.4ZM5 13h2v5h10v-5h2v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5Z"
      />
    </svg>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[3px] text-[13px] leading-none text-[#ffc833]">
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
    <article className="rounded-[10px] bg-white px-3 py-2 shadow-[0_3px_10px_rgba(15,23,42,0.18)]">
      <div className="grid grid-cols-[40px_minmax(0,1fr)_28px] gap-3">
        <div className="h-10 w-10 rounded-full bg-[#d9d9d9]" aria-hidden="true" />

        <div className="min-w-0 pt-0.5">
          <p className="truncate text-[13px] font-medium leading-tight text-black">{review.author}</p>
          <RatingStars rating={review.rating} />
          <p className="mt-1 line-clamp-2 text-[9px] font-normal leading-[1.15] text-black">
            {review.text}
          </p>
        </div>

        <Link
          href={shareHref}
          aria-label="Открыть шаблоны для отзыва"
          className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#eeeeee] text-[#5b5b5b] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] transition active:scale-95"
        >
          <ShareIcon />
        </Link>
      </div>
    </article>
  );
}
