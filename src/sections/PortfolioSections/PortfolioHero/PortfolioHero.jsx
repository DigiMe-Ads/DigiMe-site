import { useEffect, useRef, useState } from 'react'

const STYLES = `
  @keyframes heroTextIn {
    from { opacity:0; transform: translateY(60px) skewY(3deg); }
    to   { opacity:1; transform: translateY(0)     skewY(0deg); }
  }
  @keyframes heroLineIn {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes heroBadgePop {
    from { opacity:0; transform: scale(0.8) rotate(-8deg); }
    to   { opacity:1; transform: scale(1)   rotate(-4deg); }
  }
  @keyframes heroScrollBounce {
    0%,100% { transform: translateY(0px);  }
    50%      { transform: translateY(6px);  }
  }
  @keyframes heroGlowPulse {
    0%,100% { opacity: 0.5; transform: scale(1); }
    50%      { opacity: 0.9; transform: scale(1.08); }
  }
  @keyframes heroScrubberPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(59,255,108,0.4); }
    50%      { box-shadow: 0 0 0 8px rgba(59,255,108,0); }
  }
  .hero-play-btn {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                background 0.3s ease, box-shadow 0.3s ease;
  }
  .hero-play-btn:hover {
    transform: scale(1.08) !important;
    box-shadow: 0 0 60px rgba(59,255,108,0.4) !important;
  }
  .hero-mute-btn { transition: opacity 0.2s ease, transform 0.2s ease; }
  .hero-mute-btn:hover { opacity: 1 !important; transform: scale(1.1); }
`

