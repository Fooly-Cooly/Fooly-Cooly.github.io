// grid-gallery / main.js
// Conventions: HTML built as strings → innerHTML once.
// Null async vars inside .then(). let btn pattern for listeners.

'use strict';

// ------------------------------------------------------------------
// Tilt state per-cell. Stored outside the DOM so we don't attach
// data attributes everywhere.
// ------------------------------------------------------------------

/** @type {Map<Element, { raf: number|null, tx: number, ty: number, cx: number, cy: number }>} */
const tiltState = new Map();

// Tilt magnitude in degrees — how far the card tilts at the edge
const TILT_MAX = 12;

// Lerp factor per frame: 1 = instant, 0.1 = very slow catch-up.
// We want quick-feeling but slightly soft motion.
const LERP = 0.14;

// ------------------------------------------------------------------
// lerp helper
// ------------------------------------------------------------------

function lerp(a, b, t) {
    return a + (b - a) * t;
}

// ------------------------------------------------------------------
// Tilt update loop — runs via rAF while mouse is over a cell.
// target (tx, ty) is set by mousemove. current (cx, cy) chases it.
// ------------------------------------------------------------------

function tiltLoop(wrap) {
    const state = tiltState.get(wrap);
    if (!state) return;

    state.cx = lerp(state.cx, state.tx, LERP);
    state.cy = lerp(state.cy, state.ty, LERP);

    wrap.style.transform = `perspective(800px) rotateX(${state.cy.toFixed(2)}deg) rotateY(${state.cx.toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;

    if (wrap.classList.contains('is-popped')) {
        state.raf = requestAnimationFrame(() => tiltLoop(wrap));
    } else {
        state.raf = null;
    }
}

// ------------------------------------------------------------------
// Mouse enter: pop out the wrapper, wire wrap-level listeners,
// and start the tilt rAF loop.
// mousemove goes on the WRAP (not the cell) because .is-popped
// expands it 15% beyond the cell boundary — the mouse can move
// into that expanded region without the cell ever seeing the event.
// ------------------------------------------------------------------

function onWrapEnter(e) {
    const wrap = e.currentTarget;
    const cell = wrap.closest('.gg-cell');
    if (!cell) return;

    wrap.classList.add('is-popped');
    wrap.style.transition = 'box-shadow 0.45s cubic-bezier(0.23,1,0.32,1), border-radius 0.3s ease';

    tiltState.set(wrap, { raf: null, tx: 0, ty: 0, cx: 0, cy: 0 });

    wrap._ggCell    = cell;
    wrap._ggOnMove  = onWrapMove.bind(null, wrap);
    wrap._ggOnLeave = onWrapLeave.bind(null, wrap);
    wrap.addEventListener('mousemove',  wrap._ggOnMove);
    wrap.addEventListener('mouseleave', wrap._ggOnLeave);

    let state = tiltState.get(wrap);
    state.raf = requestAnimationFrame(() => tiltLoop(wrap));
}

// ------------------------------------------------------------------
// Mouse move on the WRAP — map cursor to tilt target
// ------------------------------------------------------------------

function onWrapMove(wrap, e) {
    let state = tiltState.get(wrap);
    if (!state) return;

    // Map against the cell rect so dead-centre of the cell = 0,0 tilt.
    // Using the wrap rect would shift the neutral point as the card tilts.
    const rect = wrap._ggCell.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top)  / rect.height;

    state.tx =  (relX - 0.5) * 2 * TILT_MAX;
    state.ty = -(relY - 0.5) * 2 * TILT_MAX;

    state = null;
}

// ------------------------------------------------------------------
// Mouse leave on the WRAP — tear down and snap back.
// Guard against spurious leave events when mouse moves to a child
// element (img, caption) — relatedTarget will be inside the wrap.
// ------------------------------------------------------------------

function onWrapLeave(wrap, e) {
    if (wrap.contains(e.relatedTarget)) return;

    wrap.classList.remove('is-popped');

    let state = tiltState.get(wrap);
    if (state) {
        if (state.raf !== null) cancelAnimationFrame(state.raf);
        tiltState.delete(wrap);
        state = null;
    }

    wrap.removeEventListener('mousemove',  wrap._ggOnMove);
    wrap.removeEventListener('mouseleave', wrap._ggOnLeave);
    wrap._ggOnMove  = null;
    wrap._ggOnLeave = null;
    wrap._ggCell    = null;

    // Restore full transition so transform snaps back smoothly via CSS,
    // then clear the inline style once the transition completes.
    wrap.style.transition = '';
    wrap.style.transform  = '';
}

// ------------------------------------------------------------------
// Attach interaction listeners to all cells
// ------------------------------------------------------------------

function attach_Listeners(container) {
    const wraps = container.querySelectorAll('.gg-img-wrap');
    for (let i = 0; i < wraps.length; i++) {
        let wrap = wraps[i];
        wrap.addEventListener('mouseenter', onWrapEnter);
        wrap = null;
    }
}

// ------------------------------------------------------------------
// Build skeleton grid while loading
// ------------------------------------------------------------------

function build_Skeleton(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += '<div class="gg-cell-skeleton"></div>';
    }
    return html;
}

// ------------------------------------------------------------------
// Build the real grid from manifest data
// ------------------------------------------------------------------

function build_Grid(images) {
    let html = '';
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        html += `<div class="gg-cell">
            <div class="gg-img-wrap">
                <img src="${img.src}" alt="${img.title}" loading="lazy" decoding="async">
                <div class="gg-caption">
                    <span class="gg-caption-cat">${img.category}</span>
                    <span class="gg-caption-title">${img.title}</span>
                </div>
            </div>
        </div>`;
    }
    return html;
}

// ------------------------------------------------------------------
// Render board — replaces grid contents and wires listeners
// ------------------------------------------------------------------

function render_Board(images) {
    let grid = document.getElementById('gg-grid');
    let count = document.getElementById('gg-count');

    if (!grid) return;

    grid.innerHTML = build_Grid(images);
    attach_Listeners(grid);

    if (count) {
        count.textContent = `${images.length} image${images.length !== 1 ? 's' : ''}`;
    }

    grid = null;
    count = null;
}

// ------------------------------------------------------------------
// Fetch manifest and initialise
// ------------------------------------------------------------------

function init() {
    let grid = document.getElementById('gg-grid');
    if (!grid) return;

    // Show skeleton immediately
    grid.innerHTML = build_Skeleton(12);
    grid = null;

    fetch('./gallery.json')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(images => {
            render_Board(images);
            images = null;
        })
        .catch(err => {
            let g = document.getElementById('gg-grid');
            if (g) {
                g.innerHTML = `<p class="gg-state gg-state-err">// failed to load gallery — ${err.message}</p>`;
                g = null;
            }
        });
}

// ------------------------------------------------------------------
// Entry point
// ------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', init);
