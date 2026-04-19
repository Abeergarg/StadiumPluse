'use client';

/* ================================================================
   SkipLink — Accessibility: Skip to main content
   Visually hidden until focused. Must be first child of <body>.
   Allows keyboard/screen reader users to bypass navigation.
   ================================================================ */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: -999,
        left: 0,
        zIndex: 9999,
        padding: '12px 24px',
        background: 'var(--p)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.9rem',
        borderRadius: '0 0 8px 0',
        textDecoration: 'none',
        transition: 'top 0.2s ease',
      }}
      onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.top = '0'; }}
      onBlur={(e) =>  { (e.currentTarget as HTMLAnchorElement).style.top = '-999px'; }}
    >
      Skip to main content
    </a>
  );
}
