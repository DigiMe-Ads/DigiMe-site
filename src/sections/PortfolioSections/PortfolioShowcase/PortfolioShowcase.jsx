import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const ALL_ITEMS = [
  // ── Reels ──
  {
    type:'reel',    
    cat:'Reels',
    src:null,       
    poster:null,
    title:'Brand Launch Reel',
    client:'FreshBrew Co.',
    span:1,
  },
  {
    type:'reel',    
    cat:'Reels',
    src:null,       
    poster:null,
    title:'Product Campaign',
    client:'Apex Sneakers',
    span:1,
  },
  {
    type:'reel',    
    cat:'Reels',
    src:null,       
    poster:null,
    title:'Brand Film',
    client:'Velour Studio',
    span:1,
  },
  {
    type:'reel',    
    cat:'Reels',
    src:null,       
    poster:null,
    title:'Motion Graphics',
    client:'NOX Label',
    span:1,
  },
  // ── Photography ──
  {
    type:'photo',   
    cat:'Photography',
    image:null,
    title:'Product Series',
    client:'Velour Studio',
    span:2,        // wide card
  },
  {
    type:'photo',   
    cat:'Photography',
    image:null,
    title:'Editorial Campaign',
    client:'NOX Label',
    span:1,
  },
  {
    type:'photo',   
    cat:'Photography',
    image:null,
    title:'Brand Identity Shoot',
    client:'FreshBrew Co.',
    span:1,
  },
  {
    type:'photo',   
    cat:'Photography',
    image:null,
    title:'Street Campaign',
    client:'Apex Sneakers',
    span:1,
  },
  // ── Web Design ──
  {
    type:'web',     
    cat:'Web',
    image:null,     // screenshot of site
    title:'E-Commerce Redesign',
    client:'Velour Studio',
    url:'#',
    tech:['React','Three.js','Framer'],
    span:2,
  },
  {
    type:'web',     
    cat:'Web',
    image:null,
    title:'Agency Site',
    client:'NOX Creative',
    url:'#',
    tech:['Next.js','GSAP'],
    span:1,
  },
  {
    type:'web',     
    cat:'Web',
    image:null,
    title:'Brand Landing Page',
    client:'FreshBrew Co.',
    url:'#',
    tech:['React','Vite'],
    span:1,
  },
]

const FILTERS = ['All', 'Reels', 'Photography', 'Web']

const STYLES = `
  @keyframes showcaseIn {
    from { opacity:0; transform: translateY(24px) scale(0.97); }
    to   { opacity:1; transform: translateY(0)     scale(1);    }
  }
  @keyframes filterSlide {
    from { opacity:0; transform: translateX(-8px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes webBrowserBlink {
    0%,100% { background: rgba(59,255,108,0.6); }
    50%      { background: rgba(59,255,108,1); }
  }
  .showcase-card {
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .showcase-card:hover { transform: translateY(-6px) !important; z-index:5; }
  .card-overlay { transition: opacity 0.35s ease; }
  .showcase-card:hover .card-overlay { opacity:1 !important; }
  .web-visit-btn {
    transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }
  .web-visit-btn:hover { background: #3bff6c !important; color: #060606 !important; transform: translateY(-2px); }
  @media (max-width: 1100px) {
    .showcase-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .showcase-grid  { grid-template-columns: repeat(3,1fr) !important; }
  }
  @media (max-width: 768px) {
    .showcase-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .showcase-grid  { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 500px) {
    .showcase-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .showcase-grid  { grid-template-columns: 1fr !important; }
  }
`

