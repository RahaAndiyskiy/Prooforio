'use client';

import { useState } from 'react';
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
  const [copied, setCopied] = useState(false);
  const reviewLink = `https://prooforio.vercel.app/review/${profile.username}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy review link', error);
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
            <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 break-words">
              {reviewLink}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">Скопируйте и отправьте ссылку клиенту в мессенджере.</p>
            <Button type="button" onClick={handleCopy} className="w-full sm:w-auto">
              {copied ? 'Скопировано!' : 'Скопировать ссылку'}
            </Button>
          </div>
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
