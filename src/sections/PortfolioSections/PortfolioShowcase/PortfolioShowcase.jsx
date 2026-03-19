import { useEffect, useRef, useState, useCallback } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const ALL_ITEMS = [
  { type:'reel', cat:'Reels', src:'/images/Home/Content/Reels/final xz.mp4', poster:null, title:'Iftar Campaign', client:'House of Gifts', span:1 },
  { type:'reel', cat:'Reels', src:'/images/Home/Content/Reels/Lavinia FInal.mp4', poster:null, title:'Cafe Promo', client:'Lavinia Deli & Cafe', span:1 },
  { type:'reel', cat:'Reels', src:'/images/Home/Content/Reels/reel 2.mp4', poster:null, title:'Restaurant Promo', client:'Mirissa Cafe & Bistro', span:1 },
  { type:'reel', cat:'Reels', src:'/images/Home/Content/Reels/reel.mp4', poster:null, title:'Home Decor Promo', client:'', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Delivery HOG Post.jpg', title:'Delivery Campaign', client:'House of Gifts', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Pickme ad uber.3.jpg', title:'Delivery Promotion', client:'House of Gifts', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 15.jpg', title:'Restaurant Promo', client:'MAYS TABLE', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 16.jpg', title:'Table Worth Discovering', client:'MAYS TABLE', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 18.jpg', title:"Colombo's Thai Secret", client:'MAYS TABLE', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 27.jpg', title:'Evening Starts Here', client:'Mirissa Cafe & Bistro', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 29.jpg', title:'Find Us', client:'Mirissa Cafe & Bistro', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 36.jpg', title:'Slice into Happiness', client:"Diltano's Wood Fired Pizza & Pasta", span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 60.jpg', title:'First Round is a Story', client:'Nidahas', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 61.jpg', title:'The Table is Waiting', client:'Nidahas', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 62.jpg', title:'Not Just a Bar', client:'Nidahas', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 212.jpg', title:'Exclusive', client:'MAYS TABLE', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 233.jpg', title:'Where Experiences Intersect', client:'THE SQUARE', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 304.jpg', title:'A Design That Understands You', client:'Residences', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 306.jpg', title:'Elevate Your Everyday Moments', client:'Residences', span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 318.jpg', title:'Five Star Feeling', client:'Residences', span:1 },
]

const FILTERS = ['All', 'Reels', 'Posts']

const STYLES = `
  @keyframes showcaseIn {
    from { opacity:0; transform: translateY(24px) scale(0.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes filterSlide {
    from { opacity:0; transform: translateX(-8px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes webBrowserBlink {
    0%,100% { background: rgba(59,255,108,0.6); }
    50%      { background: rgba(59,255,108,1); }
  }
  @keyframes lightboxIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes lightboxSlideIn {
    from { opacity:0; transform: scale(0.94) translateY(16px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  .showcase-card {
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .showcase-card:hover { transform: translateY(-6px) !important; z-index:5; }
  .card-overlay { transition: opacity 0.35s ease; }
  .showcase-card:hover .card-overlay { opacity:1 !important; }
  .lb-nav-btn {
    transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
  }
  .lb-nav-btn:hover { background: rgba(255,255,255,0.15) !important; transform: scale(1.08); }
  .lb-thumb {
    transition: border-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
    cursor: pointer;
  }
  .lb-thumb:hover { opacity: 1 !important; transform: scale(1.05); }
  @media (max-width: 1100px) {
    .showcase-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .showcase-grid  { grid-template-columns: repeat(3,1fr) !important; }
  }
  @media (max-width: 768px) {
    .showcase-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .showcase-grid  { grid-template-columns: repeat(2,1fr) !important; }
    .lb-media-wrap  { max-height: 60vw !important; min-height: 200px !important; }
    .lb-thumbs-row  { gap: 6px !important; }
    .lb-thumb-item  { width: 48px !important; height: 48px !important; }
    .lb-info-row    { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
  }
  @media (max-width: 500px) {
    .showcase-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .showcase-grid  { grid-template-columns: 1fr !important; }
    .lb-inner       { padding: 16px !important; }
    .lb-media-wrap  { max-height: 80vw !important; }
  }
`

export default function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [displayItems, setDisplayItems] = useState(ALL_ITEMS)
  const [animKey,      setAnimKey]      = useState(0)
  const [lightbox,     setLightbox]     = useState(null)  // { items, index }
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
    setDisplayItems(f === 'All' ? ALL_ITEMS : ALL_ITEMS.filter(item => item.cat === f))
  }

  const openLightbox = (items, index) => {
    setLightbox({ items, index })
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  return (
    <section
      id="portfolio-showcase"
      style={{ background:'#0a0a0a', fontFamily:"'Plus Jakarta Sans', sans-serif", paddingBottom:'120px', overflow:'hidden' }}
    >
      {/* Header */}
      <div
        className="showcase-inner"
        ref={headReveal.ref}
        style={{
          paddingLeft:'285px', paddingRight:'285px',
          paddingTop:'100px', paddingBottom:'60px',
          opacity: headReveal.isVisible ? 1 : 0,
          transform: headReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'32px' }}>
          <div>
            <p style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:'16px' }}>
              <span style={{color:'#0f911e'}}>✦</span> Selected Work
            </p>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(2.4rem,4.5vw,5rem)', fontWeight:800, lineHeight:1.0, letterSpacing:'-0.035em', color:'#ffffff', margin:0 }}>
              Every pixel.<br/>
              <span style={{color:'#0f911e', fontStyle:'italic', fontWeight:400}}>Every frame.</span>
            </h2>
          </div>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', alignSelf:'center' }}>
            {FILTERS.map((f, i) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                style={{
                  fontFamily:"'Plus Jakarta Sans', sans-serif",
                  fontSize:'12px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
                  color: activeFilter===f ? '#060606' : 'rgba(255,255,255,0.5)',
                  background: activeFilter===f ? '#0f911e' : 'rgba(255,255,255,0.05)',
                  border:`1px solid ${activeFilter===f ? '#0f911e' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius:'100px', padding:'10px 20px', cursor:'pointer',
                  transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  animation:`filterSlide 0.4s ease ${i*0.06}s both`,
                }}
                onMouseEnter={e => { if (activeFilter!==f) { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#ffffff' }}}
                onMouseLeave={e => { if (activeFilter!==f) { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(255,255,255,0.5)' }}}
              >{f}</button>
            ))}
          </div>
        </div>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'rgba(255,255,255,0.2)', marginTop:'24px', marginBottom:0, letterSpacing:'0.05em' }}>
          Showing {displayItems.length} {activeFilter==='All' ? 'works' : activeFilter.toLowerCase()}
        </p>
      </div>

      {/* Grid */}
      <div className="showcase-inner" style={{ paddingLeft:'285px', paddingRight:'285px' }}>
        <div key={animKey} className="showcase-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px', alignItems:'start' }}>
          {displayItems.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              style={{
                gridColumn: item.span > 1 ? `span ${Math.min(item.span, 2)}` : 'span 1',
                animation:`showcaseIn 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s both`,
              }}
            >
              {item.type === 'reel'  && <ReelCard  item={item} onClick={() => openLightbox(displayItems, i)} />}
              {item.type === 'photo' && <PhotoCard item={item} onClick={() => openLightbox(displayItems, i)} />}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          startIndex={lightbox.index}
          onClose={closeLightbox}
        />
      )}
    </section>
  )
}

// ─────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────
function Lightbox({ items, startIndex, onClose }) {
  const [index,     setIndex]     = useState(startIndex)
  const [animDir,   setAnimDir]   = useState(null)  // 'left' | 'right'
  const [isAnimating, setAnimating] = useState(false)
  const thumbsRef = useRef(null)
  const touchStartX = useRef(null)

  const current = items[index]

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft')  go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  // Scroll active thumb into view
  useEffect(() => {
    const row = thumbsRef.current
    if (!row) return
    const active = row.children[index]
    if (active) active.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' })
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

  // Touch/swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  const slideStyle = {
    opacity:    animDir ? 0 : 1,
    transform:  animDir
      ? `translateX(${animDir === 'right' ? '-40px' : '40px'}) scale(0.97)`
      : 'translateX(0) scale(1)',
    transition: animDir ? 'none' : 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
  }

  return (
    <div
      style={{
        position:'fixed', inset:0, zIndex:1000,
        background:'rgba(0,0,0,0.92)',
        backdropFilter:'blur(12px)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        animation:'lightboxIn 0.3s ease',
        fontFamily:"'Plus Jakarta Sans', sans-serif",
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
          position:'relative',
          width:'100%', maxWidth:'900px',
          padding:'24px',
          display:'flex', flexDirection:'column',
          gap:'16px',
          animation:'lightboxSlideIn 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position:'absolute', top:'0', right:'8px',
            width:'40px', height:'40px', borderRadius:'50%',
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.12)',
            color:'#ffffff', fontSize:'18px',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', zIndex:10,
            transition:'background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Counter */}
        <div style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'11px', fontWeight:600, letterSpacing:'0.2em',
          color:'rgba(255,255,255,0.3)', textTransform:'uppercase',
          textAlign:'center',
        }}>
          {String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}
        </div>

        {/* Main media */}
        <div
          className="lb-media-wrap"
          style={{
            position:'relative',
            width:'100%',
            maxHeight:'65vh',
            minHeight:'280px',
            borderRadius:'12px',
            overflow:'hidden',
            background:'#111',
            display:'flex', alignItems:'center', justifyContent:'center',
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
                width:'100%', height:'100%',
                objectFit:'contain', display:'block',
                maxHeight:'65vh',
              }}
            />
          )}

          {/* Prev / Next arrows */}
          <button
            className="lb-nav-btn"
            onClick={() => go(-1)}
            style={{
              position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)',
              width:'44px', height:'44px', borderRadius:'50%',
              background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.12)',
              color:'#ffffff', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              zIndex:5,
            }}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            className="lb-nav-btn"
            onClick={() => go(1)}
            style={{
              position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
              width:'44px', height:'44px', borderRadius:'50%',
              background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.12)',
              color:'#ffffff', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              zIndex:5,
            }}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Info row */}
        <div
          className="lb-info-row"
          style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px' }}
        >
          <div>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'16px', fontWeight:700, color:'#ffffff', margin:'0 0 2px' }}>
              {current.title}
            </p>
            {current.client && (
              <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'rgba(255,255,255,0.4)', margin:0 }}>
                {current.client}
              </p>
            )}
          </div>
          <span style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
            color: current.type === 'reel' ? '#0f911e' : 'rgba(255,255,255,0.5)',
            background: current.type === 'reel' ? 'rgba(59,255,108,0.1)' : 'rgba(255,255,255,0.06)',
            border:`1px solid ${current.type==='reel' ? 'rgba(59,255,108,0.25)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius:'100px', padding:'5px 12px', flexShrink:0,
          }}>
            {current.type === 'reel' ? '▶ Reel' : '◻ Photo'}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div
          ref={thumbsRef}
          className="lb-thumbs-row"
          style={{
            display:'flex', gap:'8px',
            overflowX:'auto', paddingBottom:'4px',
            scrollbarWidth:'none',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="lb-thumb lb-thumb-item"
              onClick={() => { setAnimDir(i > index ? 'right' : 'left'); setTimeout(() => { setIndex(i); setAnimDir(null) }, 220) }}
              style={{
                width:'56px', height:'56px', flexShrink:0,
                borderRadius:'8px', overflow:'hidden',
                border:`2px solid ${i===index ? '#0f911e' : 'rgba(255,255,255,0.08)'}`,
                opacity: i===index ? 1 : 0.45,
                background:'#1a1a1a',
              }}
            >
              {item.type === 'reel' ? (
                <div style={{
                  width:'100%', height:'100%',
                  background:'#1a1a1a',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={i===index ? '#0f911e' : 'rgba(255,255,255,0.4)'}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              ) : (
                <img src={item.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              )}
            </div>
          ))}
        </div>

        {/* Swipe hint on mobile */}
        <p style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif",
          fontSize:'11px', color:'rgba(255,255,255,0.18)',
          textAlign:'center', margin:0, letterSpacing:'0.05em',
        }}>
          ← swipe or use arrow keys →
        </p>
      </div>
    </div>
  )
}

// Video inside lightbox — autoPlays, has controls
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
      muted
      loop
      playsInline
      controls
      style={{
        width:'100%',
        maxHeight:'65vh',
        objectFit:'contain',
        display:'block',
        background:'#000',
      }}
    />
  )
}

