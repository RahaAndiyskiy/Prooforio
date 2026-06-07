import type { TextareaHTMLAttributes } from 'react';
import { proofioUi } from '@/shared/design/proofio-design';

export function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`min-h-[140px] ${proofioUi.control.input} ${className}`}
      {...props}
    />
  );
}
