import { useEffect, useRef, useState, useCallback } from 'react'

// ── Video player inside the lightbox ─────────────────────────────────────────
function LightboxVideo({ item }) {
  const ref = useRef(null)

  useEffect(() => {
    const vid = ref.current
    if (!vid) return
    vid.src = item.src
    vid.load()
    vid.play().catch(() => {})
    return () => { vid.pause(); vid.src = '' }
  }, [item.src])

  return (
    <video
      ref={ref}
      muted loop playsInline controls
      style={{
        width:     '100%',
        maxHeight: '65vh',
        objectFit: 'contain',
        display:   'block',
        background:'#000',
      }}
    />
  )
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
export default function Lightbox({ items, startIndex, onClose }) {
  const [index,       setIndex]     = useState(startIndex)
  const [animDir,     setAnimDir]   = useState(null)       // 'left' | 'right'
  const [isAnimating, setAnimating] = useState(false)
  const thumbsRef   = useRef(null)
  const touchStartX = useRef(null)

  const current = items[index]

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  go(1)
      if (e.key === 'ArrowLeft')   go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  // Scroll active thumb into view
  useEffect(() => {
    const row = thumbsRef.current
    if (!row) return
    const active = row.children[index]
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [index])

  const go = useCallback((dir) => {
    if (isAnimating) return
    const next = (index + dir + items.length) % items.length
    setAnimDir(dir > 0 ? 'right' : 'left')
    setAnimating(true)
    setTimeout(() => {
      setIndex(next)
      setAnimDir(null)
      setAnimating(false)
    }, 220)
  }, [index, items.length, isAnimating])

  // Touch / swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  const slideStyle = {
    opacity:   animDir ? 0 : 1,
    transform: animDir
      ? `translateX(${animDir === 'right' ? '-40px' : '40px'}) scale(0.97)`
      : 'translateX(0) scale(1)',
    transition: animDir
      ? 'none'
      : 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
  }

  return (
    <div
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         1000,
        background:     'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(12px)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        animation:      'lightboxIn 0.3s ease',
        fontFamily:     "'Plus Jakarta Sans', sans-serif",
      }}
      onClick={onClose}
    >
      {/* Inner — stops click propagation */}
      <div
        className="lb-inner"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position:      'relative',
          width:         '100%',
          maxWidth:      '900px',
          padding:       '24px',
          display:       'flex',
          flexDirection: 'column',
          gap:           '16px',
          animation:     'lightboxSlideIn 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position:       'absolute',
            top:            '0',
            right:          '8px',
            width:          '40px',
            height:         '40px',
            borderRadius:   '50%',
            background:     'rgba(255,255,255,0.08)',
            border:         '1px solid rgba(255,255,255,0.12)',
            color:          '#ffffff',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'pointer',
            zIndex:         10,
            transition:     'background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Counter */}
        <div style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.2em',
          color:         'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          textAlign:     'center',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>

        {/* Main media */}
        <div
          className="lb-media-wrap"
          style={{
            position:       'relative',
            width:          '100%',
            maxHeight:      '65vh',
            minHeight:      '280px',
            borderRadius:   '12px',
            overflow:       'hidden',
            background:     '#111',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            ...slideStyle,
          }}
        >
          {current.type === 'reel' ? (
            <LightboxVideo key={current.src} item={current} />
          ) : (
            <img
              src={current.image}
              alt={current.title}
              style={{
                width:     '100%',
                height:    '100%',
                objectFit: 'contain',
                display:   'block',
                maxHeight: '65vh',
              }}
            />
          )}

          {/* Prev arrow */}
          <button
            className="lb-nav-btn"
            onClick={() => go(-1)}
            style={{
              position:       'absolute',
              left:           '12px',
              top:            '50%',
              transform:      'translateY(-50%)',
              width:          '44px',
              height:         '44px',
              borderRadius:   '50%',
              background:     'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border:         '1px solid rgba(255,255,255,0.12)',
              color:          '#ffffff',
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              zIndex:         5,
            }}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Next arrow */}
          <button
            className="lb-nav-btn"
            onClick={() => go(1)}
            style={{
              position:       'absolute',
              right:          '12px',
              top:            '50%',
              transform:      'translateY(-50%)',
              width:          '44px',
              height:         '44px',
              borderRadius:   '50%',
              background:     'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border:         '1px solid rgba(255,255,255,0.12)',
              color:          '#ffffff',
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              zIndex:         5,
            }}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Info row */}
        <div
          className="lb-info-row"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
        >
          <div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '16px',
              fontWeight: 700,
              color:      '#ffffff',
              margin:     '0 0 2px',
            }}>
              {current.title}
            </p>
            {current.client && (
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize:   '12px',
                color:      'rgba(255,255,255,0.4)',
                margin:     0,
              }}>
                {current.client}
              </p>
            )}
          </div>
          <span style={{
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      '10px',
            fontWeight:    700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         current.type === 'reel' ? '#0f911e' : 'rgba(255,255,255,0.5)',
            background:    current.type === 'reel' ? 'rgba(59,255,108,0.1)' : 'rgba(255,255,255,0.06)',
            border:        `1px solid ${current.type === 'reel' ? 'rgba(59,255,108,0.25)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius:  '100px',
            padding:       '5px 12px',
            flexShrink:    0,
          }}>
            {current.type === 'reel' ? '▶ Reel' : '◻ Photo'}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div
          ref={thumbsRef}
          className="lb-thumbs-row"
          style={{
            display:       'flex',
            gap:           '8px',
            overflowX:     'auto',
            paddingBottom: '4px',
            scrollbarWidth:'none',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="lb-thumb lb-thumb-item"
              onClick={() => {
                setAnimDir(i > index ? 'right' : 'left')
                setTimeout(() => { setIndex(i); setAnimDir(null) }, 220)
              }}
              style={{
                width:        '56px',
                height:       '56px',
                flexShrink:   0,
                borderRadius: '8px',
                overflow:     'hidden',
                border:       `2px solid ${i === index ? '#0f911e' : 'rgba(255,255,255,0.08)'}`,
                opacity:      i === index ? 1 : 0.45,
                background:   '#1a1a1a',
              }}
            >
              {item.type === 'reel' ? (
                <div style={{
                  width:          '100%',
                  height:         '100%',
                  background:     '#1a1a1a',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24"
                    fill={i === index ? '#0f911e' : 'rgba(255,255,255,0.4)'}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              ) : (
                <img
                  src={item.image}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Swipe hint */}
        <p style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '11px',
          color:         'rgba(255,255,255,0.18)',
          textAlign:     'center',
          margin:        0,
          letterSpacing: '0.05em',
        }}>
          ← swipe or use arrow keys →
        </p>
      </div>
    </div>
  )
}