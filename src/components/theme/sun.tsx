export function Sun() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .sun-rays {
          transform-origin: 14px 14px;
          animation: spin-slow 12s linear infinite;
        }
      `}</style>

      {/* Rays — terracotta/copper */}
      <g
        className="sun-rays"
        stroke="#C2714F"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <line x1="14" y1="2" x2="14" y2="5.5" />
        <line x1="14" y1="22.5" x2="14" y2="26" />
        <line x1="2" y1="14" x2="5.5" y2="14" />
        <line x1="22.5" y1="14" x2="26" y2="14" />
        <line x1="5.5" y1="5.5" x2="7.9" y2="7.9" />
        <line x1="20.1" y1="20.1" x2="22.5" y2="22.5" />
        <line x1="22.5" y1="5.5" x2="20.1" y2="7.9" />
        <line x1="7.9" y1="20.1" x2="5.5" y2="22.5" />
      </g>

      {/* Core — warm amber fill with teal ring */}
      <circle cx="14" cy="14" r="5.5" fill="#E8A838" />
      <circle
        cx="14"
        cy="14"
        r="5.5"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="1.2"
      />
    </svg>
  );
}
