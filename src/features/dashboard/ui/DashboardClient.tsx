'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardOverview } from './DashboardOverview';
import { FilteredReviewSection } from '@/features/review/ui/FilteredReviewSection';
import { getCurrentUser } from '@/features/auth/lib/auth';
import { getProfileByAuthUserId } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import { proofioUi } from '@/shared/design/proofio-design';
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
      <div className="rounded-[16px] bg-surface p-8 text-center text-[13px] text-primary shadow-card">
        Загрузка панели...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[16px] bg-surface p-8 text-center text-[13px] text-red-700 shadow-card">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <h1 className={proofioUi.typography.pageTitle}>Профиль</h1>
      <DashboardOverview
        profile={profile}
        reviewCount={reviewCount}
        averageRating={averageRating}
        recentReviewsCount={recentReviewsCount}
      />
      <FilteredReviewSection reviews={reviews} />
    </>
  );
}