export default function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [displayItems, setDisplayItems] = useState(ALL_ITEMS)
  const [animKey,      setAnimKey]      = useState(0)
  const headReveal = useScrollReveal({ threshold: 0.1 })

  useEffect(() => {
    if (document.getElementById('showcase-styles')) return
    const s = document.createElement('style')
    s.id = 'showcase-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const handleFilter = (f) => {
    setActiveFilter(f)
    setAnimKey(k => k + 1)
    setDisplayItems(
      f === 'All' ? ALL_ITEMS : ALL_ITEMS.filter(item => item.cat === f)
    )
  }

  return (
    <section
      id="portfolio-showcase"
      style={{
        background:'#0a0a0a',
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        paddingBottom:'120px', overflow:'hidden',
      }}
    >

      {/* ── Header + filters ── */}
      <div
        className="showcase-inner"
        ref={headReveal.ref}
        style={{
          paddingLeft:'285px', paddingRight:'285px',
          paddingTop:'100px', paddingBottom:'60px',
          opacity:   headReveal.isVisible ? 1 : 0,
          transform: headReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{
          display:'flex', alignItems:'flex-end',
          justifyContent:'space-between', flexWrap:'wrap', gap:'32px',
        }}>
          <div>
            <p style={{
              display:'flex', alignItems:'center', gap:'8px',
              fontSize:'11px', fontWeight:600, letterSpacing:'0.22em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.35)',
              marginBottom:'16px',
            }}>
              <span style={{color:'#3bff6c'}}>✦</span> Selected Work
            </p>
            <h2 style={{
              fontFamily:"'Plus Jakarta Sans', sans-serif",
              fontSize:'clamp(2.4rem,4.5vw,5rem)',
              fontWeight:800, lineHeight:1.0,
              letterSpacing:'-0.035em', color:'#ffffff', margin:0,
            }}>
              Every pixel.<br/>
              <span style={{color:'#3bff6c', fontStyle:'italic', fontWeight:400}}>
                Every frame.
              </span>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap', alignSelf:'center'}}>
            {FILTERS.map((f, i) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                style={{
                  fontFamily:"'Plus Jakarta Sans', sans-serif",
                  fontSize:'12px', fontWeight:700,
                  letterSpacing:'0.1em', textTransform:'uppercase',
                  color:      activeFilter===f ? '#060606' : 'rgba(255,255,255,0.5)',
                  background: activeFilter===f ? '#3bff6c' : 'rgba(255,255,255,0.05)',
                  border:`1px solid ${activeFilter===f ? '#3bff6c' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius:'100px', padding:'10px 20px',
                  cursor:'pointer',
                  transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  animation:`filterSlide 0.4s ease ${i*0.06}s both`,
                }}
                onMouseEnter={e => {
                  if (activeFilter !== f) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = '#ffffff'
                  }
                }}
                onMouseLeave={e => {
                  if (activeFilter !== f) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'13px', color:'rgba(255,255,255,0.2)',
          marginTop:'24px', marginBottom:0,
          letterSpacing:'0.05em',
        }}>
          Showing {displayItems.length} {activeFilter === 'All' ? 'works' : activeFilter.toLowerCase()}
        </p>
      </div>

      {/* ── Grid ── */}
      <div
        className="showcase-inner"
        style={{ paddingLeft:'285px', paddingRight:'285px' }}
      >
        <div
          key={animKey}
          className="showcase-grid"
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(4, 1fr)',
            gap:'12px',
            alignItems:'start',
          }}
        >
          {displayItems.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              style={{
                gridColumn: item.span > 1 ? `span ${Math.min(item.span, 2)}` : 'span 1',
                animation:`showcaseIn 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s both`,
              }}
            >
              {item.type === 'reel'  && <ReelCard  item={item} />}
              {item.type === 'photo' && <PhotoCard item={item} />}
              {item.type === 'web'   && <WebCard   item={item} />}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────────
// REEL CARD
// ─────────────────────────────────────────────────
function ReelCard({ item }) {
  const videoRef  = useRef(null)
  const wrapRef   = useRef(null)
  const [loaded,   setLoaded]   = useState(false)
  const [playing,  setPlaying]  = useState(false)
  const [hovered,  setHovered]  = useState(false)

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
    }, { threshold: 0.3, rootMargin:'200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.src])

  return (
    <div
      ref={wrapRef}
      className="showcase-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:'14px', overflow:'hidden',
        aspectRatio:'9/16', position:'relative',
        background:'#141414',
        border:`1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
        cursor:'default',
      }}
    >
      <video
        ref={videoRef}
        poster={item.poster || undefined}
        muted loop playsInline preload="none"
        onLoadedData={() => setLoaded(true)}
        style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          opacity: loaded ? 1 : 0, transition:'opacity 0.5s ease',
        }}
      />

      {/* Poster fallback */}
      {!loaded && (
        <div style={{
          position:'absolute', inset:0, zIndex:1,
          background: item.poster
            ? `url(${item.poster}) center/cover`
            : 'linear-gradient(160deg, #1a1a1a, #111)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {!item.poster && (
            <div style={{
              width:'48px', height:'48px', borderRadius:'50%',
              border:'1px solid rgba(255,255,255,0.1)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24"
                fill="rgba(255,255,255,0.2)">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Overlays */}
      <div style={{
        position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
      }}/>

      {/* Playing indicator */}
      <div style={{
        position:'absolute', top:'12px', left:'12px', zIndex:3,
        display:'flex', alignItems:'center', gap:'5px',
        background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'6px', padding:'4px 8px',
      }}>
        <div style={{
          width:'6px', height:'6px', borderRadius:'50%',
          background: playing ? '#3bff6c' : 'rgba(255,255,255,0.3)',
          transition:'background 0.3s ease',
          ...(playing ? {animation:'webBrowserBlink 1.5s ease-in-out infinite'} : {}),
        }}/>
        <span style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'10px', fontWeight:700,
          color: playing ? '#3bff6c' : 'rgba(255,255,255,0.5)',
          letterSpacing:'0.1em', textTransform:'uppercase',
          transition:'color 0.3s ease',
        }}>{playing ? 'Live' : 'Reel'}</span>
      </div>

      {/* Info */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, zIndex:3, padding:'20px 16px 16px'}}>
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'13px', fontWeight:700, color:'#ffffff',
          margin:'0 0 2px',
        }}>{item.title}</p>
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:0,
        }}>{item.client}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// PHOTO CARD
// ─────────────────────────────────────────────────
function PhotoCard({ item }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="showcase-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:'14px', overflow:'hidden',
        aspectRatio: item.span > 1 ? '16/9' : '4/5',
        position:'relative', background:'#141414',
        border:`1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
        cursor:'default',
      }}
    >
      {item.image ? (
        <img src={item.image} alt={item.title} style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}/>
      ) : (
        <div style={{
          width:'100%', height:'100%',
          background:'linear-gradient(160deg, #1c1c1c, #141414)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      )}

      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)',
      }}/>

      {/* Category tag */}
      <div style={{
        position:'absolute', top:'12px', left:'12px',
        background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'6px', padding:'3px 10px',
      }}>
        <span style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'10px', fontWeight:700,
          color:'rgba(255,255,255,0.6)',
          letterSpacing:'0.1em', textTransform:'uppercase',
        }}>Photo</span>
      </div>

      {/* Info */}
      <div
        className="card-overlay"
        style={{
          position:'absolute', bottom:0, left:0, right:0,
          padding:'24px 16px 16px', opacity: hovered ? 1 : 0.7,
        }}
      >
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'13px', fontWeight:700, color:'#ffffff',
          margin:'0 0 2px',
        }}>{item.title}</p>
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:0,
        }}>{item.client}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// WEB CARD — the showcase for dev capability
// ─────────────────────────────────────────────────
function WebCard({ item }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="showcase-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:'14px', overflow:'hidden',
        position:'relative', background:'#0e0e0e',
        border:`1px solid ${hovered ? 'rgba(59,255,108,0.3)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,255,108,0.1)'
          : 'none',
        cursor:'default',
      }}
    >
      {/* Fake browser chrome */}
      <div style={{
        background:'#1a1a1a',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        padding:'10px 14px',
        display:'flex', alignItems:'center', gap:'10px',
      }}>
        {/* Traffic lights */}
        <div style={{display:'flex', gap:'5px'}}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
            <div key={i} style={{
              width:'10px', height:'10px', borderRadius:'50%', background:c,
            }}/>
          ))}
        </div>
        {/* URL bar */}
        <div style={{
          flex:1, background:'rgba(255,255,255,0.05)',
          borderRadius:'4px', padding:'4px 10px',
          display:'flex', alignItems:'center', gap:'6px',
        }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.25)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'10px', color:'rgba(255,255,255,0.25)',
          }}>
            {item.client.toLowerCase().replace(/\s+/g,'-')}.com
          </span>
          {/* Live dot */}
          <div style={{
            marginLeft:'auto', width:'5px', height:'5px', borderRadius:'50%',
            background:'#3bff6c', opacity:0.7,
            animation:'webBrowserBlink 2s ease-in-out infinite',
          }}/>
        </div>
      </div>

      {/* Screenshot */}
      <div style={{
        aspectRatio: item.span > 1 ? '16/9' : '4/5',
        position:'relative', overflow:'hidden',
      }}>
        {item.image ? (
          <img src={item.image} alt={item.title} style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
            transform: hovered ? 'scale(1.03) translateY(-1%)' : 'scale(1)',
            transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}/>
        ) : (
          <div style={{
            width:'100%', height:'100%',
            background:'linear-gradient(160deg, #121212, #0e0e0e)',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:'12px',
          }}>
            {/* Fake UI wireframe */}
            <div style={{width:'70%', height:'8px', borderRadius:'4px',
              background:'rgba(59,255,108,0.1)'}}/>
            <div style={{width:'50%', height:'6px', borderRadius:'4px',
              background:'rgba(255,255,255,0.05)'}}/>
            <div style={{width:'60%', height:'6px', borderRadius:'4px',
              background:'rgba(255,255,255,0.04)'}}/>
            <div style={{
              marginTop:'8px',
              width:'80px', height:'28px', borderRadius:'6px',
              background:'rgba(59,255,108,0.12)',
              border:'1px solid rgba(59,255,108,0.2)',
            }}/>
          </div>
        )}

        {/* Hover overlay with visit button */}
        <div
          className="card-overlay"
          style={{
            position:'absolute', inset:0, zIndex:2,
            background:'rgba(0,0,0,0.6)',
            backdropFilter:'blur(2px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            opacity: hovered ? 1 : 0,
          }}
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="web-visit-btn"
            style={{
              fontFamily:"'Plus Jakarta Sans', sans-serif",
              fontSize:'13px', fontWeight:700,
              color:'rgba(255,255,255,0.9)',
              background:'rgba(255,255,255,0.08)',
              border:'1px solid rgba(255,255,255,0.2)',
              borderRadius:'100px', padding:'12px 24px',
              textDecoration:'none',
              display:'flex', alignItems:'center', gap:'8px',
              cursor:'pointer',
            }}
          >
            Visit Site
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Footer info */}
      <div style={{
        padding:'14px 16px',
        borderTop:'1px solid rgba(255,255,255,0.05)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div>
          <p style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'13px', fontWeight:700, color:'#ffffff', margin:'0 0 2px',
          }}>{item.title}</p>
          <p style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'11px', color:'rgba(255,255,255,0.35)', margin:0,
          }}>{item.client}</p>
        </div>
        {/* Tech stack pills */}
        <div style={{display:'flex', gap:'4px', flexWrap:'wrap', justifyContent:'flex-end'}}>
          {item.tech.map(t => (
            <span key={t} style={{
              fontFamily:"'Plus Jakarta Sans', sans-serif",
              fontSize:'9px', fontWeight:700,
              letterSpacing:'0.08em', textTransform:'uppercase',
              color:'rgba(59,255,108,0.7)',
              background:'rgba(59,255,108,0.08)',
              border:'1px solid rgba(59,255,108,0.15)',
              borderRadius:'4px', padding:'2px 7px',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}