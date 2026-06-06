import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={'rounded-[20px] bg-surface p-5 shadow-card ' + className} {...props} />;
}
