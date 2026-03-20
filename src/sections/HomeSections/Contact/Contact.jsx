import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const FIELDS = [
  { key: 'name',    label: 'Name *',          placeholder: 'Your Full Name',         col: 'left',  tall: false },
  { key: 'email',   label: 'Email Address *', placeholder: 'Email Address',           col: 'right', tall: false },
  { key: 'subject', label: 'Subject*',        placeholder: 'Your Subject',            col: 'left',  tall: false },
  { key: 'budget',  label: 'Your Budget',     placeholder: 'Write Your Budget Range', col: 'right', tall: false },
  { key: 'message', label: 'Message',         placeholder: 'Your Message',            col: 'full',  tall: true  },
]

const STYLES = `
  @keyframes contactMeshPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 0.8; }
  }
  .contact-input::placeholder { color: rgba(255,255,255,0.25); }
  .contact-input:focus { outline: none; border-color: rgba(59,255,108,0.5) !important; }
  @media (max-width: 1200px) {
    .contact-card  { margin-left: 80px !important; margin-right: 80px !important; }
  }
  @media (max-width: 992px) {
    .contact-card   { margin-left: 40px !important; margin-right: 40px !important; }
    .contact-layout { flex-direction: column !important; }
    .contact-left   { width: 100% !important; padding-right: 0 !important; padding-bottom: 40px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
    .contact-right  { width: 100% !important; padding-left: 0 !important; padding-top: 40px !important; }
    .contact-form-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .contact-card { margin-left: 24px !important; margin-right: 24px !important; padding: 40px 28px !important; }
  }
  @media (max-width: 480px) {
    .contact-card { margin-left: 16px !important; margin-right: 16px !important; padding: 32px 20px !important; }
  }
`

