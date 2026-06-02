import type { ReviewExportPresetDefinition, ReviewExportPresetRenderer } from '../types';
import { BaseReviewTemplate } from './BaseReviewTemplate';

const presetDefinitions: ReviewExportPresetDefinition[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Чистый минималистичный шаблон для отзывов.',
    meta: {
      format: 'landscape',
      styleId: 'clean',
      layoutId: 'hero-top',
      fontPackId: 'clean-sans',
      tags: ['light', 'minimal', 'universal'],
      featured: true,
      order: 10,
    },
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Тёмный стильный шаблон с контрастной карточкой.',
    meta: {
      format: 'landscape',
      styleId: 'bold',
      layoutId: 'split-header',
      fontPackId: 'clean-sans',
      tags: ['dark', 'bold', 'editorial'],
      featured: true,
      order: 20,
    },
  },
  {
    id: 'cream-plum',
    label: 'Кремовая Слива',
    description: 'Кремовая карточка с крупным аватаром, сливовой типографикой и мягким брендингом внизу.',
    meta: {
      format: 'landscape',
      styleId: 'cream-plum',
      layoutId: 'avatar-spotlight',
      fontPackId: 'clean-sans',
      tags: ['light', 'editorial', 'avatar', 'soft'],
      featured: true,
      order: 25,
    },
  },
  {
    id: 'cream-plum-square',
    label: 'Кремовая Слива Square',
    description: 'Квадратная версия кремовой карточки с крупным аватаром и мягким брендингом.',
    meta: {
      format: 'square',
      styleId: 'cream-plum',
      layoutId: 'avatar-spotlight',
      fontPackId: 'clean-sans',
      tags: ['light', 'editorial', 'avatar', 'soft', 'square', 'social'],
      featured: false,
      order: 26,
    },
  },
  {
    id: 'noise-greige',
    label: 'Noise Greige',
    description: 'Квадратная карточка в стиле Figma: крупный аватар, засечная типографика и контрастная тень.',
    meta: {
      format: 'square',
      styleId: 'noise-greige',
      layoutId: 'avatar-spotlight',
      fontPackId: 'playfair-display',
      tags: ['light', 'editorial', 'avatar', 'square', 'figma'],
      featured: true,
      order: 27,
    },
  },
  {
    id: 'aqua-frame',
    label: 'Aqua Frame',
    description: 'Square PNG-background experiment with positioned review content.',
    meta: {
      format: 'square',
      styleId: 'aqua-frame',
      layoutId: 'avatar-spotlight',
      fontPackId: 'clean-sans',
      tags: ['light', 'png-background', 'square', 'experiment'],
      featured: true,
      order: 28,
    },
  },
  {
    id: 'minimal-square',
    label: 'Minimal Square',
    description: 'Квадратный минималистичный шаблон для соцсетей и карточек.',
    meta: {
      format: 'square',
      styleId: 'clean',
      layoutId: 'hero-top',
      fontPackId: 'editorial-serif',
      tags: ['light', 'minimal', 'square', 'social'],
      featured: false,
      order: 30,
    },
  },
  {
    id: 'dark-story',
    label: 'Dark Story',
    description: 'Вертикальный контрастный шаблон для stories и полноэкранных публикаций.',
    meta: {
      format: 'story',
      styleId: 'bold',
      layoutId: 'split-header',
      fontPackId: 'neutral-sans',
      tags: ['dark', 'bold', 'story', 'social'],
      featured: false,
      order: 40,
    },
  },
];

export const reviewExportPresetRenderer: ReviewExportPresetRenderer = BaseReviewTemplate;

// Реестр уже хранит metadata для будущих фильтров, сортировки и группировки, даже если текущий экран пока не использует их явно.
export const reviewExportPresets = [...presetDefinitions].sort((firstPreset, secondPreset) => {
  return firstPreset.meta.order - secondPreset.meta.order;
});

export function getReviewExportPresetById(presetId?: string) {
  return reviewExportPresets.find((preset) => preset.id === presetId) ?? reviewExportPresets[0];
}

export const reviewExportPresetFormats = Array.from(
  new Set(reviewExportPresets.map((preset) => preset.meta.format))
);

export const reviewExportPresetStyles = Array.from(
  new Set(reviewExportPresets.map((preset) => preset.meta.styleId))
);

export const reviewExportPresetTags = Array.from(
  new Set(reviewExportPresets.flatMap((preset) => preset.meta.tags))
);
