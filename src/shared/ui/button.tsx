import type { ButtonHTMLAttributes } from 'react';
import { proofioUi } from '@/shared/design/proofio-design';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${proofioUi.button.primary} ${className}`}
      {...props}
    />
  );
}
