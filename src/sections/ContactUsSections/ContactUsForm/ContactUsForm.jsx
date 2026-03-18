import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.28 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.58a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
      </svg>
    ),
    title: 'Have any question?',
    value: 'Free (+94) 77 1813 729​ ',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Write email',
    value: 'info@digimeads.com ',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Visit anytime',
    value: '410/3 Bauddhaloka Mawatha, Colombo 07 ',
  },
]

const STYLES = `
  .contact-page-input::placeholder { color: rgba(255,255,255,0.2); }
  .contact-page-input:focus {
    outline: none;
    border-color: rgba(59,255,108,0.4) !important;
    background: #1e1e1e !important;
  }
  @media (max-width: 1200px) {
    .contact-page-inner { padding-left: 120px !important; padding-right: 120px !important; }
  }
  @media (max-width: 992px) {
    .contact-page-inner  { padding-left: 60px !important; padding-right: 60px !important; }
    .contact-page-layout { flex-direction: column !important; gap: 60px !important; }
    .contact-page-left   { width: 100% !important; }
    .contact-page-right  { width: 100% !important; }
    .contact-page-form-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .contact-page-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .contact-page-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

// ─── PASTE YOUR WEB3FORMS ACCESS KEY HERE ───────────────────────────────────
const WEB3FORMS_ACCESS_KEY = '85a78adc-9d09-4121-ab2f-8191735957c4'
// ────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', phone: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [status,  setStatus]  = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const leftReveal  = useScrollReveal({ threshold: 0.1 })
  const rightReveal = useScrollReveal({ threshold: 0.1 })

  useEffect(() => {
    if (document.getElementById('contact-page-styles')) return
    const s = document.createElement('style')
    s.id = 'contact-page-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const handleSend = async () => {
    // Basic validation — don't send if name, email, or message are empty
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name:       form.name,
          email:      form.email,
          subject:    form.subject || 'New Contact Form Submission',
          phone:      form.phone,
          message:    form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', phone: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (err) {
      console.error('Web3Forms error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', phone: '', message: '' })
    setStatus('idle')
  }

  // Button label & colour driven by status
  const sendLabel = {
    idle:    'Send Message',
    sending: 'Sending…',
    sent:    '✓ Sent!',
    error:   '✕ Try Again',
  }[status]

  const sendBg = {
    idle:    '#0f911e',
    sending: 'rgba(59,255,108,0.6)',
    sent:    '#2ecc57',
    error:   '#ff4d4d',
  }[status]

  const inputStyle = (field) => ({
    width:        '100%',
    background:   focused === field ? '#1e1e1e' : '#161616',
    border:       `1px solid ${focused === field ? 'rgba(59,255,108,0.4)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '8px',
    padding:      '14px 16px',
    fontFamily:   "'Plus Jakarta Sans', sans-serif",
    fontSize:     '14px',
    color:        '#ffffff',
    display:      'block',
    transition:   'background 0.25s ease, border-color 0.25s ease',
  })

  return (
    <section
      id="contact-page"
      style={{
        background:    '#0a0a0a',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        paddingTop:    '80px',
        paddingBottom: '100px',
        overflow:      'hidden',
      }}
    >
      <div
        className="contact-page-inner"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >
        <div
          className="contact-page-layout"
          style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}
        >

          {/* ══════════════════════════
              LEFT — Form
          ══════════════════════════ */}
          <div
            className="contact-page-left"
            ref={leftReveal.ref}
            style={{
              width:      '50%',
              flexShrink: 0,
              opacity:    leftReveal.isVisible ? 1 : 0,
              transform:  leftReveal.isVisible ? 'translateX(0)' : 'translateX(-28px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Eyebrow */}
            <p style={{
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
              marginBottom:  '10px',
            }}>
              Send Us Email
            </p>

            {/* Heading */}
            <h2 style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight:    700,
              color:         '#ffffff',
              margin:        '0 0 32px',
              letterSpacing: '-0.02em',
              lineHeight:    1.1,
            }}>
              Feel free to write
            </h2>

            {/* 2-col grid inputs */}
            <div
              className="contact-page-form-grid"
              style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '12px',
                marginBottom:        '12px',
              }}
            >
              {[
                { key: 'name',    placeholder: 'Enter Name'    },
                { key: 'email',   placeholder: 'Enter Email'   },
                { key: 'subject', placeholder: 'Enter Subject' },
                { key: 'phone',   placeholder: 'Enter Phone'   },
              ].map(f => (
                <input
                  key={f.key}
                  className="contact-page-input"
                  type="text"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  onFocus={() => setFocused(f.key)}
                  onBlur={() => setFocused(null)}
                  style={inputStyle(f.key)}
                  disabled={status === 'sending'}
                />
              ))}
            </div>

            {/* Textarea */}
            <textarea
              className="contact-page-input"
              placeholder="Enter Message"
              rows={6}
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle('message'),
                resize:       'none',
                marginBottom: '20px',
              }}
              disabled={status === 'sending'}
            />

            {/* Validation hint — only shown on error */}
            {status === 'error' && (
              <p style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '13px',
                color:        '#ff4d4d',
                marginBottom: '12px',
                marginTop:    '-8px',
              }}>
                Please fill in your name, email, and message.
              </p>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSend}
                disabled={status === 'sending'}
                style={{
                  background:   sendBg,
                  color:        status === 'error' ? '#ffffff' : '#0a0a0a',
                  fontFamily:   "'Plus Jakarta Sans', sans-serif",
                  fontSize:     '14px',
                  fontWeight:   600,
                  border:       'none',
                  borderRadius: '100px',
                  padding:      '13px 28px',
                  cursor:       status === 'sending' ? 'not-allowed' : 'pointer',
                  transition:   'background 0.25s ease, transform 0.2s ease',
                  minWidth:     '140px',
                  opacity:      status === 'sending' ? 0.7 : 1,
                }}
                onMouseEnter={e => {
                  if (status === 'idle') e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {sendLabel}
              </button>

              <button
                onClick={handleReset}
                disabled={status === 'sending'}
                style={{
                  background:   'rgba(255,255,255,0.06)',
                  color:        'rgba(255,255,255,0.7)',
                  fontFamily:   "'Plus Jakarta Sans', sans-serif",
                  fontSize:     '14px',
                  fontWeight:   600,
                  border:       '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding:      '13px 28px',
                  cursor:       status === 'sending' ? 'not-allowed' : 'pointer',
                  transition:   'background 0.25s ease, color 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* ══════════════════════════
              RIGHT — Info
          ══════════════════════════ */}
          <div
            className="contact-page-right"
            ref={rightReveal.ref}
            style={{
              flex:       1,
              opacity:    rightReveal.isVisible ? 1 : 0,
              transform:  rightReveal.isVisible ? 'translateX(0)' : 'translateX(28px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {/* Eyebrow */}
            <p style={{
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
              marginBottom:  '10px',
            }}>
              Need Any Help?
            </p>

            {/* Heading */}
            <h2 style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight:    700,
              color:         '#ffffff',
              margin:        '0 0 20px',
              letterSpacing: '-0.02em',
              lineHeight:    1.1,
            }}>
              Get in touch with us
            </h2>

            {/* Body */}
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '14px',
              lineHeight: '24px',
              color:      'rgba(255,255,255,0.4)',
              margin:     '0 0 40px',
              maxWidth:   '44ch',
            }}>
              Have a project in mind or just want to explore what's possible? We'd love to hear 
              from you. Drop us a message and we'll get back to you within 24 hours.
            </p>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {CONTACT_INFO.map((item, i) => (
                <ContactInfoCard key={i} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function ContactInfoCard({ item }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:    'flex',
        gap:        '20px',
        alignItems: 'flex-start',
        padding:    '4px 0',
        transition: 'transform 0.25s ease',
        transform:  hovered ? 'translateX(6px)' : 'translateX(0)',
        cursor:     'default',
      }}
    >
      {/* Green icon square */}
      <div style={{
        width:          '48px',
        height:         '48px',
        borderRadius:   '10px',
        background:     hovered ? '#5fff8a' : '#0f911e',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
        color:          '#0a0a0a',
        transition:     'background 0.25s ease',
      }}>
        {item.icon}
      </div>

      {/* Text */}
      <div>
        <h5 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '15px',
          fontWeight: 700,
          color:      '#ffffff',
          margin:     '0 0 4px',
          lineHeight: 1.3,
        }}>
          {item.title}
        </h5>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '14px',
          color:      'rgba(255,255,255,0.45)',
          margin:     0,
          lineHeight: 1.5,
        }}>
          {item.value}
        </p>
      </div>
    </div>
  )
}