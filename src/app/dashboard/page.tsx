export const dynamic = 'force-dynamic';

import { Header } from '@/widgets/header/Header';
import { DashboardOverview } from '@/features/dashboard/ui/DashboardOverview';
import { FilteredReviewSection } from '@/features/review/ui/FilteredReviewSection';
import { getProfileByUsername } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import { notFound } from 'next/navigation';

const DEFAULT_USERNAME = 'ahmad';

export default async function DashboardPage() {
  const profile = await getProfileByUsername(DEFAULT_USERNAME);

  if (!profile) {
    notFound();
  }

  const reviews = await getReviewsByProfileId(profile.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="space-y-8">
          <DashboardOverview profile={profile} />
          <FilteredReviewSection reviews={reviews} />
        </div>
      </main>
    </div>
  );
}
