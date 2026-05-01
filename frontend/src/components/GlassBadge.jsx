function GlassBadge({ children, tone = 'neutral', className = '' }) {
  if (!children) return null;

  return (
    <span className={`glass-badge glass-badge-${tone} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default GlassBadge;
