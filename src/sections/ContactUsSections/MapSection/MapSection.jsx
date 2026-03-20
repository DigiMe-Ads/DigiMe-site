import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

// ── Coordinates: 6.905993, 79.876506 (Sri Lanka) ──
const LAT = 6.905993
const LNG = 79.876506

const STYLES = `
  @keyframes mapPinBounce {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-6px); }
  }
  @keyframes mapPinPulse {
    0%        { transform: scale(1);   opacity: 0.6; }
    100%      { transform: scale(2.5); opacity: 0;   }
  }
  @media (max-width: 1200px) {
    .map-inner { padding-left: 120px !important; padding-right: 120px !important; }
  }
  @media (max-width: 992px) {
    .map-inner   { padding-left: 60px !important; padding-right: 60px !important; }
    .map-info-row { flex-direction: column !important; gap: 24px !important; }
  }
  @media (max-width: 768px) {
    .map-inner   { padding-left: 24px !important; padding-right: 24px !important; }
    .map-frame   { height: 320px !important; }
  }
  @media (max-width: 480px) {
    .map-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function MapSection() {
  const sectionReveal = useScrollReveal({ threshold: 0.1 })

  useEffect(() => {
    if (document.getElementById('map-styles')) return
    const s = document.createElement('style')
    s.id = 'map-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  // Google Maps embed URL — dark map style applied via map style param
  // Using a custom dark style via Maps Embed API (no key needed for basic embed)
  const mapSrc = `https://maps.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`

  return (
    <section
      id="map-section"
      style={{
        background:    '#0a0a0a',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        paddingTop:    '0',
        paddingBottom: '100px',
        overflow:      'hidden',
      }}
    >
      <div
        className="map-inner"
        ref={sectionReveal.ref}
        style={{
          opacity:      sectionReveal.isVisible ? 1 : 0,
          transform:    sectionReveal.isVisible ? 'translateY(0)' : 'translateY(28px)',
          transition:   'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >

        {/* ── Map container ── */}
        <div
          className="map-frame"
          style={{
            position:     'relative',
            height:       '420px',
            overflow:     'hidden',
            border:       '1px solid rgba(255,255,255,0.07)',
            boxShadow:    '0 24px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Google Maps iframe */}
          <iframe
            title="Office Location"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{
              border:  0,
              display: 'block',
              // Hue-rotate + saturate to push map closer to dark-green palette
              filter:  'invert(92%) hue-rotate(180deg) saturate(0.85) brightness(0.9)',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Re-invert the pin area isn't possible so we overlay our own marker */}
          {/* Thin green top border accent */}
          <div style={{
            position:      'absolute',
            top:           0,
            left:          0,
            right:         0,
            height:        '2px',
            background:    'linear-gradient(90deg, transparent, #0f911e 50%, transparent)',
            pointerEvents: 'none',
            zIndex:        2,
          }} />

          {/* Bottom fade — blends into page bg */}
          <div style={{
            position:      'absolute',
            bottom:        0,
            left:          0,
            right:         0,
            height:        '80px',
            background:    'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex:        2,
          }} />

          {/* Left fade */}
          <div style={{
            position:      'absolute',
            top:           0,
            left:          0,
            width:         '60px',
            height:        '100%',
            background:    'linear-gradient(to right, rgba(10,10,10,0.3) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex:        2,
          }} />

          {/* Right fade */}
          <div style={{
            position:      'absolute',
            top:           0,
            right:         0,
            width:         '60px',
            height:        '100%',
            background:    'linear-gradient(to left, rgba(10,10,10,0.3) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex:        2,
          }} />

          {/* ── Floating info card — top left overlay ── */}
          <div style={{
            position:     'absolute',
            top:          '20px',
            left:         '20px',
            zIndex:       3,
            background:   'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(12px)',
            border:       '1px solid rgba(59,255,108,0.2)',
            borderRadius: '12px',
            padding:      '16px 20px',
            minWidth:     '200px',
            pointerEvents:'none',
          }}>
            {/* Green dot + label */}
            <div style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '8px',
              marginBottom: '6px',
            }}>
              <div style={{
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   '#0f911e',
                flexShrink:   0,
                boxShadow:    '0 0 8px rgba(59,255,108,0.6)',
              }} />
              <span style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         '#0f911e',
              }}>
                Our Office
              </span>
            </div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '13px',
              fontWeight: 600,
              color:      '#ffffff',
              margin:     '0 0 2px',
            }}>
              DigiMe Ads HQ
            </p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '12px',
              color:      'rgba(255,255,255,0.4)',
              margin:     0,
            }}>
              410/3, Baudhaloka Mawatha, Col 7
            </p>
          </div>

        </div>

        

      </div>
    </section>
  )
}