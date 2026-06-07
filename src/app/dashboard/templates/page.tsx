import { ShareReviewExportClient } from '@/features/share-review/ui/ShareReviewExportClient';

function parseStringParam(value: string | string[] | undefined) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value[0];
  return String(value);
}

type DashboardTemplatesPageProps = {
  searchParams?: Promise<{
    presetId?: string | string[];
    preset?: string | string[];
    template?: string | string[];
  }>;
};

export default async function DashboardTemplatesPage({ searchParams }: DashboardTemplatesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const presetId =
    parseStringParam(resolvedSearchParams?.presetId) ??
    parseStringParam(resolvedSearchParams?.preset) ??
    parseStringParam(resolvedSearchParams?.template);

  return <ShareReviewExportClient presetId={presetId} />;
}
