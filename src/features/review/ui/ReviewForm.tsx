'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getReviewerAvatarPublicPath, type ReviewerGender } from '@/entities/review/avatar';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

const ratingValues = [1, 2, 3, 4, 5] as const;

const avatarOptions: Array<{ label: string; value: ReviewerGender }> = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="m5 12.5 4.2 4.2L19.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function ReviewForm({ profileId, reviewLink }: { profileId: string; reviewLink: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [reviewerGender, setReviewerGender] = useState<ReviewerGender>('male');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileId, author: name, text, rating, reviewerGender }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
      return;
    }

    setIsSubmitted(true);
  };

  const handleShareLink = async () => {
    try {
      const absoluteReviewLink = reviewLink.startsWith('http')
        ? reviewLink
        : `${window.location.origin}${reviewLink}`;

      await navigator.clipboard.writeText(absoluteReviewLink);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 2000);
    } catch {
      setError('Не удалось скопировать ссылку. Попробуйте ещё раз.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setRating(5);
    setText('');
    setReviewerGender('male');
    setError(null);
  };

  if (isSubmitted) {
    return (
      <Card className="space-y-5 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/12 text-accent shadow-soft ring-1 ring-accent/20">
          <CheckIcon />
        </div>

        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">Спасибо</p>
          <h2 className="mt-2 text-[27px] font-semibold leading-tight tracking-[-0.03em] text-primary">
            Отзыв отправлен
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-muted">
            Все готово. Можете отправить еще один отзыв или скопировать ссылку для другого человека.
          </p>
        </div>

        <div className="grid gap-2.5">
          <button
            type="button"
            onClick={handleShareLink}
            className="pf-press flex h-12 items-center justify-center rounded-full bg-control text-[14px] font-semibold text-primary shadow-control ring-1 ring-[var(--pf-border-soft)]"
          >
            {shareCopied ? 'Скопировано!' : 'Скопировать ссылку'}
          </button>
          <Button type="button" onClick={handleReset} className="h-12">
            Оставить еще отзыв
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-[13px] font-medium text-muted" htmlFor="author">
            Имя
          </label>
          <Input
            id="author"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ваше имя"
            required
          />
        </div>

        <div className="space-y-2">
          <p className="block text-[13px] font-medium text-muted">Аватар</p>
          <div className="grid grid-cols-2 gap-2.5">
            {avatarOptions.map((option) => {
              const isActive = reviewerGender === option.value;

              return (
                <label
                  key={option.value}
                  className={`pf-press flex cursor-pointer items-center gap-3 rounded-[18px] border p-2.5 text-[13px] font-semibold transition ${
                    isActive
                      ? 'border-accent bg-accent/12 text-primary ring-1 ring-accent/20'
                      : 'border-[var(--pf-border-soft)] bg-[var(--pf-control-soft)] text-muted'
                  }`}
                >
                  <Image
                    src={getReviewerAvatarPublicPath(option.value)}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover shadow-soft"
                  />
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="reviewerGender"
                    value={option.value}
                    checked={isActive}
                    onChange={() => setReviewerGender(option.value)}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-medium text-muted" htmlFor="text">
            Отзыв
          </label>
          <Textarea
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Что понравилось? Что было полезно?"
            required
          />
        </div>

        <fieldset className="space-y-2">
          <legend className="block text-[13px] font-medium text-muted">
            Оценка
          </legend>
          <div className="flex h-14 items-center justify-center gap-1.5 rounded-[18px] border border-[var(--pf-border-soft)] bg-[var(--pf-control-soft)] shadow-[inset_0_1px_0_var(--pf-inset-highlight)]">
            {ratingValues.map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} из 5`}
                aria-pressed={rating === value}
                onClick={() => setRating(value)}
                className={`pf-press h-10 w-10 text-[28px] leading-none transition ${
                  value <= rating ? 'text-[#ffbe2e]' : 'text-primary/18'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </fieldset>

        {error ? (
          <p className="rounded-[14px] bg-[var(--pf-danger-soft)] px-3 py-2 text-[13px] font-medium text-red-500">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={isSubmitting} className="h-12 w-full">
          {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
        </Button>
      </form>
    </Card>
  );
}
