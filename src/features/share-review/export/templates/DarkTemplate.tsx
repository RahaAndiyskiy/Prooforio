import type { ReviewExportTemplateContext } from '../types';
import { EXPORT_HEIGHT, EXPORT_WIDTH } from '../../constants';

const frameStyles: React.CSSProperties = {
  width: EXPORT_WIDTH,
  height: EXPORT_HEIGHT,
  backgroundColor: '#0f172a',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: 56,
  boxSizing: 'border-box',
  gap: 36,
  fontFamily: 'Prooforio Export Sans',
  color: '#ffffff',
};

export function DarkTemplate({ content }: ReviewExportTemplateContext) {
  return (
    <div style={frameStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: 12, color: '#94a3b8' }}>{content.brand.label}</div>
          <div style={{ marginTop: 28, fontSize: 50, fontWeight: 700, color: '#ffffff', lineHeight: 1.02 }}>{content.header.title}</div>
        </div>
        <div style={{ borderRadius: 9999, backgroundColor: 'rgba(15,23,42,0.8)', padding: '14px 22px', fontSize: 12, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#cbd5e1' }}>
          {content.header.badge}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 9999, backgroundColor: 'rgba(20,184,166,0.1)', padding: '18px 22px', fontSize: 20, fontWeight: 700, color: '#7dd3fc', border: '1px solid rgba(34,211,238,0.2)' }}>
          <span>{content.rating.value}</span>
          <span>{content.rating.icon}</span>
        </div>
        <span style={{ fontSize: 18, color: '#94a3b8' }}>{content.footer.date}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 34, lineHeight: 1.45, color: '#e2e8f0', maxWidth: 900 }}>{content.body.quote}</p>
      </div>

      <div style={{ borderTop: '1px solid rgba(148,163,184,0.3)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 18, color: '#94a3b8' }}>
        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: 22 }}>{content.footer.author}</span>
        <span>{content.footer.meta}</span>
      </div>
    </div>
  );
}
