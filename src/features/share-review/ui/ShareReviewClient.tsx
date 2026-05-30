'use client';

import { useState } from 'react';
import { reviewTemplates } from '../templates';
import type { ReviewTemplateProps } from '../templates/types';

export function ShareReviewClient({ review }: { review: ReviewTemplateProps }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(reviewTemplates[0]?.id ?? 'minimal');
  const selectedTemplate = reviewTemplates.find((template) => template.id === selectedTemplateId) ?? reviewTemplates[0];
  const SelectedTemplate = selectedTemplate.Component;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Шаблоны</p>
          <h2 className="text-2xl font-semibold text-slate-950">Выберите оформление</h2>
          <p className="text-sm leading-6 text-slate-600">
            Переключайте шаблоны и смотрите, как меняется предпросмотр.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {reviewTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplateId(template.id)}
              className={
                'w-full rounded-3xl border px-4 py-4 text-left transition ' +
                (template.id === selectedTemplateId
                  ? 'border-slate-900 bg-slate-950 text-white'
                  : 'border-slate-200 bg-white text-slate-950 hover:border-slate-900')
              }
            >
              <p className="font-semibold">{template.label}</p>
              <p className="mt-2 text-sm text-slate-600">{template.description}</p>
            </button>
          ))}
        </aside>

        <section className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Предпросмотр</p>
            <div className="mt-6">
              <SelectedTemplate {...review} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              disabled
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Download PNG
              <span className="block text-xs text-slate-400">Soon</span>
            </button>
            <button
              type="button"
              disabled
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Share
              <span className="block text-xs text-slate-400">Soon</span>
            </button>
            <button
              type="button"
              disabled
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Copy Image
              <span className="block text-xs text-slate-400">Soon</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
