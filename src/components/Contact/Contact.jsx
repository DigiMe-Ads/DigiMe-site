import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { label } from 'three/tsl'

const QUICK_LINKS = [
  { label: 'About Us',      href: '/about',     external: false },
  { label: 'Services',      href: '/services',   external: false },
  { label: 'Our Portfolio', href: '/portfolio',  external: false },
  { label : 'Prices',          href: '/pricing',       external: false },
  { label: 'Contact Us',    href: '/contact',    external: false },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/digimeads',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/digime_ads?igsh=a3c2ZXdwcmFnNnd5',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/digime-ads',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

const STYLES = `
  .pgfooter-input::placeholder { color: rgba(0,0,0,0.35); }
  .pgfooter-input:focus { outline: none; }
  .pgfooter-link {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    text-decoration: none;
    display: block;
    padding: 4px 0;
    transition: color 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .pgfooter-link:hover { color: #000000; }

  @media (max-width: 1200px) {
    .pgfooter-card  { margin-left: 60px !important; margin-right: 60px !important; }
  }
  @media (max-width: 992px) {
    .pgfooter-card     { margin-left: 32px !important; margin-right: 32px !important; }
    .pgfooter-cols     { flex-wrap: wrap !important; gap: 32px !important; }
    .pgfooter-left     { width: 100% !important; }
    .pgfooter-divider  { display: none !important; }
    .pgfooter-links-col { min-width: 120px !important; }
    .pgfooter-right-col { width: 100% !important; flex: none !important; }
    .pgfooter-addr-row { flex-wrap: wrap !important; gap: 24px !important; }
  }
  @media (max-width: 768px) {
    .pgfooter-card      { margin-left: 16px !important; margin-right: 16px !important; }
    .pgfooter-inner     { padding: 40px 28px 0 !important; }
    .pgfooter-title     { font-size: clamp(2.4rem, 8vw, 3.2rem) !important; }
    .pgfooter-email-row { max-width: 100% !important; width: 100% !important; }
  }
  @media (max-width: 480px) {
    .pgfooter-card      { margin-left: 12px !important; margin-right: 12px !important; }
    .pgfooter-inner     { padding: 32px 20px 0 !important; }
    .pgfooter-cols      { gap: 28px !important; }
    .pgfooter-addr-row  { flex-direction: column !important; gap: 20px !important; }
    .pgfooter-email-row { max-width: 100% !important; width: 100% !important; }
  }
`

const WEB3FORMS_ACCESS_KEY = 'b24110b3-93db-4a6c-bbeb-f85e68928d05'

export default function PageFooter() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (document.getElementById('pgfooter-styles')) return
    const s = document.createElement('style')
    s.id = 'pgfooter-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const handleSend = async () => {
    if (!email.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject:    '🔔 Someone wants to connect!',
          message:    `A user wants to connect with you.\n\nEmail: ${email}\n\nThey submitted their email through the footer newsletter form on your website.`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent'); setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const btnBg = { idle:'#111111', sending:'rgba(0,0,0,0.4)', sent:'#16a34a', error:'#dc2626' }[status]

  return (
    <div style={{ background:'#0a0a0a', paddingBottom:'0', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>

      <div
        className="pgfooter-card"
        style={{
          marginLeft:'120px', marginRight:'120px',
          borderRadius:'20px', overflow:'hidden',
          background:'#22c55e', position:'relative',
        }}
      >
        {/* Corner blobs */}
        {[
          { top:'-30px',   left:'-30px',  width:'120px', height:'120px', opacity:0.25 },
          { bottom:'-40px',left:'-20px',  width:'140px', height:'140px', opacity:0.20 },
          { top:'-20px',   right:'-20px', width:'100px', height:'100px', opacity:0.20 },
          { bottom:'-30px',right:'-10px', width:'120px', height:'120px', opacity:0.18 },
        ].map((b, i) => (
          <div key={i} aria-hidden="true" style={{
            position:'absolute', borderRadius:'50%',
            background:`rgba(0,0,0,${b.opacity})`,
            pointerEvents:'none', zIndex:0, ...b,
          }}/>
        ))}

        {/* Content */}
        <div
          className="pgfooter-inner"
          style={{ position:'relative', zIndex:1, padding:'56px 60px 0' }}
        >
          <div
            className="pgfooter-cols"
            style={{ display:'flex', gap:'48px', alignItems:'flex-start' }}
          >

            {/* ── Col 1: Let's Talk ── */}
            <div className="pgfooter-left" style={{ width:'280px', flexShrink:0 }}>
              <h2
                className="pgfooter-title"
                style={{
                  fontFamily:"'Plus Jakarta Sans', sans-serif",
                  fontSize:'clamp(2.8rem, 4vw, 3.8rem)',
                  fontWeight:800, color:'#000000',
                  margin:'0 0 16px', lineHeight:1.1, letterSpacing:'-0.02em',
                }}
              >
                Let's Talk
              </h2>
              <p style={{
                fontSize:'14px', lineHeight:'22px',
                color:'rgba(0,0,0,0.6)', margin:'0 0 28px', maxWidth:'30ch',
              }}>
                Ready to grow your brand online? Let's build something great together — reach out
                on any of our socials.
              </p>
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                {SOCIALS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.15)', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#000000', transition: 'background 0.2s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
                    >
                      {s.icon}
                    </a>
                  ))}
              </div>
            </div>

            {/* Divider */}
            <div className="pgfooter-divider" style={{
              width:'1px', alignSelf:'stretch',
              background:'rgba(0,0,0,0.15)', flexShrink:0,
            }}/>

            {/* ── Col 2: Quick Links ── */}
            <div className="pgfooter-links-col" style={{ minWidth:'120px', flexShrink:0 }}>
              <h5 style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'15px', fontWeight:700, color:'#000000', margin:'0 0 18px',
              }}>
                Quick Link
              </h5>
              {QUICK_LINKS.map(l => (
                l.external ? (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pgfooter-link">{l.label}</a>
                ) : (
                  <Link key={l.label} to={l.href} className="pgfooter-link">{l.label}</Link>
                )
              ))}
            </div>

            {/* Divider */}
            <div className="pgfooter-divider" style={{
              width:'1px', alignSelf:'stretch',
              background:'rgba(0,0,0,0.15)', flexShrink:0,
            }}/>

            {/* ── Col 3: Newsletter + Address + Support ── */}
            <div className="pgfooter-right-col" style={{ flex:1, minWidth:0 }}>
              <p style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'15px', fontWeight:700, color:'#000000', margin:'0 0 14px',
              }}>
                Get the latest inspiration & insights
              </p>

              {/* Email input */}
              <div
                className="pgfooter-email-row"
                style={{
                  display:'flex', alignItems:'center',
                  background:'#ffffff', borderRadius:'100px',
                  padding:'6px 6px 6px 20px',
                  marginBottom:'8px', maxWidth:'380px',
                }}
              >
                <input
                  className="pgfooter-input"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  disabled={status === 'sending'}
                  style={{
                    flex:1, border:'none', background:'transparent',
                    fontFamily:"'Plus Jakarta Sans', sans-serif",
                    fontSize:'14px', color:'#000000', minWidth:0,
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={status === 'sending'}
                  style={{
                    width:'40px', height:'40px', borderRadius:'50%',
                    background:btnBg, border:'none',
                    cursor:status === 'sending' ? 'not-allowed' : 'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, transition:'background 0.3s ease, transform 0.2s ease',
                    color:'#ffffff',
                  }}
                  onMouseEnter={e => { if (status==='idle') e.currentTarget.style.transform='scale(1.1)' }}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                  aria-label="Subscribe"
                >
                  {status === 'sent' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : status === 'error' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Status message */}
              <p style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'12px',
                color: status==='error' ? '#7f1d1d' : status==='sent' ? '#14532d' : 'transparent',
                margin:'0 0 24px', paddingLeft:'4px', transition:'color 0.3s ease',
              }}>
                {status==='sent' ? "✓ Got it! We'll be in touch." : status==='error' ? '✕ Something went wrong. Try again.' : 'placeholder'}
              </p>

              {/* Address + Support */}
              <div
                className="pgfooter-addr-row"
                style={{ display:'flex', gap:'48px' }}
              >
                <div>
                  <h6 style={{
                    fontFamily:"'Plus Jakarta Sans', sans-serif",
                    fontSize:'15px', fontWeight:700, color:'#000000', margin:'0 0 10px',
                  }}>Address</h6>
                  <p style={{
                    fontFamily:"'Plus Jakarta Sans', sans-serif",
                    fontSize:'13px', lineHeight:'22px', color:'rgba(0,0,0,0.65)', margin:0,
                  }}>
                    410/3, Bauddhaloka Mawatha,<br/>Colombo 07.
                  </p>
                </div>
                <div>
                  <h6 style={{
                    fontFamily:"'Plus Jakarta Sans', sans-serif",
                    fontSize:'15px', fontWeight:700, color:'#000000', margin:'0 0 10px',
                  }}>Support</h6>
                  <p style={{
                    fontFamily:"'Plus Jakarta Sans', sans-serif",
                    fontSize:'13px', lineHeight:'22px', color:'rgba(0,0,0,0.65)', margin:0,
                  }}>
                    info@digimeads.com<br/>(+94) 777 444 956
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div style={{
            marginTop:'40px', borderTop:'1px solid rgba(0,0,0,0.12)',
            padding:'16px 0', textAlign:'center',
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontSize:'13px', color:'rgba(0,0,0,0.5)',
          }}>
            2026 DigiMe Ads, All Rights reserved
          </div>
        </div>
      </div>
    </div>
  )
}