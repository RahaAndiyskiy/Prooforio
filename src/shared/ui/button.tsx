import type { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        'pf-press inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(63,167,255,0.24)] focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70 ' +
        className
      }
      {...props}
    />
  );
}
