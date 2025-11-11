/* ===============================
   PHASE 1 SCRIPT BASELINE
   =============================== */

// Fade-in for screenshots
const screenshots = document.querySelectorAll('.screenshot');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.25 });
screenshots.forEach(img => observer.observe(img));

// Tooltip fallback
document.querySelectorAll('.skills span').forEach(span => {
  if (!span.dataset.tooltip || span.dataset.tooltip.trim() === '')
    span.dataset.tooltip = span.textContent.trim();
});

// Section highlight
const sections = [
  'dronechat','annotation','rfautoencoder','sqldatabase',
  'marketinfo','customersolutions','dispatchingtool',
  'rfenvironment','dataanalysis','salesflier'
];
const linkById = id => document.getElementById('lnk-' + id);
const highlightObserver = new IntersectionObserver((entries) => {
  let best = null;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
    }
  });
  if (best) {
    const id = best.target.id;
    sections.forEach(s => {
      const l = linkById(s);
      if (l) l.classList.toggle('active', s === id);
    });
  }
}, { root: null, threshold: [0.15,0.3,0.5,0.7,0.9], rootMargin: "0px 0px -30% 0px" });
sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) highlightObserver.observe(el);
});
window.addEventListener('load', () => {
  const hash = location.hash.replace('#','');
  if (sections.includes(hash)) {
    sections.forEach(s => {
      const l = linkById(s);
      if (l) l.classList.toggle('active', s === hash);
    });
  }
});

/* Drone animation logic temporarily disabled for Phase 1 cleanup */

