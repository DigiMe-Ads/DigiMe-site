import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const CARDS = [
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/final xz.mp4',
    poster:  null,
    caption: 'Brand launch campaign — FreshBrew Co.',
    col: 0, delay: 0,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Delivery HOG Post.jpg',
    caption: 'Product shoot — Velour Studio',
    tag:     'Post',
    likes:   '2.4K',
    col: 0, delay: 0.4,
  },
  {
    type:    'stat',
    value:   '150+',
    label:   'Projects delivered',
    sub:     'Across 12 industries',
    col: 0, delay: 0.7,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Pickme ad uber.3.jpg',
    caption: 'Editorial shoot — NOX Label',
    tag:     'Post',
    likes:   '1.8K',
    col: 1, delay: 0.15,
  },
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/Lavinia FInal.mp4',
    poster:  null,
    caption: 'Social campaign — Apex Sneakers',
    col: 1, delay: 0.5,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Post 15.jpg',
    caption: 'Behind the lens — product series',
    tag:     'Post',
    likes:   '984',
    col: 1, delay: 0.8,
  },
  {
    type:    'stat',
    value:   '340%',
    label:   'Avg. engagement lift',
    sub:     'Social media clients',
    col: 2, delay: 0.08,
  },
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/reel 2.mp4',
    poster:  null,
    caption: 'Motion graphics — Apex Sneakers',
    col: 2, delay: 0.45,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Post 16.jpg',
    caption: 'Campaign — Rift Valley Roasters',
    tag:     'Post',
    likes:   '3.1K',
    col: 2, delay: 0.75,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Post 18.jpg',
    caption: 'Street campaign — NOX Label',
    tag:     'Post',
    likes:   '1.2K',
    col: 3, delay: 0.2,
  },
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/reel.mp4',
    poster:  null,
    caption: 'Brand film — Velour Studio',
    col: 3, delay: 0.5,
  },
  {
    type:    'stat',
    value:   '98%',
    label:   'Client retention',
    sub:     'Since 2012',
    col: 3, delay: 0.8,
  },
]

const TICKER_ITEMS = [
  '✦ Social Media Management', '●',
  'Photography & Videography', '✦',
  'Web Development', '●',
  'Brand Identity', '✦',
  'Motion Graphics', '●',
  'Content Strategy', '✦',
  'UI / UX Design', '●',
  'Campaign Production',
]

const FLOAT_ANIMS = ['wallFloat0','wallFloat1','wallFloat2','wallFloat3']
const FLOAT_DURS  = [7, 9, 6.5, 8]

const STYLES = `
  @keyframes wallCardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)     scale(1);    }
  }
  @keyframes wallFloat0 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-7px)}  }
  @keyframes wallFloat1 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-11px)} }
  @keyframes wallFloat2 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-5px)}  }
  @keyframes wallFloat3 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-9px)}  }
  @keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes livePulse {
    0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 0 0 rgba(59,255,108,0.4)}
    50%{opacity:0.6;transform:scale(0.85);box-shadow:0 0 0 6px rgba(59,255,108,0)}
  }
  @keyframes wallGlow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
  .wall-card {
    cursor: default;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .wall-card:hover { transform: translateY(-6px) scale(1.02) !important; z-index:10 !important; }
  .reel-caption { transition: opacity 0.3s ease, transform 0.3s ease; }
  .wall-card:hover .reel-caption { opacity: 1 !important; transform: translateY(0) !important; }
  @media (max-width: 1100px) {
    .wall-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .wall-grid  { grid-template-columns: repeat(3,1fr) !important; }
  }
  @media (max-width: 768px) {
    .wall-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .wall-grid  { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 500px) {
    .wall-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .wall-grid  { grid-template-columns: 1fr !important; }
  }
`

