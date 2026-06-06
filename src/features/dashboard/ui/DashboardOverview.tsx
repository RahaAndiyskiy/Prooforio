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
    <section className="space-y-3">
      <div className="rounded-[13px] bg-white px-4 pb-4 pt-3 shadow-[0_7px_18px_rgba(15,23,42,0.14)]">
        <p className="text-[11px] font-medium text-black">Твоя ссылка для отзыва</p>

        <div className="mt-3 flex h-[38px] items-center rounded-full bg-[#e5e5e5] pl-5 pr-1 text-[11px] font-medium tracking-[0.08em] text-[#4b4b4b]">
          <span className="min-w-0 flex-1 truncate">{compactReviewUrl}</span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Скопировать ссылку"
            className="-mr-1 flex h-[38px] w-12 items-center justify-center rounded-l-[19px] rounded-r-full bg-[#c9c9c9] text-white shadow-[inset_1px_0_0_rgba(255,255,255,0.24)]"
          >
            <CopyIcon />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_1fr] gap-3">
          <button
            type="button"
            onClick={handleShareButtonClick}
            className="flex h-[35px] items-center justify-center gap-1.5 rounded-full bg-[#3caaff] text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_4px_10px_rgba(60,170,255,0.28)]"
          >
            <ShareIcon />
            Дать ссылку
          </button>

          <button
            type="button"
            className="flex h-[35px] items-center justify-center gap-2 rounded-full bg-[#dedede] text-[12px] font-semibold text-black"
          >
            <span className="h-4 w-4 bg-[#5a5a5a]" />
            QR
          </button>
        </div>

        {toastMessage ? (
          <div className="mt-3 rounded-full bg-black/80 px-3 py-2 text-center text-[11px] text-white">
            {toastMessage}
          </div>
        ) : null}
      </div>

      <div className="rounded-[999px] bg-white px-6 py-6 shadow-[0_8px_21px_rgba(15,23,42,0.14)]">
        <div className="grid grid-cols-3 items-center divide-x divide-black/10 text-center">
          <div className="px-2">
            <p className="text-[21px] font-medium leading-none text-black">{reviewCount}</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-black/45">Отзывы</p>
          </div>
          <div className="px-2">
            <p className="text-[21px] font-medium leading-none text-black">{averageRating}</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-black/45">Рейтинг</p>
          </div>
          <div className="px-2">
            <p className="text-[21px] font-medium leading-none text-black">{recentReviewsCount}</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-black/45">7 дней</p>
          </div>
        </div>
      </div>
    </section>
  );
}
