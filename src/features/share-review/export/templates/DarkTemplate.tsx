import type { ReviewExportTemplateProps } from '../types';

const frameStyles: React.CSSProperties = {
  width: 1100,
  height: 550,
  borderRadius: 40,
  backgroundColor: '#0f172a',
  overflow: 'hidden',
  boxShadow: '0 35px 80px rgba(15,23,42,0.45)',
  display: 'flex',
  flexDirection: 'column',
  padding: 48,
  boxSizing: 'border-box',
  gap: 32,
  fontFamily: 'Prooforio Export Sans',
  color: '#ffffff',
};

export function DarkTemplate({ author, text, rating, createdAt, profileName }: ReviewExportTemplateProps) {
  return (
    <div style={frameStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: 12, color: '#94a3b8' }}>prooforio</div>
          <div style={{ marginTop: 24, fontSize: 42, fontWeight: 700, color: '#ffffff', lineHeight: 1.05 }}>{profileName}</div>
        </div>
        <div style={{ borderRadius: 9999, backgroundColor: 'rgba(15,23,42,0.8)', padding: '14px 22px', fontSize: 12, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#cbd5e1' }}>
          отзыв
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 9999, backgroundColor: 'rgba(20,184,166,0.1)', padding: '16px 20px', fontSize: 18, fontWeight: 700, color: '#7dd3fc', border: '1px solid rgba(34,211,238,0.2)' }}>
          <span>{rating}</span>
          <span>★</span>
        </div>
        <span style={{ fontSize: 16, color: '#94a3b8' }}>{createdAt}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 22, lineHeight: 1.7, color: '#e2e8f0' }}>{text}</p>
      </div>

      <div style={{ borderTop: '1px solid rgba(148,163,184,0.3)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16, color: '#94a3b8' }}>
        <span style={{ fontWeight: 700, color: '#ffffff' }}>{author}</span>
        <span>Клиент Prooforio</span>
      </div>
    </div>
  );
}
