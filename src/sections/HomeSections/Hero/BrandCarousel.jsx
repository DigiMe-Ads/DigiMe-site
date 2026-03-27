import { useRef, useState } from 'react'
import { BRANDS } from './heroData'

// Double the array for a seamless infinite scroll loop
const LOOP_BRANDS = [...BRANDS, ...BRANDS]

export default function BrandCarousel({ fadeUp }) {
  const trackRef       = useRef(null)
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="hero-trust-bar"
      style={{
        ...fadeUp(0.85),
        borderTop:   '1px solid rgba(255,255,255,0.08)',
        display:     'flex',
        alignItems:  'stretch',
        marginLeft:  '-285px',
        marginRight: '0',
      }}
    >
      {/* Label */}
      <div
        className="hero-trusted-label"
        style={{
          padding:       '28px 32px',
          flexShrink:    0,
          borderRight:   '1px solid rgba(255,255,255,0.08)',
          minWidth:      '200px',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'center',
        }}
      >
        <p style={{
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.35)',
          margin:        '0 0 6px',
        }}>
          Proudly working with
        </p>
        <p className="hero-label-text" style={{
          fontSize:   '15px',
          fontWeight: 700,
          lineHeight: '22px',
          color:      '#fff',
          margin:     0,
        }}>
          Sri Lanka's{' '}
          <span style={{ color: '#0f911e' }}>finest</span>
          <br />brands
        </p>
      </div>

      {/* Scrolling track */}
      <div
        style={{
          flex:      1,
          overflow:  'hidden',
          position:  'relative',
          display:   'flex',
          alignItems:'center',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div style={{
          position:   'absolute',
          left:       0,
          top:        0,
          bottom:     0,
          width:      '60px',
          zIndex:     2,
          pointerEvents: 'none',
          background: 'linear-gradient(to right, #0a0a0a, transparent)',
        }}/>

        {/* Right fade */}
        <div style={{
          position:   'absolute',
          right:      0,
          top:        0,
          bottom:     0,
          width:      '60px',
          zIndex:     2,
          pointerEvents: 'none',
          background: 'linear-gradient(to left, #0a0a0a, transparent)',
        }}/>

        {/* Logo strip */}
        <div
          ref={trackRef}
          style={{
            display:            'flex',
            alignItems:         'center',
            width:              'max-content',
            animation:          'logoScroll 32s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {LOOP_BRANDS.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              style={{
                padding:         '0 36px',
                borderRight:     '1px solid rgba(255,255,255,0.06)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                height:          '80px',
                flexShrink:      0,
              }}
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    height:     '56px',
                    width:      'auto',
                    maxWidth:   '110px',
                    objectFit:  'contain',
                    opacity:    0.8,
                    transition: 'opacity 0.25s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                />
              ) : (
                <span style={{
                  fontFamily:  "'Plus Jakarta Sans', sans-serif",
                  fontSize:    '15px',
                  fontWeight:  600,
                  color:       'rgba(255,255,255,0.5)',
                  whiteSpace:  'nowrap',
                }}>
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}