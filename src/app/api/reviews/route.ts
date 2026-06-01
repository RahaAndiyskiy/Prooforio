import { NextRequest, NextResponse } from 'next/server';
import { isReviewerGender } from '@/entities/review/avatar';
import { createReview } from '@/shared/api/review';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { profileId, author, text, rating, reviewerGender } = body;

  if (!profileId || !author || !text || !rating || !isReviewerGender(reviewerGender)) {
    return NextResponse.json({ error: 'Недостаточно данных для отзыва' }, { status: 400 });
  }

  const review = await createReview({
    profileId,
    author,
    text,
    rating: Number(rating),
    reviewerGender,
  });

  if (!review) {
    return NextResponse.json({ error: 'Не удалось создать отзыв' }, { status: 500 });
  }

  return NextResponse.json(review, { status: 201 });
}
