import type { Review } from '@/entities/review/types';
import { ReviewCard } from './ReviewCard';

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-[15px] font-medium leading-none text-black">Последние отзывы</h2>
        <button type="button" className="flex items-center gap-1 text-[13px] font-normal text-black">
          Все
          <span className="text-[18px] leading-none">›</span>
        </button>
      </div>

      <div className="grid gap-2.5">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="rounded-[10px] bg-white px-4 py-5 text-[12px] text-black shadow-[0_3px_10px_rgba(15,23,42,0.18)]">
            Отзывов пока нет
          </div>
        )}
      </div>
    </section>
  );
}
