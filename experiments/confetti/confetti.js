/* confetti.js — ES6 rewrite
   Public API (matches original):
     startConfetti()   — start streaming confetti
     stopConfetti()    — stop spawning new particles (existing ones fall out)
     toggleConfetti()  — start if stopped, stop if running
     removeConfetti()  — stop immediately and clear all particles
*/

const Confetti = (() => {
  /* ── Config ─────────────────────────────────────────────── */
  let MAX_PARTICLES = 150;
  let PARTICLE_SPEED = 2;
  const COLORS = [
    'DodgerBlue', 'OliveDrab', 'Gold', 'Pink', 'SlateBlue',
    'LightBlue', 'Violet', 'PaleGreen', 'SteelBlue',
    'SandyBrown', 'Chocolate', 'Crimson',
  ];

  /* ── State ───────────────────────────────────────────────── */
  let streaming    = false;
  let animFrameId  = null;
  let particles    = [];
  let waveAngle    = 0;
  let canvas       = null;
  let ctx          = null;
  let resizeWired  = false;

  /* ── Particle helpers ────────────────────────────────────── */
  function resetParticle(p) {
    const { width, height } = canvas;
    p.color              = COLORS[(Math.random() * COLORS.length) | 0];
    p.x                  = Math.random() * width;
    p.y                  = Math.random() * height - height;
    p.diameter           = Math.random() * 10 + 5;
    p.tilt               = Math.random() * 10 - 10;
    p.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    p.tiltAngle          = 0;
    return p;
  }

  function makeParticle() {
    return resetParticle({});
  }

  /* ── Canvas setup ────────────────────────────────────────── */
  function ensureCanvas() {
    if (canvas) return;

    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    Object.assign(canvas.style, {
      display:       'block',
      position:      'fixed',
      top:           '0',
      left:          '0',
      width:         '100%',
      height:        '100%',
      zIndex:        '999999',
      pointerEvents: 'none',
    });
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    /* Wire resize once — never re-registered */
    if (!resizeWired) {
      window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }, { passive: true });
      resizeWired = true;
    }

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* ── Draw ────────────────────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.lineWidth   = p.diameter;
      ctx.strokeStyle = p.color;
      const x = p.x + p.tilt;
      ctx.moveTo(x + p.diameter / 2, p.y);
      ctx.lineTo(x, p.y + p.tilt + p.diameter / 2);
      ctx.stroke();
    }
  }

  /* ── Update ──────────────────────────────────────────────── */
  function update() {
    const { width, height } = canvas;
    waveAngle += 0.01;

    /* Iterate in reverse so splice doesn't skip elements */
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      if (!streaming && p.y < -15) {
        p.y = height + 100;
        continue;
      }

      p.tiltAngle += p.tiltAngleIncrement;
      p.x         += Math.sin(waveAngle);
      p.y         += (Math.cos(waveAngle) + p.diameter + PARTICLE_SPEED) * 0.5;
      p.tilt       = Math.sin(p.tiltAngle) * 15;

      const offscreen = p.x > width + 20 || p.x < -20 || p.y > height;
      if (offscreen) {
        if (streaming && particles.length <= MAX_PARTICLES) {
          resetParticle(p);
        } else {
          particles.splice(i, 1);
        }
      }
    }
  }

  /* ── Animation loop ─────────────────────────────────────── */
  function loop() {
    if (particles.length === 0) {
      animFrameId = null;
      return;
    }
    update();
    draw();
    animFrameId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (animFrameId === null) {
      animFrameId = requestAnimationFrame(loop);
    }
  }

  /* ── Public API ──────────────────────────────────────────── */
  function start() {
    ensureCanvas();
    while (particles.length < MAX_PARTICLES) {
      particles.push(makeParticle());
    }
    streaming = true;
    startLoop();
  }

  function stop() {
    streaming = false;
  }

  function toggle() {
    streaming ? stop() : start();
  }

  function remove() {
    stop();
    particles = [];
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function setMaxParticles(n) { MAX_PARTICLES = n; }
  function setSpeed(n)        { PARTICLE_SPEED = n; }

  return { start, stop, toggle, remove, setMaxParticles, setSpeed };
})();

/* ── Global aliases to match original API ─────────────────── */
const startConfetti  = Confetti.start;
const stopConfetti   = Confetti.stop;
const toggleConfetti = Confetti.toggle;
const removeConfetti = Confetti.remove;
