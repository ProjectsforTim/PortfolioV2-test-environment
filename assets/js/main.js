/* ===============================
   PHASE 2 CINEMATIC FRAMEWORK
   =============================== */

// 1️⃣ LENIS Smooth Scroll
const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2️⃣ GSAP + ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Animate each .scene section sequentially
document.querySelectorAll(".scene").forEach((scene, i) => {
  gsap.fromTo(scene,
    {opacity:0, y:60},
    {
      opacity:1, y:0,
      duration:1.2,
      ease:"power3.out",
      scrollTrigger:{
        trigger: scene,
        start:"top 80%",
        toggleActions:"play none none reverse"
      }
    });
});

// Fade/slide for screenshots as extra polish
document.querySelectorAll(".screenshot").forEach(img=>{
  gsap.fromTo(img,
    {opacity:0, y:30},
    {
      opacity:1, y:0,
      duration:1,
      ease:"power2.out",
      scrollTrigger:{
        trigger: img,
        start:"top 85%",
        toggleActions:"play none none reverse"
      }
    });
});

// 3️⃣ Highlight current section in nav
const sections = [
  'dronechat','annotation','rfautoencoder','sqldatabase',
  'marketinfo','customersolutions','dispatchingtool'
];
const linkById = id => document.getElementById('lnk-' + id);
sections.forEach(id=>{
  const el=document.getElementById(id);
  if(!el)return;
  ScrollTrigger.create({
    trigger:el,
    start:"top center",
    end:"bottom center",
    onEnter:()=>highlight(id),
    onEnterBack:()=>highlight(id)
  });
});
function highlight(id){
  sections.forEach(s=>{
    const l=linkById(s);
    if(l)l.classList.toggle('active',s===id);
  });
}
/* ===============================
   PHASE 3 PARALLAX + LIGHT LOGIC
   =============================== */

// --- Subtle parallax for Drone overlay ---
const droneLayer = document.body;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const offset = scrollY * 0.15; // subtle movement
  droneLayer.style.setProperty('--drone-offset', `${offset}px`);
});

// Apply translate via CSS variable
document.head.insertAdjacentHTML("beforeend", `
  <style>
    body::before { transform: translateY(calc(var(--drone-offset, 0) * -1)); }
  </style>
`);

// --- Scroll-linked ambient lighting ---
gsap.to("body::after", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  },
  backgroundPosition: "50% 60%",
  ease: "none"
});

// --- Card focus lift ---
document.querySelectorAll(".card").forEach(card => {
  ScrollTrigger.create({
    trigger: card,
    start: "top 70%",
    end: "bottom 30%",
    onEnter: () => card.classList.add("active"),
    onLeaveBack: () => card.classList.remove("active")
  });
});
/* ===============================
   PHASE 4 — INTRO + DRONES
   =============================== */

window.addEventListener("load", () => {
  const intro = gsap.timeline();

  intro
    intro
  .set("#intro-overlay", { opacity: 1, display: "flex" }) // force it visible
  .fromTo("#intro-overlay", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })
    // show title / subtitle
    .to(".intro-title", { opacity: 1, y: -10, duration: 1.2, ease: "power2.out" })
    .to(".intro-sub", { opacity: 1, y: -5, duration: 1.0, ease: "power2.out" }, "-=0.5")
    // fade out overlay
    .to("#intro-overlay", { opacity: 0, duration: 1.2, delay: 0.6, ease: "power1.inOut" })
    .set("#intro-overlay", { display: "none" });

  // Drone entrance
  const droneTL = gsap.timeline({ delay: 3 });
  droneTL
    .to(".drone", { opacity: 1, duration: 1.2, stagger: 0.3, ease: "power2.out" })
    .to(".main-drone", { y: -20, repeat: -1, yoyo: true, duration: 4, ease: "sine.inOut" })
    .to(".follower-drone", { x: 15, y: 10, repeat: -1, yoyo: true, duration: 5, ease: "sine.inOut" }, "<")
    .to(".secondary-drone", { x: -12, y: -15, repeat: -1, yoyo: true, duration: 6, ease: "sine.inOut" }, "<");
});

