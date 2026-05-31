import { forwardRef } from 'react';
import { buildReviewExportTemplateContext } from '../export/buildReviewExportTemplateContext';
import { reviewExportTemplates } from '../export/templates';
import { getTemplateDimensions } from '../lib/templateCatalog';
import { ShareTemplateFrame } from './ShareTemplateFrame';
import type { ReviewExportTemplateProps } from '../export/types';

type ShareCardTemplateProps = {
  review: ReviewExportTemplateProps;
  templateId?: string;
};

export const ShareCardTemplate = forwardRef<HTMLDivElement, ShareCardTemplateProps>(
  ({ review, templateId }, ref) => {
    const selectedTemplate = reviewExportTemplates.find((template) => template.id === templateId) ?? reviewExportTemplates[0];
    const SelectedTemplate = selectedTemplate.Component;
    const dimensions = getTemplateDimensions(selectedTemplate.meta.format);

    return (
      <ShareTemplateFrame ref={ref} width={dimensions.width} height={dimensions.height}>
        <SelectedTemplate {...buildReviewExportTemplateContext(review)} />
      </ShareTemplateFrame>
    );
  }
);

ShareCardTemplate.displayName = 'ShareCardTemplate';