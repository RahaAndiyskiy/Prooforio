'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/widgets/header/Header';
import { DashboardOverview } from './DashboardOverview';
import { FilteredReviewSection } from '@/features/review/ui/FilteredReviewSection';
import { getCurrentUser } from '@/features/auth/lib/auth';
import { getProfileByAuthUserId } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import type { Profile } from '@/entities/profile/types';
import type { Review } from '@/entities/review/types';

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
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-card">
            Загрузка панели…
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-red-700 shadow-card">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="space-y-8">
          <DashboardOverview
            profile={profile}
            reviewCount={reviewCount}
            averageRating={averageRating}
            recentReviewsCount={recentReviewsCount}
          />
          <FilteredReviewSection reviews={reviews} />
        </div>
      </main>
    </div>
  );
}
