import Image from 'next/image';
import Link from 'next/link';
import { getReviewerAvatarPublicPath } from '@/entities/review/avatar';
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={getReviewerAvatarPublicPath(review.reviewerGender)}
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl border border-slate-200 bg-slate-100 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-slate-950">{review.author}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{formatReviewDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RatingDisplay rating={review.rating} />
          <Link
            href={`/share/review/${encodeURIComponent(review.id)}?author=${encodeURIComponent(review.author)}&text=${encodeURIComponent(review.text)}&rating=${encodeURIComponent(String(review.rating))}&createdAt=${encodeURIComponent(review.createdAt)}&profileName=${encodeURIComponent(review.author)}&reviewerGender=${encodeURIComponent(review.reviewerGender ?? 'male')}`}
            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Поделиться
          </Link>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">{review.text}</p>
    </article>
  );
}
