import type { ComponentType } from 'react';
import { MinimalTemplate } from './MinimalTemplate';
import type { ReviewTemplateProps } from './types';

export type ReviewTemplateDefinition = {
  id: string;
  label: string;
  description: string;
  Component: ComponentType<ReviewTemplateProps>;
};

export const reviewTemplates: ReviewTemplateDefinition[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Чистый минималистичный шаблон для отзывов.',
    Component: MinimalTemplate,
  },
];
