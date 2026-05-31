import { TEMPLATE_FORMAT_DIMENSIONS } from '../constants';
import type {
  ReviewExportPresetDefinition,
  ReviewExportTemplateFormat,
  ReviewExportStyleId,
} from '../export/types';

export type PresetFilterValue<T extends string> = 'all' | T;

export type PresetFilterState = {
  format: PresetFilterValue<ReviewExportTemplateFormat>;
  style: PresetFilterValue<ReviewExportStyleId>;
};

export type PresetFilterOption<T extends string> = {
  value: PresetFilterValue<T>;
  label: string;
};

export const defaultPresetFilters: PresetFilterState = {
  format: 'all',
  style: 'all',
};

const presetFormatLabels: Record<ReviewExportTemplateFormat, string> = {
  landscape: 'Горизонтальные',
  square: 'Квадратные',
  story: 'Вертикальные',
};

const presetStyleLabels: Record<ReviewExportStyleId, string> = {
  clean: 'Минимализм',
  bold: 'Контраст',
};

function toHumanLabel(value: string) {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getPresetDimensions(format: ReviewExportTemplateFormat) {
  return TEMPLATE_FORMAT_DIMENSIONS[format];
}

export function getPresetFormatLabel(format: ReviewExportTemplateFormat) {
  return presetFormatLabels[format];
}

export function getPresetStyleLabel(styleId: ReviewExportStyleId) {
  return presetStyleLabels[styleId] ?? toHumanLabel(styleId);
}

export function getPresetFormatOptions(presets: ReviewExportPresetDefinition[]): Array<PresetFilterOption<ReviewExportTemplateFormat>> {
  return [
    { value: 'all', label: 'Все форматы' },
    ...Array.from(new Set(presets.map((preset) => preset.meta.format))).map((format) => ({
      value: format,
      label: getPresetFormatLabel(format),
    })),
  ];
}

export function getPresetStyleOptions(presets: ReviewExportPresetDefinition[]): Array<PresetFilterOption<ReviewExportStyleId>> {
  return [
    { value: 'all', label: 'Все стили' },
    ...Array.from(new Set(presets.map((preset) => preset.meta.styleId))).map((styleId) => ({
      value: styleId,
      label: getPresetStyleLabel(styleId),
    })),
  ];
}

export function filterPresets(
  presets: ReviewExportPresetDefinition[],
  filters: PresetFilterState
) {
  return presets.filter((preset) => {
    const matchesFormat = filters.format === 'all' || preset.meta.format === filters.format;
    const matchesStyle = filters.style === 'all' || preset.meta.styleId === filters.style;

    return matchesFormat && matchesStyle;
  });
}