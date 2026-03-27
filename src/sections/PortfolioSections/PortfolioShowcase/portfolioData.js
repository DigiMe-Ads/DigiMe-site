// ─── Portfolio items ──────────────────────────────────────────────────────────
export const ALL_ITEMS = [
  { type:'reel',  cat:'Reels', src:'/images/Home/Content/Reels/final xz.mp4',      poster:null, title:'Iftar Campaign',             client:'House of Gifts',                   span:1 },
  { type:'reel',  cat:'Reels', src:'/images/Home/Content/Reels/Lavinia FInal.mp4', poster:null, title:'Cafe Promo',                  client:'Lavinia Deli & Cafe',              span:1 },
  { type:'reel',  cat:'Reels', src:'/images/Home/Content/Reels/reel 2.mp4',        poster:null, title:'Restaurant Promo',            client:'Mirissa Cafe & Bistro',            span:1 },
  { type:'reel',  cat:'Reels', src:'/images/Home/Content/Reels/reel.mp4',          poster:null, title:'Home Decor Promo',            client:'',                                 span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Delivery HOG Post.jpg',  title:'Delivery Campaign',            client:'House of Gifts',                   span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Pickme ad uber.3.jpg',   title:'Delivery Promotion',           client:'House of Gifts',                   span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 15.jpg',            title:'Restaurant Promo',             client:'MAYS TABLE',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 16.jpg',            title:'Table Worth Discovering',      client:'MAYS TABLE',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 18.jpg',            title:"Colombo's Thai Secret",        client:'MAYS TABLE',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 27.jpg',            title:'Evening Starts Here',          client:'Mirissa Cafe & Bistro',            span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 29.jpg',            title:'Find Us',                      client:'Mirissa Cafe & Bistro',            span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 36.jpg',            title:'Slice into Happiness',         client:"Diltano's Wood Fired Pizza & Pasta", span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 60.jpg',            title:'First Round is a Story',       client:'Nidahas',                          span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 61.jpg',            title:'The Table is Waiting',         client:'Nidahas',                          span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 62.jpg',            title:'Not Just a Bar',               client:'Nidahas',                          span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 212.jpg',           title:'Exclusive',                    client:'MAYS TABLE',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 233.jpg',           title:'Where Experiences Intersect',  client:'THE SQUARE',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 304.jpg',           title:'A Design That Understands You',client:'Residences',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 306.jpg',           title:'Elevate Your Everyday Moments',client:'Residences',                       span:1 },
  { type:'photo', cat:'Posts', image:'/images/Home/Content/Posts/Post 318.jpg',           title:'Five Star Feeling',            client:'Residences',                       span:1 },
]

// ─── Filter tabs ──────────────────────────────────────────────────────────────
export const FILTERS = ['All', 'Reels', 'Posts']

// ─── Global styles injected once into <head> ─────────────────────────────────
export const SHOWCASE_STYLES = `
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