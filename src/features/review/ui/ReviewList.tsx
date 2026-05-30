import type { Review } from '@/entities/review/types';
import { ReviewCard } from './ReviewCard';

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Последние отзывы</p>
          <h2 className="text-xl font-semibold text-slate-950">Недавние отзывы</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="font-semibold text-slate-950">Отзывов пока нет</p>
            <p className="mt-3 leading-6">
              Поделитесь своей ссылкой с первым клиентом — здесь появится первый отзыв сразу после отправки.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
