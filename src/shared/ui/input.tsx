import type { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={
        'w-full rounded-2xl border border-[var(--pf-border-soft)] bg-surface px-4 py-3 text-[16px] text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ' +
        className
      }
      {...props}
    />
  );
}
