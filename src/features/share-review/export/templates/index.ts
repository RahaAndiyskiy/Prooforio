import type { ReviewExportTemplateDefinition } from '../types';
import { DarkTemplate } from './DarkTemplate';
import { MinimalTemplate } from './MinimalTemplate';

const templateDefinitions: ReviewExportTemplateDefinition[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Чистый минималистичный шаблон для отзывов.',
    meta: {
      format: 'landscape',
      category: 'clean',
      tags: ['light', 'minimal', 'universal'],
      featured: true,
      order: 10,
    },
    Component: MinimalTemplate,
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Тёмный стильный шаблон с контрастной карточкой.',
    meta: {
      format: 'landscape',
      category: 'contrast',
      tags: ['dark', 'bold', 'editorial'],
      featured: true,
      order: 20,
    },
    Component: DarkTemplate,
  },
];

// Реестр уже хранит metadata для будущих фильтров, сортировки и группировки, даже если текущий экран пока не использует их явно.
export const reviewExportTemplates = [...templateDefinitions].sort((firstTemplate, secondTemplate) => {
  return firstTemplate.meta.order - secondTemplate.meta.order;
});

export const reviewExportTemplateFormats = Array.from(
  new Set(reviewExportTemplates.map((template) => template.meta.format))
);

export const reviewExportTemplateCategories = Array.from(
  new Set(reviewExportTemplates.map((template) => template.meta.category))
);

export const reviewExportTemplateTags = Array.from(
  new Set(reviewExportTemplates.flatMap((template) => template.meta.tags))
);
