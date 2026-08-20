import { useEffect, useState } from 'react'

const STYLES = `
  @keyframes preloaderFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes preloaderGlowPulse {
    0%, 100% { opacity: 0.5;  transform: scale(1);    }
    50%       { opacity: 0.85; transform: scale(1.08); }
  }
  @keyframes preloaderBarSweep {
    0%   { transform: translateX(-100%); }
    50%  { transform: translateX(0%);    }
    100% { transform: translateX(100%);  }
  }
  .preloader-overlay {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .preloader-overlay.preloader-exit {
    transform: translateY(-100%);
  }
  .preloader-logo {
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease;
  }
  .preloader-exit .preloader-logo {
    transform: scale(1.06);
    opacity:   0;
  }
  .preloader-exit .preloader-welcome,
  .preloader-exit .preloader-bar {
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  @media (max-width: 600px) {
    .preloader-welcome { font-size: 11px !important; letter-spacing: 0.28em !important; }
  }
`

export default function Preloader() {
  const [exiting, setExiting] = useState(false)
  const [hidden,  setHidden]  = useState(false)

  // Inject styles once
  useEffect(() => {
    if (document.getElementById('preloader-styles')) return
    const s = document.createElement('style')
    s.id = 'preloader-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  // Wait for the page to actually finish loading, with a minimum
  // display time so the brand moment always reads — then trigger exit.
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const MIN_VISIBLE_MS = 500
    const start = Date.now()
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start))
      setTimeout(() => setExiting(true), wait)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
    }
    // Safety net in case 'load' never fires cleanly
    const fallback = setTimeout(finish, 2500)

    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(fallback)
    }
  }, [])

  // Once the slide-away starts, unmount after the transition finishes
  useEffect(() => {
    if (!exiting) return
    document.body.style.overflow = ''
    const t = setTimeout(() => setHidden(true), 550)
    return () => clearTimeout(t)
  }, [exiting])

  if (hidden) return null

  return (
    <div
      className={`preloader-overlay${exiting ? ' preloader-exit' : ''}`}
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:          99999,
        background:      '#0a0a0a',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        pointerEvents:   exiting ? 'none' : 'auto',
      }}
    >
      {/* Ambient glow behind the logo */}
      <div style={{
        position:      'absolute',
        width:         'clamp(320px, 42vw, 580px)',
        height:        'clamp(320px, 42vw, 580px)',
        borderRadius:  '50%',
        background:    'radial-gradient(ellipse at center, rgba(15,145,30,0.35) 0%, transparent 70%)',
        filter:        'blur(50px)',
        animation:     'preloaderGlowPulse 3.2s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <p className="preloader-welcome" style={{
        position:       'relative',
        fontFamily:     "'Plus Jakarta Sans', sans-serif",
        fontSize:       '14px',
        fontWeight:     600,
        letterSpacing:  '0.35em',
        textTransform:  'uppercase',
        color:          'rgba(255,255,255,0.5)',
        marginBottom:   '18px',
        animation:      'preloaderFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        Welcome to
      </p>

      <img
        src="/images/Logo.png"
        alt="DigiMeAds"
        fetchPriority="high"
        className="preloader-logo"
        style={{
          position: 'relative',
          width:    'clamp(220px, 30vw, 420px)',
          height:   'auto',
          display:  'block',
          animation: 'preloaderFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.08s both',
        }}
      />

      {/* Loading indicator */}
      <div className="preloader-bar" style={{
        position:     'relative',
        marginTop:    '44px',
        width:        '160px',
        height:       '2px',
        borderRadius: '2px',
        background:   'rgba(255,255,255,0.08)',
        overflow:     'hidden',
        animation:    'preloaderFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.16s both',
      }}>
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(90deg, transparent, #0f911e, transparent)',
          animation:  'preloaderBarSweep 1.6s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}
