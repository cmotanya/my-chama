export function Moon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <style>{`
        @keyframes star-pulse {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.5); }
        }
        .s1 { transform-origin: 420px 120px; animation: star-pulse 2.4s ease-in-out infinite; }
        .s2 { transform-origin: 440px 300px; animation: star-pulse 3.2s ease-in-out infinite 0.8s; }
        .s3 { transform-origin: 380px 80px;  animation: star-pulse 2.8s ease-in-out infinite 1.4s; }
      `}</style>

      {/* Rotate -120deg so opening faces top-right like a real moon */}
      <g transform="rotate(-30, 256, 256)">
        <path
          d="M322.225,451.558c-20.797,7.062-43.071,10.894-66.225,10.894
             C142.163,462.452,49.548,369.837,49.548,256S142.163,49.548,256,49.548
             c23.154,0,45.429,3.832,66.226,10.894
             C266.612,107.439,231.226,177.657,231.226,256S266.612,404.561,322.225,451.558z"
          fill="#E8A838"
          stroke="#C2714F"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
