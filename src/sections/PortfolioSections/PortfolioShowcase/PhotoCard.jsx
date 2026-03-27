import { useState } from 'react'

export default function PhotoCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="showcase-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '14px',
        overflow:     'hidden',
        aspectRatio:  item.span > 1 ? '16/9' : '4/5',
        position:     'relative',
        background:   '#141414',
        border:       `1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow:    hovered ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            display:    'block',
            transform:  hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      ) : (
        <div style={{
          width:          '100%',
          height:         '100%',
          background:     'linear-gradient(160deg, #1c1c1c, #141414)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        background:    'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)',
      }}/>

      {/* Photo tag */}
      <div style={{
        position:       'absolute',
        top:            '12px',
        left:           '12px',
        background:     'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        border:         '1px solid rgba(255,255,255,0.1)',
        borderRadius:   '6px',
        padding:        '3px 10px',
      }}>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '10px',
          fontWeight:    700,
          color:         'rgba(255,255,255,0.6)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Photo
        </span>
      </div>

      {/* Expand hint */}
      <div className="card-overlay" style={{
        position:       'absolute',
        inset:          0,
        zIndex:         3,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        opacity:        hovered ? 1 : 0,
        background:     'rgba(0,0,0,0.3)',
      }}>
        <div style={{
          width:          '44px',
          height:         '44px',
          borderRadius:   '50%',
          background:     'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          border:         '1px solid rgba(255,255,255,0.2)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </div>
      </div>

      {/* Caption */}
      <div className="card-overlay" style={{
        position: 'absolute',
        bottom:   0,
        left:     0,
        right:    0,
        padding:  '24px 16px 16px',
        opacity:  hovered ? 1 : 0.7,
      }}>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '13px',
          fontWeight: 700,
          color:      '#ffffff',
          margin:     '0 0 2px',
        }}>
          {item.title}
        </p>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '11px',
          color:      'rgba(255,255,255,0.4)',
          margin:     0,
        }}>
          {item.client}
        </p>
      </div>
    </div>
  )
}