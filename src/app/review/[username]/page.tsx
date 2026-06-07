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
    <section className="space-y-4">
      <div className="px-1 pt-2">
        <h1 className="mt-2 text-[32px] font-semibold leading-[1.04] tracking-[-0.03em] text-primary">
          Оставьте отзыв для @{profile.username}
        </h1>
        <p className="mt-3 text-[14px] leading-6 text-muted">
          Поделитесь впечатлением честно и коротко. Это займет меньше минуты.
        </p>
      </div>

      <ReviewForm profileId={profile.id} reviewLink={`/review/${profile.username}`} />
    </section>
  );
}
