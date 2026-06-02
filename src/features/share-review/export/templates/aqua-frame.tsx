/* eslint-disable @next/next/no-img-element */

import { getReviewExportFontPack } from '../fontPacks';
import type { ReviewExportPresetRenderContext } from '../types';

const BACKGROUND_SRC = '/templates/frame-7.png';
const REFERENCE_SIZE = 1400;

function scaleValue(value: number, scale: number) {
  return Math.round(value * scale);
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => index < Math.round(rating));
}

function getAdaptiveQuoteTypography(quote: string, scale: number) {
  const length = quote.trim().length;

  if (length <= 70) {
    return { fontSize: scaleValue(64, scale), lineHeight: 1.08 };
  }

  if (length <= 130) {
    return { fontSize: scaleValue(54, scale), lineHeight: 1.1 };
  }

  if (length <= 220) {
    return { fontSize: scaleValue(44, scale), lineHeight: 1.12 };
  }

  if (length <= 340) {
    return { fontSize: scaleValue(34, scale), lineHeight: 1.16 };
  }

  if (length <= 520) {
    return { fontSize: scaleValue(27, scale), lineHeight: 1.2 };
  }

  return { fontSize: scaleValue(22, scale), lineHeight: 1.22 };
}

function getAdaptiveNameSize(name: string, scale: number) {
  if (name.length <= 12) {
    return scaleValue(76, scale);
  }

  if (name.length <= 20) {
    return scaleValue(62, scale);
  }

  return scaleValue(50, scale);
}

function formatReviewDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function AquaFrameTemplate({ content, dimensions, preset, review, resolvePublicAssetSrc }: ReviewExportPresetRenderContext) {
  const fontPack = getReviewExportFontPack(preset.meta.fontPackId);
  const scale = Math.min(dimensions.width, dimensions.height) / REFERENCE_SIZE;
  const backgroundSrc = resolvePublicAssetSrc ? resolvePublicAssetSrc(BACKGROUND_SRC) : BACKGROUND_SRC;
  const quoteTypography = getAdaptiveQuoteTypography(content.body.quote, scale);
  const nameFontSize = getAdaptiveNameSize(review.author, scale);
  const starSize = scaleValue(42, scale);

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <img
        src={backgroundSrc}
        alt=""
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          left: scaleValue(343, scale),
          top: scaleValue(318, scale),
          width: scaleValue(163, scale),
          height: scaleValue(163, scale),
          borderRadius: scaleValue(28, scale),
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <img
          src={content.footer.avatarSrc}
          alt=""
          width={scaleValue(163, scale)}
          height={scaleValue(163, scale)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          left: scaleValue(563, scale),
          top: scaleValue(315, scale),
          width: scaleValue(521, scale),
          height: scaleValue(85, scale),
          alignItems: 'center',
          color: '#ffffff',
          fontFamily: fontPack.displayFamily.family,
          fontSize: nameFontSize,
          fontWeight: 400,
          lineHeight: 1,
          textShadow: `0 0 ${scaleValue(16, scale)}px rgba(0,0,0,0.28)`,
        }}
      >
        {review.author}
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          left: scaleValue(563, scale),
          top: scaleValue(427, scale),
          width: scaleValue(233, scale),
          height: scaleValue(46, scale),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {renderStars(review.rating).map((isFilled, index) => (
          <svg
            key={index}
            width={starSize}
            height={starSize}
            viewBox="0 0 48 48"
            style={{
              display: 'flex',
              opacity: isFilled ? 1 : 0.28,
            }}
          >
            <path
              d="M24 4.6 30.1 17.1 43.8 19.1 33.9 28.7 36.2 42.4 24 35.9 11.8 42.4 14.1 28.7 4.2 19.1 17.9 17.1Z"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          left: scaleValue(324, scale),
          top: scaleValue(555, scale),
          width: scaleValue(753, scale),
          height: scaleValue(468, scale),
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: fontPack.displayFamily.family,
          fontSize: quoteTypography.fontSize,
          fontWeight: 400,
          lineHeight: quoteTypography.lineHeight,
          textAlign: 'center',
          textShadow: `0 0 ${scaleValue(16, scale)}px rgba(0,0,0,0.28)`,
          overflow: 'hidden',
        }}
      >
        {content.body.quote}
      </div>

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          left: scaleValue(931, scale),
          top: scaleValue(1061, scale),
          width: scaleValue(109, scale),
          height: scaleValue(32, scale),
          alignItems: 'center',
          color: '#ffffff',
          fontFamily: fontPack.displayFamily.family,
          fontSize: scaleValue(28, scale),
          fontWeight: 400,
          lineHeight: 1,
          textShadow: `0 0 ${scaleValue(16, scale)}px rgba(0,0,0,0.28)`,
        }}
      >
        {formatReviewDate(review.createdAt)}
      </div>
    </div>
  );
}

