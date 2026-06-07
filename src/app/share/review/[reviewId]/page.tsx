import { isReviewerGender } from '@/entities/review/avatar';
import Link from 'next/link';
import { ShareReviewExportClient } from '@/features/share-review/ui/ShareReviewExportClient';
import { getProfileById } from '@/shared/api/profile';
import { getReviewById } from '@/shared/api/review';

export const dynamic = 'force-dynamic';

function parseStringParam(value: string | number | string[] | undefined) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value[0];
  return String(value);
}

type ShareReviewPageProps = {
  params: Promise<{ reviewId: string }>;
  searchParams?: Promise<{
    author?: string | string[];
    text?: string | string[];
    rating?: string | number | string[];
    createdAt?: string | string[];
    profileName?: string | string[];
    reviewerGender?: string | string[];
    preset?: string | string[];
    template?: string | string[];
  }>;
};

export default async function ShareReviewPage({ params, searchParams }: ShareReviewPageProps) {
  const { reviewId } = await params;
  const decodedReviewId = decodeURIComponent(reviewId);
  const review = await getReviewById(decodedReviewId);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const fallbackReviewerGenderParam = parseStringParam(resolvedSearchParams?.reviewerGender);
  const fallbackReviewerGender = isReviewerGender(fallbackReviewerGenderParam) ? fallbackReviewerGenderParam : 'male';
  // Fallback из query нужен, чтобы ссылка шаринга могла открыться даже если в момент открытия отзыв еще недоступен по id.
  const fallbackReview = {
    author: parseStringParam(resolvedSearchParams?.author) ?? '',
    text: parseStringParam(resolvedSearchParams?.text) ?? '',
    rating: Number(parseStringParam(resolvedSearchParams?.rating) ?? 0),
    createdAt: parseStringParam(resolvedSearchParams?.createdAt) ?? new Date().toISOString(),
    profileName: parseStringParam(resolvedSearchParams?.profileName) ?? 'Proofio',
    reviewerGender: fallbackReviewerGender,
  };
  const presetId = parseStringParam(resolvedSearchParams?.preset) ?? parseStringParam(resolvedSearchParams?.template) ?? 'minimal';

  const hasFallbackReview = Boolean(fallbackReview.author && fallbackReview.text && fallbackReview.rating > 0);

  const isUsingFallback = !review && hasFallbackReview;

  if (!review && !hasFallbackReview) {
    return (
      <section className="rounded-[20px] border border-[var(--pf-border-strong)] bg-surface p-5 text-center shadow-card">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Отзыв не найден</p>
        <h1 className="mt-4 text-[26px] font-semibold leading-tight text-primary">Шаблон шаринга недоступен</h1>
        <p className="mt-4 text-[14px] leading-6 text-muted">
          Мы не нашли отзыв для этой ссылки. Проверьте URL или откройте отзыв из панели.
        </p>
        <Link
          href="/"
          className="pf-press mt-6 inline-flex rounded-full bg-surface-soft px-4 py-2 text-[14px] font-semibold text-primary shadow-control"
        >
          На главную
        </Link>
      </section>
    );
  }

  const shareReview = review
    ? {
        author: review.author,
        text: review.text,
        rating: review.rating,
        createdAt: review.createdAt,
        profileName: (await getProfileById(review.profileId))?.fullName ?? 'Proofio',
        reviewerGender: review.reviewerGender ?? 'male',
      }
    : fallbackReview;

  return (
    <>
      {isUsingFallback && (
        <div className="rounded-[18px] border border-accent/25 bg-surface p-4 text-sm text-muted shadow-soft">
          <p className="font-semibold">Данные отзыва загружены из параметров ссылки.</p>
          <p>Если тут отображается некорректный отзыв, значит проблема в формировании URL.</p>
        </div>
      )}
      <ShareReviewExportClient review={shareReview} presetId={presetId} />
    </>
  );
}

