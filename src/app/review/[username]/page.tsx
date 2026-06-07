import { notFound } from 'next/navigation';
import { ReviewForm } from '@/features/review/ui/ReviewForm';
import { getProfileByUsername } from '@/shared/api/profile';

export default async function ReviewPage({ params }: { params: Promise<{ username: string }> }) {
  const paramsObj = await params;

  if (!paramsObj.username) {
    notFound();
  }

  const profile = await getProfileByUsername(paramsObj.username);

  if (!profile) {
    notFound();
  }

  return (
    <section className="rounded-[20px] border border-[var(--pf-border-strong)] bg-surface/90 p-4 shadow-card">
      <div className="space-y-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Оставить отзыв</p>
        <h1 className="text-[28px] font-semibold leading-tight text-primary">Отзыв @{profile.username}</h1>
        <p className="text-[14px] leading-6 text-muted">
          Поделитесь впечатлениями и помогите {profile.username} улучшить продукт честной обратной связью.
        </p>
      </div>
      <div className="mt-6">
        <ReviewForm
          profileId={profile.id}
          reviewLink={`https://prooforio.vercel.app/review/${profile.username}`}
        />
      </div>
    </section>
  );
}
