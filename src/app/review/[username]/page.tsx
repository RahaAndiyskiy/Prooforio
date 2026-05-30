import { notFound } from 'next/navigation';
import { ReviewForm } from '@/features/review/ui/ReviewForm';
import { getProfileByUsername } from '@/shared/api/profile';

export default async function ReviewPage(props: any) {
  const { params } = props;
  const profile = await getProfileByUsername(params.username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Leave a review</p>
            <h1 className="text-3xl font-semibold text-slate-950">Review @{profile.username}</h1>
            <p className="text-sm leading-7 text-slate-600">
              Share your experience and help {profile.username} improve their product with honest feedback.
            </p>
          </div>
          <div className="mt-10">
            <ReviewForm profileId={profile.id} />
          </div>
        </section>
      </main>
    </div>
  );
}
