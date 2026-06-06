'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardOverview } from './DashboardOverview';
import { FilteredReviewSection } from '@/features/review/ui/FilteredReviewSection';
import { getCurrentUser, signOut } from '@/features/auth/lib/auth';
import { getProfileByAuthUserId } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import type { Profile } from '@/entities/profile/types';
import type { Review } from '@/entities/review/types';

function DashboardTopBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Ошибка при выходе', error);
    }
  };

  return (
    <header className="relative flex items-center justify-between px-0.5 pb-3.5 pt-10">
      <p className="text-[21px] font-normal tracking-[-0.02em] text-primary">proofio</p>
      <button
        type="button"
        aria-label="Переключатель"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
        className="flex h-9 w-14 items-center justify-start rounded-full bg-surface/95 pl-1.5 shadow-control"
      >
        <span className="h-7 w-7 rounded-full bg-surface-strong ring-1 ring-accent/45" />
        <span className="ml-1 text-[10px] text-[#9b9b9b]">⌄</span>
      </button>

      {menuOpen ? (
        <div className="absolute right-0 top-[78px] z-40 w-48 overflow-hidden rounded-[18px] border border-white/70 bg-surface/88 p-1.5 text-[13px] text-primary shadow-[0_16px_40px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.80)] backdrop-blur-xl">
          <button type="button" className="flex h-10 w-full items-center rounded-[13px] px-3 text-left transition hover:bg-black/5">
            Аккаунт
          </button>
          <button type="button" className="flex h-10 w-full items-center rounded-[13px] px-3 text-left transition hover:bg-black/5">
            Настройки
          </button>
          <button type="button" className="flex h-10 w-full items-center rounded-[13px] px-3 text-left transition hover:bg-black/5">
            Тема
          </button>
          <div className="my-1 h-px bg-black/8" />
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-10 w-full items-center rounded-[13px] px-3 text-left text-red-600 transition hover:bg-red-50"
          >
            Выйти
          </button>
        </div>
      ) : null}
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
      <div className="min-h-screen bg-background px-3">
        <DashboardTopBar />
        <main className="rounded-[16px] bg-surface p-8 text-center text-[13px] text-primary shadow-card">
          Загрузка панели...
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background px-3">
        <DashboardTopBar />
        <main className="rounded-[16px] bg-surface p-8 text-center text-[13px] text-red-700 shadow-card">
          {error}
        </main>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background px-3 pb-16">
      <div className="mx-auto max-w-[390px]">
        <DashboardTopBar />
        <main className="space-y-3.5">
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
