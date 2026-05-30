'use client';

import { useMemo, useState } from 'react';
import type { Review } from '@/entities/review/types';
import { ReviewList } from './ReviewList';

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'year';
type StarFilter = 0 | 1 | 2 | 3 | 4 | 5;

const DATE_FILTERS: { label: string; value: DateFilter }[] = [
  { label: 'Все даты', value: 'all' },
  { label: 'Сегодня', value: 'today' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
];

const STAR_FILTERS: { label: string; value: StarFilter }[] = [
  { label: 'Все звезды', value: 0 },
  { label: '5 ★', value: 5 },
  { label: '4 ★', value: 4 },
  { label: '3 ★', value: 3 },
  { label: '2 ★', value: 2 },
  { label: '1 ★', value: 1 },
];

function isWithinDateFilter(date: Date, filter: DateFilter) {
  if (filter === 'all') {
    return true;
  }

  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = now.getTime() - date.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (filter === 'today') {
    return date >= dayStart && date <= now;
  }

  if (filter === 'week') {
    return diffMs < 7 * dayMs && date <= now;
  }

  if (filter === 'month') {
    return diffMs < 30 * dayMs && date <= now;
  }

  if (filter === 'year') {
    return diffMs < 365 * dayMs && date <= now;
  }

  return true;
}

export function FilteredReviewSection({ reviews }: { reviews: Review[] }) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [starFilter, setStarFilter] = useState<StarFilter>(0);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const createdAt = new Date(review.createdAt);
      const matchesDate = isWithinDateFilter(createdAt, dateFilter);
      const matchesStar = starFilter === 0 || review.rating === starFilter;
      return matchesDate && matchesStar;
    });
  }, [reviews, dateFilter, starFilter]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">По дате</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DATE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setDateFilter(filter.value)}
                  className={
                    'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                    (dateFilter === filter.value
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">По звездам</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STAR_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStarFilter(filter.value)}
                  className={
                    'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                    (starFilter === filter.value
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <p>{filteredReviews.length} отзывов найдено</p>
          <p className="text-right">Фильтр: {dateFilter === 'all' ? 'все даты' : dateFilter}, {starFilter === 0 ? 'все звезды' : `${starFilter} ★`}</p>
        </div>
      </div>

      <ReviewList reviews={filteredReviews} />
    </section>
  );
}
