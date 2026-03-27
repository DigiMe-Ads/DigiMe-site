// ─── Card definitions ─────────────────────────────────────────────────────────
export const CARDS = [
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/final xz.mp4',
    poster:  null,
    caption: 'Brand launch campaign — FreshBrew Co.',
    col: 0, delay: 0,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Delivery HOG Post.jpg',
    caption: 'Product shoot — Velour Studio',
    tag:     'Post',
    likes:   '2.4K',
    col: 0, delay: 0.4,
  },
  {
    type:    'stat',
    value:   '150+',
    label:   'Projects delivered',
    sub:     'Across 12 industries',
    col: 0, delay: 0.7,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Pickme ad uber.3.jpg',
    caption: 'Editorial shoot — NOX Label',
    tag:     'Post',
    likes:   '1.8K',
    col: 1, delay: 0.15,
  },
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/Lavinia FInal.mp4',
    poster:  null,
    caption: 'Social campaign — Apex Sneakers',
    col: 1, delay: 0.5,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Post 15.jpg',
    caption: 'Behind the lens — product series',
    tag:     'Post',
    likes:   '984',
    col: 1, delay: 0.8,
  },
  {
    type:    'stat',
    value:   '340%',
    label:   'Avg. engagement lift',
    sub:     'Social media clients',
    col: 2, delay: 0.08,
  },
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/reel 2.mp4',
    poster:  null,
    caption: 'Motion graphics — Apex Sneakers',
    col: 2, delay: 0.45,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Post 16.jpg',
    caption: 'Campaign — Rift Valley Roasters',
    tag:     'Post',
    likes:   '3.1K',
    col: 2, delay: 0.75,
  },
  {
    type:    'post',
    image:   '/images/Home/Content/Posts/Post 18.jpg',
    caption: 'Street campaign — NOX Label',
    tag:     'Post',
    likes:   '1.2K',
    col: 3, delay: 0.2,
  },
  {
    type:    'reel',
    src:     '/images/Home/Content/Reels/reel.mp4',
    poster:  null,
    caption: 'Brand film — Velour Studio',
    col: 3, delay: 0.5,
  },
  {
    type:    'stat',
    value:   '98%',
    label:   'Client retention',
    sub:     'Since 2020',
    col: 3, delay: 0.8,
  },
]

// ─── Float animation names + durations per column ────────────────────────────
export const FLOAT_ANIMS = ['wallFloat0', 'wallFloat1', 'wallFloat2', 'wallFloat3']
export const FLOAT_DURS  = [7, 9, 6.5, 8]

// ─── Global styles injected once into <head> ─────────────────────────────────
export const CONTENT_WALL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  @keyframes wallCardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)     scale(1);    }
  }
  @keyframes wallFloat0 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-7px)}  }
  @keyframes wallFloat1 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-11px)} }
  @keyframes wallFloat2 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-5px)}  }
  @keyframes wallFloat3 { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-9px)}  }
  @keyframes wallGlow   { 0%,100%{opacity:0.4} 50%{opacity:0.8} }

  .wall-card {
    cursor: default;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .wall-card:hover { transform: translateY(-6px) scale(1.02) !important; z-index: 10 !important; }
  .reel-caption { transition: opacity 0.3s ease, transform 0.3s ease; }
  .wall-card:hover .reel-caption { opacity: 1 !important; transform: translateY(0) !important; }

  .wall-inner { padding-left: 285px; padding-right: 285px; }
  .wall-grid  { grid-template-columns: repeat(4, 1fr); }
  .wall-col-offset { margin-top: 28px; }

  @media (max-width: 1100px) {
    .wall-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .wall-grid  { grid-template-columns: repeat(3, 1fr) !important; }
    .wall-col-3 { display: none !important; }
  }
  @media (max-width: 1024px) {
    .wall-inner { padding-left: 48px !important; padding-right: 48px !important; }
  }
  @media (max-width: 768px) {
    .wall-inner      { padding-left: 20px !important; padding-right: 20px !important; }
    .wall-grid       { grid-template-columns: repeat(2, 1fr) !important; }
    .wall-col-2,
    .wall-col-3      { display: none !important; }
    .wall-col-offset { margin-top: 16px !important; }
    .wall-header-pad { padding-top: 72px !important; padding-bottom: 32px !important; }
    .wwa-torus       { display: none !important; }
    .wwa-viewmore    { display: none !important; }
  }
  @media (max-width: 500px) {
    .wall-inner      { padding-left: 16px !important; padding-right: 16px !important; }
    .wall-grid       { grid-template-columns: 1fr !important; }
    .wall-col-1,
    .wall-col-2,
    .wall-col-3      { display: none !important; }
    .wall-col-offset { margin-top: 0 !important; }
    .wall-header-pad { padding-top: 56px !important; padding-bottom: 24px !important; }
  }
  @media (hover: none) {
    .wall-card:hover { transform: none !important; }
  }
`