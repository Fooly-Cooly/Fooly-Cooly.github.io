// card-gallery / main.js
'use strict';

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

const TILT_MAX     = 14;
const LERP_IN      = 0.12;
const BASE_SPEED   = 38;
const SPEED_JITTER = 0.22;
// How many pixels to nudge per arrow button click (one card-ish width)
const ARROW_NUDGE  = 200;
// How many pixels to nudge per wheel tick
const WHEEL_NUDGE  = 120;

const rowDirection = (i) => i % 2 === 0 ? 'left' : 'right';

// ------------------------------------------------------------------
// Module-level state
// ------------------------------------------------------------------

let albumCache    = {};
let activeAlbum   = null;
let activeTag     = 'all';
let cards         = [];
let lbOpen        = false;
let scrollPaused  = false;   // global scroll pause state
let sidebarCollapsed = false;

const tiltState = new Map();  // face → { raf, tx, ty, cx, cy }
const dragState = new Map();  // track → { dragging, startX, lastX, currentX } (touch only)

// ------------------------------------------------------------------
// Lerp
// ------------------------------------------------------------------

function lerp(a, b, t) { return a + (b - a) * t; }

// ------------------------------------------------------------------
// Tilt loop
// ------------------------------------------------------------------

function tiltLoop(face) {
    const s = tiltState.get(face);
    if (!s) return;

    s.cx = lerp(s.cx, s.tx, LERP_IN);
    s.cy = lerp(s.cy, s.ty, LERP_IN);

    face.style.transform =
        `perspective(700px) rotateX(${s.cy.toFixed(2)}deg) rotateY(${s.cx.toFixed(2)}deg) scale3d(1.06,1.06,1.06)`;

    const sheen = face.querySelector('.cg-sheen');
    if (sheen) {
        const px = ((s.cx / TILT_MAX) * 0.5 + 0.5) * 100;
        const py = ((-s.cy / TILT_MAX) * 0.5 + 0.5) * 100;
        sheen.style.setProperty('--sheen-x', px.toFixed(1) + '%');
        sheen.style.setProperty('--sheen-y', py.toFixed(1) + '%');
    }

    if (tiltState.has(face)) {
        s.raf = requestAnimationFrame(() => tiltLoop(face));
    }
}

// ------------------------------------------------------------------
// Tilt enter
// ------------------------------------------------------------------

function onFaceEnter(e) {
    const face  = e.currentTarget;
    const track = face.closest('.cg-track');

    if (track) setTrackPaused(track, true);

    face.classList.add('is-tilting');
    face.style.transition = 'box-shadow 0.4s cubic-bezier(0.23,1,0.32,1), border-radius 0.3s ease';

    tiltState.set(face, { raf: null, tx: 0, ty: 0, cx: 0, cy: 0 });

    face._cgOnMove  = onFaceMove.bind(null, face);
    face._cgOnLeave = onFaceLeave.bind(null, face);
    face.addEventListener('mousemove',  face._cgOnMove);
    face.addEventListener('mouseleave', face._cgOnLeave);

    const s = tiltState.get(face);
    s.raf = requestAnimationFrame(() => tiltLoop(face));
}

// ------------------------------------------------------------------
// Tilt move
// ------------------------------------------------------------------

function onFaceMove(face, e) {
    const s = tiltState.get(face);
    if (!s) return;

    const rect = face.getBoundingClientRect();
    s.tx =  ((e.clientX - rect.left)  / rect.width  - 0.5) * 2 * TILT_MAX;
    s.ty = -((e.clientY - rect.top)   / rect.height - 0.5) * 2 * TILT_MAX;
}

// ------------------------------------------------------------------
// Tilt leave
// ------------------------------------------------------------------

function onFaceLeave(face, e) {
    if (face.contains(e.relatedTarget)) return;

    const track = face.closest('.cg-track');

    face.classList.remove('is-tilting');

    const s = tiltState.get(face);
    if (s) {
        if (s.raf !== null) cancelAnimationFrame(s.raf);
        tiltState.delete(face);
    }

    face.removeEventListener('mousemove',  face._cgOnMove);
    face.removeEventListener('mouseleave', face._cgOnLeave);
    face._cgOnMove  = null;
    face._cgOnLeave = null;
    face.style.transition = '';
    face.style.transform  = '';

    // Resume track only if global scroll isn't paused and lightbox isn't open
    if (track && !lbOpen && !scrollPaused) {
        setTrackPaused(track, false);
    }
}

