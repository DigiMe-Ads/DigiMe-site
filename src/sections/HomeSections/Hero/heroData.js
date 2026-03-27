// ─── Brand logos ─────────────────────────────────────────────────────────────
export const BRANDS = [
  { name: 'Deli',         logo: '/images/Home/Logos/deli.webp'                 },
  { name: 'Deltano',      logo: '/images/Home/Logos/DelTano.png'               },
  { name: 'FIFE',         logo: '/images/Home/Logos/FIFE.png'                  },
  { name: 'HOG',          logo: '/images/Home/Logos/HOG-white.png'             },
  { name: 'Lavinia',      logo: '/images/Home/Logos/Lavinia.png'               },
  { name: 'MAYS',         logo: '/images/Home/Logos/mays.png'                  },
  { name: 'Nidahas',      logo: '/images/Home/Logos/NIDAHAS.png'               },
  { name: 'Mirissa',      logo: '/images/Home/Logos/O Mirissa logo final.png'  },
  { name: 'SONO',         logo: '/images/Home/Logos/SONO.png'                  },
  { name: 'Square',       logo: '/images/Home/Logos/square_logo.png'           },
  { name: 'Square Space', logo: '/images/Home/Logos/The-Square-Space.webp'     },
  { name: 'Kickerz',      logo: '/images/Home/Logos/kickerz.png'              },
]

// ─── Injected global keyframes + responsive rules ─────────────────────────────
export const HERO_KEYFRAMES = `
  @keyframes glowPulse {
    0%, 100% { opacity: 0.55; transform: scale(1);    }
    50%       { opacity: 0.75; transform: scale(1.08); }
  }
  @keyframes spinText {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes logoScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @media (max-width: 1200px) {
    .hero-inner { padding-left: 120px !important; }
  }
  @media (max-width: 992px) {
    .hero-inner { padding-left: 60px !important; }
    .hero-trust-bar { margin-left: -60px !important; }
  }
  @media (max-width: 768px) {
    .hero-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .hero-trust-bar { margin-left: -24px !important; margin-right: -24px !important; }
    .hero-h1 { font-size: 48px !important; line-height: 58px !important; }
    .hero-orbit { display: none !important; }
    .hero-trusted-label { min-width: 140px !important; padding: 16px 20px !important; font-size: 13px !important; }
    .hero-label-text { font-size: 13px !important; }
  }
  @media (max-width: 480px) {
    .hero-h1 { font-size: 36px !important; line-height: 44px !important; }
    .hero-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .hero-trust-bar { margin-left: -16px !important; margin-right: -16px !important; }
    .hero-trusted-label { display: none !important; }
  }
`