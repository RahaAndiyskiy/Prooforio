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
  const ariaLabel = `${preset.label} · ${getPresetFormatLabel(preset.meta.format)}`;

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
    <div className="mb-4 break-inside-avoid sm:mb-5">
      <button
        type="button"
        onClick={() => onSelect(preset.id)}
        aria-pressed={isSelected}
        aria-label={ariaLabel}
        className={
          'group block h-fit w-full self-start bg-transparent p-0 text-left transition-transform transition-shadow duration-300 ' +
          (isSelected
            ? 'scale-[1.028] shadow-[0_42px_120px_rgba(15,23,42,0.34)]'
            : 'hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]')
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
        <section className="columns-1 gap-4 min-[380px]:columns-2 min-[380px]:gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
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

      <section className="sticky bottom-4 z-10 rounded-[24px] border border-slate-200/80 bg-white/92 px-4 py-3 shadow-[0_22px_70px_rgba(15,23,42,0.1)] backdrop-blur-sm transition-all duration-300 sm:px-5 sm:py-4 lg:mx-auto lg:max-w-[680px] lg:bg-white/52 lg:shadow-[0_16px_44px_rgba(15,23,42,0.08)] lg:backdrop-blur-xl lg:hover:border-slate-300/90 lg:hover:bg-white/66 lg:hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Выбранный шаблон</p>
            <p className="mt-2 text-xl font-semibold text-slate-950">{selectedPreset.label}</p>
            <p className="mt-1 text-sm text-slate-600">
              {loading
                ? 'Генерируем изображение...'
                : `${getPresetFormatLabel(selectedPreset.meta.format)} · ${formatPresetDimensions(selectedPresetDimensions.width, selectedPresetDimensions.height)}`}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[260px]">
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
