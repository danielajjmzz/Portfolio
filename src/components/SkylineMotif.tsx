/**
 * Low-opacity line-art bridge truss + skyline silhouette.
 * The single deliberate motion moment on the site: a line-drawing reveal.
 */
export function SkylineMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    >
      <g className="draw-in">
        {/* skyline silhouette */}
        <path d="M0 300 H60 V210 H92 V300 H140 V168 H160 V120 H176 V168 H206 V300 H250 V236 H300 V300 H340 V150 H352 V96 H360 V150 H396 V300 H452 V196 H520 V300 H560 V132 H590 V88 H600 V132 H636 V300 H700 V222 H760 V300 H800 V162 H830 V110 H842 V162 H880 V300 H940 V240 H1000 V300 H1050 V180 H1080 V300 H1200" />
        {/* bridge deck */}
        <path d="M0 262 H1200" />
        <path d="M0 274 H1200" />
        {/* truss diagonals */}
        <path d="M40 274 L100 214 L160 274 L220 214 L280 274 L340 214 L400 274 L460 214 L520 274 L580 214 L640 274 L700 214 L760 274 L820 214 L880 274 L940 214 L1000 274 L1060 214 L1120 274" />
        <path d="M40 214 H1120" />
        {/* verticals */}
        {Array.from({ length: 19 }, (_, i) => 40 + i * 60).map((x) => (
          <path key={x} d={`M${x} 214 V274`} />
        ))}
      </g>
    </svg>
  );
}
