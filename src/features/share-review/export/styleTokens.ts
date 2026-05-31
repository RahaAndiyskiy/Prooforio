import type { CSSProperties } from 'react';
import type { ReviewExportStyleId } from './types';

export type ReviewExportStyleTokens = {
  canvasBackground: string;
  canvasForeground: string;
  brandColor: string;
  brandLetterSpacing: CSSProperties['letterSpacing'];
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
};

export function getReviewExportStyleTokens(styleId: ReviewExportStyleId) {
  return reviewExportStyleTokens[styleId];
}