// ------------------------------------------------------------------
// Track pause/resume
// ------------------------------------------------------------------

function setTrackPaused(track, paused) {
    if (paused) {
        track.classList.add('is-paused');
    } else {
        track.classList.remove('is-paused');
    }
}

function setAllTracksPaused(paused) {
    document.querySelectorAll('.cg-track').forEach(t => setTrackPaused(t, paused));
}

// ------------------------------------------------------------------
// Re-sync animation from a given translateX position.
// Used after wheel scroll and touch drag end.
// ------------------------------------------------------------------

function resyncTrack(track, currentX) {
    const half     = parseFloat(track.dataset.halfWidth || 0);
    const duration = parseFloat(track.dataset.duration  || BASE_SPEED);
    const dir      = track.dataset.dir;
    const animName = dir === 'left' ? 'cg-scroll-left' : 'cg-scroll-right';

    let progress = 0;
    if (half > 0) {
        const raw = dir === 'left'
            ? -currentX / half
            :  (currentX + half) / half;
        progress = ((raw % 1) + 1) % 1;
    }

    const delay = -(progress * duration);

    // Clear all inline overrides — pause state is controlled only via
    // the is-paused CSS class, never via inline animationPlayState.
    track.style.transform          = '';
    track.style.animationPlayState = '';
    track.style.animation          = '';
    track.classList.remove('is-paused');

    track.style.animationName           = animName;
    track.style.animationDuration       = `${duration}s`;
    track.style.animationTimingFunction = 'linear';
    track.style.animationDelay          = `${delay}s`;
    track.style.animationIterationCount = 'infinite';
    track.style.animationFillMode       = 'none';
    // Never set animationPlayState here — leave it to the CSS class
}

function wrapX(x, track) {
    const half = parseFloat(track.dataset.halfWidth || 0);
    if (half <= 0) return x;
    return ((x % half) - half) % half;
}

function snapshotX(track) {
    const mat = new DOMMatrix(getComputedStyle(track).transform);
    return mat.m41;
}

// ------------------------------------------------------------------
// Wheel scroll — nudge the row the mouse is over
// ------------------------------------------------------------------

function onRowWheel(e, track) {
    e.preventDefault();

    // If paused, we need to detach the animation so our inline transform
    // actually wins — a paused animation targeting transform still beats
    // an inline transform. Snapshot position first, then remove anim name.
    if (scrollPaused || lbOpen) {
        if (track.style.animationName !== 'none') {
            const currentX = snapshotX(track);
            track.style.animationName = 'none';
            track.style.transform = `translateX(${currentX}px)`;
        }
        const currentX = parseFloat(track.style.transform.replace('translateX(', '')) || 0;
        const dir  = track.dataset.dir;
        const sign = dir === 'left' ? -1 : 1;
        const dx   = sign * (e.deltaY > 0 ? -WHEEL_NUDGE : WHEEL_NUDGE);
        const newX = wrapX(currentX + dx, track);
        track.style.transform = `translateX(${newX}px)`;
        return;
    }

    // Auto-scrolling case — inline transform overrides running animation visually
    const currentX = snapshotX(track);
    const dir  = track.dataset.dir;
    const sign = dir === 'left' ? -1 : 1;
    const dx   = sign * (e.deltaY > 0 ? -WHEEL_NUDGE : WHEEL_NUDGE);
    const newX = wrapX(currentX + dx, track);

    track.style.transform = `translateX(${newX}px)`;

    clearTimeout(track._wheelTimer);
    track._wheelTimer = setTimeout(() => {
        resyncTrack(track, newX);
        track._wheelTimer = null;
    }, 180);
}

// ------------------------------------------------------------------
// Arrow nudge
// ------------------------------------------------------------------

function nudgeRow(track, direction) {
    const dx = direction === 'next' ? -ARROW_NUDGE : ARROW_NUDGE;

    if (scrollPaused || lbOpen) {
        // Detach animation so inline transform wins
        if (track.style.animationName !== 'none') {
            const currentX = snapshotX(track);
            track.style.animationName = 'none';
            track.style.transform = `translateX(${currentX}px)`;
        }
        const currentX = parseFloat(track.style.transform.replace('translateX(', '')) || 0;
        const newX = wrapX(currentX + dx, track);
        track.style.transform = `translateX(${newX}px)`;
        return;
    }

    // Auto-scrolling case
    const currentX = snapshotX(track);
    const newX = wrapX(currentX + dx, track);
    track.style.transform = `translateX(${newX}px)`;
    resyncTrack(track, newX);
}

