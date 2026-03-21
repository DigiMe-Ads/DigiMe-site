// ─── Web3Forms access key ────────────────────────────────────────────────────
export const WEB3FORMS_ACCESS_KEY = 'b24110b3-93db-4a6c-bbeb-f85e68928d05'


// ─── Plan definitions ─────────────────────────────────────────────────────────
export const PLANS = [
  {
    name:     'Standard',
    price:    'LKR 95,000',
    period:   '/month',
    image:    '/images/About/features/brand-identity.png',
    features: [
      '10 Posts (5 Reels & 5 Statics)',
      'Management of 2 Advertising campaigns',
      'Social Media Marketing Strategy',
      'Content Language – English & Sinhala',
      'Monthly Analysis Report',
    ],
    addedServices: [
      '6 Story Posts',
      'Monthly Facebook Cover Photo Update',
    ],
    elevated: false,
  },
  {
    name:     'Premium',
    price:    'LKR 110,000',
    period:   '/month',
    image:    '/images/About/features/digital-platform.png',
    features: [
      '12 Posts (6 Reels & 6 Statics)',
      'Management of 4 Advertising campaigns',
      'Social Media Marketing Strategy',
      'Content Language – English & Sinhala',
      'Monthly Analysis Report',
    ],
    addedServices: [
      '10 Story Posts',
      'Monthly Facebook Cover Photo Update',
    ],
    elevated: true,
  },
  {
    name:     'Professional',
    price:    'LKR 125,000',
    period:   '/month',
    image:    '/images/About/features/web-design.png',
    features: [
      '15 Posts (8 Reels & 7 Statics)',
      'Management of 6 Advertising campaigns',
      'Social Media Marketing Strategy',
      'Content Language – English & Sinhala',
      'Monthly Analysis Report',
    ],
    addedServices: [
      '15 Story Posts',
      'Monthly Facebook Cover Photo Update',
    ],
    elevated: false,
  },
]

// ─── Web Development package definitions ─────────────────────────────────────
export const WEB_PLANS = [
  {
    name:  'Starter Web',
    price: 'LKR 100,000',
    period: '/project',
    image: '/images/About/features/web-design.png',
    badge: 'One-time',
    stack: 'React · Vite · Tailwind CSS',
    features: [
      'Up to 4 fully responsive pages',
      'React SPA (Single-Page Application)',
      'Component-based architecture',
      'Mobile-first responsive design',
      'Basic SEO meta tags & Open Graph',
      'Contact form with Web3Forms',
      'Performance-optimised build (Vite)',
      'Git repository + deployment-ready',
    ],
    addedServices: [
      '2 rounds of design revisions',
      '30-day post-launch bug support',
      'Basic Lighthouse performance audit',
    ],
    elevated: false,
  },
]

// ─── Injected global styles ───────────────────────────────────────────────────
export const PRICING_STYLES = `
  @keyframes pricingObjFloat {
    0%, 100% { transform: translateY(0px)   rotateY(0deg);  }
    33%       { transform: translateY(-10px) rotateY(10deg); }
    66%       { transform: translateY(-6px)  rotateY(-8deg); }
  }
  @keyframes planModalBackdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes planModalIn {
    from { opacity: 0; transform: scale(0.94) translateY(20px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }

  .plan-input::placeholder { color: rgba(255,255,255,0.25); }
  .plan-input:focus {
    outline: none;
    border-bottom-color: rgba(59,255,108,0.55) !important;
  }
  .plan-choose-btn {
    transition: background 0.25s ease, transform 0.2s ease, opacity 0.2s ease;
  }
  .plan-choose-btn:hover {
    background: rgba(0,0,0,0.92) !important;
    transform: scale(1.02);
  }

  /* Web-dev card choose button */
  .webdev-choose-btn {
    transition: background 0.25s ease, transform 0.2s ease;
  }
  .webdev-choose-btn:hover {
    background: rgba(15,10,40,0.95) !important;
    transform: scale(1.02);
  }

  /* Web-dev modal input focus accent */
  .webdev-input::placeholder { color: rgba(255,255,255,0.25); }
  .webdev-input:focus {
    outline: none;
    border-bottom-color: rgba(139,92,246,0.65) !important;
  }

  @media (max-width: 992px) {
    .pricing-inner  { padding-left: 60px !important; padding-right: 60px !important; }
    .pricing-grid   { flex-direction: column !important; align-items: center !important; }
    .pricing-card   { width: 100% !important; max-width: 420px !important; margin-top: 0 !important; }
    .webdev-grid    { flex-direction: column !important; align-items: center !important; }
    .webdev-card    { width: 100% !important; max-width: 520px !important; }
  }
  @media (max-width: 768px) {
    .pricing-inner    { padding-left: 24px !important; padding-right: 24px !important; }
    .plan-modal-inner { padding: 28px 20px !important; }
    .plan-modal-grid  { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .pricing-inner       { padding-left: 16px !important; padding-right: 16px !important; }
    .plan-modal-backdrop { padding: 12px !important; align-items: flex-start !important; padding-top: 20px !important; }
    .plan-modal-inner    { border-radius: 16px !important; max-height: calc(100vh - 40px) !important; }
  }
`