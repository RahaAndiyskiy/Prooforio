import type { ReviewExportTemplateProps } from '../types';

const frameStyles: React.CSSProperties = {
  width: 1100,
  height: 550,
  borderRadius: 40,
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  boxShadow: '0 35px 80px rgba(15,23,42,0.18)',
  display: 'flex',
  flexDirection: 'column',
  padding: 48,
  boxSizing: 'border-box',
  gap: 32,
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

export function MinimalTemplate({ author, text, rating, createdAt, profileName }: ReviewExportTemplateProps) {
  return (
    <div style={frameStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={badgeStyles}>Prooforio</div>
          <div style={{ marginTop: 24, fontSize: 42, fontWeight: 700, color: '#0f172a', lineHeight: 1.05 }}>{profileName}</div>
        </div>
        <div style={{ borderRadius: 9999, backgroundColor: '#f1f5f9', padding: '14px 22px', fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569' }}>
          отзывы
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 9999, backgroundColor: '#f8fafc', padding: '16px 20px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
        <span>{rating}</span>
        <span>★</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 22, lineHeight: 1.7, color: '#334155' }}>{text}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16, color: '#64748b' }}>
        <span style={{ fontWeight: 700, color: '#0f172a' }}>{author}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}
