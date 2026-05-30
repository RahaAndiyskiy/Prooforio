import { NextRequest, NextResponse } from 'next/server';
import { createReview } from '@/shared/api/review';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { profileId, author, text, rating } = body;

  if (!profileId || !author || !text || !rating) {
    return NextResponse.json({ error: 'Missing review data' }, { status: 400 });
  }

  const review = await createReview({
    profileId,
    author,
    text,
    rating: Number(rating),
  });

  if (!review) {
    return NextResponse.json({ error: 'Unable to create review' }, { status: 500 });
  }

  return NextResponse.json(review, { status: 201 });
}
