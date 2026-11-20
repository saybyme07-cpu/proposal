/**
 * SayByMe Official Homepage Script
 * Minimal, romantic, performant interactions complying with design guidelines.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initAudioPlayer();
  initNavbarScroll();
  initMobileMenu();
  initComingSoonCards();
  initSmoothScroll();
  initFooterPlaceholders();
});

/* ==========================================================================
   1. Subtle Ambient Romantic Canvas (Restrained & Lightweight)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 16; // Restrained count

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + 15;
      this.radius = 1.5 + Math.random() * 2.5;
      this.speedY = 0.3 + Math.random() * 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = 0.15 + Math.random() * 0.35;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.fillStyle = `rgba(247, 168, 180, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   2. Background Audio Player
   ========================================================================== */
function initAudioPlayer() {
  const audio = document.getElementById('bgmAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');
  if (!audio || !toggleBtn) return;

  audio.volume = 0.45;
  let isPlaying = false;

  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      showToast('Music paused 🎵');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        toggleBtn.classList.add('playing');
        showToast('Playing romantic melody 💖');
      }).catch(() => {
        showToast('Click anywhere on the page to permit audio playback!');
      });
    }
  });
}

/* ==========================================================================
   3. Navbar Scroll Active Link & State
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  const mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. Coming Soon Experiences Feedback
   ========================================================================== */
function initComingSoonCards() {
  const softBtns = document.querySelectorAll('.btn-card-soft');
  softBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const expName = btn.getAttribute('data-experience') || 'This experience';
      showToast(`✨ ${expName} is coming soon! We're handcrafting it with love.`);
    });
  });
}

/* ==========================================================================
   6. Smooth Anchor Navigation
   ========================================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   7. Footer Placeholders & Toast Utility
   ========================================================================== */
function initFooterPlaceholders() {
  const privacyLink = document.getElementById('privacyLink');
  const termsLink = document.getElementById('termsLink');

  privacyLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('🔒 Privacy: SayByMe never sells your personal feelings or surprise links.');
  });

  termsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('📜 Terms: Crafted for personal, romantic, and celebratory moments.');
  });
}

function showToast(message) {
  const hub = document.getElementById('toastHub');
  if (!hub) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>${message}</span>`;
  hub.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
