'use client';

import { useRef, useState } from 'react';
import { toJpeg, toPng } from 'html-to-image';
import { reviewTemplates } from '../templates';
import { ShareCardTemplate } from './ShareCardTemplate';
import type { ReviewTemplateProps } from '../templates/types';

export function ShareReviewExportClient({ review, templateId }: { review: ReviewTemplateProps; templateId?: string }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateId ?? reviewTemplates[0]?.id ?? 'minimal');
  const exportRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const selectedTemplate = reviewTemplates.find((template) => template.id === selectedTemplateId) ?? reviewTemplates[0];

  const downloadImage = async (format: 'png' | 'jpeg') => {
    if (!exportRef.current) return;
    setLoading(true);

    try {
      const dataUrl =
        format === 'png'
          ? await toPng(exportRef.current, { cacheBust: true, width: 1200, height: 630, backgroundColor: '#f8fafc' })
          : await toJpeg(exportRef.current, { cacheBust: true, quality: 0.95, width: 1200, height: 630, backgroundColor: '#f8fafc' });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `prooforio-review.${format === 'png' ? 'png' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
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
            {reviewTemplates.map((template) => (
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
            <div className="relative overflow-hidden bg-slate-50 shadow-[0_35px_80px_rgba(15,23,42,0.12)]">
              <div className="aspect-[1200/630] w-full">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative h-[630px] w-[1200px] -translate-x-1/2 -translate-y-1/2 transform scale-[0.55] origin-center sm:scale-[0.65] lg:scale-[0.75] xl:scale-90 2xl:scale-100" style={{ left: '50%', top: '50%' }}>
                    <ShareCardTemplate ref={exportRef} review={review} templateId={selectedTemplateId} />
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
              className="rounded-3xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Скачать PNG
            </button>
            <button
              type="button"
              onClick={() => downloadImage('jpeg')}
              disabled={loading}
              className="rounded-3xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
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
