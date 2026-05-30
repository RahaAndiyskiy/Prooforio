import type { Review } from '@/entities/review/types';
import { ReviewCard } from './ReviewCard';

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Recent feedback</p>
          <h2 className="text-xl font-semibold text-slate-950">Latest reviews</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            No feedback yet. Your public review link will show here once visitors leave a review.
          </div>
        )}
      </div>
    </section>
  );
}
