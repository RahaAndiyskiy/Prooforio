'use client';

import { useEffect, useRef, useState } from 'react';
import { reviewExportTemplates } from '../export/templates';
import { ShareCardTemplate } from './ShareCardTemplate';
import type { ReviewTemplateProps } from '../templates/types';

const EXPORT_WIDTH = 1200;
const EXPORT_HEIGHT = 630;

export function ShareReviewExportClient({ review, templateId }: { review: ReviewTemplateProps; templateId?: string }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateId ?? reviewExportTemplates[0]?.id ?? 'minimal');
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const selectedTemplate = reviewExportTemplates.find((template) => template.id === selectedTemplateId) ?? reviewExportTemplates[0];

  useEffect(() => {
    const node = previewContainerRef.current;
    if (!node) return;

    const updateScale = () => {
      const width = node.clientWidth;
      const scale = Math.min(1, width / EXPORT_WIDTH);
      setPreviewScale(scale);
    };

    updateScale();

    const observer = new ResizeObserver(() => updateScale());
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const saveWithDownload = (file: File) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const saveWithShare = async (file: File) => {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
      return false;
    }

    const sharePayload = {
      title: 'Экспорт отзыва',
      text: 'Сохраните или отправьте изображение отзыва.',
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
          templateId: selectedTemplateId,
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
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Экспорт</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Генерация изображения отзыва</h2>
          <p className="mt-2 text-sm text-slate-600">
            Выберите шаблон и посмотрите предварительный просмотр прямо в новой системе.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Шаблоны</p>
          <div className="mt-4 grid gap-3">
            {reviewExportTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedTemplateId(template.id)}
                className={
                  'w-full rounded-3xl px-4 py-4 text-left transition ' +
                  (template.id === selectedTemplateId
                    ? 'border border-slate-900 bg-slate-950 text-white'
                    : 'border border-slate-200 bg-white text-slate-950 hover:border-slate-900')
                }
              >
                <p className="font-semibold">{template.label}</p>
                <p className="mt-2 text-sm text-slate-600">{template.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Предпросмотр</p>
                <p className="mt-2 text-sm text-slate-600">Текущий шаблон: {selectedTemplate.label}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                1200×630
              </span>
            </div>
            <div ref={previewContainerRef} className="flex w-full justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100/40">
              <div className="w-full overflow-hidden">
                <div
                  className="mx-auto overflow-hidden"
                  style={{
                    width: Math.max(0, Math.floor(EXPORT_WIDTH * previewScale)),
                    height: Math.max(0, Math.floor(EXPORT_HEIGHT * previewScale)),
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      width: EXPORT_WIDTH,
                      height: EXPORT_HEIGHT,
                      transform: `scale(${previewScale})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    <ShareCardTemplate review={review} templateId={selectedTemplateId} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => downloadImage('png')}
              disabled={loading}
              className="rounded-3xl border border-slate-200 bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Скачать PNG
            </button>
            <button
              type="button"
              onClick={() => downloadImage('jpeg')}
              disabled={loading}
              className="rounded-3xl border border-slate-200 bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Скачать JPEG
            </button>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {loading ? 'Генерация...' : 'Размер: 1200×630'}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