// ------------------------------------------------------------------
// Touch drag (mobile only — no mouse drag)
// ------------------------------------------------------------------

function initTouch(track) {
    dragState.set(track, { dragging: false, startX: 0, lastX: 0, currentX: 0 });

    track.addEventListener('touchstart', (e) => {
        const ds    = dragState.get(track);
        ds.dragging = true;
        ds.startX   = e.touches[0].clientX;
        ds.lastX    = e.touches[0].clientX;
        const mat   = new DOMMatrix(getComputedStyle(track).transform);
        ds.currentX = mat.m41;
        track.style.animationPlayState = 'paused';
        track.style.transform = `translateX(${ds.currentX}px)`;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        const ds = dragState.get(track);
        if (!ds.dragging) return;
        const dx    = e.touches[0].clientX - ds.lastX;
        ds.lastX    = e.touches[0].clientX;
        ds.currentX = wrapX(ds.currentX + dx, track);
        track.style.transform = `translateX(${ds.currentX}px)`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        const ds = dragState.get(track);
        if (!ds.dragging) return;
        ds.dragging = false;
        if (!scrollPaused && !lbOpen) {
            resyncTrack(track, ds.currentX);
        } else {
            track.style.animationPlayState = 'paused';
        }
    });
}

// ------------------------------------------------------------------
// Build a marquee row
// ------------------------------------------------------------------

function buildRow(rowCards, rowIndex) {
    const row   = document.createElement('div');
    row.className = 'cg-row';

    // Arrow buttons — appended to row (not track, so they stay fixed)
    const arrowL = document.createElement('button');
    arrowL.className  = 'cg-row-arrow is-left';
    arrowL.textContent = '‹';
    arrowL.setAttribute('aria-label', 'Scroll left');

    const arrowR = document.createElement('button');
    arrowR.className  = 'cg-row-arrow is-right';
    arrowR.textContent = '›';
    arrowR.setAttribute('aria-label', 'Scroll right');

    const track = document.createElement('div');
    track.className = 'cg-track';

    const speedFactor = 1 + (((rowIndex * 7 + 3) % 5) / 5 - 0.5) * SPEED_JITTER * 2;
    const duration    = BASE_SPEED * speedFactor;
    const dir         = rowDirection(rowIndex);

    track.dataset.duration = duration;
    track.dataset.dir      = dir;

    function cardHtml(c) {
        return `<div class="cg-card">
            <div class="cg-face"
                data-src="${escHtml(c.src)}"
                data-title="${escHtml(c.title)}"
                data-desc="${escHtml(c.description || '')}"
                data-cat="${escHtml(c.category || '')}">
                <img src="${c.src}" alt="${escHtml(c.title)}" loading="lazy" decoding="async">
                <div class="cg-sheen"></div>
            </div>
        </div>`;
    }

    let html = '';
    for (let i = 0; i < rowCards.length; i++) html += cardHtml(rowCards[i]);
    for (let i = 0; i < rowCards.length; i++) html += cardHtml(rowCards[i]);

    track.innerHTML = html;

    row.appendChild(arrowL);
    row.appendChild(arrowR);
    row.appendChild(track);

    // Wire card listeners
    const faces = track.querySelectorAll('.cg-face');
    for (let i = 0; i < faces.length; i++) {
        const face = faces[i];
        const cardData = {
            src:         face.dataset.src,
            title:       face.dataset.title,
            description: face.dataset.desc,
            category:    face.dataset.cat,
        };
        face.addEventListener('mouseenter', onFaceEnter);
        face.addEventListener('click', () => openLightbox(cardData));
    }

    // Arrow listeners
    arrowL.addEventListener('click', () => nudgeRow(track, 'prev'));
    arrowR.addEventListener('click', () => nudgeRow(track, 'next'));

    // Wheel scroll
    row.addEventListener('wheel', (e) => onRowWheel(e, track), { passive: false });

    // Touch drag
    initTouch(track);

    // Measure and start animation
    requestAnimationFrame(() => {
        const allCards = track.querySelectorAll('.cg-card');
        const half     = allCards.length / 2;
        let   halfPx   = 0;
        for (let i = 0; i < half; i++) {
            halfPx += allCards[i].offsetWidth + 12;
        }

        track.dataset.halfWidth = halfPx;
        track.style.setProperty('--cg-half-width', `-${halfPx}px`);

        const animName = dir === 'left' ? 'cg-scroll-left' : 'cg-scroll-right';
        const delay    = dir === 'right' ? -(duration * 0.5) : 0;

        track.style.animationName           = animName;
        track.style.animationDuration       = `${duration}s`;
        track.style.animationTimingFunction = 'linear';
        track.style.animationDelay          = `${delay}s`;
        track.style.animationIterationCount = 'infinite';
        track.style.animationFillMode       = 'none';
        track.style.animationPlayState      = 'running';

        if (scrollPaused) setTrackPaused(track, true);
    });

    return { rowEl: row, trackEl: track };
}

