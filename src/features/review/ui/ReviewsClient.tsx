'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewList } from './ReviewList';
import { getCurrentUser } from '@/features/auth/lib/auth';
import { getProfileByAuthUserId } from '@/shared/api/profile';
import { getReviewsByProfileId } from '@/shared/api/review';
import type { Review } from '@/entities/review/types';

type DateOrder = 'all' | 'newest' | 'oldest' | 'today' | 'month' | 'sixMonths';
type RatingFilter = 'all' | '5' | '4' | '3' | '2' | '1';

const reviewsFilterStorageKey = 'prooforio:reviews:filters';
const dateFilterValues: DateOrder[] = ['all', 'newest', 'oldest', 'today', 'month', 'sixMonths'];
const ratingFilterValues: RatingFilter[] = ['all', '5', '4', '3', '2', '1'];

type FilterOption<T extends string> = {
  value: T;
  label: string;
};

function isDateOrder(value: unknown): value is DateOrder {
  return typeof value === 'string' && dateFilterValues.includes(value as DateOrder);
}

function isRatingFilter(value: unknown): value is RatingFilter {
  return typeof value === 'string' && ratingFilterValues.includes(value as RatingFilter);
}

function getStoredFilters() {
  if (typeof window === 'undefined') {
    return {
      dateOrder: 'all' as DateOrder,
      ratingFilter: 'all' as RatingFilter,
    };
  }

  try {
    const storedFilters = window.localStorage.getItem(reviewsFilterStorageKey);
    if (!storedFilters) {
      return {
        dateOrder: 'all' as DateOrder,
        ratingFilter: 'all' as RatingFilter,
      };
    }

    const parsedFilters = JSON.parse(storedFilters) as {
      dateOrder?: unknown;
      ratingFilter?: unknown;
    };

    return {
      dateOrder: isDateOrder(parsedFilters.dateOrder) ? parsedFilters.dateOrder : 'all',
      ratingFilter: isRatingFilter(parsedFilters.ratingFilter) ? parsedFilters.ratingFilter : 'all',
    };
  } catch {
    return {
      dateOrder: 'all' as DateOrder,
      ratingFilter: 'all' as RatingFilter,
    };
  }
}

const dateOptions: FilterOption<DateOrder>[] = [
  { value: 'all', label: 'Все даты' },
  { value: 'newest', label: 'Сначала новые' },
  { value: 'oldest', label: 'Сначала старые' },
  { value: 'today', label: 'Сегодня' },
  { value: 'month', label: 'За месяц' },
  { value: 'sixMonths', label: 'За полгода' },
];

const ratingOptions: FilterOption<RatingFilter>[] = [
  { value: 'all', label: 'Все оценки' },
  { value: '5', label: '5 звезд' },
  { value: '4', label: '4 звезды' },
  { value: '3', label: '3 звезды' },
  { value: '2', label: '2 звезды' },
  { value: '1', label: '1 звезда' },
];

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="m5.5 7.5 4.5 4.5 4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: Array<FilterOption<T>>;
  value: T;
  onChange: (value: T) => void;
}) {
  const selectedOption = options.find((option) => option.value === value);
  const label = selectedOption?.label ?? title;
  const isActive = value !== 'all';

  return (
    <label
      className={`relative block h-12 overflow-hidden rounded-full border bg-control shadow-control transition ${
        isActive ? 'border-accent' : 'border-[var(--pf-border-soft)]'
      }`}
    >
      <span className="sr-only">{title}</span>
      <span
        className={`pointer-events-none absolute inset-x-4 top-2 text-center text-[12.5px] font-medium leading-tight ${
          isActive ? 'text-primary' : 'text-primary'
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
      <span className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-primary">
        <ChevronDownIcon />
      </span>
    </label>
  );
}

export function ReviewsClient({ selectionPresetId }: { selectionPresetId?: string }) {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [dateOrder, setDateOrder] = useState<DateOrder>(() => getStoredFilters().dateOrder);
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>(() => getStoredFilters().ratingFilter);

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

  useEffect(() => {
    window.localStorage.setItem(
      reviewsFilterStorageKey,
      JSON.stringify({
        dateOrder,
        ratingFilter,
      }),
    );
  }, [dateOrder, ratingFilter]);

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
      <div className="rounded-[20px] bg-surface p-8 text-center text-[14px] text-muted shadow-card">
        Загрузка отзывов...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[20px] bg-surface p-8 text-center text-[14px] text-red-700 shadow-card">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="space-y-3.5">
        <h1 className="mt-4 text-center text-[48px] font-bold leading-none tracking-[-0.04em] text-primary [font-family:'Brush_Script_MT','Segoe_Script',cursive]">
          Отзывы
        </h1>

        <input
          id="review-search"
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Поиск"
          inputMode="search"
          className="h-12 w-full rounded-[18px] border border-border-soft bg-surface px-4 text-[16px] text-primary shadow-control outline-none transition duration-150 placeholder:text-muted focus:border-accent/45 focus:ring-2 focus:ring-accent/12"
        />

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

      <ReviewList reviews={filteredReviews} title="" selectionPresetId={selectionPresetId} />
    </section>
  );
}
