import Link from 'next/link';
import { Header } from '@/widgets/header/Header';
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
    preset?: string | string[];
    template?: string | string[];
  }>;
};

export default async function ShareReviewPage({ params, searchParams }: ShareReviewPageProps) {
  const { reviewId } = await params;
  const decodedReviewId = decodeURIComponent(reviewId);
  const review = await getReviewById(decodedReviewId);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  // Fallback из query нужен, чтобы ссылка шаринга могла открыться даже если в момент открытия отзыв еще недоступен по id.
  const fallbackReview = {
    author: parseStringParam(resolvedSearchParams?.author) ?? '',
    text: parseStringParam(resolvedSearchParams?.text) ?? '',
    rating: Number(parseStringParam(resolvedSearchParams?.rating) ?? 0),
    createdAt: parseStringParam(resolvedSearchParams?.createdAt) ?? new Date().toISOString(),
    profileName: parseStringParam(resolvedSearchParams?.profileName) ?? 'Prooforio',
  };
  const presetId = parseStringParam(resolvedSearchParams?.preset) ?? parseStringParam(resolvedSearchParams?.template) ?? 'minimal';

  const hasFallbackReview = Boolean(fallbackReview.author && fallbackReview.text && fallbackReview.rating > 0);

  const isUsingFallback = !review && hasFallbackReview;

  if (!review && !hasFallbackReview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
        <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Отзыв не найден</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Шаблон шаринга не доступен</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Мы не нашли отзыв для этой ссылки. Проверьте URL или откройте отзыв из панели.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const shareReview = review
    ? {
        author: review.author,
        text: review.text,
        rating: review.rating,
        createdAt: review.createdAt,
        profileName: (await getProfileById(review.profileId))?.fullName ?? 'Prooforio',
      }
    : fallbackReview;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        {isUsingFallback && (
          <div className="mb-6 rounded-3xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
            <p className="font-semibold">Данные отзыва загружены из параметров ссылки.</p>
            <p>Если тут отображается некорректный отзыв, значит проблема в формировании URL.</p>
          </div>
        )}
        <ShareReviewExportClient review={shareReview} presetId={presetId} />
      </main>
    </div>
  );
}

