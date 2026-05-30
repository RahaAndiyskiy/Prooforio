import { notFound } from 'next/navigation';
import { ShareReviewClient } from '@/features/share-review/ui/ShareReviewClient';
import { getProfileById } from '@/shared/api/profile';
import { getReviewById } from '@/shared/api/review';

export const dynamic = 'force-dynamic';

export default async function ShareReviewPage({ params }: { params: { reviewId: string } }) {
  const review = await getReviewById(params.reviewId);
  if (!review) {
    notFound();
  }

  const profile = await getProfileById(review.profileId);
  if (!profile) {
    notFound();
  }

  const shareReview = {
    author: review.author,
    text: review.text,
    rating: review.rating,
    createdAt: review.createdAt,
    profileName: profile.fullName,
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Шаблон отзыва</p>
            <h1 className="text-3xl font-semibold text-slate-950">Поделиться отзывом</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Выберите шаблон и получите готовый превью для публикации.
            </p>
          </div>
          <ShareReviewClient review={shareReview} />
        </div>
      </main>
    </div>
  );
}
