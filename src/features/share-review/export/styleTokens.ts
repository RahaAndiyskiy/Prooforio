import type { CSSProperties } from 'react';
import type { ReviewExportStyleId } from './types';

export type ReviewExportStyleTokens = {
  canvasBackground: string;
  canvasForeground: string;
  cardBackground?: string;
  cardShadow?: string;
  brandColor: string;
  brandLetterSpacing: CSSProperties['letterSpacing'];
  brandOpticalOffsetX?: number;
  brandBlur?: number;
  brandOpacity?: number;
  brandFontSize?: number;
  titleColor: string;
  titleMarginTop: number;
  titleSize: number;
  titleLineHeight: number;
  badgeBackground: string;
  badgeColor: string;
  badgeFontSize: number;
  badgeLetterSpacing: CSSProperties['letterSpacing'];
  ratingBackground: string;
  ratingColor: string;
  ratingBorder?: string;
  quoteColor: string;
  quoteMaxWidth: number;
  footerColor: string;
  footerAccentColor: string;
  footerBorderTop?: string;
  footerMetaColor: string;
};

export const reviewExportStyleTokens: Record<ReviewExportStyleId, ReviewExportStyleTokens> = {
  clean: {
    canvasBackground: '#ffffff',
    canvasForeground: '#0f172a',
    brandColor: '#475569',
    brandLetterSpacing: '0.24em',
    titleColor: '#0f172a',
    titleMarginTop: 28,
    titleSize: 50,
    titleLineHeight: 1.02,
    badgeBackground: '#f1f5f9',
    badgeColor: '#475569',
    badgeFontSize: 14,
    badgeLetterSpacing: '0.18em',
    ratingBackground: '#f8fafc',
    ratingColor: '#0f172a',
    quoteColor: '#334155',
    quoteMaxWidth: 900,
    footerColor: '#64748b',
    footerAccentColor: '#0f172a',
    footerMetaColor: '#64748b',
  },
  bold: {
    canvasBackground: '#0f172a',
    canvasForeground: '#ffffff',
    brandColor: '#94a3b8',
    brandLetterSpacing: '0.35em',
    titleColor: '#ffffff',
    titleMarginTop: 28,
    titleSize: 50,
    titleLineHeight: 1.02,
    badgeBackground: 'rgba(15,23,42,0.8)',
    badgeColor: '#cbd5e1',
    badgeFontSize: 12,
    badgeLetterSpacing: '0.35em',
    ratingBackground: 'rgba(20,184,166,0.1)',
    ratingColor: '#7dd3fc',
    ratingBorder: '1px solid rgba(34,211,238,0.2)',
    quoteColor: '#e2e8f0',
    quoteMaxWidth: 900,
    footerColor: '#94a3b8',
    footerAccentColor: '#ffffff',
    footerBorderTop: '1px solid rgba(148,163,184,0.3)',
    footerMetaColor: '#94a3b8',
  },
  'cream-plum': {
    canvasBackground: '#ffffff',
    canvasForeground: '#381932',
    cardBackground: '#FFF3E6',
    cardShadow: '0 0 24px 16px rgba(0,0,0,0.16)',
    brandColor: '#6f5763',
    brandLetterSpacing: '0.72em',
    brandOpticalOffsetX: 24,
    brandBlur: 10,
    brandOpacity: 0.42,
    brandFontSize: 100,
    titleColor: '#381932',
    titleMarginTop: 0,
    titleSize: 75,
    titleLineHeight: 1,
    badgeBackground: 'transparent',
    badgeColor: '#381932',
    badgeFontSize: 0,
    badgeLetterSpacing: '0',
    ratingBackground: 'transparent',
    ratingColor: '#FF9494',
    quoteColor: '#381932',
    quoteMaxWidth: 760,
    footerColor: '#381932',
    footerAccentColor: '#381932',
    footerMetaColor: '#381932',
  },
  'noise-greige': {
    canvasBackground: '#ffffff',
    canvasForeground: '#1c1c1b',
    cardBackground: '#B7AC9B',
    cardShadow: '40px 50px 4px 0 #1c1c1b',
    brandColor: '#1c1c1b',
    brandLetterSpacing: '0',
    titleColor: '#1c1c1b',
    titleMarginTop: 0,
    titleSize: 75,
    titleLineHeight: 1,
    badgeBackground: 'transparent',
    badgeColor: '#1c1c1b',
    badgeFontSize: 0,
    badgeLetterSpacing: '0',
    ratingBackground: 'transparent',
    ratingColor: '#FFF3E6',
    quoteColor: '#1c1c1b',
    quoteMaxWidth: 760,
    footerColor: '#1c1c1b',
    footerAccentColor: '#1c1c1b',
    footerMetaColor: '#1c1c1b',
  },
  'aqua-frame': {
    canvasBackground: '#ffffff',
    canvasForeground: '#ffffff',
    brandColor: '#ffffff',
    brandLetterSpacing: '0',
    titleColor: '#ffffff',
    titleMarginTop: 0,
    titleSize: 75,
    titleLineHeight: 1,
    badgeBackground: 'transparent',
    badgeColor: '#ffffff',
    badgeFontSize: 0,
    badgeLetterSpacing: '0',
    ratingBackground: 'transparent',
    ratingColor: '#ffffff',
    quoteColor: '#ffffff',
    quoteMaxWidth: 753,
    footerColor: '#ffffff',
    footerAccentColor: '#ffffff',
    footerMetaColor: '#ffffff',
  },
};

export function getReviewExportStyleTokens(styleId: ReviewExportStyleId) {
  return reviewExportStyleTokens[styleId];
}
