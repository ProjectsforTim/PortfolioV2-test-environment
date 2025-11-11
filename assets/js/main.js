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
