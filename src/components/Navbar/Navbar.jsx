import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Home',       path: '/'         },
  { label: 'About Us',   path: '/about'    },
  { label: 'Services',   path: '/services' },
  { label: 'Pricing',    path: '/pricing'  },
  { label: 'Team',       path: '/team'     },
  { label: 'Contact Us', path: '/contact'  },
]

const STYLES = `
  @keyframes menuReveal {
    from { clip-path: inset(0 0 100% 0); }
    to   { clip-path: inset(0 0 0% 0);   }
  }
  @keyframes menuHide {
    from { clip-path: inset(0 0 0% 0);   }
    to   { clip-path: inset(0 0 100% 0); }
  }
  @keyframes menuLinkIn {
    from { opacity: 0; transform: translateY(40px) skewY(4deg); }
    to   { opacity: 1; transform: translateY(0)     skewY(0deg); }
  }
  @keyframes menuLinkOut {
    from { opacity: 1; transform: translateY(0)     skewY(0deg); }
    to   { opacity: 0; transform: translateY(-20px) skewY(-2deg); }
  }
  @keyframes menuInfoIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .menu-link-inner { display: block; transition: color 0.3s ease; }
  .menu-link-inner:hover { color: #0f911e !important; }
  .menu-link-inner:hover .menu-link-num { color: #0f911e !important; }

  /* ── Overlay responsive ── */
  .menu-overlay-body {
    display: flex;
    width: 100%;
    padding-top: 72px;
  }
  .menu-left-panel {
    flex: 1;
    padding: 60px 8% 60px 285px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow-y: auto;
  }
  .menu-right-panel {
    width: 340px;
    flex-shrink: 0;
    padding: 60px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
  }
  .menu-link-text {
    font-size: clamp(2rem, 5vw, 4.5rem);
  }

  .logo-size { height: 204px; }
  
  @media (max-width: 1200px) {
    .menu-left-panel  { padding-left: 120px !important; }
    .menu-right-panel { width: 280px !important; padding: 60px 32px !important; }
    .logo-size { height: 84px !important; }
  }
  @media (max-width: 992px) {
    .menu-left-panel  { padding-left: 60px !important; padding-right: 60px !important; border-right: none !important; }
    .menu-right-panel { display: none !important; }
    .menu-link-text   { font-size: clamp(2.2rem, 7vw, 3.5rem) !important; }
  }
  @media (max-width: 768px) {
    .menu-left-panel { padding: 40px 32px !important; }
    .menu-link-text  { font-size: clamp(1.8rem, 8vw, 2.8rem) !important; }
    .menu-overlay-body { padding-top: 72px; }
  }
  @media (max-width: 480px) {
    .menu-left-panel { padding: 32px 24px !important; }
    .menu-link-text  { font-size: clamp(1.6rem, 9vw, 2.4rem) !important; }
  }

  /* Mobile bottom info bar — shown only when right panel is hidden */
  .menu-mobile-info {
    display: none;
    padding: 20px 32px 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  @media (max-width: 992px) {
    .menu-mobile-info { display: flex !important; gap: 16px; align-items: center; justify-content: space-between; }
  }
  @media (max-width: 480px) {
    .menu-mobile-info { padding: 20px 24px 28px; flex-direction: column; align-items: flex-start; gap: 12px; }
  }
`

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()

  useEffect(() => { handleClose() }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (document.getElementById('plus-jakarta-font')) return
    const link = document.createElement('link')
    link.id    = 'plus-jakarta-font'
    link.rel   = 'stylesheet'
    link.href  = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    if (document.getElementById('navbar-menu-styles')) return
    const s = document.createElement('style')
    s.id = 'navbar-menu-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const handleOpen  = () => { setMenuClosing(false); setMenuOpen(true) }
  const handleClose = () => {
    if (!menuOpen) return
    setMenuClosing(true)
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false) }, 600)
  }
  const handleToggle = () => menuOpen ? handleClose() : handleOpen()

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav
        className="position-fixed top-0 start-0 end-0 d-flex align-items-center"
        style={{
          height:         '72px',
          zIndex:         200,
          borderBottom:   '1px solid',
          borderColor:    menuOpen || scrolled ? 'rgba(255,255,255,0.07)' : 'transparent',
          background:     menuOpen || scrolled ? 'rgba(10,10,10,0.9)'    : 'transparent',
          backdropFilter: menuOpen || scrolled ? 'blur(18px)'             : 'none',
          transition:     'background 0.5s ease, border-color 0.5s ease',
        }}
      >
        <div className="w-100 d-flex align-items-center justify-content-between px-4">

          {/* Logo */}
          <Link to="/" className="text-decoration-none flex-shrink-0" style={{ zIndex: 201 }}>
            <img src="/images/Logo.png" alt="DigiMeAds" style={{ width: 'auto' }} className='logo-size' />
          </Link>

          {/* Desktop links */}
          <ul className="d-none d-lg-flex align-items-center list-unstyled m-0" style={{ gap: '66px' }}>
            {LINKS.map(({ label, path }) => (
              <li key={path} className="position-relative">
                <Link
                  to={path}
                  className="text-decoration-none position-relative"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize:   '16px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color:      hoveredLink === path ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    transition: 'color 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={() => setHoveredLink(path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {label}
                  <span className="position-absolute start-0" style={{
                    bottom: '-3px', height: '1px', background: '#0f911e', display: 'block',
                    width:      hoveredLink === path ? '100%' : '0%',
                    transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: search + hamburger */}
          <div className="d-flex align-items-center flex-shrink-0" style={{ gap: '20px', zIndex: 201 }}>
            <button
              className="border-0 bg-transparent p-0 d-flex align-items-center"
              style={{ color: 'rgba(255,255,255,0.6)', cursor: 'none', transition: 'color 0.25s ease' }}
              aria-label="Search"
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Hamburger / X */}
            <button
              onClick={handleToggle}
              className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
              style={{
                cursor:       'pointer',
                width:        '40px',
                height:       '40px',
                borderRadius: '8px',
                background:   menuOpen ? 'rgba(59,255,108,0.1)' : 'transparent',
                transition:   'background 0.3s ease',
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                <rect y="0"  width="22" height="2" rx="1" fill="rgba(255,255,255,0.7)"
                  style={{
                    transformOrigin: '11px 1px',
                    transform:       menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
                    transition:      'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
                <rect y="6"  width="14" height="2" rx="1" fill="#0f911e"
                  style={{
                    opacity:    menuOpen ? 0 : 1,
                    transform:  menuOpen ? 'translateX(6px)' : 'none',
                    transition: 'opacity 0.3s ease, transform 0.4s ease',
                  }}
                />
                <rect y="12" width="22" height="2" rx="1" fill="rgba(255,255,255,0.7)"
                  style={{
                    transformOrigin: '11px 13px',
                    transform:       menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                    transition:      'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          FULLSCREEN OVERLAY
      ══════════════════════════════════════════ */}
      {menuOpen && (
        <div
          style={{
            position:      'fixed',
            inset:         0,
            zIndex:        199,
            background:    '#0a0a0a',
            display:       'flex',
            flexDirection: 'column',
            animation:     menuClosing
              ? 'menuHide 0.6s cubic-bezier(0.16,1,0.3,1) forwards'
              : 'menuReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
            overflow:      'hidden',
          }}
        >
          {/* Left green accent bar */}
          <div style={{
            position:   'absolute',
            left:       0, top: 0,
            width:      '3px',
            height:     '100%',
            background: 'linear-gradient(to bottom, transparent, #0f911e 30%, #0f911e 70%, transparent)',
            opacity:    menuClosing ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }} />

          {/* ── Main scrollable body ── */}
          <div className="menu-overlay-body" style={{ flex: 1, overflow: 'hidden' }}>

            {/* LEFT: big nav links */}
            <div className="menu-left-panel">
              <p style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.3)',
                marginBottom:  '32px',
                animation:     menuClosing ? 'none' : 'menuInfoIn 0.5s ease 0.2s both',
              }}>
                Navigation
              </p>

              <nav>
                {LINKS.map((link, i) => (
                  <div key={link.path} style={{ marginBottom: '6px', overflow: 'hidden' }}>
                    <Link
                      to={link.path}
                      className="menu-link-inner text-decoration-none d-flex align-items-baseline"
                      onClick={handleClose}
                      style={{
                        gap:           '12px',
                        fontFamily:    "'Plus Jakarta Sans', sans-serif",
                        fontWeight:    800,
                        lineHeight:    1.1,
                        letterSpacing: '-0.03em',
                        color:         location.pathname === link.path
                          ? '#0f911e' : 'rgba(255,255,255,0.85)',
                        animation: menuClosing
                          ? `menuLinkOut 0.4s ease ${i * 0.04}s both`
                          : `menuLinkIn 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.07}s both`,
                      }}
                    >
                      <span
                        className="menu-link-num"
                        style={{
                          fontFamily:    "'Plus Jakarta Sans', sans-serif",
                          fontSize:      '12px',
                          fontWeight:    500,
                          color:         location.pathname === link.path
                            ? '#0f911e' : 'rgba(255,255,255,0.25)',
                          letterSpacing: '0.05em',
                          flexShrink:    0,
                          transition:    'color 0.3s ease',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="menu-link-text">{link.label}</span>
                    </Link>

                    <div style={{
                      height:     '1px',
                      background: 'rgba(255,255,255,0.05)',
                      marginTop:  '6px',
                      animation:  menuClosing ? 'none'
                        : `menuInfoIn 0.5s ease ${0.15 + i * 0.07}s both`,
                    }} />
                  </div>
                ))}
              </nav>
            </div>

            {/* RIGHT: info panel — hidden on mobile via CSS */}
            <div className="menu-right-panel">
              <div>
                <img
                  src="/images/Logo.png" alt="DigiMeAds"
                  style={{ height: '56px', width: 'auto', marginBottom: '20px', opacity: 0.9 }}
                  onError={e => e.currentTarget.style.display = 'none'}
                />
                <p style={{
                  fontFamily:   "'Plus Jakarta Sans', sans-serif",
                  fontSize:     '13px',
                  lineHeight:   '22px',
                  color:        'rgba(255,255,255,0.35)',
                  maxWidth:     '28ch',
                  marginBottom: '32px',
                }}>
                  We create digital experiences that beautifully unite creativity and innovation.
                </p>
                {[
                  { label: 'Email', value: 'info@digimeads.com ' },
                  { label: 'Phone', value: '(+94) 77 744 4956' },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: '16px' }}>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '10px', fontWeight: 600,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.25)', margin: '0 0 3px',
                    }}>{item.label}</p>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px', fontWeight: 500,
                      color: 'rgba(255,255,255,0.65)', margin: 0,
                    }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                {/* <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', marginBottom: '10px',
                }}>Follow Us</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map(s => (
                    <button key={s} style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '11px', fontWeight: 500,
                      color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px', padding: '5px 10px', cursor: 'pointer',
                      transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#0f911e'
                        e.currentTarget.style.background = 'rgba(59,255,108,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(59,255,108,0.2)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      }}
                    >{s}</button>
                  ))}
                </div> */}
                <Link to="/contact" onClick={handleClose} 
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#0f911e', color: '#0a0a0a',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px', fontWeight: 700,
                  borderRadius: '100px', padding: '12px 22px', textDecoration: 'none',
                  transition: 'background 0.25s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#5fff8a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0f911e'}
                >
                  Let's Talk
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </Link>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '11px', color: 'rgba(255,255,255,0.15)',
                  marginTop: '28px', marginBottom: 0,
                }}>© 2025 DigiMeAds. All rights reserved.</p>
              </div>
            </div>
          </div>

          {/* ── Mobile bottom bar — replaces right panel on small screens ── */}
          <div className="menu-mobile-info">
            <div style={{ animation: menuClosing ? 'none' : 'menuInfoIn 0.5s ease 0.5s both' }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: '0 0 2px',
              }}>info@digimeads.com </p>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0,
              }}>(+94) 77 744 4956</p>
            </div>
            <a
              href="tel:+94777444956"
              to="/contact"
              onClick={handleClose}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#0f911e', color: '#0a0a0a',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '13px', fontWeight: 700,
                borderRadius: '100px', padding: '11px 20px', textDecoration: 'none',
                animation: menuClosing ? 'none' : 'menuInfoIn 0.5s ease 0.55s both',
                flexShrink: 0,
              }}
            >
              Let's Talk ↗
            </a>
          </div>

          {/* Watermark */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: '-40px', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(8rem, 20vw, 22rem)',
            fontWeight: 900, letterSpacing: '-0.05em',
            color: 'rgba(255,255,255,0.02)',
            whiteSpace: 'nowrap', pointerEvents: 'none',
            lineHeight: 1, userSelect: 'none',
          }}>
            MENU
          </div>
        </div>
      )}
    </>
  )
}