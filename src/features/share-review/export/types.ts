import type { ReactNode } from 'react';

export type ReviewExportTemplateProps = {
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  profileName: string;
};

export type ReviewExportTemplateContent = {
  brand: {
    label: string;
  };
  header: {
    title: string;
    badge: string;
  };
  rating: {
    value: string;
    icon: string;
  };
  body: {
    quote: string;
  };
  footer: {
    author: string;
    meta: string;
    date: string;
  };
};

export type ReviewExportTemplateFormat = 'landscape' | 'square' | 'story';

export type ReviewExportStyleId = 'clean' | 'bold';

export type ReviewExportLayoutId = 'hero-top' | 'split-header';

export type ReviewExportPresetMeta = {
  format: ReviewExportTemplateFormat;
  styleId: ReviewExportStyleId;
  layoutId: ReviewExportLayoutId;
  tags: string[];
  featured: boolean;
  order: number;
};

export type ReviewExportPresetDefinition = {
  id: string;
  label: string;
  description: string;
  meta: ReviewExportPresetMeta;
};

export type ReviewExportCanvasDimensions = {
  width: number;
  height: number;
};

export type ReviewExportPresetRenderContext = {
  review: ReviewExportTemplateProps;
  content: ReviewExportTemplateContent;
  preset: ReviewExportPresetDefinition;
  dimensions: ReviewExportCanvasDimensions;
};

export type ReviewExportPresetRenderer = (context: ReviewExportPresetRenderContext) => ReactNode;

export type ReviewExportRequest = ReviewExportTemplateProps & {
  presetId?: string;
  templateId?: string;
  format?: 'png' | 'jpeg';
};
