/* eslint-disable @next/next/no-img-element */

import { getReviewExportFontPack } from '../fontPacks';
import { getReviewExportStyleTokens } from '../styleTokens';
import type { ReviewExportPresetRenderContext } from '../types';

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => index < Math.round(rating));
}

export function AvatarSpotlightTemplate({ content, dimensions, preset, review }: ReviewExportPresetRenderContext) {
  const tokens = getReviewExportStyleTokens(preset.meta.styleId);
  const fontPack = getReviewExportFontPack(preset.meta.fontPackId);
  const isSquareFormat = Math.abs(dimensions.width - dimensions.height) < 4;
  const referenceWidth = isSquareFormat ? 1080 : 1200;
  const referenceHeight = isSquareFormat ? 1080 : 630;
  const scale = Math.min(dimensions.width / referenceWidth, dimensions.height / referenceHeight);
  const isTallFormat = dimensions.height / dimensions.width > 1.2;
  const isStackedLayout = isTallFormat || isSquareFormat;
  const canvasInsetX = Math.round(20 * scale);
  const canvasInsetY = Math.round(15 * scale);
  const cardRadius = Math.round(43 * scale);
  const avatarSize = Math.round((isTallFormat ? 180 : isSquareFormat ? 250 : 216) * scale);
  const avatarColumnWidth = isStackedLayout ? '100%' : avatarSize;
  const contentGap = Math.round((isTallFormat ? 24 : isSquareFormat ? 28 : 34) * scale);
  const nameSize = Math.round(tokens.titleSize * scale);
  const quoteSize = Math.round((isSquareFormat ? 46 : 40) * scale);
  const starFontSize = Math.round((isSquareFormat ? 82 : 58) * scale);
  const starBlockMarginTop = Math.round((isSquareFormat ? 12 : 0) * scale);
  const watermarkFontSize = Math.round((tokens.brandFontSize ?? 100) * scale * (isSquareFormat ? 0.96 : 1));
  const watermarkInset = Math.round((isSquareFormat ? 10 : isTallFormat ? 28 : 80) * scale);
  const watermarkBottomOffset = Math.round((isSquareFormat ? 28 : 18) * scale);
  const watermarkLetterSpacing = '0.5em';
  const watermarkOpticalOffset = Math.round((tokens.brandOpticalOffsetX ?? 0) * scale * (isSquareFormat ? 1.3 : 1));
  const cardPadding = isTallFormat
    ? `${Math.round(42 * scale)}px ${Math.round(36 * scale)}px ${Math.round(80 * scale)}px`
    : isSquareFormat
      ? `${Math.round(76 * scale)}px ${Math.round(74 * scale)}px ${Math.round(118 * scale)}px`
    : `${Math.round(34 * scale)}px ${Math.round(36 * scale)}px ${Math.round(72 * scale)}px`;

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        display: 'flex',
        backgroundColor: tokens.canvasBackground,
        padding: `${canvasInsetY}px ${canvasInsetX}px`,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isStackedLayout ? 'column' : 'row',
          alignItems: isSquareFormat ? 'center' : isTallFormat ? 'flex-start' : 'center',
          justifyContent: isSquareFormat ? 'center' : 'flex-start',
          gap: `${Math.round((isTallFormat ? 28 : isSquareFormat ? 36 : 44) * scale)}px`,
          padding: cardPadding,
          borderRadius: cardRadius,
          backgroundColor: tokens.cardBackground ?? '#FFF3E6',
          boxShadow: tokens.cardShadow,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: avatarColumnWidth,
            display: 'flex',
            justifyContent: isStackedLayout ? 'center' : 'flex-start',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              position: 'relative',
              display: 'flex',
              borderRadius: 9999,
              overflow: 'hidden',
              backgroundColor: '#F6E5DB',
              boxShadow: 'inset 0 0 0 1px rgba(56,25,50,0.08)',
            }}
          >
            <img
              src={content.footer.avatarSrc}
              alt=""
              width={avatarSize}
              height={avatarSize}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '145%',
                height: '145%',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            minWidth: 0,
            flexDirection: 'column',
            justifyContent: isSquareFormat ? 'flex-start' : isTallFormat ? 'flex-start' : 'center',
            alignItems: isSquareFormat ? 'center' : 'flex-start',
            gap: `${contentGap}px`,
            paddingTop: isTallFormat ? `${Math.round(8 * scale)}px` : 0,
            textAlign: isSquareFormat ? 'center' : 'left',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: fontPack.displayFamily.family,
              fontWeight: 400,
              fontSize: nameSize,
              color: tokens.titleColor,
              lineHeight: 1,
            }}
          >
            {review.author}
          </div>

          <div
            style={{
              display: 'flex',
              maxWidth: isTallFormat
                ? '100%'
                : isSquareFormat
                  ? `${Math.min(tokens.quoteMaxWidth, 520) * scale}px`
                  : `${Math.min(tokens.quoteMaxWidth, 680) * scale}px`,
              fontFamily: fontPack.bodyFamily.family,
              fontWeight: 400,
              fontSize: quoteSize,
              color: tokens.quoteColor,
              lineHeight: 1.18,
            }}
          >
            {content.body.quote}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isSquareFormat ? 'center' : 'flex-start',
              gap: `${Math.round(10 * scale)}px`,
              marginTop: `${starBlockMarginTop}px`,
              color: tokens.ratingColor,
              fontSize: starFontSize,
              lineHeight: 1,
            }}
          >
            {renderStars(review.rating).map((isFilled, index) => (
              <span key={index} style={{ opacity: isFilled ? 1 : 0.24 }}>
                ★
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: watermarkInset,
            right: watermarkInset,
            bottom: watermarkBottomOffset,
            display: 'flex',
            justifyContent: 'center',
            fontFamily: fontPack.bodyFamily.family,
            fontWeight: 600,
            fontSize: watermarkFontSize,
            letterSpacing: watermarkLetterSpacing,
            color: tokens.brandColor,
            opacity: tokens.brandOpacity ?? 0.4,
            filter: `blur(${tokens.brandBlur ?? 0}px)`,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              display: 'block',
              marginLeft: `${watermarkOpticalOffset}px`,
            }}
          >
            {content.brand.label.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}