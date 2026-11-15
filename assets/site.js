/* =============================================================
   site.js — Fooly-Cooly shared utilities
   Loaded at the bottom of every page <body>
   ============================================================= */

/* ── Accordion toggle ── */
function toggle(id) {
  const rows = document.querySelectorAll('.fc-section-row');
  rows.forEach(row => {
    const isTarget = row.dataset.section === id;
    const btn = row.querySelector('.fc-section-trigger');

    if (isTarget) {
      const isOpen = row.classList.toggle('open');
      if (btn) btn.setAttribute('aria-expanded', isOpen);
    } else {
      row.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Keyboard: allow Enter/Space on section triggers ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fc-section-trigger').forEach(btn => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* ── Encoded social links + NSFW tooltip ─────────────────────
     Links with data-enc have no href — clicks are handled here.
     Links with data-warn additionally show a tooltip confirmation
     before navigating. Tooltip flips below if near top of viewport. */
  let activeTooltip = null;

  function dismissTooltip() {
    if (!activeTooltip) return;
    activeTooltip.remove();
    activeTooltip = null;
  }

  function openTooltip(anchor, warn) {
    dismissTooltip();

    const tip = document.createElement('div');
    tip.className = 'fc-social-tooltip';
    tip.innerHTML =
      '<span class="fc-social-tooltip-msg">// ' + warn + ' — continue?</span>' +
      '<button class="fc-social-tooltip-yes">[ yes ]</button>' +
      '<button class="fc-social-tooltip-no">cancel</button>';

    document.body.appendChild(tip);
    activeTooltip = tip;

    /* Position: above anchor by default, flip below if clipped */
    const rect = anchor.getBoundingClientRect();
    const tipH = tip.offsetHeight || 48;
    const spaceAbove = rect.top;
    const goAbove = spaceAbove >= tipH + 12;

    tip.style.position  = 'fixed';
    tip.style.left      = Math.round(rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
    tip.style.top       = goAbove
      ? Math.round(rect.top - tipH - 8) + 'px'
      : Math.round(rect.bottom + 8) + 'px';
    tip.dataset.goAbove = goAbove;
    tip.classList.toggle('fc-social-tooltip--below', !goAbove);

    const url = atob(anchor.dataset.enc);
    tip.querySelector('.fc-social-tooltip-yes').addEventListener('click', e => {
      e.stopPropagation();
      dismissTooltip();
      window.open(url, '_blank', 'noopener');
    });
    tip.querySelector('.fc-social-tooltip-no').addEventListener('click', e => {
      e.stopPropagation();
      dismissTooltip();
    });
  }

  document.querySelector('.fc-social-grid')?.addEventListener('click', e => {
    const anchor = e.target.closest('[data-enc]');
    if (!anchor) { dismissTooltip(); return; }
    e.preventDefault();
    e.stopPropagation();

    /* If this anchor's tooltip is already open, dismiss and bail */
    if (activeTooltip && activeTooltip._anchor === anchor) {
      dismissTooltip();
      return;
    }

    if (anchor.dataset.warn) {
      openTooltip(anchor, anchor.dataset.warn);
      activeTooltip._anchor = anchor;
    } else {
      dismissTooltip();
      window.open(atob(anchor.dataset.enc), '_blank', 'noopener');
    }
  });

  /* Dismiss tooltip on outside click or Escape */
  document.addEventListener('click', e => {
    if (activeTooltip && !activeTooltip.contains(e.target)) dismissTooltip();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') dismissTooltip();
  });
});

/* ── Back to top ──────────────────────────────────────────────
   Automatically wires up any #back-top button present on the
   page. No-op if the button doesn't exist on a given page.     */
(function () {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
