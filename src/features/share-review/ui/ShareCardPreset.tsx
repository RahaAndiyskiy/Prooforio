import { forwardRef } from 'react';
import { buildReviewExportPresetRenderContext } from '../export/buildReviewExportPresetRenderContext';
import { getReviewExportPresetById, reviewExportPresetRenderer } from '../export/templates';
import { ShareTemplateFrame } from './ShareTemplateFrame';
import type { ReviewExportTemplateProps } from '../export/types';

type ShareCardPresetProps = {
  review: ReviewExportTemplateProps;
  presetId?: string;
};

export const ShareCardPreset = forwardRef<HTMLDivElement, ShareCardPresetProps>(
  ({ review, presetId }, ref) => {
    const selectedPreset = getReviewExportPresetById(presetId);
    const renderContext = buildReviewExportPresetRenderContext(review, selectedPreset);
    const dimensions = renderContext.dimensions;

    return (
      <ShareTemplateFrame ref={ref} width={dimensions.width} height={dimensions.height}>
        {reviewExportPresetRenderer(renderContext)}
      </ShareTemplateFrame>
    );
  }
);

ShareCardPreset.displayName = 'ShareCardPreset';