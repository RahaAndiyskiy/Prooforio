import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import type { ReviewExportFormatPreset } from './formatPresets';
import type { ReviewExportStyleTokens } from './styleTokens';
import type { ReviewExportCanvasDimensions } from './types';

const canvasBaseStyles: Omit<CSSProperties, 'width' | 'height'> = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: 56,
  boxSizing: 'border-box',
  gap: 36,
  fontFamily: 'Prooforio Export Sans',
};

type TemplateCanvasProps = PropsWithChildren<{
  tokens: ReviewExportStyleTokens;
  dimensions: ReviewExportCanvasDimensions;
  formatPreset: ReviewExportFormatPreset;
}>;

export function TemplateCanvas({ tokens, dimensions, formatPreset, children }: TemplateCanvasProps) {
  return (
    <div
      style={{
        ...canvasBaseStyles,
        width: dimensions.width,
        height: dimensions.height,
        padding: formatPreset.canvasPadding,
        gap: formatPreset.canvasGap,
        backgroundColor: tokens.canvasBackground,
        color: tokens.canvasForeground,
      }}
    >
      {children}
    </div>
  );
}

type TemplateHeaderProps = {
  brandLabel: string;
  title: string;
  badge: string;
  tokens: ReviewExportStyleTokens;
  formatPreset: ReviewExportFormatPreset;
};

export function TemplateHeader({ brandLabel, title, badge, tokens, formatPreset }: TemplateHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: formatPreset.sectionGap, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            textTransform: 'uppercase',
            letterSpacing: tokens.brandLetterSpacing,
            fontSize: formatPreset.brandFontSize,
            color: tokens.brandColor,
          }}
        >
          {brandLabel}
        </div>
        <div
          style={{
            marginTop: tokens.titleMarginTop,
            fontSize: Math.round(tokens.titleSize * formatPreset.titleScale),
            fontWeight: 700,
            color: tokens.titleColor,
            lineHeight: tokens.titleLineHeight,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          borderRadius: 9999,
          backgroundColor: tokens.badgeBackground,
          padding: `${formatPreset.badgePaddingY}px ${formatPreset.badgePaddingX}px`,
          fontSize: tokens.badgeFontSize,
          fontWeight: 700,
          letterSpacing: tokens.badgeLetterSpacing,
          textTransform: 'uppercase',
          color: tokens.badgeColor,
        }}
      >
        {badge}
      </div>
    </div>
  );
}

type TemplateRatingPillProps = {
  value: string;
  icon: string;
  tokens: ReviewExportStyleTokens;
  formatPreset: ReviewExportFormatPreset;
  trailing?: ReactNode;
};

export function TemplateRatingPill({ value, icon, tokens, formatPreset, trailing }: TemplateRatingPillProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: formatPreset.sectionGap, alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: formatPreset.ratingGap,
          borderRadius: 9999,
          backgroundColor: tokens.ratingBackground,
          padding: `${formatPreset.ratingPaddingY}px ${formatPreset.ratingPaddingX}px`,
          fontSize: formatPreset.ratingFontSize,
          fontWeight: 700,
          color: tokens.ratingColor,
          ...(tokens.ratingBorder ? { border: tokens.ratingBorder } : {}),
        }}
      >
        <span>{value}</span>
        <span>{icon}</span>
      </div>
      {trailing}
    </div>
  );
}

type TemplateQuoteProps = {
  quote: string;
  tokens: ReviewExportStyleTokens;
  formatPreset: ReviewExportFormatPreset;
};

export function TemplateQuote({ quote, tokens, formatPreset }: TemplateQuoteProps) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <p
        style={{
          margin: 0,
          fontSize: formatPreset.quoteFontSize,
          lineHeight: formatPreset.quoteLineHeight,
          color: tokens.quoteColor,
          maxWidth: Math.min(tokens.quoteMaxWidth, formatPreset.quoteMaxWidth),
        }}
      >
        {quote}
      </p>
    </div>
  );
}

type TemplateFooterProps = {
  author: string;
  secondary: string;
  tokens: ReviewExportStyleTokens;
  formatPreset: ReviewExportFormatPreset;
  secondaryColor?: string;
};

export function TemplateFooter({ author, secondary, tokens, formatPreset, secondaryColor }: TemplateFooterProps) {
  return (
    <div
      style={{
        ...(tokens.footerBorderTop ? { borderTop: tokens.footerBorderTop } : {}),
        paddingTop: tokens.footerBorderTop ? formatPreset.footerBorderPaddingTop : 0,
        display: 'flex',
        flexDirection: 'column',
        gap: formatPreset.footerGap,
        fontSize: formatPreset.footerFontSize,
        color: tokens.footerColor,
      }}
    >
      <span style={{ fontWeight: 700, color: tokens.footerAccentColor, fontSize: formatPreset.footerAuthorFontSize }}>
        {author}
      </span>
      <span style={{ color: secondaryColor ?? tokens.footerMetaColor }}>{secondary}</span>
    </div>
  );
}