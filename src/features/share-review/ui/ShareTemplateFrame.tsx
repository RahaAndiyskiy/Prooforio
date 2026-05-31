import { forwardRef, type PropsWithChildren } from 'react';
import { EXPORT_HEIGHT, EXPORT_WIDTH } from '../constants';

type ShareTemplateFrameProps = PropsWithChildren<{
  width?: number;
  height?: number;
}>;

export const ShareTemplateFrame = forwardRef<HTMLDivElement, ShareTemplateFrameProps>(
  ({ children, width = EXPORT_WIDTH, height = EXPORT_HEIGHT }, ref) => {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ width, height }}
      >
        {children}
      </div>
    );
  }
);

ShareTemplateFrame.displayName = 'ShareTemplateFrame';
