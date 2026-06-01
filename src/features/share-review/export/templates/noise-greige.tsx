/* eslint-disable @next/next/no-img-element */

import { getReviewExportFontPack } from '../fontPacks';
import type { ReviewExportPresetRenderContext } from '../types';

const NOISE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='%231c1c1b' fill-opacity='0.26'%3E%3Ccircle cx='2' cy='3' r='0.32'/%3E%3Ccircle cx='8' cy='5' r='0.28'/%3E%3Ccircle cx='14' cy='4' r='0.32'/%3E%3Ccircle cx='19' cy='2' r='0.28'/%3E%3Ccircle cx='24' cy='6' r='0.32'/%3E%3Ccircle cx='29' cy='3' r='0.28'/%3E%3Ccircle cx='33' cy='5' r='0.32'/%3E%3Ccircle cx='38' cy='2' r='0.28'/%3E%3Ccircle cx='43' cy='6' r='0.32'/%3E%3Ccircle cx='48' cy='4' r='0.28'/%3E%3Ccircle cx='53' cy='3' r='0.32'/%3E%3Ccircle cx='58' cy='6' r='0.28'/%3E%3Ccircle cx='63' cy='2' r='0.32'/%3E%3Ccircle cx='68' cy='5' r='0.28'/%3E%3Ccircle cx='73' cy='3' r='0.32'/%3E%3Ccircle cx='78' cy='6' r='0.28'/%3E%3Ccircle cx='83' cy='2' r='0.32'/%3E%3Ccircle cx='88' cy='5' r='0.28'/%3E%3Ccircle cx='93' cy='4' r='0.32'/%3E%3C/g%3E%3Cg fill='%231c1c1b' fill-opacity='0.22'%3E%3Ccircle cx='4' cy='14' r='0.28'/%3E%3Ccircle cx='11' cy='16' r='0.32'/%3E%3Ccircle cx='17' cy='12' r='0.28'/%3E%3Ccircle cx='22' cy='15' r='0.32'/%3E%3Ccircle cx='28' cy='13' r='0.28'/%3E%3Ccircle cx='34' cy='16' r='0.32'/%3E%3Ccircle cx='40' cy='12' r='0.28'/%3E%3Ccircle cx='45' cy='15' r='0.32'/%3E%3Ccircle cx='51' cy='13' r='0.28'/%3E%3Ccircle cx='57' cy='16' r='0.32'/%3E%3Ccircle cx='62' cy='12' r='0.28'/%3E%3Ccircle cx='67' cy='15' r='0.32'/%3E%3Ccircle cx='72' cy='13' r='0.28'/%3E%3Ccircle cx='77' cy='16' r='0.32'/%3E%3Ccircle cx='82' cy='12' r='0.28'/%3E%3Ccircle cx='87' cy='15' r='0.32'/%3E%3Ccircle cx='92' cy='13' r='0.28'/%3E%3C/g%3E%3C/svg%3E";

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => index < Math.round(rating));
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

export function NoiseGreigeTemplate({ content, dimensions, preset, review }: ReviewExportPresetRenderContext) {
  const fontPack = getReviewExportFontPack(preset.meta.fontPackId);
  const referenceSize = 1080;
  const scale = Math.min(dimensions.width, dimensions.height) / referenceSize;
  const cardSize = Math.round(800 * scale);
  const avatarSize = Math.round(186 * scale);
  const shadowDx = Math.round(40 * scale);
  const shadowDy = Math.round(50 * scale);
  const shadowBlur = Math.round(4 * scale);

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d9dbde',
      }}
    >
      <div
        style={{
          width: cardSize,
          height: cardSize,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#B7AC9B',
          boxShadow: `${shadowDx}px ${shadowDy}px ${shadowBlur}px 0 #1C1C1B`,
          paddingTop: Math.round(58 * scale),
          paddingLeft: Math.round(64 * scale),
          paddingRight: Math.round(64 * scale),
          paddingBottom: Math.round(52 * scale),
          boxSizing: 'border-box',
        }}
      >
        <img
          src={NOISE_DATA_URI}
          alt=""
          width={cardSize}
          height={cardSize}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.18,
          }}
        />
        <div
          style={{
            width: avatarSize,
            height: avatarSize,
            display: 'flex',
            borderRadius: 9999,
            overflow: 'hidden',
            border: `${Math.max(2, Math.round(3 * scale))}px solid #1C1C1B`,
            backgroundColor: '#FFF3E6',
            marginTop: Math.round(-104 * scale),
            marginBottom: Math.round(26 * scale),
            flexShrink: 0,
          }}
        >
          <img
            src={content.footer.avatarSrc}
            alt=""
            width={avatarSize}
            height={avatarSize}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.84)',
              transformOrigin: 'center',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            color: '#1C1C1B',
            fontFamily: fontPack.displayFamily.family,
            fontWeight: 400,
            fontSize: Math.round(75 * scale),
            lineHeight: 1,
          }}
        >
          {review.author}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: Math.round(36 * scale),
            gap: Math.round(12 * scale),
            color: '#FFF3E6',
            fontSize: Math.round(67 * scale),
            lineHeight: 1,
          }}
        >
          {renderStars(review.rating).map((isFilled, index) => (
            <span
              key={index}
              style={{
                opacity: isFilled ? 1 : 0.24,
              }}
            >
              ★
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: Math.round(60 * scale),
            color: '#1C1C1B',
            fontFamily: fontPack.displayFamily.family,
            fontWeight: 400,
            fontSize: Math.round(50 * scale),
            lineHeight: 1,
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {content.body.quote}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            color: '#1C1C1B',
            fontFamily: fontPack.displayFamily.family,
            fontWeight: 400,
            fontSize: Math.round(40 * scale),
            lineHeight: 1,
          }}
        >
          {formatReviewDate(review.createdAt)}
        </div>
      </div>
    </div>
  );
}
