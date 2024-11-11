import type { CSSProperties } from 'react';

const Color = ({ color }: { color: CSSProperties['color'] }) => (
  <div style={{ alignItems: 'center', display: 'flex', gap: '0.3rem' }}>
    <code>{color}</code>
    <div
      style={{
        backgroundColor: color,
        height: '1rem',
        width: '1rem',
      }}
    />
  </div>
);

export { Color };