// ─── PASTE YOUR WEB3FORMS ACCESS KEY HERE ───────────────────────────────────
const WEB3FORMS_ACCESS_KEY = 'b24110b3-93db-4a6c-bbeb-f85e68928d05'
// ────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const leftReveal  = useScrollReveal({ threshold: 0.1 })
  const rightReveal = useScrollReveal({ threshold: 0.1 })

  const [focusedField, setFocusedField] = useState(null)
  const [form,         setForm]         = useState({ name: '', email: '', subject: '', budget: '', message: '' })
  const [status,       setStatus]       = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg,     setErrorMsg]     = useState('')

  useEffect(() => {
    if (document.getElementById('contact-styles')) return
    const s = document.createElement('style')
    s.id = 'contact-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const handleSubmit = async () => {
    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim()) {
      setErrorMsg('Please fill in your name, email, and subject.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 3500)
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject:    `New enquiry from ${form.name} — ${form.subject}`,
          name:       form.name,
          email:      form.email,
          'budget':   form.budget || 'Not specified',
          message:    form.message || 'No message provided.',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', budget: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setErrorMsg('Something went wrong. Please try again.')
        setStatus('error')
        setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 3500)
      }
    } catch (err) {
      console.error('Web3Forms error:', err)
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 3500)
    }
  }

  const btnLabel = { idle: 'Send Message', sending: 'Sending…', sent: '✓ Message Sent!', error: '✕ Try Again' }[status]
  const btnBg    = { idle: '#0f911e', sending: 'rgba(15,145,30,0.5)', sent: '#16a34a', error: '#dc2626' }[status]

  return (
    <section
      id="contact-us"
      style={{
        background: '#0a0a0a',
        padding:    '80px 0 100px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ── Rounded card ── */}
      <div
        className="contact-card"
        style={{
          position:     'relative',
          marginLeft:   '285px',
          marginRight:  '285px',
          borderRadius: '20px',
          overflow:     'hidden',
          background:   '#111111',
          border:       '1px solid rgba(255,255,255,0.07)',
          padding:      '60px 56px',
        }}
      >
        {/* Wavy mesh lines */}
        <div
          aria-hidden="true"
          style={{
            position:        'absolute',
            top:             0,
            left:            0,
            width:           '55%',
            height:          '100%',
            pointerEvents:   'none',
            zIndex:          0,
            animation:       'contactMeshPulse 6s ease-in-out infinite',
            backgroundImage: `
              repeating-linear-gradient(170deg, transparent, transparent 28px, rgba(59,255,108,0.03) 28px, rgba(59,255,108,0.03) 29px),
              repeating-linear-gradient(80deg,  transparent, transparent 28px, rgba(59,255,108,0.025) 28px, rgba(59,255,108,0.025) 29px)
            `,
            transform:    'perspective(600px) rotateY(8deg)',
            borderRadius: '0 50% 50% 0 / 0 30% 30% 0',
          }}
        />

        {/* Green glow */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            bottom:        '-10%',
            right:         '-5%',
            width:         '40%',
            height:        '60%',
            background:    'radial-gradient(ellipse at center, rgba(30,120,40,0.35) 0%, transparent 70%)',
            filter:        'blur(40px)',
            pointerEvents: 'none',
            zIndex:        0,
          }}
        />

        {/* ── Content ── */}
        <div
          className="contact-layout"
          style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '60px' }}
        >

          {/* ── LEFT ── */}
          <div
            className="contact-left"
            ref={leftReveal.ref}
            style={{
              width:          '38%',
              flexShrink:     0,
              paddingRight:   '40px',
              borderRight:    '1px solid rgba(255,255,255,0.06)',
              opacity:        leftReveal.isVisible ? 1 : 0,
              transform:      leftReveal.isVisible ? 'translateX(0)' : 'translateX(-24px)',
              transition:     'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '8px',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.45)',
                marginBottom:  '20px',
              }}>
                <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
                Get In Touch
              </p>

              <h2 style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight:   700,
                lineHeight:   1.2,
                color:        '#ffffff',
                marginBottom: '0',
              }}>
                Success is a team<br />
                effort{' '}
                <span style={{ color: '#0f911e', fontStyle: 'italic', fontWeight: 400 }}>
                  let's achieve<br />it together
                </span>
              </h2>
            </div>

            <div style={{ marginTop: '48px' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '0 0 8px' }}>
                info@digimeads.com
              </p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                (+94) 777 444 956
              </p>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div
            className="contact-right"
            ref={rightReveal.ref}
            style={{
              flex:       1,
              paddingLeft:'0',
              opacity:    rightReveal.isVisible ? 1 : 0,
              transform:  rightReveal.isVisible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            <div
              className="contact-form-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 40px' }}
            >
              {FIELDS.map((field) => (
                <div key={field.key} style={{ gridColumn: field.col === 'full' ? '1 / -1' : 'auto' }}>
                  <label style={{
                    display:       'block',
                    fontFamily:    "'Plus Jakarta Sans', sans-serif",
                    fontSize:      '13px',
                    fontWeight:    500,
                    color:         'rgba(255,255,255,0.55)',
                    marginBottom:  '10px',
                    letterSpacing: '0.01em',
                  }}>
                    {field.label}
                  </label>

                  {field.tall ? (
                    <textarea
                      className="contact-input"
                      placeholder={field.placeholder}
                      rows={3}
                      value={form[field.key]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      disabled={status === 'sending'}
                      style={{
                        width:        '100%',
                        background:   'transparent',
                        border:       'none',
                        borderBottom: `1px solid ${focusedField === field.key ? 'rgba(59,255,108,0.5)' : 'rgba(255,255,255,0.12)'}`,
                        borderRadius: 0,
                        padding:      '8px 0',
                        fontFamily:   "'Plus Jakarta Sans', sans-serif",
                        fontSize:     '14px',
                        color:        '#ffffff',
                        resize:       'none',
                        transition:   'border-color 0.25s ease',
                        display:      'block',
                      }}
                    />
                  ) : (
                    <input
                      className="contact-input"
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      disabled={status === 'sending'}
                      style={{
                        width:        '100%',
                        background:   'transparent',
                        border:       'none',
                        borderBottom: `1px solid ${focusedField === field.key ? 'rgba(59,255,108,0.5)' : 'rgba(255,255,255,0.12)'}`,
                        borderRadius: 0,
                        padding:      '8px 0',
                        fontFamily:   "'Plus Jakarta Sans', sans-serif",
                        fontSize:     '14px',
                        color:        '#ffffff',
                        transition:   'border-color 0.25s ease',
                        display:      'block',
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Error message */}
              {errorMsg && (
                <div style={{ gridColumn: '1 / -1', marginTop: '-16px' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#f87171', margin: 0 }}>
                    {errorMsg}
                  </p>
                </div>
              )}

              {/* Submit button */}
              <div style={{ gridColumn: '1 / -1', paddingTop: '8px' }}>
                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  style={{
                    display:      'inline-flex',
                    alignItems:   'center',
                    gap:          '10px',
                    background:   btnBg,
                    color:        status === 'error' ? '#ffffff' : '#0a0a0a',
                    fontFamily:   "'Plus Jakarta Sans', sans-serif",
                    fontSize:     '14px',
                    fontWeight:   600,
                    border:       'none',
                    borderRadius: '100px',
                    padding:      '13px 22px 13px 28px',
                    cursor:       status === 'sending' ? 'not-allowed' : 'pointer',
                    transition:   'background 0.25s ease, transform 0.25s ease',
                    opacity:      status === 'sending' ? 0.7 : 1,
                    minWidth:     '180px',
                  }}
                  onMouseEnter={e => {
                    if (status === 'idle') {
                      e.currentTarget.style.background = '#5fff8a'
                      e.currentTarget.style.transform  = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (status === 'idle') {
                      e.currentTarget.style.background = '#0f911e'
                      e.currentTarget.style.transform  = 'translateY(0)'
                    }
                  }}
                >
                  {btnLabel}
                  {status === 'idle' && (
                    <span style={{
                      width:          '36px',
                      height:         '36px',
                      background:     'rgba(0,0,0,0.2)',
                      borderRadius:   '50%',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flexShrink:     0,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <circle cx="5" cy="5" r="5" fill="white" opacity="0.4"/>
                        <circle cx="5" cy="5" r="2" fill="white"/>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}