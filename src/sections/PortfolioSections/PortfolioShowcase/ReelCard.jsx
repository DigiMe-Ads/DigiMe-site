import { useEffect, useRef, useState } from 'react'

export default function ReelCard({ item, onClick }) {
  const videoRef  = useRef(null)
  const wrapRef   = useRef(null)
  const [loaded,  setLoaded]  = useState(false)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const vid = videoRef.current
        if (!vid) return
        if (entry.isIntersecting) {
          if (!vid.src && item.src) { vid.src = item.src; vid.load() }
          vid.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          vid.pause(); setPlaying(false)
        }
      })
    }, { threshold: 0.3, rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.src])

  return (
    <div
      ref={wrapRef}
      className="showcase-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '14px',
        overflow:     'hidden',
        aspectRatio:  '9/16',
        position:     'relative',
        background:   '#141414',
        border:       `1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow:    hovered ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      <video
        ref={videoRef}
        poster={item.poster || undefined}
        muted loop playsInline preload="none"
        onLoadedData={() => setLoaded(true)}
        style={{
          width:      '100%',
          height:     '100%',
          objectFit:  'cover',
          display:    'block',
          opacity:    loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Placeholder */}
      {!loaded && (
        <div style={{
          position:       'absolute',
          inset:          0,
          zIndex:         1,
          background:     item.poster
            ? `url(${item.poster}) center/cover`
            : 'linear-gradient(160deg, #1a1a1a, #111)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          {!item.poster && (
            <div style={{
              width:          '48px',
              height:         '48px',
              borderRadius:   '50%',
              border:         '1px solid rgba(255,255,255,0.1)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position:      'absolute',
        inset:         0,
        zIndex:        2,
        pointerEvents: 'none',
        background:    'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
      }}/>

      {/* Playing tag */}
      <div style={{
        position:       'absolute',
        top:            '12px',
        left:           '12px',
        zIndex:         3,
        display:        'flex',
        alignItems:     'center',
        gap:            '5px',
        background:     'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        border:         '1px solid rgba(255,255,255,0.1)',
        borderRadius:   '6px',
        padding:        '4px 8px',
      }}>
        <div style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   playing ? '#0f911e' : 'rgba(255,255,255,0.3)',
          transition:   'background 0.3s ease',
          ...(playing ? { animation: 'webBrowserBlink 1.5s ease-in-out infinite' } : {}),
        }}/>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '10px',
          fontWeight:    700,
          color:         playing ? '#0f911e' : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          transition:    'color 0.3s ease',
        }}>
          {playing ? 'Live' : 'Reel'}
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

      {/* Title/client */}
      <div style={{
        position: 'absolute',
        bottom:   0,
        left:     0,
        right:    0,
        zIndex:   3,
        padding:  '20px 16px 16px',
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