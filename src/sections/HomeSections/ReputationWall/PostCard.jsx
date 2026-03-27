import { useState } from 'react'

export default function PostCard({ card }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '14px',
        overflow:     'hidden',
        position:     'relative',
        aspectRatio:  '4/5',
        background:   '#1a1a1a',
        border:       `1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.07)'}`,
        transition:   'border-color 0.3s ease',
      }}
    >
      {card.image ? (
        <img
          src={card.image}
          alt={card.caption}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            display:    'block',
            transform:  hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      ) : (
        <div style={{
          width:          '100%',
          height:         '100%',
          background:     'linear-gradient(160deg, #1c1c1c, #181818)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.08)" strokeWidth="1.5">
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
        background:    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
        pointerEvents: 'none',
      }}/>

      {/* Post tag */}
      <div style={{
        position:       'absolute',
        top:            '10px',
        left:           '10px',
        background:     'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
        border:         '1px solid rgba(255,255,255,0.1)',
        borderRadius:   '6px',
        padding:        '3px 8px',
      }}>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '10px',
          fontWeight:    700,
          color:         'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {card.tag}
        </span>
      </div>

      {/* Caption + likes */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        padding:    '24px 14px 12px',
        transform:  hovered ? 'translateY(0)' : 'translateY(3px)',
        transition: 'transform 0.3s ease',
      }}>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '12px',
          fontWeight: 600,
          color:      'rgba(255,255,255,0.85)',
          margin:     '0 0 4px',
          lineHeight: 1.4,
        }}>
          {card.caption}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="10" height="10" viewBox="0 0 24 24"
            fill="rgba(255,107,107,0.8)" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '11px',
            color:      'rgba(255,255,255,0.35)',
          }}>
            {card.likes}
          </span>
        </div>
      </div>
    </div>
  )
}