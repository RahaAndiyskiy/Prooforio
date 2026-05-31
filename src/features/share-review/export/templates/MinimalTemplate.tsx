import type { ReviewExportTemplateContext } from '../types';
import { EXPORT_HEIGHT, EXPORT_WIDTH } from '../../constants';

const frameStyles: React.CSSProperties = {
  width: EXPORT_WIDTH,
  height: EXPORT_HEIGHT,
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: 56,
  boxSizing: 'border-box',
  gap: 36,
  fontFamily: 'Prooforio Export Sans',
};

const badgeStyles: React.CSSProperties = {
  borderRadius: 9999,
  backgroundColor: '#f8fafc',
  padding: '12px 20px',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: '#475569',
};

export function MinimalTemplate({ content }: ReviewExportTemplateContext) {
  return (
    <div style={frameStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={badgeStyles}>{content.brand.label}</div>
          <div style={{ marginTop: 28, fontSize: 50, fontWeight: 700, color: '#0f172a', lineHeight: 1.02 }}>{content.header.title}</div>
        </div>
        <div style={{ borderRadius: 9999, backgroundColor: '#f1f5f9', padding: '14px 22px', fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569' }}>
          {content.header.badge}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 9999, backgroundColor: '#f8fafc', padding: '18px 22px', fontSize: 20, fontWeight: 700, color: '#0f172a' }}>
        <span>{content.rating.value}</span>
        <span>{content.rating.icon}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 34, lineHeight: 1.45, color: '#334155', maxWidth: 900 }}>{content.body.quote}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 18, color: '#64748b' }}>
        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: 22 }}>{content.footer.author}</span>
        <span>{content.footer.date}</span>
      </div>
    </div>
  );
}
