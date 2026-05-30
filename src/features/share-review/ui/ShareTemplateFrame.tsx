import { forwardRef, type PropsWithChildren } from 'react';
import { CARD_HEIGHT, CARD_WIDTH, EXPORT_HEIGHT, EXPORT_WIDTH } from '../constants';

export const ShareTemplateFrame = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden bg-slate-50 shadow-[0_35px_80px_rgba(15,23,42,0.18)]"
        style={{ width: EXPORT_WIDTH, height: EXPORT_HEIGHT }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
        <div className="relative flex h-full items-center justify-center">
          <div
            className="relative"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

ShareTemplateFrame.displayName = 'ShareTemplateFrame';
