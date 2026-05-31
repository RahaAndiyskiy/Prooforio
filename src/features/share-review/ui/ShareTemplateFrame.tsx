import { forwardRef, type PropsWithChildren } from 'react';
import { EXPORT_HEIGHT, EXPORT_WIDTH } from '../constants';

export const ShareTemplateFrame = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ width: EXPORT_WIDTH, height: EXPORT_HEIGHT }}
      >
        {children}
      </div>
    );
  }
);

ShareTemplateFrame.displayName = 'ShareTemplateFrame';