export default function PortfolioHero() {
  const videoRef      = useRef(null)
  const progressRef   = useRef(null)
  const [muted,    setMuted]    = useState(true)
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [loaded,   setLoaded]   = useState(false)
  const [fullCtrl, setFullCtrl] = useState(false)

  useEffect(() => {
    if (document.getElementById('phero-styles')) return
    const s = document.createElement('style')
    s.id = 'phero-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  // Progress bar update
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const onTime = () => {
      if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100)
    }
    vid.addEventListener('timeupdate', onTime)
    return () => vid.removeEventListener('timeupdate', onTime)
  }, [])

  const togglePlay = () => {
    const vid = videoRef.current
    if (!vid) return
    if (vid.paused) { vid.play(); setPlaying(true) }
    else            { vid.pause(); setPlaying(false) }
  }

  const toggleMute = () => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = !vid.muted
    setMuted(vid.muted)
  }

  const scrub = (e) => {
    const vid = videoRef.current
    if (!vid || !vid.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct  = (e.clientX - rect.left) / rect.width
    vid.currentTime = pct * vid.duration
  }

  return (
    <section style={{
      position:'relative', height:'100vh', minHeight:'640px',
    //   background:'#060606', overflow:'hidden',
      fontFamily:"'Plus Jakarta Sans', sans-serif",
    }}>

      {/* ── Video background ── */}
      {/* ── Video background ── */}
<video
  ref={videoRef}
  src='/images/Home/Content/portfolio.mp4'
  poster={null}
  autoPlay          // ← ADD THIS — triggers load + play immediately
  muted
  loop
  playsInline
  onLoadedData={() => setLoaded(true)}
  onCanPlay={() => setLoaded(true)}   // ← fallback in case loadedData misfires
  style={{
    position:'absolute', inset:0,
    width:'100%', height:'100%', objectFit:'cover',
    opacity: 0.55,                    // ← REMOVE the loaded condition, always show
    transition:'opacity 1s ease',
    zIndex: 1,                        // ← BUMP to 1, above the fallback gradient
  }}
/>

{/* Fallback dark gradient — sits BEHIND video */}
<div style={{
  position:'absolute', inset:0,
  zIndex: 0,                          // ← stays at 0, under video
  background:'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #080808 100%)',
}}/>

      {/* Grid overlay — adds texture */}
      <div style={{
        position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        backgroundImage:`
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize:'80px 80px',
      }}/>

      {/* Gradient overlays — cinematic framing */}
      <div style={{
        position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        background:`
          linear-gradient(to right,  rgba(0,0,0,0.7) 0%, transparent 30%),
          linear-gradient(to top,    rgba(0,0,0,0.9) 0%, transparent 40%),
          linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%)
        `,
      }}/>

      {/* Green glow */}
      <div style={{
        position:'absolute', bottom:'10%', left:'20%',
        width:'600px', height:'400px',
        background:'radial-gradient(ellipse, rgba(59,255,108,0.08) 0%, transparent 70%)',
        filter:'blur(60px)', zIndex:2, pointerEvents:'none',
        animation:'heroGlowPulse 8s ease-in-out infinite',
      }}/>

      {/* ── Content ── */}
      <div style={{
        position:'relative', zIndex:3,
        height:'100%', display:'flex', flexDirection:'column',
        justifyContent:'flex-end',
        padding:'clamp(24px,6vw,80px) clamp(24px,8vw,140px) clamp(80px,10vh,120px)',
      }}>

        {/* Top-right badge */}
        <div style={{
          position:'absolute', top:'100px', right:'clamp(24px,8vw,140px)',
          animation:'heroBadgePop 0.8s cubic-bezier(0.16,1,0.3,1) 1s both',
        }}>
          <div style={{
            transform:'rotate(-4deg)',
            background:'#3bff6c', color:'#060606',
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'11px', fontWeight:800,
            letterSpacing:'0.15em', textTransform:'uppercase',
            padding:'10px 18px', borderRadius:'8px',
            lineHeight:1.3, textAlign:'center',
          }}>
            Showreel<br/>2025 ✦
          </div>
        </div>

        {/* Main text */}
        <div style={{ overflow:'hidden', marginBottom:'8px' }}>
          <p style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'11px', fontWeight:600,
            letterSpacing:'0.25em', textTransform:'uppercase',
            color:'rgba(255,255,255,0.4)', marginBottom:'20px',
            animation:'heroTextIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both',
          }}>
            <span style={{color:'#3bff6c'}}>✦</span> &nbsp;DigiMeAds · Portfolio
          </p>
        </div>

        {/* <h1 style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'clamp(3rem,9vw,9rem)',
          fontWeight:900, lineHeight:0.92,
          letterSpacing:'-0.04em', color:'#ffffff',
          margin:'0 0 32px',
        }}>
          {['This is','what we','build.'].map((line,i) => (
            <span key={i} style={{
              display:'block',
              animation:`heroTextIn 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3+i*0.1}s both`,
              color: i===2 ? '#3bff6c' : '#ffffff',
              fontStyle: i===2 ? 'italic' : 'normal',
              fontWeight: i===2 ? 400 : 900,
            }}>{line}</span>
          ))}
        </h1> */}

        {/* Accent line */}
        <div style={{
          width:'200px', height:'2px', marginBottom:'40px',
          background:'linear-gradient(90deg, #3bff6c, transparent)',
          transformOrigin:'left',
          animation:'heroLineIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both',
        }}/>

        {/* Bottom row — controls + scroll hint */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between', flexWrap:'wrap', gap:'20px',
        }}>

          {/* Left: play + mute */}
          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>

            {/* Play / pause */}
            <button
              className="hero-play-btn"
              onClick={togglePlay}
              style={{
                width:'64px', height:'64px', borderRadius:'50%',
                background: playing ? 'rgba(59,255,108,0.15)' : '#3bff6c',
                border:`2px solid ${playing ? 'rgba(59,255,108,0.4)' : '#3bff6c'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', flexShrink:0,
              }}
            >
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill={playing ? '#3bff6c' : '#060606'}>
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#060606">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
            </button>

            {/* Mute toggle */}
            <button
              className="hero-mute-btn"
              onClick={toggleMute}
              style={{
                background:'none', border:'none', cursor:'pointer',
                opacity:0.5, color:'#ffffff', padding:0,
              }}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>

            <div>
              <p style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'12px', fontWeight:600,
                color:'rgba(255,255,255,0.7)', margin:'0 0 2px',
              }}>
                {playing ? 'Now playing' : 'Play showreel'}
              </p>
              <p style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'11px', color:'rgba(255,255,255,0.3)', margin:0,
              }}>
                DigiMeAds · 2025
              </p>
            </div>
          </div>

          {/* Right: scroll hint */}
          <div style={{
            display:'flex', flexDirection:'column',
            alignItems:'center', gap:'8px',
            animation:'heroTextIn 0.8s ease 1.2s both',
          }}>
            <div style={{
              width:'1px', height:'40px',
              background:'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))',
            }}/>
            <span style={{
              fontFamily:"'Plus Jakarta Sans', sans-serif",
              fontSize:'10px', fontWeight:600,
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.25)',
              writingMode:'vertical-rl',
              animation:'heroScrollBounce 2s ease-in-out infinite 2s',
            }}>Scroll</span>
          </div>
        </div>

        {/* ── Progress scrubber ── */}
        <div
          onClick={scrub}
          style={{
            position:'absolute', bottom:0, left:0, right:0,
            height:'3px', background:'rgba(255,255,255,0.08)',
            cursor:'pointer', zIndex:4,
          }}
        >
          <div style={{
            height:'100%', width:`${progress}%`,
            background:'#3bff6c',
            transition:'width 0.1s linear',
            position:'relative',
          }}>
            {/* Scrubber handle */}
            <div style={{
              position:'absolute', right:'-5px', top:'50%',
              transform:'translateY(-50%)',
              width:'10px', height:'10px', borderRadius:'50%',
              background:'#3bff6c',
              animation: playing ? 'heroScrubberPulse 2s ease-in-out infinite' : 'none',
            }}/>
          </div>
        </div>

      </div>
    </section>
  )
}