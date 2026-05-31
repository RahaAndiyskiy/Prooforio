import { forwardRef } from 'react';
import { reviewExportTemplates } from '../export/templates';
import { ShareTemplateFrame } from './ShareTemplateFrame';
import type { ReviewTemplateProps } from '../templates/types';

type ShareCardTemplateProps = {
  review: ReviewTemplateProps;
  templateId?: string;
};

export const ShareCardTemplate = forwardRef<HTMLDivElement, ShareCardTemplateProps>(
  ({ review, templateId }, ref) => {
    const selectedTemplate = reviewExportTemplates.find((template) => template.id === templateId) ?? reviewExportTemplates[0];
    const SelectedTemplate = selectedTemplate.Component;

    return (
      <ShareTemplateFrame ref={ref}>
        <SelectedTemplate {...review} />
      </ShareTemplateFrame>
    );
  }
);

ShareCardTemplate.displayName = 'ShareCardTemplate';
