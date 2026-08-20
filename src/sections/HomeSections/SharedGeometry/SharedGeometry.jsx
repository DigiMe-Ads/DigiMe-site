import { useEffect } from 'react'

const STYLES = `
  @keyframes sharedGeoFloat {
    0%, 100% { transform: translateY(0px)   rotate(0deg); }
    50%       { transform: translateY(-18px) rotate(5deg); }
  }
  @media (max-width: 992px) {
    .shared-geo-wrap { width: 220px !important; height: 220px !important; opacity: 0.5 !important; }
  }
  @media (max-width: 768px) {
    .shared-geo-wrap { display: none !important; }
  }
`

export default function SharedGeometry() {
  useEffect(() => {
    if (document.getElementById('shared-geo-bp')) return
    const s = document.createElement('style')
    s.id = 'shared-geo-bp'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    // Wrapper handles positioning — glow + floating image are siblings inside
    <div
      className="shared-geo-wrap"
      aria-hidden="true"
      style={{
        position:      'absolute',
        right:         '-2%',
        top:           '57%',
        transform:     'translateY(-50%)',
        width:         'clamp(300px, 28vw, 460px)',
        height:        'clamp(300px, 28vw, 460px)',
        pointerEvents: 'none',
        zIndex:        2,
      }}
    >
      {/* ── Yellow-green glow behind the shape ── */}
      <div
        style={{
          position:     'absolute',
          inset:        '10%',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse at center, rgba(180,200,20,0.28) 0%, rgba(100,140,10,0.12) 45%, transparent 72%)',
          filter:       'blur(18px)',
          zIndex:       0,
        }}
      />

      {/* ── Floating hexagon render ── */}
      <img
        src="/images/3d/3d-hexagon.png"
        alt=""
        style={{
          position:  'absolute',
          inset:     0,
          zIndex:    1,
          width:     '100%',
          height:    '100%',
          objectFit: 'contain',
          opacity:   0.55,
          filter:    'drop-shadow(0 0 40px rgba(180,200,20,0.2))',
          animation: 'sharedGeoFloat 7s ease-in-out infinite',
        }}
      />
    </div>
  )
}
