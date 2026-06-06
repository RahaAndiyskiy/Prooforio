'use client';

import { useState, useSyncExternalStore } from 'react';
import type { Profile } from '@/entities/profile/types';

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M8 7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V7Zm3-1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-6ZM4 10a3 3 0 0 1 2-2.83V16a5 5 0 0 0 5 5h4.83A3 3 0 0 1 13 23H7a3 3 0 0 1-3-3V10Z"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        fill="currentColor"
        d="M12 3.4 17.1 8.5l-1.4 1.4L13 7.2V15h-2V7.2L8.3 9.9 6.9 8.5 12 3.4ZM5 13h2v5h10v-5h2v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5Z"
      />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[17px] w-[17px]">
      <path
        fill="currentColor"
        d="M4 4h7v7H4V4Zm2 2v3h3V6H6Zm7-2h7v7h-7V4Zm2 2v3h3V6h-3ZM4 13h7v7H4v-7Zm2 2v3h3v-3H6Zm8-2h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v3h-2v-3Zm3-1h3v4h-2v-2h-1v-2Z"
      />
    </svg>
  );
}

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
    () => `https://proofio.com${reviewPath}`
  );
  const compactReviewUrl = `proofio.com${reviewPath}`;

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 1700);
  };

  const handleShare = async () => {
    try {
      if (!navigator.share) {
        throw new Error('Share API not supported');
      }

      await navigator.share({
        title: 'Оставьте отзыв',
        text: 'Буду благодарен за честный отзыв. Это займет меньше минуты.',
        url: reviewUrl,
      });
    } catch (error) {
      console.error('Share error', error);
      if (error instanceof Error && error.name !== 'AbortError') {
        showToast('Не удалось поделиться ссылкой');
      }
    }
  };

  const handleShareButtonClick = async () => {
    if (shareSupported) {
      await handleShare();
      return;
    }

    try {
      await navigator.clipboard.writeText(reviewUrl);
    } catch (error) {
      console.error('Failed to copy review link from share button', error);
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
    <section className="space-y-3.5">
      <div
        className="rounded-[20px] border border-white/65 px-4 pb-4 pt-3.5 shadow-[0_10px_26px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.82)]"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.84) 0%, rgba(247,248,250,0.70) 58%, rgba(231,236,244,0.58) 100%)',
          backdropFilter: 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: 'blur(10px) saturate(150%)',
        }}
      >
        <p className="text-[11px] font-medium text-primary/75">Твоя ссылка для отзыва</p>

        <div className="mt-3 flex h-[40px] items-center rounded-full bg-surface/58 pl-5 pr-1 text-[11px] font-medium tracking-[0.05em] text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.72)]">
          <span className="min-w-0 flex-1 truncate">{compactReviewUrl}</span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Скопировать ссылку"
            className="mr-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface/58 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_2px_8px_rgba(15,23,42,0.08)] transition active:scale-[0.96]"
          >
            <CopyIcon />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-[1.05fr_0.95fr] gap-3">
          <button
            type="button"
            onClick={handleShareButtonClick}
            className="flex h-[36px] items-center justify-center gap-1.5 rounded-full bg-accent text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(63,167,255,0.28)] transition active:scale-[0.98]"
          >
            <ShareIcon />
            Дать ссылку
          </button>

          <button
            type="button"
            className="flex h-[36px] items-center justify-center gap-2 rounded-full bg-surface/72 text-[12px] font-semibold text-primary/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_2px_8px_rgba(15,23,42,0.07)] ring-1 ring-black/5 transition active:scale-[0.98]"
          >
            <QrIcon />
            QR
          </button>
        </div>

        {toastMessage ? (
          <div className="mt-3 origin-center rounded-full bg-black/80 px-3 py-2 text-center text-[11px] text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] animate-[prooforioToastPop_260ms_cubic-bezier(0.18,0.89,0.32,1.28)]">
            {toastMessage}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-[16px] bg-surface px-3 py-3.5 text-center shadow-soft">
            <p className="text-[22px] font-semibold leading-none text-primary">{reviewCount}</p>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-primary/45">Отзывы</p>
        </div>
        <div className="rounded-[16px] bg-surface px-3 py-3.5 text-center shadow-soft">
            <p className="text-[22px] font-semibold leading-none text-primary">{averageRating}</p>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-primary/45">Рейтинг</p>
        </div>
        <div className="rounded-[16px] bg-surface px-3 py-3.5 text-center shadow-soft">
            <p className="text-[22px] font-semibold leading-none text-primary">{recentReviewsCount}</p>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-primary/45">Новые</p>
        </div>
      </div>
    </section>
  );
}
