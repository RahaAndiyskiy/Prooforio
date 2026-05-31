import type { ReviewExportTemplateDefinition } from '../types';
import { DarkTemplate } from './DarkTemplate';
import { MinimalTemplate } from './MinimalTemplate';

export const reviewExportTemplates: ReviewExportTemplateDefinition[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Чистый минималистичный шаблон для отзывов.',
    Component: MinimalTemplate,
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Тёмный стильный шаблон с контрастной карточкой.',
    Component: DarkTemplate,
  },
];
