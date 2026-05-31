import type { ReactNode } from 'react';

export type ReviewExportTemplateProps = {
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  profileName: string;
};

export type ReviewExportTemplateDefinition = {
  id: string;
  label: string;
  description: string;
  Component: (props: ReviewExportTemplateProps) => ReactNode;
};

export type ReviewExportRequest = ReviewExportTemplateProps & {
  templateId?: string;
  format?: 'png' | 'jpeg';
};
