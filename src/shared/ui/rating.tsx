import type { HTMLAttributes } from 'react';

const stars = ['★', '★', '★', '★', '★'];

export function RatingDisplay({ rating, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { rating: number }) {
  return (
    <div className={'flex items-center gap-1 text-sm text-amber-500 ' + className} {...props}>
      {stars.map((star, index) => (
        <span key={index} className={index < rating ? 'opacity-100 text-lg' : 'opacity-30'}>
          {star}
        </span>
      ))}
    </div>
  );
}
