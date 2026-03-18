import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const STYLES = `
  @media (max-width: 768px) {
    .page-hero-title { font-size: clamp(2rem, 8vw, 3rem) !important; }
    .page-hero-inner { min-height: 260px !important; }
  }
`

export default function Hero({ title, breadcrumb = [] }) {
  useEffect(() => {
    if (document.getElementById('page-hero-styles')) return
    const s = document.createElement('style')
    s.id = 'page-hero-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <div
      className="page-hero-inner"
      style={{
        position:       'relative',
        minHeight:      '340px',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        overflow:       'hidden',
        fontFamily:     "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Background image */}
      <img
        src="/images/About/About-Hero.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          width:      '100%',
          height:     '570px',
          objectFit:  'cover',
          objectPosition: 'center top',
          zIndex:     0,
        }}
        onError={e => e.currentTarget.style.display = 'none'}
      />

      {/* Dark overlay so text stays readable */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'rgba(8,8,8,0.55)',
        zIndex:     0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1
          className="page-hero-title"
          style={{
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      'clamp(2.8rem, 5vw, 4rem)',
            fontWeight:    700,
            color:         '#ffffff',
            margin:        '0 0 14px',
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
          }}
        >
          {title}
        </h1>

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '8px',
            justifyContent: 'center',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '14px',
            color:      'rgba(255,255,255,0.5)',
          }}>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {i > 0 && (
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1l4 4-4 4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    style={{
                      color:          'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      transition:     'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}