// ============================================================
// dotsbyrach — site behaviour
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- mobile nav ----------
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ---------- palette used across generative art ----------
const PALETTE = ['#D8A857', '#C15B72', '#6B3F69', '#E9C787', '#8A5A8C', '#B04B62'];

// ============================================================
// HERO — dot mandala that draws itself, ring by ring
// ============================================================
(function heroMandala(){
  const canvas = document.getElementById('mandalaCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = canvas.offsetWidth;
    h = canvas.clientHeight = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // build rings of dots: each ring has a count, radius, size, color, phase
  function buildRings(){
    const cx = w / 2, cy = h / 2;
    const baseR = Math.min(w, h) * 0.11;
    const rings = [];
    const ringCount = 7;
    for (let r = 0; r < ringCount; r++){
      const radius = baseR + r * baseR * 0.62;
      const count = 8 + r * 5;
      const size = r % 2 === 0 ? 3.2 : 2.1;
      const color = PALETTE[r % PALETTE.length];
      const dots = [];
      for (let i = 0; i < count; i++){
        const angle = (i / count) * Math.PI * 2;
        dots.push({ angle, radius, size, color });
      }
      rings.push({ dots, speed: (r % 2 === 0 ? 1 : -1) * (0.06 + r * 0.01), appearAt: r * 0.09 });
    }
    return { cx, cy, rings };
  }

  let scene = buildRings();
  window.addEventListener('resize', () => { scene = buildRings(); });

  let t = 0;
  let revealProgress = 0; // 0 -> 1, dots appear ring by ring on load

  function draw(){
    ctx.clearRect(0, 0, w, h);
    const { cx, cy, rings } = scene;

    rings.forEach(ring => {
      const ringReveal = Math.min(1, Math.max(0, (revealProgress - ring.appearAt) / 0.12));
      if (ringReveal <= 0) return;
      const rot = t * ring.speed;
      const visibleCount = Math.ceil(ring.dots.length * ringReveal);
      ring.dots.forEach((dot, i) => {
        if (i >= visibleCount) return;
        const a = dot.angle + rot;
        const x = cx + Math.cos(a) * dot.radius;
        const y = cy + Math.sin(a) * dot.radius;
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = 0.85;
        ctx.fill();
      });
    });
    ctx.globalAlpha = 1;
  }

  function loop(){
    t += reduceMotion ? 0 : 0.006;
    if (revealProgress < 1) revealProgress += 0.008;
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();

// ============================================================
// ABOUT — static generated mandala (SVG)
// ============================================================
(function aboutMandala(){
  const g = document.getElementById('aboutMandala');
  if (!g) return;
  const cx = 200, cy = 200;
  const rings = 6;
  const ns = 'http://www.w3.org/2000/svg';
  for (let r = 1; r <= rings; r++){
    const radius = r * 26;
    const count = 6 + r * 4;
    const size = r % 2 === 0 ? 3.4 : 2.2;
    const color = PALETTE[r % PALETTE.length];
    for (let i = 0; i < count; i++){
      const angle = (i / count) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', x.toFixed(2));
      circle.setAttribute('cy', y.toFixed(2));
      circle.setAttribute('r', size);
      circle.setAttribute('fill', color);
      circle.setAttribute('opacity', '0.9');
      g.appendChild(circle);
    }
  }
})();

// ============================================================
// GALLERY — generated placeholder tiles (swap for real photos)
// ============================================================
(function gallery(){
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const pieces = [
    { file: 'mandala-01.jpg', title: 'Keychain series' },
    { file: 'mandala-02.jpg', title: 'Festival panel' },
    { file: 'mandala-03.jpg', title: 'Round canvas' },
    { file: 'mandala-04.jpg', title: 'Pastel study' },
    { file: 'mandala-05.jpg', title: 'Wall hanging' },
    { file: 'mandala-06.jpg', title: 'Custom order' },
  ];

  pieces.forEach((piece, idx) => {
    const c1 = PALETTE[idx % PALETTE.length];
    const c2 = PALETTE[(idx + 2) % PALETTE.length];
    const c3 = PALETTE[(idx + 4) % PALETTE.length];
    const rotate = (idx % 2 === 0 ? 1 : -1) * (6 + idx * 3);

    const tile = document.createElement('div');
    tile.className = 'gallery-tile';
    tile.innerHTML = `
      <div class="gallery-tile__pattern" style="
        background:
          radial-gradient(circle at 50% 50%, transparent 0 10px, ${c1} 10px 12px, transparent 12px 22px, ${c2} 22px 24px, transparent 24px 36px, ${c3} 36px 38px, transparent 38px 52px, ${c1} 52px 54px, transparent 54px 100%),
          linear-gradient(135deg, #221331, #2B1A3D);
        transform: rotate(${rotate}deg) scale(1.3);
      "></div>
      <div class="gallery-tile__label">
        <span>${piece.title}</span>
        <span>${piece.file}</span>
      </div>
    `;
    grid.appendChild(tile);
  });
})();

// ============================================================
// COMMISSION FORM — build a shareable message, no backend needed
// ============================================================
(function commission(){
  const form = document.getElementById('commissionForm');
  const result = document.getElementById('commissionResult');
  const messageEl = document.getElementById('commissionMessage');
  const copyBtn = document.getElementById('copyBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const ig = data.get('ig') || '';
    const size = data.get('size') || '';
    const occasion = data.get('occasion') || '';
    const colors = data.get('colors') || '';
    const message = data.get('message') || '';

    const lines = [
      `Hi Rachna! I'd like to commission a dot mandala.`,
      ``,
      `Name: ${name}`,
      ig ? `Instagram: ${ig}` : null,
      `Size: ${size}`,
      occasion ? `Occasion: ${occasion}` : null,
      colors ? `Preferred colours/theme: ${colors}` : null,
      message ? `Notes: ${message}` : null,
    ].filter(Boolean);

    messageEl.textContent = lines.join('\n');
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(messageEl.textContent);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2000);
    } catch (err) {
      // fallback for older browsers
      const range = document.createRange();
      range.selectNode(messageEl);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2000);
    }
  });
})();