// ─────────────────────────────────────────────────
// REEL CARD (grid)
// ─────────────────────────────────────────────────
function ReelCard({ item, onClick }) {
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
    }, { threshold: 0.3, rootMargin:'200px' })
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
        borderRadius:'14px', overflow:'hidden',
        aspectRatio:'9/16', position:'relative',
        background:'#141414',
        border:`1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
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
      {!loaded && (
        <div style={{
          position:'absolute', inset:0, zIndex:1,
          background: item.poster ? `url(${item.poster}) center/cover` : 'linear-gradient(160deg, #1a1a1a, #111)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {!item.poster && (
            <div style={{ width:'48px', height:'48px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          )}
        </div>
      )}
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }}/>

      {/* Playing tag */}
      <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:3, display:'flex', alignItems:'center', gap:'5px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', padding:'4px 8px' }}>
        <div style={{ width:'6px', height:'6px', borderRadius:'50%', background: playing ? '#0f911e' : 'rgba(255,255,255,0.3)', transition:'background 0.3s ease', ...(playing ? {animation:'webBrowserBlink 1.5s ease-in-out infinite'} : {}) }}/>
        <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'10px', fontWeight:700, color: playing ? '#0f911e' : 'rgba(255,255,255,0.5)', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color 0.3s ease' }}>
          {playing ? 'Live' : 'Reel'}
        </span>
      </div>

      {/* Expand hint on hover */}
      <div className="card-overlay" style={{ position:'absolute', inset:0, zIndex:3, display:'flex', alignItems:'center', justifyContent:'center', opacity: hovered ? 1 : 0, background:'rgba(0,0,0,0.3)' }}>
        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </div>
      </div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:3, padding:'20px 16px 16px' }}>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', fontWeight:700, color:'#ffffff', margin:'0 0 2px' }}>{item.title}</p>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:0 }}>{item.client}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// PHOTO CARD (grid)
// ─────────────────────────────────────────────────
function PhotoCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="showcase-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:'14px', overflow:'hidden',
        aspectRatio: item.span > 1 ? '16/9' : '4/5',
        position:'relative', background:'#141414',
        border:`1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      {item.image ? (
        <img src={item.image} alt={item.title} style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}/>
      ) : (
        <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg, #1c1c1c, #141414)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      )}

      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }}/>

      <div style={{ position:'absolute', top:'12px', left:'12px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', padding:'3px 10px' }}>
        <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.6)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Photo</span>
      </div>

      {/* Expand hint */}
      <div className="card-overlay" style={{ position:'absolute', inset:0, zIndex:3, display:'flex', alignItems:'center', justifyContent:'center', opacity: hovered ? 1 : 0, background:'rgba(0,0,0,0.3)' }}>
        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </div>
      </div>

      <div className="card-overlay" style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 16px 16px', opacity: hovered ? 1 : 0.7 }}>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', fontWeight:700, color:'#ffffff', margin:'0 0 2px' }}>{item.title}</p>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:0 }}>{item.client}</p>
      </div>
    </div>
  )
}