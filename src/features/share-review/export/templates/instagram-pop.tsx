/* eslint-disable @next/next/no-img-element */

import { getReviewExportFontPack } from '../fontPacks';
import type { ReviewExportPresetRenderContext } from '../types';

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

function getRating(value: string) {
  return Math.max(1, Math.min(5, Number(value) || 5));
}

export function InstagramPopTemplate({ content, dimensions, preset }: ReviewExportPresetRenderContext) {
  const fontPack = getReviewExportFontPack(preset.meta.fontPackId);
  const rating = getRating(content.rating.value);

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: 44,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 44%, #2B86C5 100%)',
        fontFamily: fontPack.bodyFamily.family,
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 52,
          border: '1px solid rgba(255,255,255,0.30)',
          background: 'rgba(255,255,255,0.16)',
          boxShadow: '0 28px 72px rgba(58, 12, 84, 0.26)',
          padding: 42,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.74)',
              }}
            >
              Отзыв клиента
            </div>
            <div
              style={{
                fontSize: 92,
                lineHeight: 0.92,
                fontWeight: 900,
                letterSpacing: '-0.055em',
                color: '#FFFFFF',
              }}
            >
              {content.footer.author}
            </div>
          </div>

          <div
            style={{
              borderRadius: 9999,
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.28)',
              color: 'rgba(255,255,255,0.86)',
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            {formatReviewDate(content.footer.date)}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 34 }}>
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              width={52}
              height={52}
              viewBox="0 0 48 48"
              style={{
                display: 'flex',
                opacity: index < rating ? 1 : 0.28,
              }}
            >
              <path
                d="M24 4.6 30.1 17.1 43.8 19.1 33.9 28.7 36.2 42.4 24 35.9 11.8 42.4 14.1 28.7 4.2 19.1 17.9 17.1Z"
                fill={index < rating ? '#FFE45E' : '#FFFFFF'}
                stroke={index < rating ? '#FFF2A3' : '#FFFFFF'}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingTop: 34,
            paddingBottom: 34,
          }}
        >
          <div
            style={{
              width: '100%',
              color: '#FFFFFF',
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              textShadow: '0 4px 18px rgba(28, 8, 51, 0.22)',
            }}
          >
            {content.body.quote}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            paddingTop: 26,
            borderTop: '1px solid rgba(255,255,255,0.24)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img
              src={content.footer.avatarSrc}
              alt=""
              width={72}
              height={72}
              style={{
                width: 72,
                height: 72,
                borderRadius: 9999,
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.72)',
                background: '#FFFFFF',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 23, fontWeight: 900, color: '#FFFFFF' }}>{content.header.title}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.72)' }}>
                {content.brand.label}
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 9999,
              padding: '13px 18px',
              background: '#FFFFFF',
              color: '#7C2CE4',
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            share
          </div>
        </div>
      </div>
    </div>
  );
}
