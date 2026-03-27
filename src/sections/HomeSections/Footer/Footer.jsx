import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const QUICK_LINKS = [
  { label: 'About Us',     to: '/about'     },
  { label: 'Our Team',     to: '/team'      },
  { label: 'Portfolio',      to: '/portfolio'   },
  { label: 'Contact Us',   to: '/contact'   },
]

const OUR_SOLUTIONS = [
  'Social Media Management',
  'Web Development & UI/UX Design',
  'Video Production',
  'Search Engine Optimisation',
  'Photgraphy',
]

// const STAY_WITH_US = [
//   { label: 'Behance',  url: 'https://www.behance.net/'  },
//   { label: 'Upwork',   url: 'https://www.upwork.com/'   },
//   { label: 'Dribbble', url: 'https://dribbble.com/'     },
//   { label: 'Fiverr',   url: 'https://www.fiverr.com/'   },
// ]

const SOCIALS = [
  {
    label: 'Facebook',
    url:   'https://www.facebook.com/digimeads',   // ← replace with actual URL
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    url:   'https://www.instagram.com/digime_ads?igsh=a3c2ZXdwcmFnNnd5',  // ← replace with actual URL
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url:   'https://www.linkedin.com/company/digime-ads', // ← replace with actual URL
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

const STYLES = `
  @keyframes footerBlobFloat {
    0%, 100% { transform: translateY(0px)   rotate(0deg);  }
    50%       { transform: translateY(-12px) rotate(8deg);  }
  }
  .footer-navlink {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    display: block;
    padding: 5px 0;
    transition: color 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .footer-navlink:hover { color: #ffffff; }
  .footer-solution-item {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    display: block;
    padding: 5px 0;
    transition: color 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .footer-pill-btn {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 6px 18px;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: 8px;
    transition: background 0.2s ease, color 0.2s ease;
    text-decoration: none;
  }
  .footer-pill-btn:hover { background: rgba(255,255,255,0.1); color: #ffffff; }
  .footer-social-btn {
    width: 36px; height: 36px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.6);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .footer-social-btn:hover { background: rgba(255,255,255,0.12); color: #ffffff; border-color: rgba(255,255,255,0.25); }
  @media (max-width: 1200px) {
    .footer-card { margin-left: 60px !important; margin-right: 60px !important; }
  }
  @media (max-width: 992px) {
    .footer-card   { margin-left: 32px !important; margin-right: 32px !important; }
    .footer-cols   { flex-wrap: wrap !important; }
    .footer-brand  { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding-bottom: 32px !important; margin-bottom: 32px !important; }
    .footer-col    { min-width: 140px !important; }
  }
  @media (max-width: 768px) {
    .footer-card      { margin-left: 16px !important; margin-right: 16px !important; padding: 0 !important; }
    .footer-cta-text  { font-size: clamp(1.6rem, 5vw, 2.4rem) !important; }
    .footer-cta-inner { padding: 32px 24px !important; }
    .footer-body      { padding: 32px 24px !important; }
  }
`

export default function Footer() {
  const colsReveal = useScrollReveal({ threshold: 0.1 })

  useEffect(() => {
    if (document.getElementById('footer-styles')) return
    const s = document.createElement('style')
    s.id = 'footer-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <footer
      style={{
        background: '#0a0a0a',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >

      {/* ── Big rounded card ── */}
      <div
        className="footer-card"
        style={{
          marginLeft:   '120px',
          marginRight:  '120px',
          borderRadius: '20px',
          overflow:     'hidden',
          background:   '#111111',
          border:       '1px solid rgba(255,255,255,0.07)',
          position:     'relative',
        }}
      >

        {/* ── Green/teal glow — top left ── */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          top:           '-10%',
          left:          '-5%',
          width:         '45%',
          height:        '70%',
          background:    'radial-gradient(ellipse at top left, rgba(20,140,80,0.4) 0%, rgba(10,80,50,0.15) 40%, transparent 70%)',
          filter:        'blur(40px)',
          pointerEvents: 'none',
          zIndex:        0,
        }} />

        {/* ── Green glow — bottom right (behind blob) ── */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          bottom:        '-10%',
          right:         '-5%',
          width:         '35%',
          height:        '60%',
          background:    'radial-gradient(ellipse at bottom right, rgba(20,200,120,0.3) 0%, rgba(10,120,70,0.1) 50%, transparent 70%)',
          filter:        'blur(50px)',
          pointerEvents: 'none',
          zIndex:        0,
        }} />

        {/* ── CTA banner ── */}
        <div
          className="footer-cta-inner"
          style={{
            position:      'relative',
            zIndex:        1,
            display:       'flex',
            alignItems:    'center',
            justifyContent:'space-between',
            padding:       '48px 60px 44px',
            borderBottom:  '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2
            className="footer-cta-text"
            style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     'clamp(2rem, 4vw, 3.5rem)',
              fontWeight:   700,
              color:        '#ffffff',
              margin:       0,
              lineHeight:   1.1,
              letterSpacing:'-0.02em',
            }}
          >
            Let's Start a Project
          </h2>

          {/* Arrow button */}
          <button
            style={{
              width:          '72px',
              height:         '72px',
              borderRadius:   '50%',
              background:     '#1c1c1c',
              border:         '1px solid rgba(255,255,255,0.1)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              cursor:         'pointer',
              flexShrink:     0,
              transition:     'background 0.25s ease, transform 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background  = '#0f911e'
              e.currentTarget.style.transform   = 'rotate(45deg) scale(1.05)'
              e.currentTarget.querySelector('svg').style.color = '#0a0a0a'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background  = '#1c1c1c'
              e.currentTarget.style.transform   = 'none'
              e.currentTarget.querySelector('svg').style.color = '#ffffff'
            }}
            aria-label="Start a project"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: '#ffffff', transition: 'color 0.25s ease' }}>
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </button>
        </div>

        {/* ── Footer columns body ── */}
        <div
          className="footer-body"
          ref={colsReveal.ref}
          style={{
            position:  'relative',
            zIndex:    1,
            padding:   '48px 60px 52px',
            opacity:   colsReveal.isVisible ? 1 : 0,
            transform: colsReveal.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div
            className="footer-cols"
            style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}
          >

            
            {/* Brand col */}
            <div
              className="footer-brand"
              style={{
                width:       '240px',
                flexShrink:  0,
                paddingRight:'40px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                display:     'flex',
                flexDirection:'column',
                alignItems:  'flex-start',    // ← left-align everything
                paddingTop:  '-50px',
                marginTop:   '-30px',            // ← top-aligned with columns beside it
              }}
            >
              {/* Logo */}
              <img
                src="/images/Logo.png"
                alt="DigiMeAds"
                style={{ height: '80px', width: 'auto', marginBottom: '16px', marginLeft: '-30px' }}
              />

              <p style={{
                fontSize:     '13px',
                lineHeight:   '20px',
                color:        'rgba(255,255,255,0.35)',
                maxWidth:     '26ch',
                marginBottom: '24px',
                textAlign:    'left',
              }}>
                Helping businesses grow through creative strategy, modern design, and powerful
                digital solutions that connect brands with their audience.
              </p>

              {/* Social buttons — now anchor tags */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={s.label}
                    style={{ textDecoration: 'none' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links — internal routes */}
            <div className="footer-col" style={{ flex: 1 }}>
              <h5 style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '14px',
                fontWeight:   700,
                color:        '#ffffff',
                marginBottom: '20px',
                letterSpacing:'0.01em',
              }}>
                Quick Link
              </h5>
              {QUICK_LINKS.map(({ label, to }) => (
                <a key={label} href={to} className="footer-navlink">{label}</a>
              ))}
            </div>

            {/* Our Solutions — unlinked */}
            <div className="footer-col" style={{ flex: 1 }}>
              <h5 style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '14px',
                fontWeight:   700,
                color:        '#ffffff',
                marginBottom: '20px',
              }}>
                Our Solutions
              </h5>
              {OUR_SOLUTIONS.map(l => (
                <span key={l} className="footer-solution-item">{l}</span>
              ))}
            </div>

            {/* Stay with us — external URLs, open in new tab */}
            {/* <div className="footer-col" style={{ minWidth: '140px' }}>
              <h5 style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '14px',
                fontWeight:   700,
                color:        '#ffffff',
                marginBottom: '20px',
              }}>
                Stay with us
              </h5>
              {STAY_WITH_US.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-pill-btn"
                >
                  {label}
                </a>
              ))}
            </div> */}

            {/* 3D blob — bottom right corner */}
            <div style={{ position: 'relative', width: '120px', flexShrink: 0, alignSelf: 'flex-end' }}>
              <img
                src="/images/awards/fluid-3d.png"
                alt=""
                aria-hidden="true"
                style={{
                  width:     '120px',
                  height:    'auto',
                  display:   'block',
                  animation: 'footerBlobFloat 8s ease-in-out infinite',
                  filter:    'hue-rotate(120deg) saturate(1.4)',
                }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'block'
                }}
              />
              {/* Pure CSS fallback blob */}
              <div style={{
                display:      'none',
                width:        '100px',
                height:       '100px',
                borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
                background:   'linear-gradient(135deg, #1aff8c 0%, #00c97a 50%, #007a4a 100%)',
                opacity:      0.7,
                animation:    'footerBlobFloat 8s ease-in-out infinite',
              }} />
            </div>

          </div>
        </div>

      </div>

      {/* ── Copyright bar — outside the card ── */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '20px 120px',
        fontFamily:     "'Plus Jakarta Sans', sans-serif",
        fontSize:       '12px',
        color:          'rgba(255,255,255,0.25)',
      }}>
        <span>2026 DigiMe Ads, All Rights Reserved</span>
        {/* <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
          >
            Privacy Policy
          </a>
          <span style={{ opacity: 0.4 }}>|</span>
          <a href="#" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
          >
            Term of Service
          </a>
        </div> */}
      </div>

    </footer>
  )
}