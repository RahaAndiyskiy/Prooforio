'use client';

import { useState, useSyncExternalStore } from 'react';
import type { Profile } from '@/entities/profile/types';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

export function DashboardOverview({
  profile,
  reviewCount,
  averageRating,
  recentReviewsCount,
}: {
  profile: Profile;
  reviewCount: number;
  averageRating: string;
  recentReviewsCount: number;
}) {
  const [toastMessage, setToastMessage] = useState('');
  const reviewPath = `/review/${profile.username}`;
  const shareSupported = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === 'function',
    () => false
  );
  const reviewUrl = useSyncExternalStore(
    () => () => {},
    () => `${window.location.origin}${reviewPath}`,
    () => `https://prooforio.vercel.app${reviewPath}`
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 2000);
  };

  const handleShare = async () => {
    try {
      if (!navigator.share) {
        throw new Error('Share API not supported');
      }

      await navigator.share({
        title: 'Оставьте отзыв',
        text: 'Буду благодарен за честный отзыв. Это займёт меньше минуты.',
        url: reviewUrl,
      });
      showToast('Ссылка отправлена');
    } catch (error) {
      console.error('Share error', error);
      if (error instanceof Error && error.name !== 'AbortError') {
        showToast('Не удалось поделиться ссылкой');
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      showToast('Ссылка скопирована');
    } catch (error) {
      console.error('Failed to copy review link', error);
      showToast('Не удалось скопировать ссылку');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Панель</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">{profile.fullName}</h1>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Отправьте эту ссылку первому клиенту. Здесь появятся отзывы сразу после первой отправки.
          </p>
        </div>
      </Card>

      <Card className="p-5">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Ссылка для отзыва</p>
            <div className="mt-3 flex items-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
              <span className="min-w-0 flex-1 break-words pr-3">{reviewUrl}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                aria-label="Копировать ссылку"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M16 1H4a2 2 0 00-2 2v12h2V3h12V1z" />
                  <path d="M20 5H8a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h12v14z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">Скопируйте и отправьте ссылку клиенту в мессенджере.</p>
            {shareSupported ? (
              <Button type="button" onClick={handleShare} className="w-full sm:w-auto">
                Поделиться
              </Button>
            ) : null}
          </div>
          {toastMessage ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
              {toastMessage}
            </div>
          ) : null}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-slate-500">Отзывы</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{reviewCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Средний рейтинг</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{averageRating}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">За 7 дней</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{recentReviewsCount}</p>
        </Card>
      </div>
    </div>
  );
}
