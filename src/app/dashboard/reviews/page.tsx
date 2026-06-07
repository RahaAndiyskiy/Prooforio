import { ReviewsClient } from '@/features/review/ui/ReviewsClient';

function parseStringParam(value: string | string[] | undefined) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value[0];
  return String(value);
}

type DashboardReviewsPageProps = {
  searchParams?: Promise<{
    mode?: string | string[];
    presetId?: string | string[];
  }>;
};

export default async function DashboardReviewsPage({ searchParams }: DashboardReviewsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const mode = parseStringParam(resolvedSearchParams?.mode);
  const selectionPresetId =
    mode === 'select-template-review' ? parseStringParam(resolvedSearchParams?.presetId) : undefined;

  return <ReviewsClient selectionPresetId={selectionPresetId} />;
}
