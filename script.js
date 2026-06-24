/* ===== Theme toggle (in-memory; defaults to dark each load) ===== */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  if(next === 'dark'){ root.removeAttribute('data-theme'); } else { root.setAttribute('data-theme','light'); }
});

/* ===== Mobile menu ===== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('[data-mobile]').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ===== Typing / rotating role effect ===== */
const roles = ['Python Full Stack Developer', 'React & Node.js Developer', 'Full-Stack Enthusiast', 'AI-Curious Engineer'];
const typedEl = document.getElementById('typedRole');
let roleIdx = 0, charIdx = roles[0].length, deleting = false;
function typeLoop(){
  const current = roles[roleIdx];
  if(!deleting){
    charIdx++;
    if(charIdx > current.length){ deleting = true; setTimeout(typeLoop, 1500); return; }
  } else {
    charIdx--;
    if(charIdx < 0){ deleting = false; roleIdx = (roleIdx+1) % roles.length; charIdx = 0; }
  }
  typedEl.textContent = current.slice(0, charIdx);
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typedEl.textContent = roles[0];
setTimeout(typeLoop, 1500);

/* ===== Scroll reveal ===== */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if(prefersReduced){
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if(entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('in-view'), (i % 4) * 80);
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el => io.observe(el));
}

/* ===== Scrollspy for nav active state ===== */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link[data-link]');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, {rootMargin:'-45% 0px -50% 0px'});
sections.forEach(s => spy.observe(s));

/* ===== Project filter ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* ===== Contact form (front-end only demo) ===== */
const cfForm = document.getElementById('contactForm');
const cfSuccess = document.getElementById('cf-success');
cfForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('cf-submit');
  btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.innerHTML = '✓ Sent';
    cfSuccess.classList.add('show');
    cfForm.reset();
    setTimeout(() => {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Send message';
    }, 2500);
  }, 700);
});

/* ===== Back to top ===== */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 600);
}, {passive:true});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ===== Easter egg for curious recruiters ===== */
console.log('%c👋 Hey, looking under the hood already?', 'font-size:14px; font-weight:bold; color:#54D6C4;');
console.log("%cThat's exactly the kind of curiosity I look for too. Let's talk: fathimakwt449@gmail.com", 'font-size:12px; color:#8D97AC;');
