import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { ALL_ITEMS, FILTERS, SHOWCASE_STYLES } from './portfolioData'
import ReelCard  from './ReelCard'
import PhotoCard from './PhotoCard'
import Lightbox  from './Lightbox'

export default function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [displayItems, setDisplayItems] = useState(ALL_ITEMS)
  const [animKey,      setAnimKey]      = useState(0)
  const [lightbox,     setLightbox]     = useState(null) // { items, index }
  const headReveal = useScrollReveal({ threshold: 0.1 })

  // Inject styles once
  useEffect(() => {
    if (document.getElementById('showcase-styles')) return
    const s = document.createElement('style')
    s.id = 'showcase-styles'
    s.textContent = SHOWCASE_STYLES
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
      style={{
        background:  '#0a0a0a',
        fontFamily:  "'Plus Jakarta Sans', sans-serif",
        paddingBottom:'120px',
        overflow:    'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        className="showcase-inner"
        ref={headReveal.ref}
        style={{
          paddingLeft:   '285px',
          paddingRight:  '285px',
          paddingTop:    '100px',
          paddingBottom: '60px',
          opacity:       headReveal.isVisible ? 1 : 0,
          transform:     headReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition:    'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '32px',
        }}>
          <div>
            <p style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
              marginBottom:  '16px',
            }}>
              <span style={{ color: '#0f911e' }}>✦</span> Selected Work
            </p>
            <h2 style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(2.4rem, 4.5vw, 5rem)',
              fontWeight:    800,
              lineHeight:    1.0,
              letterSpacing: '-0.035em',
              color:         '#ffffff',
              margin:        0,
            }}>
              Every pixel.<br/>
              <span style={{ color: '#0f911e', fontStyle: 'italic', fontWeight: 400 }}>
                Every frame.
              </span>
            </h2>
          </div>

          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignSelf: 'center' }}>
            {FILTERS.map((f, i) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                style={{
                  fontFamily:    "'Plus Jakarta Sans', sans-serif",
                  fontSize:      '12px',
                  fontWeight:    700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         activeFilter === f ? '#060606' : 'rgba(255,255,255,0.5)',
                  background:    activeFilter === f ? '#0f911e' : 'rgba(255,255,255,0.05)',
                  border:        `1px solid ${activeFilter === f ? '#0f911e' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius:  '100px',
                  padding:       '10px 20px',
                  cursor:        'pointer',
                  transition:    'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  animation:     `filterSlide 0.4s ease ${i * 0.06}s both`,
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

        <p style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '13px',
          color:         'rgba(255,255,255,0.2)',
          marginTop:     '24px',
          marginBottom:  0,
          letterSpacing: '0.05em',
        }}>
          Showing {displayItems.length} {activeFilter === 'All' ? 'works' : activeFilter.toLowerCase()}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="showcase-inner" style={{ paddingLeft: '285px', paddingRight: '285px' }}>
        <div
          key={animKey}
          className="showcase-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '12px',
            alignItems:          'start',
          }}
        >
          {displayItems.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              style={{
                gridColumn: item.span > 1 ? `span ${Math.min(item.span, 2)}` : 'span 1',
                animation:  `showcaseIn 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
              }}
            >
              {item.type === 'reel'  && (
                <ReelCard  item={item} onClick={() => openLightbox(displayItems, i)} />
              )}
              {item.type === 'photo' && (
                <PhotoCard item={item} onClick={() => openLightbox(displayItems, i)} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
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