// ------------------------------------------------------------------
// Distribute cards across rows
// ------------------------------------------------------------------

function calcRowCount() {
    const stageH      = document.querySelector('.cg-stage')?.clientHeight || 500;
    const targetCardH = 190;
    return Math.max(2, Math.min(6, Math.round(stageH / targetCardH)));
}

function distributeToRows(cardList, numRows) {
    const rows = Array.from({ length: numRows }, () => []);
    for (let i = 0; i < cardList.length; i++) {
        rows[i % numRows].push(cardList[i]);
    }
    return rows.map(row => {
        if (row.length === 0) return row;
        while (row.length < 12) row = row.concat(row);
        return row;
    });
}

// ------------------------------------------------------------------
// Render stage
// ------------------------------------------------------------------

function renderStage() {
    const stage = document.querySelector('.cg-stage');
    if (!stage) return;

    tiltState.forEach(s => { if (s.raf) cancelAnimationFrame(s.raf); });
    tiltState.clear();
    dragState.clear();

    if (cards.length === 0) {
        stage.innerHTML = '<div class="cg-state">// no cards</div>';
        return;
    }

    stage.innerHTML = '';

    const numRows = calcRowCount();
    const rows    = distributeToRows(cards, numRows);

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].length === 0) continue;
        const { rowEl } = buildRow(rows[i], i);
        stage.appendChild(rowEl);
    }
}

// ------------------------------------------------------------------
// Tag bar
// ------------------------------------------------------------------

function renderTagBar(cardList) {
    const bar = document.querySelector('.cg-tagbar');
    if (!bar) return;

    const cats = ['all', ...new Set(cardList.map(c => c.category).filter(Boolean))];

    let html = '';
    for (let i = 0; i < cats.length; i++) {
        const cat = cats[i];
        html += `<button class="cg-tag-btn${cat === activeTag ? ' is-active' : ''}" data-tag="${escHtml(cat)}">${escHtml(cat)}</button>`;
    }
    bar.innerHTML = html;

    const btns = bar.querySelectorAll('.cg-tag-btn');
    for (let i = 0; i < btns.length; i++) {
        const tag = btns[i].dataset.tag;
        btns[i].addEventListener('click', () => {
            activeTag = tag;
            applyFilter();
            renderTagBar(albumCache[activeAlbum] || []);
        });
    }
}

function applyFilter() {
    const all = albumCache[activeAlbum] || [];
    cards = activeTag === 'all' ? all : all.filter(c => c.category === activeTag);
    renderStage();
}

// ------------------------------------------------------------------
// Load album
// ------------------------------------------------------------------

function loadAlbum(albumMeta) {
    const albumId   = albumMeta.id;
    const albumFile = albumMeta.file;

    if (activeAlbum === albumId && albumCache[albumId]) {
        activeTag = 'all';
        renderTagBar(albumCache[albumId]);
        cards = albumCache[albumId];
        renderStage();
        return;
    }

    activeAlbum = albumId;
    activeTag   = 'all';

    const stage = document.querySelector('.cg-stage');
    if (stage) stage.innerHTML = '<div class="cg-state">// loading…</div>';

    fetch(albumFile)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            albumCache[albumId] = data;
            data = null;
            renderTagBar(albumCache[albumId]);
            cards = albumCache[albumId];
            renderStage();
        })
        .catch(err => {
            const s = document.querySelector('.cg-stage');
            if (s) s.innerHTML = `<div class="cg-state cg-state-err">// failed — ${err.message}</div>`;
        });
}

// ------------------------------------------------------------------
// Sidebar
// ------------------------------------------------------------------

