import type { ReviewExportLayoutId } from './types';

export type ReviewExportLayoutPreset = {
  ratingTrailing: 'none' | 'date';
  ratingTrailingColor?: string;
  footerSecondaryField: 'date' | 'meta';
  footerSecondaryColor?: string;
};

export const reviewExportLayoutPresets: Record<ReviewExportLayoutId, ReviewExportLayoutPreset> = {
  'hero-top': {
    ratingTrailing: 'none',
    footerSecondaryField: 'date',
  },
  'split-header': {
    ratingTrailing: 'date',
    ratingTrailingColor: '#94a3b8',
    footerSecondaryField: 'meta',
    footerSecondaryColor: '#94a3b8',
  },
  'avatar-spotlight': {
    ratingTrailing: 'none',
    footerSecondaryField: 'meta',
  },
};

export function getReviewExportLayoutPreset(layoutId: ReviewExportLayoutId) {
  return reviewExportLayoutPresets[layoutId];
}