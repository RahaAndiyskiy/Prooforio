'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { reviewExportPresets } from '../export/templates';
import type { ReviewExportTemplateProps } from '../export/types';
import {
  defaultPresetFilters,
  filterPresets,
  getPresetDimensions,
  getPresetFormatLabel,
  getPresetFormatOptions,
  getPresetStyleOptions,
  type PresetFilterOption,
  type PresetFilterState,
  type PresetFilterValue,
} from '../lib/presetCatalog';
import { ShareCardPreset } from './ShareCardPreset';
import { proofioUi } from '@/shared/design/proofio-design';

const templateFilterStorageKey = 'prooforio:share-review:filters';
const demoReview: ReviewExportTemplateProps = {
  author: 'Ваш клиент',
  text: 'Тут будет текст отзыва после выбора',
  rating: 5,
  createdAt: '2026-06-01T00:00:00.000Z',
  profileName: 'Proofio',
  reviewerGender: 'male',
};

type PresetPreviewOptionProps = {
  review: ReviewExportTemplateProps;
  preset: (typeof reviewExportPresets)[number];
  isSelected: boolean;
  onSelect: (presetId: string) => void;
  onShare: () => void;
  loading: boolean;
  actionLabel: string;
};

function PresetPreviewOption({ review, preset, isSelected, onSelect, onShare, loading, actionLabel }: PresetPreviewOptionProps) {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const dimensions = getPresetDimensions(preset.meta.format);
  const ariaLabel = `${preset.label} · ${getPresetFormatLabel(preset.meta.format)}`;

  useEffect(() => {
    const node = previewContainerRef.current;
    if (!node) return;

    const updateScale = () => {
      const width = node.clientWidth;
      setPreviewScale(Math.min(1, width / dimensions.width));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(node);

    return () => observer.disconnect();
  }, [dimensions.width]);

  return (
    <div className="relative mb-3 break-inside-avoid">
      <button
        type="button"
        onClick={() => onSelect(preset.id)}
        aria-pressed={isSelected}
        aria-label={ariaLabel}
        className={
          'pf-press block h-fit w-full overflow-hidden rounded-[3px] bg-transparent p-0 text-left shadow-soft transition-transform duration-300 ' +
          (isSelected ? 'scale-[1.018] ring-2 ring-accent/45' : 'hover:-translate-y-0.5')
        }
      >
        <div
          ref={previewContainerRef}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${dimensions.width} / ${dimensions.height}` }}
        >
          <div
            className="pointer-events-none absolute left-0 top-0"
            style={{
              width: dimensions.width,
              height: dimensions.height,
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
            }}
          >
            <ShareCardPreset review={review} presetId={preset.id} />
          </div>
        </div>
      </button>

      {isSelected ? (
        <button
          type="button"
          onClick={onShare}
          disabled={loading}
          className="pf-press-centered inline-flex items-center justify-center rounded-full bg-accent px-3 py-1.5 text-[10.5px] font-medium text-white shadow-[0_8px_18px_rgba(63,167,255,0.34)] disabled:opacity-70"
          style={{
            left: '50%',
            position: 'absolute',
            top: '50%',
          }}
        >
          {loading ? '...' : actionLabel}
        </button>
      ) : null}
    </div>
  );
}

type PresetFilterGroupProps<T extends string> = {
  title: string;
  options: Array<PresetFilterOption<T>>;
  value: PresetFilterValue<T>;
  onChange: (value: PresetFilterValue<T>) => void;
};

function PresetFilterGroup<T extends string>({ title, options, value, onChange }: PresetFilterGroupProps<T>) {
  if (options.length <= 1) {
    return null;
  }

  const selectedOption = options.find((option) => option.value === value);
  const label = selectedOption?.value === 'all' || !selectedOption ? title : selectedOption.label;
  const isActive = selectedOption?.value !== 'all' && Boolean(selectedOption);

  return (
    <label
      className={`relative block h-12 overflow-hidden rounded-full border bg-control shadow-control transition ${
        isActive ? 'border-accent' : 'border-[var(--pf-border-soft)]'
      }`}
    >
      <span className="sr-only">{title}</span>
      <span
        className={`pointer-events-none absolute inset-x-4 top-2 text-center text-[12.5px] font-medium ${
          isActive ? 'text-primary' : 'text-primary'
        }`}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as PresetFilterValue<T>)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-transparent opacity-0 outline-none text-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.value === 'all' ? title : option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[15px] leading-none text-primary">⌄</span>
    </label>
  );
}

function getStoredPresetFilters(): PresetFilterState {
  if (typeof window === 'undefined') {
    return defaultPresetFilters;
  }

  try {
    const storedFilters = window.localStorage.getItem(templateFilterStorageKey);
    if (!storedFilters) {
      return defaultPresetFilters;
    }

    const parsedFilters = JSON.parse(storedFilters) as Partial<PresetFilterState>;
    const formatOptions = getPresetFormatOptions(reviewExportPresets);
    const format = formatOptions.some((option) => option.value === parsedFilters.format)
      ? parsedFilters.format
      : defaultPresetFilters.format;
    const presetsForFormat = filterPresets(reviewExportPresets, {
      format: format ?? defaultPresetFilters.format,
      style: 'all',
    });
    const styleOptions = getPresetStyleOptions(presetsForFormat);
    const style = styleOptions.some((option) => option.value === parsedFilters.style)
      ? parsedFilters.style
      : defaultPresetFilters.style;

    return {
      format: format ?? defaultPresetFilters.format,
      style: style ?? defaultPresetFilters.style,
    };
  } catch {
    return defaultPresetFilters;
  }
}

export function ShareReviewExportClient({ review, presetId }: { review?: ReviewExportTemplateProps; presetId?: string }) {
  const router = useRouter();
  const displayReview = review ?? demoReview;
  const hasSelectedReview = Boolean(review);
  const [selectedPresetId, setSelectedPresetId] = useState(presetId ?? reviewExportPresets[0]?.id ?? 'minimal');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<PresetFilterState>(() => getStoredPresetFilters());
  const formatOptions = getPresetFormatOptions(reviewExportPresets);
  const presetsForFormat = filterPresets(reviewExportPresets, {
    format: filters.format,
    style: 'all',
  });
  const styleOptions = getPresetStyleOptions(presetsForFormat);
  const effectiveStyle = styleOptions.some((option) => option.value === filters.style) ? filters.style : 'all';
  const filteredPresets = filterPresets(reviewExportPresets, {
    ...filters,
    style: effectiveStyle,
  });
  const effectiveSelectedPresetId = filteredPresets.some((preset) => preset.id === selectedPresetId)
    ? selectedPresetId
    : filteredPresets[0]?.id ?? reviewExportPresets[0]?.id ?? 'minimal';

  useEffect(() => {
    window.localStorage.setItem(
      templateFilterStorageKey,
      JSON.stringify({
        format: filters.format,
        style: effectiveStyle,
      }),
    );
  }, [filters.format, effectiveStyle]);

  const saveWithDownload = (file: File) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const shouldUseNativeShare = () => {
    if (typeof navigator === 'undefined') {
      return false;
    }

    const navigatorWithUserAgentData = navigator as Navigator & {
      userAgentData?: {
        mobile?: boolean;
      };
    };

    if (typeof navigatorWithUserAgentData.userAgentData?.mobile === 'boolean') {
      return navigatorWithUserAgentData.userAgentData.mobile;
    }

    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  };

  const saveWithShare = async (file: File) => {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function' || !shouldUseNativeShare()) {
      return false;
    }

    const sharePayload = {
      files: [file],
    };

    if (typeof navigator.canShare === 'function' && !navigator.canShare(sharePayload)) {
      return false;
    }

    try {
      await navigator.share(sharePayload);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return true;
      }

      console.error('Share export error:', error);
      return false;
    }
  };

  const downloadImage = async (format: 'png' | 'jpeg') => {
    if (!hasSelectedReview) {
      router.push(`/dashboard/reviews?mode=select-template-review&presetId=${encodeURIComponent(effectiveSelectedPresetId)}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/share/review-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...review,
          presetId: effectiveSelectedPresetId,
          templateId: effectiveSelectedPresetId,
          format,
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const extension = format === 'png' ? 'png' : 'jpg';
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const file = new File([blob], `proofio-review.${extension}`, { type: blob.type || mimeType });

      const shared = await saveWithShare(file);
      if (!shared) {
        saveWithDownload(file);
      }
    } catch (error) {
      console.error('Export error:', error);
      window.alert('Не удалось сохранить изображение. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className={proofioUi.typography.pageTitle}>Шаблоны</h1>

      <section className="mt-3 space-y-4">
        <button
          type="button"
          className="flex h-[48px] w-full items-center justify-between rounded-full bg-control px-5 text-[22px] font-medium text-primary shadow-control ring-1 ring-[var(--pf-border-soft)]"
        >
          <span>Отзывы</span>
          <span className="text-[22px] leading-none">⌄</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <PresetFilterGroup
            title="Ориентация"
            options={formatOptions}
            value={filters.format}
            onChange={(format) => {
              setFilters({
                format,
                style: 'all',
              });
            }}
          />
          <PresetFilterGroup
            title="Стиль"
            options={styleOptions}
            value={effectiveStyle}
            onChange={(style) => {
              setFilters((currentFilters) => ({
                ...currentFilters,
                style,
              }));
            }}
          />
        </div>
      </section>

      {filteredPresets.length ? (
        <section className="mt-5 columns-2 gap-3">
          {filteredPresets.map((preset) => (
            <PresetPreviewOption
          key={preset.id}
              review={displayReview}
              preset={preset}
              isSelected={preset.id === effectiveSelectedPresetId}
              onSelect={setSelectedPresetId}
              onShare={() => downloadImage('png')}
              loading={loading && preset.id === effectiveSelectedPresetId}
              actionLabel={hasSelectedReview ? 'Поделиться' : 'Выбрать отзыв'}
            />
          ))}
        </section>
      ) : (
        <div className="mt-5 rounded-[16px] border border-dashed border-[var(--pf-border-strong)] bg-surface p-6 text-center text-sm text-muted">
          По выбранным фильтрам шаблоны пока не найдены.
        </div>
      )}
    </>
  );
}