function renderSidebar(albums) {
    const sidebar  = document.querySelector('.cg-sidebar');
    const collapse = document.getElementById('cg-sidebar-collapse-row');
    if (!sidebar) return;

    // Insert album buttons before the spacer
    const spacer = sidebar.querySelector('.cg-sidebar-spacer');

    let html = '';
    for (let i = 0; i < albums.length; i++) {
        const a    = albums[i];
        const chip = a.title.substring(0, 3).toUpperCase();
        html += `<button class="cg-album-btn" data-id="${escHtml(a.id)}">
            <span class="cg-album-chip">${escHtml(chip)}</span>
            <span class="cg-album-label">${escHtml(a.title)}</span>
        </button>`;
    }

    // Build a temp container, insert before spacer
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    while (tmp.firstChild) {
        sidebar.insertBefore(tmp.firstChild, spacer);
    }

    const btns = sidebar.querySelectorAll('.cg-album-btn');
    for (let i = 0; i < btns.length; i++) {
        const meta = albums[i];
        const btn  = btns[i];
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cg-album-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            loadAlbum(meta);
        });
    }
}

// ------------------------------------------------------------------
// Sidebar collapse
// ------------------------------------------------------------------

function initSidebarCollapse() {
    const btn     = document.getElementById('cg-collapse-btn');
    const sidebar = document.getElementById('cg-sidebar');
    if (!btn || !sidebar) return;

    btn.addEventListener('click', () => {
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('is-collapsed', sidebarCollapsed);
        btn.textContent = sidebarCollapsed ? '›' : '‹';
        btn.setAttribute('aria-label', sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
    });
}

// ------------------------------------------------------------------
// Scroll toggle
// ------------------------------------------------------------------

function initScrollToggle() {
    const btn   = document.getElementById('cg-scroll-toggle');
    const icon  = btn?.querySelector('.cg-scroll-toggle-icon');
    const label = btn?.querySelector('.cg-scroll-toggle-label');
    if (!btn) return;

    btn.addEventListener('click', () => {
        scrollPaused = !scrollPaused;
        btn.classList.toggle('is-paused', scrollPaused);
        if (icon)  icon.textContent  = scrollPaused ? '▶' : '⏸';
        if (label) label.textContent = scrollPaused ? 'play' : 'pause';

        if (scrollPaused) {
            setAllTracksPaused(true);
        } else {
            // Resync any rows that were manually scrolled while paused
            // (their animationName was set to 'none')
            document.querySelectorAll('.cg-track').forEach(t => {
                const currentX = parseFloat(t.style.transform?.replace('translateX(', '')) || 0;
                resyncTrack(t, currentX);
            });
        }
    });
}

// ------------------------------------------------------------------
// Lightbox
// ------------------------------------------------------------------

function openLightbox(cardData) {
    lbOpen = true;
    setAllTracksPaused(true);

    const lb   = document.getElementById('cg-lightbox');
    const img  = lb.querySelector('.cg-lightbox-img');
    const titl = lb.querySelector('.cg-lightbox-title');
    const cat  = lb.querySelector('.cg-lightbox-category');
    const desc = lb.querySelector('.cg-lightbox-desc');
    const dl   = lb.querySelector('.cg-lightbox-download');

    img.src           = cardData.src;
    img.alt           = cardData.title;
    titl.textContent  = cardData.title;
    cat.textContent   = cardData.category || '';
    cat.style.display = cardData.category ? '' : 'none';
    desc.textContent  = cardData.description || '';
    desc.style.display = cardData.description ? '' : 'none';
    dl.href     = cardData.src;
    dl.download = cardData.src.split('/').pop();

    lb.classList.add('is-open');
}

function closeLightbox() {
    lbOpen = false;
    document.getElementById('cg-lightbox').classList.remove('is-open');
    if (!scrollPaused) {
        document.querySelectorAll('.cg-track').forEach(t => {
            const currentX = parseFloat(t.style.transform?.replace('translateX(', '')) || 0;
            resyncTrack(t, currentX);
        });
    }
}

// ------------------------------------------------------------------
// Utility
// ------------------------------------------------------------------

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// ------------------------------------------------------------------
// Init
// ------------------------------------------------------------------

function init() {
    const lb    = document.getElementById('cg-lightbox');
    const close = document.getElementById('cg-lightbox-close');

    close.addEventListener('click', closeLightbox);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lbOpen) closeLightbox(); });

    initSidebarCollapse();
    initScrollToggle();

    fetch('./collection.json')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(albums => {
            renderSidebar(albums);
            if (albums.length > 0) {
                document.querySelector('.cg-album-btn')?.classList.add('is-active');
                loadAlbum(albums[0]);
            }
            albums = null;
        })
        .catch(err => {
            const s = document.querySelector('.cg-stage');
            if (s) s.innerHTML = `<div class="cg-state cg-state-err">// failed to load collection — ${err.message}</div>`;
        });
}

document.addEventListener('DOMContentLoaded', init);
