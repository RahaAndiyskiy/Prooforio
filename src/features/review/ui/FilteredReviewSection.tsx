'use client';

import type { Review } from '@/entities/review/types';
import { ReviewList } from './ReviewList';

export function FilteredReviewSection({ reviews }: { reviews: Review[] }) {
  return <ReviewList reviews={reviews} allHref="/dashboard/reviews" />;
}
