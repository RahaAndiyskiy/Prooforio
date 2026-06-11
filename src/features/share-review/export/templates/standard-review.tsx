/* eslint-disable @next/next/no-img-element */

import { getReviewExportFontPack } from '../fontPacks';
import type { ReviewExportPresetRenderContext, ReviewExportTemplateFormat } from '../types';

type StandardPalette = {
  background: string;
  glow: string;
  panel: string;
  panelBorder: string;
  eyebrow: string;
  title: string;
  quote: string;
  muted: string;
  star: string;
  avatarBackground: string;
  divider: string;
  brand: string;
};

const standardPalettes: Record<'clean' | 'bold', StandardPalette> = {
  clean: {
    background: '#F8FAFC',
    glow: '#E6F4FF',
    panel: '#FFFFFF',
    panelBorder: 'rgba(15, 23, 42, 0.08)',
    eyebrow: '#64748B',
    title: '#111827',
    quote: '#1F2937',
    muted: '#64748B',
    star: '#F7B731',
    avatarBackground: '#EEF2F7',
    divider: 'rgba(15, 23, 42, 0.08)',
    brand: '#CBD5E1',
  },
  bold: {
    background: '#07111F',
    glow: '#102E4E',
    panel: '#101C2D',
    panelBorder: 'rgba(226, 232, 240, 0.10)',
    eyebrow: '#6FA7C8',
    title: '#FFFFFF',
    quote: '#E5EEF8',
    muted: '#7A91A8',
    star: '#3FA7FF',
    avatarBackground: '#17283C',
    divider: 'rgba(226, 232, 240, 0.10)',
    brand: 'rgba(255, 255, 255, 0.10)',
  },
};

const formatSettings: Record<
  ReviewExportTemplateFormat,
  {
    outerPadding: number;
    panelPadding: number;
    quoteSize: number;
    quoteLineHeight: number;
    titleSize: number;
    avatarSize: number;
    starSize: number;
    brandSize: number;
  }
> = {
  landscape: {
    outerPadding: 48,
    panelPadding: 46,
    quoteSize: 33,
    quoteLineHeight: 1.28,
    titleSize: 34,
    avatarSize: 74,
    starSize: 30,
    brandSize: 54,
  },
  square: {
    outerPadding: 42,
    panelPadding: 38,
    quoteSize: 32,
    quoteLineHeight: 1.24,
    titleSize: 34,
    avatarSize: 72,
    starSize: 30,
    brandSize: 48,
  },
  story: {
    outerPadding: 54,
    panelPadding: 46,
    quoteSize: 40,
    quoteLineHeight: 1.22,
    titleSize: 42,
    avatarSize: 84,
    starSize: 36,
    brandSize: 70,
  },
};

function formatReviewDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function getQuoteMaxWidth(format: ReviewExportTemplateFormat) {
  if (format === 'landscape') {
    return 820;
  }

  if (format === 'story') {
    return 850;
  }

  return 760;
}

export function StandardReviewTemplate({ content, dimensions, preset }: ReviewExportPresetRenderContext) {
  const styleId = preset.meta.styleId === 'bold' ? 'bold' : 'clean';
  const palette = standardPalettes[styleId];
  const settings = formatSettings[preset.meta.format];
  const fontPack = getReviewExportFontPack(preset.meta.fontPackId);
  const isStory = preset.meta.format === 'story';
  const rating = Math.max(1, Math.min(5, Number(content.rating.value) || 5));
  const panelRadius = isStory ? 56 : 42;

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        padding: settings.outerPadding,
        background: palette.background,
        color: palette.title,
        fontFamily: fontPack.bodyFamily.family,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: panelRadius,
          border: `1px solid ${palette.panelBorder}`,
          background: palette.panel,
          boxShadow:
            styleId === 'bold'
              ? '0 24px 52px rgba(0,0,0,0.26)'
              : '0 28px 70px rgba(15,23,42,0.11)',
          padding: settings.panelPadding,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 26 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                color: palette.eyebrow,
                fontSize: isStory ? 18 : 15,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Отзыв клиента
            </div>
            <div
              style={{
                color: palette.title,
                fontFamily: fontPack.displayFamily.family,
                fontSize: settings.titleSize,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {content.header.title}
            </div>
          </div>
          <div
            style={{
              borderRadius: 9999,
              color: palette.muted,
              border: `1px solid ${palette.panelBorder}`,
              padding: isStory ? '13px 18px' : '11px 16px',
              fontSize: isStory ? 18 : 15,
              fontWeight: 700,
            }}
          >
            {formatReviewDate(content.footer.date)}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: isStory ? 34 : 26,
            paddingTop: isStory ? 58 : 34,
            paddingBottom: isStory ? 54 : 34,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(settings.starSize * 0.28) }}>
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                style={{
                  width: Math.round(settings.starSize * 0.58),
                  height: Math.round(settings.starSize * 0.58),
                  borderRadius: 9999,
                  background: index < rating ? palette.star : palette.divider,
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: '100%',
              maxWidth: getQuoteMaxWidth(preset.meta.format),
              color: palette.quote,
              fontFamily: fontPack.bodyFamily.family,
              fontSize: settings.quoteSize,
              fontWeight: 700,
              lineHeight: settings.quoteLineHeight,
              letterSpacing: '-0.01em',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {content.body.quote}
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${palette.divider}`,
            paddingTop: isStory ? 30 : 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img
              src={content.footer.avatarSrc}
              alt=""
              width={settings.avatarSize}
              height={settings.avatarSize}
              style={{
                width: settings.avatarSize,
                height: settings.avatarSize,
                borderRadius: 9999,
                objectFit: 'cover',
                background: palette.avatarBackground,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ color: palette.title, fontSize: isStory ? 25 : 21, fontWeight: 800 }}>
                {content.footer.author}
              </div>
              <div style={{ color: palette.muted, fontSize: isStory ? 18 : 15, fontWeight: 600 }}>
                {content.footer.meta}
              </div>
            </div>
          </div>
          <div
            style={{
              color: palette.muted,
              fontSize: isStory ? 17 : 14,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {content.brand.label}
          </div>
        </div>
      </div>
    </div>
  );
}
