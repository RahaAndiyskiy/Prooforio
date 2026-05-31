import { TEMPLATE_FORMAT_DIMENSIONS } from '../constants';
import type {
  ReviewExportTemplateDefinition,
  ReviewExportTemplateFormat,
} from '../export/types';

export type TemplateFilterValue<T extends string> = 'all' | T;

export type TemplateFilterState = {
  format: TemplateFilterValue<ReviewExportTemplateFormat>;
  category: TemplateFilterValue<string>;
};

export type TemplateFilterOption<T extends string> = {
  value: TemplateFilterValue<T>;
  label: string;
};

export const defaultTemplateFilters: TemplateFilterState = {
  format: 'all',
  category: 'all',
};

const templateFormatLabels: Record<ReviewExportTemplateFormat, string> = {
  landscape: 'Горизонтальные',
  square: 'Квадратные',
  story: 'Stories',
};

const templateCategoryLabels: Record<string, string> = {
  clean: 'Чистые',
  contrast: 'Контрастные',
};

function toHumanLabel(value: string) {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getTemplateDimensions(format: ReviewExportTemplateFormat) {
  return TEMPLATE_FORMAT_DIMENSIONS[format];
}

export function getTemplateFormatLabel(format: ReviewExportTemplateFormat) {
  return templateFormatLabels[format];
}

export function getTemplateCategoryLabel(category: string) {
  return templateCategoryLabels[category] ?? toHumanLabel(category);
}

export function getTemplateFormatOptions(templates: ReviewExportTemplateDefinition[]): Array<TemplateFilterOption<ReviewExportTemplateFormat>> {
  return [
    { value: 'all', label: 'Все форматы' },
    ...Array.from(new Set(templates.map((template) => template.meta.format))).map((format) => ({
      value: format,
      label: getTemplateFormatLabel(format),
    })),
  ];
}

export function getTemplateCategoryOptions(templates: ReviewExportTemplateDefinition[]): Array<TemplateFilterOption<string>> {
  return [
    { value: 'all', label: 'Все стили' },
    ...Array.from(new Set(templates.map((template) => template.meta.category))).map((category) => ({
      value: category,
      label: getTemplateCategoryLabel(category),
    })),
  ];
}

export function filterTemplates(
  templates: ReviewExportTemplateDefinition[],
  filters: TemplateFilterState
) {
  return templates.filter((template) => {
    const matchesFormat = filters.format === 'all' || template.meta.format === filters.format;
    const matchesCategory = filters.category === 'all' || template.meta.category === filters.category;

    return matchesFormat && matchesCategory;
  });
}