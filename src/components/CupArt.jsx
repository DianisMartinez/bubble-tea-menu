const PEARLS = [
  [66, 196], [86, 200], [106, 201], [126, 200], [146, 196],
  [76, 180], [96, 183], [116, 183], [136, 180], [86, 165], [108, 167], [128, 165],
];

// Ilustración para las bebidas que todavía no tienen foto.
export default function CupArt({ top, bottom, id }) {
  return (
    <svg className="cupArt" viewBox="0 0 212 240" role="img" aria-label="Ilustración del vaso">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path d="M128 4l-13 62" stroke="#2B1810" strokeWidth="9" strokeLinecap="round" />
      <path d="M44 44h124l-16 170a14 14 0 0 1-14 13H74a14 14 0 0 1-14-13z" fill={`url(#${id})`} />
      <rect x="36" y="34" width="140" height="13" rx="6.5" fill="#FFFDF8" />
      {PEARLS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="10" fill="#2B1810" />
      ))}
      <path d="M62 62l12 130" stroke="#fff" strokeOpacity=".35" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
