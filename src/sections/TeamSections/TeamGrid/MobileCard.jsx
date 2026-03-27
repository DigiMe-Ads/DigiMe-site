import { useState } from 'react'

export default function MobileCard({ member }) {
  const [hovered, setHovered] = useState(false)
  const isDir = member.tier === 1

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '12px',
        overflow:     'hidden',
        background:   '#0d0d0d',
        border:       `1px solid ${
          hovered
            ? (isDir ? 'rgba(15,145,30,0.5)' : 'rgba(59,255,108,0.2)')
            : isDir ? 'rgba(15,145,30,0.25)' : 'rgba(255,255,255,0.05)'
        }`,
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        transform:  hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'top center',
              display:        'block',
              transform:      hovered ? 'scale(1.05)' : 'scale(1)',
              transition:     'transform 0.5s ease',
            }}
          />
        )}

        {/* Top accent bar */}
        <div style={{
          position:        'absolute',
          top:             0,
          left:            0,
          right:           0,
          height:          '2px',
          background:      isDir ? '#0f911e' : '#3bff6c',
          transform:       hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition:      'transform 0.35s ease',
        }} />

        {/* Director badge */}
        {isDir && (
          <div style={{
            position:      'absolute',
            top:           '8px',
            right:         '8px',
            background:    '#0a5c12',
            border:        '1px solid rgba(15,145,30,0.7)',
            borderRadius:  '6px',
            padding:       '3px 7px',
            fontSize:      '8px',
            fontWeight:    700,
            letterSpacing: '0.1em',
            color:         '#3bff6c',
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
          }}>
            DIRECTOR
          </div>
        )}

        {/* Bottom gradient */}
        <div style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        '45%',
          background:    'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Name + role */}
      <div style={{ padding: '10px 12px 12px' }}>
        <h4 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   isDir ? '14px' : '13px',
          fontWeight: 700,
          color:      '#ffffff',
          margin:     '0 0 3px',
          lineHeight: 1.3,
        }}>
          {member.name}
        </h4>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '10px',
          color:      isDir ? 'rgba(15,145,30,0.9)' : 'rgba(255,255,255,0.3)',
          margin:     0,
          lineHeight: 1.4,
        }}>
          {member.role}
        </p>
      </div>
    </div>
  )
}