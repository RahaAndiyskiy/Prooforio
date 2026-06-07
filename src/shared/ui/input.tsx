import type { InputHTMLAttributes } from 'react';
import { proofioUi } from '@/shared/design/proofio-design';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`${proofioUi.control.input} ${className}`}
      {...props}
    />
  );
}
