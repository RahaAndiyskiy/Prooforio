'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardOverview } from './DashboardOverview';
import { FilteredReviewSection } from '@/features/review/ui/FilteredReviewSection';
import { getCurrentUser } from '@/features/auth/lib/auth';
import { getProfileByAuthUserId } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import type { Profile } from '@/entities/profile/types';
import type { Review } from '@/entities/review/types';

function DashboardTopBar() {
  return (
    <header className="flex items-center justify-between px-0.5 pb-3 pt-10">
      <p className="text-[21px] font-normal tracking-[-0.02em] text-black">proofio</p>
      <button
        type="button"
        aria-label="Переключатель"
        className="flex h-7 w-12 items-center justify-end rounded-full bg-white pr-1 shadow-[0_4px_12px_rgba(15,23,42,0.18)]"
      >
        <span className="h-6 w-6 rounded-full bg-[#d0d0d0]" />
        <span className="-ml-1 text-[10px] text-[#9b9b9b]">⌄</span>
      </button>
    </header>
  );
}

export function DashboardClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviewCount).toFixed(1)
    : '—';
  const recentReviewsCount = reviews.filter((review) => {
    const now = new Date();
    const reviewDate = new Date(review.createdAt);
    const diffMs = now.getTime() - reviewDate.getTime();
    return diffMs < 7 * 24 * 60 * 60 * 1000 && reviewDate <= now;
  }).length;

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.replace('/login');
          return;
        }

        const currentProfile = await getProfileByAuthUserId(user.id);
        if (!currentProfile) {
          router.replace('/register');
          return;
        }

        const profileReviews = await getReviewsByProfileId(currentProfile.id);
        if (!mounted) {
          return;
        }

        setProfile(currentProfile);
        setReviews(profileReviews);
        setLoading(false);
      } catch {
        if (!mounted) {
          return;
        }

        setError('Не удалось загрузить панель. Попробуйте обновить страницу.');
        setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] px-3">
        <DashboardTopBar />
        <main className="rounded-[13px] bg-white p-8 text-center text-[13px] text-black shadow-[0_7px_18px_rgba(15,23,42,0.14)]">
          Загрузка панели...
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] px-3">
        <DashboardTopBar />
        <main className="rounded-[13px] bg-white p-8 text-center text-[13px] text-red-700 shadow-[0_7px_18px_rgba(15,23,42,0.14)]">
          {error}
        </main>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-3 pb-16">
      <div className="mx-auto max-w-[390px]">
        <DashboardTopBar />
        <main className="space-y-3">
          <DashboardOverview
            profile={profile}
            reviewCount={reviewCount}
            averageRating={averageRating}
            recentReviewsCount={recentReviewsCount}
          />
          <FilteredReviewSection reviews={reviews} />
        </main>
      </div>
    </div>
  );
}