export default function ContentWall() {
  const headReveal = useScrollReveal({ threshold: 0.1 })
  const gridReveal = useScrollReveal({ threshold: 0.04 })

  useEffect(() => {
    if (document.getElementById('content-wall-styles')) return
    const s = document.createElement('style')
    s.id = 'content-wall-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const cols = [0,1,2,3].map(c => CARDS.filter(card => card.col === c))

  return (
    <section
      id="content-wall"
      style={{
        position:'relative', background:'#080808',
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        overflow:'hidden',
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position:'absolute', top:'25%', left:'10%',
        width:'500px', height:'500px', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(59,255,108,0.05) 0%, transparent 70%)',
        filter:'blur(60px)', pointerEvents:'none', zIndex:0,
        animation:'wallGlow 9s ease-in-out infinite',
      }}/>
      <div aria-hidden="true" style={{
        position:'absolute', bottom:'15%', right:'8%',
        width:'380px', height:'380px', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)',
        filter:'blur(60px)', pointerEvents:'none', zIndex:0,
        animation:'wallGlow 11s ease-in-out infinite 3s',
      }}/>

      {/* ── Live ticker ── */}
      <div style={{
        background:'rgba(59,255,108,0.05)',
        borderBottom:'1px solid rgba(59,255,108,0.1)',
        padding:'10px 0', overflow:'hidden', position:'relative', zIndex:2,
      }}>
        <div style={{
          display:'flex', width:'max-content',
          animation:'tickerScroll 24s linear infinite',
        }}>
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
            <span key={i} style={{
              padding:'0 24px', whiteSpace:'nowrap',
              fontFamily:"'Plus Jakarta Sans', sans-serif",
              fontSize: item==='●'||item==='✦' ? '8px' : '11px',
              fontWeight:600,
              color: item==='✦' ? '#0f911e'
                   : item==='●' ? 'rgba(255,255,255,0.2)'
                   : 'rgba(255,255,255,0.4)',
              letterSpacing:'0.12em', textTransform:'uppercase',
            }}>{item}</span>
          ))}
        </div>
        {/* LIVE badge */}
        <div style={{
          position:'absolute', left:'16px', top:'50%',
          transform:'translateY(-50%)', zIndex:3,
          display:'flex', alignItems:'center', gap:'6px',
          background:'#080808', padding:'4px 10px',
          borderRadius:'100px', border:'1px solid rgba(59,255,108,0.2)',
        }}>
          <div style={{
            width:'6px', height:'6px', borderRadius:'50%', background:'#0f911e',
            animation:'livePulse 1.8s ease-in-out infinite',
          }}/>
          <span style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'10px', fontWeight:700,
            color:'#0f911e', letterSpacing:'0.15em', textTransform:'uppercase',
          }}>Live feed</span>
        </div>
      </div>

      {/* ── Header ── */}
      <div
        className="wall-inner"
        ref={headReveal.ref}
        style={{
          paddingLeft:'285px', paddingRight:'285px',
          paddingTop:'80px', paddingBottom:'56px',
          position:'relative', zIndex:2,
          opacity:   headReveal.isVisible ? 1 : 0,
          transform: headReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{
          display:'flex', alignItems:'flex-end',
          justifyContent:'space-between', flexWrap:'wrap', gap:'24px',
        }}>
          <div>
            <p style={{
              display:'flex', alignItems:'center', gap:'8px',
              fontSize:'11px', fontWeight:600, letterSpacing:'0.22em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.35)',
              marginBottom:'16px',
            }}>
              <span style={{color:'#0f911e'}}>✦</span> Our Work
            </p>
            <h2 style={{
              fontFamily:"'Plus Jakarta Sans', sans-serif",
              fontSize:'clamp(2.4rem,4.5vw,5rem)',
              fontWeight:800, lineHeight:1.0,
              letterSpacing:'-0.035em', color:'#ffffff', margin:0,
            }}>
              The work<br/>
              speaks{' '}
              <span style={{color:'#0f911e', fontStyle:'italic', fontWeight:400}}>
                for itself.
              </span>
            </h2>
          </div>

          {/* Platform pills */}
          {/* <div style={{display:'flex', gap:'8px', flexWrap:'wrap', alignSelf:'center'}}>
            {[
              {label:'Instagram', active:true},
              {label:'TikTok',    active:false},
              {label:'YouTube',   active:false},
              {label:'Web',       active:false},
            ].map(p => (
              <span key={p.label} style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'11px', fontWeight:600,
                letterSpacing:'0.1em', textTransform:'uppercase',
                color:      p.active ? '#0f911e' : 'rgba(255,255,255,0.4)',
                background: p.active ? 'rgba(59,255,108,0.1)' : 'rgba(255,255,255,0.04)',
                border:`1px solid ${p.active ? 'rgba(59,255,108,0.25)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius:'100px', padding:'6px 14px',
              }}>{p.label}</span>
            ))}
          </div> */}
        </div>
      </div>

      {/* ── Masonry grid ── */}
      <div
        className="wall-inner"
        ref={gridReveal.ref}
        style={{
          paddingLeft:'285px', paddingRight:'285px',
          paddingBottom:'0', position:'relative', zIndex:2,
        }}
      >
        <div
          className="wall-grid"
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:'10px', alignItems:'start',
          }}
        >
          {cols.map((colCards, colIdx) => (
            <div key={colIdx} style={{
              display:'flex', flexDirection:'column', gap:'10px',
              marginTop: colIdx % 2 === 1 ? '28px' : '0',
            }}>
              {colCards.map((card, ci) => (
                <div
                  key={ci}
                  className="wall-card"
                  style={{
                    animationName: gridReveal.isVisible
                      ? `wallCardIn, ${FLOAT_ANIMS[colIdx]}`
                      : 'none',
                    animationDuration:`0.7s, ${FLOAT_DURS[colIdx]}s`,
                    animationDelay:`${card.delay}s, ${card.delay + 0.7}s`,
                    animationTimingFunction:'cubic-bezier(0.16,1,0.3,1), ease-in-out',
                    animationFillMode:'both, none',
                    animationIterationCount:'1, infinite',
                    position:'relative',
                  }}
                >
                  {card.type === 'reel' && <ReelCard  card={card} />}
                  {card.type === 'post' && <PostCard  card={card} />}
                  {card.type === 'stat' && <StatCard  card={card} />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        height:'120px', marginTop:'-120px',
        background:'linear-gradient(to bottom, transparent, #0a0a0a)',
        position:'relative', zIndex:3, pointerEvents:'none',
      }}/>
    </section>
  )
}

// ── Reel ──
function ReelCard({ card }) {
  const videoRef  = useRef(null)
  const wrapRef   = useRef(null)
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
            vid.pause(); setPlaying(false)
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
        borderRadius:'14px', overflow:'hidden',
        position:'relative', aspectRatio:'9/16',
        background:'#1a1a1a',
        border:'1px solid rgba(255,255,255,0.07)',
      }}
    >
      <video
        ref={videoRef}
        poster={card.poster || undefined}
        muted loop playsInline preload="none"
        onLoadedData={() => setLoaded(true)}
        style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          opacity: loaded ? 1 : 0, transition:'opacity 0.4s ease',
        }}
      />

      {/* Poster until loaded */}
      {!loaded && (
        <div style={{
          position:'absolute', inset:0,
          background: card.poster
            ? `url(${card.poster}) center/cover`
            : 'linear-gradient(135deg, #1c1c1c, #222)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {!card.poster && (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </div>
      )}

      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
        pointerEvents:'none',
      }}/>

      {/* Tag */}
      <div style={{
        position:'absolute', top:'10px', left:'10px',
        background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
        borderRadius:'6px', padding:'4px 8px',
        border:'1px solid rgba(255,255,255,0.1)',
        display:'flex', alignItems:'center', gap:'5px',
      }}>
        <svg width="9" height="9" viewBox="0 0 24 24"
          fill={playing ? '#0f911e' : 'rgba(255,255,255,0.5)'}>
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'10px', fontWeight:700,
          color: playing ? '#0f911e' : 'rgba(255,255,255,0.6)',
          letterSpacing:'0.1em', textTransform:'uppercase',
        }}>{playing ? 'Playing' : 'Reel'}</span>
      </div>

      {/* Caption */}
      <div
        className="reel-caption"
        style={{
          position:'absolute', bottom:0, left:0, right:0,
          padding:'28px 14px 12px',
          opacity:0.5,
          transform:'translateY(4px)',
        }}
      >
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'12px', fontWeight:600,
          color:'rgba(255,255,255,0.85)',
          margin:0, lineHeight:1.4,
        }}>{card.caption}</p>
      </div>
    </div>
  )
}

