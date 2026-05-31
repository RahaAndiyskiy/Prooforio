import { forwardRef } from 'react';
import { buildReviewExportTemplateContext } from '../export/buildReviewExportTemplateContext';
import { reviewExportTemplates } from '../export/templates';
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

    return (
      <ShareTemplateFrame ref={ref}>
        <SelectedTemplate {...buildReviewExportTemplateContext(review)} />
      </ShareTemplateFrame>
    );
  }
);

ShareCardTemplate.displayName = 'ShareCardTemplate';