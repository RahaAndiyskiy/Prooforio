'use client';

import { useEffect, useRef, useState } from 'react';
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
  type PresetFilterValue,
} from '../lib/presetCatalog';
import { ShareCardPreset } from './ShareCardPreset';

function formatPresetDimensions(width: number, height: number) {
  return `${width}×${height}`;
}

type PresetPreviewOptionProps = {
  review: ReviewExportTemplateProps;
  preset: (typeof reviewExportPresets)[number];
  isSelected: boolean;
  onSelect: (presetId: string) => void;
};

function PresetPreviewOption({ review, preset, isSelected, onSelect }: PresetPreviewOptionProps) {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const dimensions = getPresetDimensions(preset.meta.format);

  useEffect(() => {
    const node = previewContainerRef.current;
    if (!node) return;

    // Каждая карточка сама считает scale от своей ширины, поэтому сетка может позже жить с разными форматами без отдельного preview-экрана.
    const updateScale = () => {
      const width = node.clientWidth;
      const scale = Math.min(1, width / dimensions.width);
      setPreviewScale(scale);
    };

    updateScale();

    const observer = new ResizeObserver(() => updateScale());
    observer.observe(node);

    return () => observer.disconnect();
  }, [dimensions.width]);

  return (
    <div className="mb-5 break-inside-avoid">
      <button
        type="button"
        onClick={() => onSelect(preset.id)}
        aria-pressed={isSelected}
        className={
          'group h-fit w-full self-start rounded-[30px] border bg-white p-3 text-left transition sm:p-4 ' +
          (isSelected
            ? 'border-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-2 ring-slate-950/10'
            : 'border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]')
        }
      >
        <div
          ref={previewContainerRef}
          className="relative w-full overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100/50"
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

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-slate-950">{preset.label}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{preset.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                {getPresetFormatLabel(preset.meta.format)}
              </span>
            </div>
          </div>
          <span
            className={
              'shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ' +
              (isSelected ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600')
            }
          >
            {isSelected ? 'Выбран' : 'Выбрать'}
          </span>
        </div>
      </button>
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

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={
                'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                (isActive
                  ? 'bg-slate-950 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950')
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ShareReviewExportClient({ review, presetId }: { review: ReviewExportTemplateProps; presetId?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState(presetId ?? reviewExportPresets[0]?.id ?? 'minimal');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(defaultPresetFilters);
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
  const selectedPreset = filteredPresets.find((preset) => preset.id === effectiveSelectedPresetId) ?? filteredPresets[0] ?? reviewExportPresets[0];
  const selectedPresetDimensions = getPresetDimensions(selectedPreset.meta.format);

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

    // На desktop дефолтный UX — скачать файл, а нативный share оставляем только для мобильных устройств.
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
      const file = new File([blob], `prooforio-review.${extension}`, { type: blob.type || mimeType });

      const shared = await saveWithShare(file);
      if (!shared) {
        saveWithDownload(file);
      }
    } catch (error) {
      console.error('Export error:', error);
      window.alert('Не удалось сохранить изображение. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-9">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Шаблоны</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Выберите, как будет выглядеть ваш отзыв
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Нажмите на понравившуюся карточку. Ниже вы сможете сразу скачать выбранный вариант в PNG или JPEG.
        </p>

        <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
          <PresetFilterGroup
            title="Формат"
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
            value={filters.style}
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
        <section className="columns-1 gap-5 lg:columns-3">
          {filteredPresets.map((preset) => (
            <PresetPreviewOption
              key={preset.id}
              review={review}
              preset={preset}
              isSelected={preset.id === effectiveSelectedPresetId}
              onSelect={setSelectedPresetId}
            />
          ))}
        </section>
      ) : (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600">
          По выбранным фильтрам шаблоны пока не найдены. Сбросьте стиль или формат и попробуйте снова.
        </div>
      )}

      <section className="sticky bottom-4 z-10 rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Выбранный шаблон</p>
            <p className="mt-2 text-xl font-semibold text-slate-950">{selectedPreset.label}</p>
            <p className="mt-1 text-sm text-slate-600">
              {loading
                ? 'Генерируем изображение...'
                : `${getPresetFormatLabel(selectedPreset.meta.format)} · ${formatPresetDimensions(selectedPresetDimensions.width, selectedPresetDimensions.height)}`}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
            <button
              type="button"
              onClick={() => downloadImage('png')}
              disabled={loading}
              className="rounded-3xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Генерация PNG...' : 'Скачать PNG'}
            </button>
            <button
              type="button"
              onClick={() => downloadImage('jpeg')}
              disabled={loading}
              className="rounded-3xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Генерация JPEG...' : 'Скачать JPEG'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
