import type { HTMLAttributes } from 'react';
import { proofioUi } from '@/shared/design/proofio-design';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${proofioUi.surface.card} ${className}`} {...props} />;
}
