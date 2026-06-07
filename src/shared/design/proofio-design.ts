export const proofioThemeTokens = {
  bg: 'var(--pf-bg)',
  surface: 'var(--pf-surface)',
  surfaceSoft: 'var(--pf-surface-soft)',
  surfaceStrong: 'var(--pf-surface-strong)',
  control: 'var(--pf-control)',
  controlSoft: 'var(--pf-control-soft)',
  text: 'var(--pf-text)',
  textMuted: 'var(--pf-text-muted)',
  textSoft: 'var(--pf-text-soft)',
  accent: 'var(--pf-accent)',
  accentPressed: 'var(--pf-accent-pressed)',
  accentSoft: 'var(--pf-accent-soft)',
  borderSoft: 'var(--pf-border-soft)',
  borderStrong: 'var(--pf-border-strong)',
} as const;

export const proofioUi = {
  layout: {
    appShell: 'mx-auto min-h-screen max-w-[390px] bg-background px-3 text-primary',
    appShellPrivate: 'pb-24',
    appShellPublic: 'pb-8',
    pageStack: 'space-y-3.5',
    stickyHeader:
      'pf-sticky-header sticky top-0 z-40 -mx-3 flex items-center justify-between px-3 pb-0 pt-10',
  },
  surface: {
    card: 'rounded-[20px] border border-[var(--pf-border-strong)] bg-surface p-5 shadow-card',
    compactCard: 'rounded-[16px] bg-surface shadow-soft',
    glassMenu:
      'overflow-hidden rounded-[18px] border border-[var(--pf-border-strong)] bg-surface/88 p-1.5 text-[13px] text-primary shadow-card backdrop-blur-xl',
  },
  control: {
    input:
      'w-full rounded-2xl border border-[var(--pf-border-soft)] bg-surface px-4 py-3 text-[16px] text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20',
    pill:
      'rounded-full bg-control text-primary shadow-control ring-1 ring-[var(--pf-border-soft)]',
  },
  button: {
    primary:
      'pf-press inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-[14px] font-semibold text-white shadow-control focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70',
    menuItem:
      'flex h-10 w-full items-center rounded-[13px] px-3 text-left hover:bg-[var(--pf-hover-soft)]',
  },
  typography: {
    brand: 'text-[21px] font-normal tracking-[-0.02em] text-primary',
    pageTitle:
      "mt-4 text-center text-[48px] font-bold leading-none tracking-[-0.04em] text-primary [font-family:'Brush_Script_MT','Segoe_Script',cursive]",
    sectionTitle: 'text-[15px] font-semibold leading-none text-primary',
    helper: 'text-[12px] font-medium text-muted',
  },
} as const;
