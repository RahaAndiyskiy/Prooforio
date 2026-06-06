'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewList } from './ReviewList';
import { getCurrentUser } from '@/features/auth/lib/auth';
import { getProfileByAuthUserId } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import type { Profile } from '@/entities/profile/types';
import type { Review } from '@/entities/review/types';

type DateOrder = 'newest' | 'oldest' | 'today' | 'month' | 'sixMonths';
type RatingFilter = 'all' | '5' | '4' | '3' | '2' | '1';

type FilterOption<T extends string> = {
  value: T;
  label: string;
};

export function ReviewsClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [dateOrder, setDateOrder] = useState<DateOrder>('newest');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');

  useEffect(() => {
    let mounted = true;

    async function loadReviews() {
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
      } catch {
        if (!mounted) {
          return;
        }
        setError('Не удалось загрузить отзывы. Попробуйте позже.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      mounted = false;
    };
  }, [router]);

  const dateOptions: FilterOption<DateOrder>[] = [
    { value: 'newest', label: 'Сначала новые' },
    { value: 'oldest', label: 'Сначала старые' },
    { value: 'today', label: 'Сегодня' },
    { value: 'month', label: 'За месяц' },
    { value: 'sixMonths', label: 'За полгода' },
  ];

  const ratingOptions: FilterOption<RatingFilter>[] = [
    { value: 'all', label: 'Все' },
    { value: '1', label: '1 звезда' },
    { value: '2', label: '2 звезды' },
    { value: '3', label: '3 звезды' },
    { value: '4', label: '4 звезды' },
    { value: '5', label: '5 звёзд' },
  ];

  const filteredReviews = useMemo(() => {
    const searchTerm = searchValue.trim().toLowerCase();
    const now = new Date();
    const monthAgo = new Date(now);
    monthAgo.setMonth(now.getMonth() - 1);
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    return [...reviews]
      .filter((review) => {
        const reviewDate = new Date(review.createdAt);
        const matchesSearch =
          !searchTerm ||
          review.author.toLowerCase().includes(searchTerm) ||
          review.text.toLowerCase().includes(searchTerm);

        const matchesRating =
          ratingFilter === 'all' || review.rating === Number(ratingFilter);

        const matchesDateFilter =
          dateOrder === 'today'
            ? reviewDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())
            : dateOrder === 'month'
            ? reviewDate >= monthAgo
            : dateOrder === 'sixMonths'
            ? reviewDate >= sixMonthsAgo
            : true;

        return matchesSearch && matchesRating && matchesDateFilter;
      })
      .sort((first, second) => {
        if (dateOrder === 'oldest') {
          return new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();
        }

        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
      });
  }, [reviews, searchValue, dateOrder, ratingFilter]);

  if (loading) {
    return (
      <div className="rounded-[16px] bg-surface p-8 text-center text-[13px] text-primary shadow-card">
        Загрузка отзывов...
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

  const FilterGroup = <T extends string>({
    title,
    options,
    value,
    onChange,
  }: {
    title: string;
    options: Array<FilterOption<T>>;
    value: T;
    onChange: (value: T) => void;
  }) => {
    const selectedOption = options.find((option) => option.value === value);
    const label = selectedOption?.label ?? title;
    const isActive = value !== 'all';

    return (
      <label
        className={`relative block h-12 overflow-hidden rounded-full border bg-white shadow-[0_6px_16px_rgba(15,23,42,0.14)] transition ${
          isActive ? 'border-accent' : 'border-slate-200'
        }`}
      >
        <span className="sr-only">{title}</span>
        <span
          className={`pointer-events-none absolute inset-x-4 top-2 text-center text-[12.5px] font-medium ${
            isActive ? 'text-primary' : 'text-black'
          }`}
        >
          {label}
        </span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-transparent opacity-0 outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[15px] leading-none">
          ⌄
        </span>
      </label>
    );
  };

  return (
    <section className="space-y-5">
      <div className="space-y-4">
        <h1 className="text-center text-[48px] font-bold leading-none tracking-[-0.04em] text-primary [font-family:'Brush_Script_MT','Segoe_Script',cursive]">
          Отзывы
        </h1>

        <div className="space-y-2.5">
          <input
            id="review-search"
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск"
            inputMode="search"
            className="w-full rounded-[9px] border border-slate-200 bg-white px-4 py-3 text-[16px] text-primary shadow-[0_10px_24px_rgba(15,23,42,0.08)] outline-none transition duration-150 focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <FilterGroup
            title="По дате"
            options={dateOptions}
            value={dateOrder}
            onChange={(value) => setDateOrder(value)}
          />
          <FilterGroup
            title="По оценкам"
            options={ratingOptions}
            value={ratingFilter}
            onChange={(value) => setRatingFilter(value)}
          />
        </div>
      </div>

      <ReviewList reviews={filteredReviews} title="Все отзывы" />
    </section>
  );
}
