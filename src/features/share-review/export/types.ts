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

export type ReviewExportTemplateContext = {
  review: ReviewExportTemplateProps;
  content: ReviewExportTemplateContent;
};

export type ReviewExportTemplateDefinition = {
  id: string;
  label: string;
  description: string;
  Component: (context: ReviewExportTemplateContext) => ReactNode;
};

export type ReviewExportRequest = ReviewExportTemplateProps & {
  templateId?: string;
  format?: 'png' | 'jpeg';
};