// ── Post ──
function PostCard({ card }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:'14px', overflow:'hidden',
        position:'relative', aspectRatio:'4/5',
        background:'#1a1a1a',
        border:`1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.07)'}`,
        transition:'border-color 0.3s ease',
      }}
    >
      {card.image ? (
        <img src={card.image} alt={card.caption} style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition:'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}/>
      ) : (
        <div style={{
          width:'100%', height:'100%',
          background:'linear-gradient(160deg, #1c1c1c, #181818)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.08)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      )}

      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
        pointerEvents:'none',
      }}/>

      <div style={{
        position:'absolute', top:'10px', left:'10px',
        background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)',
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'6px', padding:'3px 8px',
      }}>
        <span style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'10px', fontWeight:700,
          color:'rgba(255,255,255,0.7)',
          letterSpacing:'0.1em', textTransform:'uppercase',
        }}>{card.tag}</span>
      </div>

      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'24px 14px 12px',
        transform: hovered ? 'translateY(0)' : 'translateY(3px)',
        transition:'transform 0.3s ease',
      }}>
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'12px', fontWeight:600,
          color:'rgba(255,255,255,0.85)',
          margin:'0 0 4px', lineHeight:1.4,
        }}>{card.caption}</p>
        <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
          <svg width="10" height="10" viewBox="0 0 24 24"
            fill="rgba(255,107,107,0.8)" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'11px', color:'rgba(255,255,255,0.35)',
          }}>{card.likes}</span>
        </div>
      </div>
    </div>
  )
}

// ── Stat ──
function StatCard({ card }) {
  return (
    <div style={{
      background:'linear-gradient(135deg, rgba(59,255,108,0.1) 0%, rgba(59,255,108,0.03) 100%)',
      border:'1px solid rgba(59,255,108,0.18)',
      borderRadius:'14px', padding:'28px 22px',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', top:'-16px', right:'-16px',
        width:'70px', height:'70px', borderRadius:'50%',
        background:'rgba(59,255,108,0.12)', filter:'blur(18px)',
        pointerEvents:'none',
      }}/>
      <div style={{
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        fontSize:'clamp(2.2rem,3.5vw,3rem)',
        fontWeight:900, color:'#0f911e',
        letterSpacing:'-0.04em', lineHeight:1, marginBottom:'8px',
      }}>{card.value}</div>
      <div style={{
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        fontSize:'13px', fontWeight:600,
        color:'rgba(255,255,255,0.7)', marginBottom:'3px',
      }}>{card.label}</div>
      <div style={{
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        fontSize:'11px', color:'rgba(255,255,255,0.28)',
        letterSpacing:'0.04em',
      }}>{card.sub}</div>
    </div>
  )
}