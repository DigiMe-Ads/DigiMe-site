export default function OrbitTextSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <path
          id="circle-path"
          d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
        />
      </defs>

      <g style={{ animation: 'spinText 14s linear infinite', transformOrigin: '100px 100px' }}>
        <text style={{
          fontSize:   '13.5px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          fill:       'rgba(255,255,255,0.85)',
          letterSpacing: '8.5px',
        }}>
          <textPath href="#circle-path" startOffset="0%">
            D · I · G · I · M · E · A · D · S 
          </textPath>
        </text>
      </g>

      <circle cx="28"  cy="100" r="3" fill="rgba(255,255,255,0.6)" />
      <circle cx="100" cy="28"  r="3" fill="rgba(255,255,255,0.6)" />

      <g transform="translate(100, 100)">
        <line
          x1="0" y1="-18" x2="0" y2="14"
          stroke="#34A853" strokeWidth="1.8" strokeLinecap="round"
        />
        <polyline
          points="-8,-4 0,14 8,-4"
          fill="none" stroke="#34A853" strokeWidth="1.8"
          strokeLinejoin="round" strokeLinecap="round"
        />
      </g>
    </svg>
  )
}