import { useEffect, useRef, useState } from 'react'

export default function ReelCard({ card }) {
  const videoRef = useRef(null)
  const wrapRef  = useRef(null)
  const [loaded,  setLoaded]  = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const vid = videoRef.current
          if (!vid) return
          if (entry.isIntersecting) {
            if (!vid.src && card.src) { vid.src = card.src; vid.load() }
            vid.play().then(() => setPlaying(true)).catch(() => {})
          } else {
            vid.pause()
            setPlaying(false)
          }
        })
      },
      { threshold: 0.3, rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [card.src])

  return (
    <div
      ref={wrapRef}
      style={{
        borderRadius: '14px',
        overflow:     'hidden',
        position:     'relative',
        aspectRatio:  '9/16',
        background:   '#1a1a1a',
        border:       '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <video
        ref={videoRef}
        poster={card.poster || undefined}
        muted loop playsInline preload="none"
        onLoadedData={() => setLoaded(true)}
        style={{
          width:      '100%',
          height:     '100%',
          objectFit:  'cover',
          display:    'block',
          opacity:    loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Placeholder until loaded */}
      {!loaded && (
        <div style={{
          position:       'absolute',
          inset:          0,
          background:     card.poster
            ? `url(${card.poster}) center/cover`
            : 'linear-gradient(135deg, #1c1c1c, #222)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          {!card.poster && (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* Playing / Reel tag */}
      <div style={{
        position:       'absolute',
        top:            '10px',
        left:           '10px',
        background:     'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        borderRadius:   '6px',
        padding:        '4px 8px',
        border:         '1px solid rgba(255,255,255,0.1)',
        display:        'flex',
        alignItems:     'center',
        gap:            '5px',
      }}>
        <svg width="9" height="9" viewBox="0 0 24 24"
          fill={playing ? '#0f911e' : 'rgba(255,255,255,0.5)'}>
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '10px',
          fontWeight:    700,
          color:         playing ? '#0f911e' : 'rgba(255,255,255,0.6)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {playing ? 'Playing' : 'Reel'}
        </span>
      </div>

      {/* Caption */}
      <div
        className="reel-caption"
        style={{
          position:  'absolute',
          bottom:    0,
          left:      0,
          right:     0,
          padding:   '28px 14px 12px',
          opacity:   0.5,
          transform: 'translateY(4px)',
        }}
      >
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '12px',
          fontWeight: 600,
          color:      'rgba(255,255,255,0.85)',
          margin:     0,
          lineHeight: 1.4,
        }}>
          {card.caption}
        </p>
      </div>
    </div>
  )
}