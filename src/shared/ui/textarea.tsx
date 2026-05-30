import type { TextareaHTMLAttributes } from 'react';

export function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        'w-full min-h-[140px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-blue-100 ' +
        className
      }
      {...props}
    />
  );
}
