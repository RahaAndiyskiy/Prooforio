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
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Оставить отзыв</p>
            <h1 className="text-3xl font-semibold text-slate-950">Отзыв @{profile.username}</h1>
            <p className="text-sm leading-7 text-slate-600">
              Поделитесь впечатлениями и помогите {profile.username} улучшить продукт честной обратной связью.
            </p>
          </div>
          <div className="mt-10">
            <ReviewForm
              profileId={profile.id}
              reviewLink={`https://prooforio.vercel.app/review/${profile.username}`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
