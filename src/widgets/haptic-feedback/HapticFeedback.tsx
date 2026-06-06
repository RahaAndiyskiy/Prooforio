'use client';

import { useEffect } from 'react';

export function HapticFeedback() {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const pressTarget = target.closest('.pf-press, .pf-press-centered');
      if (!pressTarget || pressTarget.hasAttribute('disabled') || pressTarget.getAttribute('aria-disabled') === 'true') {
        return;
      }

      navigator.vibrate?.(8);
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return null;
}
