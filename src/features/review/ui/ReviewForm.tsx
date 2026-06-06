'use client';

import { useState } from 'react';
import type { ReviewerGender } from '@/entities/review/avatar';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

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
      await navigator.clipboard.writeText(reviewLink);
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
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">Спасибо</p>
          <h2 className="text-[26px] font-semibold leading-tight text-primary">Ваш отзыв отправлен</h2>
          <p className="mt-3 text-[14px] leading-6 text-muted">
            Отзыв принят. Если хотите, отправьте ещё один или поделитесь ссылкой, чтобы получить больше отзывов.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" onClick={handleShareLink}>
            {shareCopied ? 'Скопировано!' : 'Скопировать ссылку'}
          </Button>
          <Button type="button" onClick={handleReset}>
            Оставить ещё отзыв
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-[14px] font-medium text-muted" htmlFor="author">
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
        <div>
          <p className="mb-2 block text-[14px] font-medium text-muted">Фото-заглушка</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Муж', value: 'male' as const },
              { label: 'Жен', value: 'female' as const },
            ].map((option) => {
              const isActive = reviewerGender === option.value;

              return (
                <label
                  key={option.value}
                  className={
                    'flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ' +
                    (isActive
                      ? 'border-accent bg-accent text-white'
                      : 'border-[var(--pf-border-soft)] bg-surface text-muted hover:border-accent/40 hover:text-primary')
                  }
                >
                  <span>{option.label}</span>
                  <span aria-hidden="true">{isActive ? '✓' : ''}</span>
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
        <div>
          <label className="mb-2 block text-[14px] font-medium text-muted" htmlFor="text">
            Отзыв
          </label>
          <Textarea
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Поделитесь опытом"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-[14px] font-medium text-muted" htmlFor="rating">
            Оценка
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            className="w-full rounded-2xl border border-[var(--pf-border-soft)] bg-surface px-4 py-3 text-[16px] text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} звезда{value > 1 ? 'ы' : ''}
              </option>
            ))}
          </select>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
        </Button>
      </form>
    </Card>
  );
}
