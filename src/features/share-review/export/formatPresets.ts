import type { ReviewExportTemplateFormat } from './types';

export type ReviewExportFormatPreset = {
  canvasPadding: number;
  canvasGap: number;
  sectionGap: number;
  brandFontSize: number;
  titleScale: number;
  badgePaddingY: number;
  badgePaddingX: number;
  ratingGap: number;
  ratingPaddingY: number;
  ratingPaddingX: number;
  ratingFontSize: number;
  quoteFontSize: number;
  quoteLineHeight: number;
  quoteMaxWidth: number;
  footerBorderPaddingTop: number;
  footerGap: number;
  footerFontSize: number;
  footerAuthorFontSize: number;
  trailingFontSize: number;
};

export const reviewExportFormatPresets: Record<ReviewExportTemplateFormat, ReviewExportFormatPreset> = {
  landscape: {
    canvasPadding: 56,
    canvasGap: 36,
    sectionGap: 24,
    brandFontSize: 12,
    titleScale: 1,
    badgePaddingY: 14,
    badgePaddingX: 22,
    ratingGap: 14,
    ratingPaddingY: 18,
    ratingPaddingX: 22,
    ratingFontSize: 20,
    quoteFontSize: 34,
    quoteLineHeight: 1.45,
    quoteMaxWidth: 900,
    footerBorderPaddingTop: 24,
    footerGap: 10,
    footerFontSize: 18,
    footerAuthorFontSize: 22,
    trailingFontSize: 18,
  },
  square: {
    canvasPadding: 48,
    canvasGap: 28,
    sectionGap: 18,
    brandFontSize: 11,
    titleScale: 0.88,
    badgePaddingY: 12,
    badgePaddingX: 18,
    ratingGap: 12,
    ratingPaddingY: 14,
    ratingPaddingX: 18,
    ratingFontSize: 18,
    quoteFontSize: 30,
    quoteLineHeight: 1.4,
    quoteMaxWidth: 780,
    footerBorderPaddingTop: 20,
    footerGap: 8,
    footerFontSize: 16,
    footerAuthorFontSize: 20,
    trailingFontSize: 16,
  },
  story: {
    canvasPadding: 64,
    canvasGap: 42,
    sectionGap: 24,
    brandFontSize: 13,
    titleScale: 1.06,
    badgePaddingY: 16,
    badgePaddingX: 24,
    ratingGap: 14,
    ratingPaddingY: 18,
    ratingPaddingX: 22,
    ratingFontSize: 20,
    quoteFontSize: 40,
    quoteLineHeight: 1.48,
    quoteMaxWidth: 860,
    footerBorderPaddingTop: 28,
    footerGap: 12,
    footerFontSize: 20,
    footerAuthorFontSize: 24,
    trailingFontSize: 18,
  },
};

export function getReviewExportFormatPreset(format: ReviewExportTemplateFormat) {
  return reviewExportFormatPresets[format];
}