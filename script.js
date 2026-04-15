/* ============================================
   かどちゃん — Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navigation: scroll effect ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ---- Scroll fade-in (Intersection Observer) ---- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  /* ---- Master random quotes (MASTER section) ---- */
  const masterQuotes = [
    '今日もお疲れ様。ゆっくりしていきな。',
    '焦らなくていいんだよ。ここにいていいから。',
    'まあ、一枚食べてから考えよう。',
    '毎日来なくていい。でも、来たくなったら来てくれ。',
    '鉄板の前に立つと、嫌なこと全部忘れるんだよな。',
    'うまいもの食べてたら、なんとかなるよ。',
  ];
  const quoteText = document.getElementById('quote-text');
  let quoteIndex = 0;
  function rotateQuote() {
    quoteText.classList.add('fade-quote');
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % masterQuotes.length;
      quoteText.textContent = masterQuotes[quoteIndex];
      quoteText.classList.remove('fade-quote');
    }, 500);
  }
  if (quoteText) {
    quoteText.textContent = masterQuotes[0];
    setInterval(rotateQuote, 4000);
  }

  /* ---- Floating quote bubble ---- */
  const floatingQuotes = [
    '今日もお疲れ様でした。',
    'ゆっくりしていきな。',
    '焦らなくていいんだよ。',
    'まあ、一杯どうぞ。',
  ];
  const floatingQuote = document.getElementById('floating-quote');
  const floatingText = document.getElementById('floating-text');
  const floatingClose = document.getElementById('floating-close');

  if (floatingQuote && floatingText) {
    floatingText.textContent = floatingQuotes[Math.floor(Math.random() * floatingQuotes.length)];

    // Show after 3 seconds
    setTimeout(() => {
      floatingQuote.classList.remove('hidden');
    }, 3000);

    floatingClose && floatingClose.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingQuote.classList.add('hidden');
    });

    // Rotate text every 8 seconds
    setInterval(() => {
      if (!floatingQuote.classList.contains('hidden')) {
        floatingText.style.opacity = '0';
        setTimeout(() => {
          floatingText.textContent = floatingQuotes[Math.floor(Math.random() * floatingQuotes.length)];
          floatingText.style.opacity = '1';
        }, 400);
      }
    }, 8000);
  }

  /* ---- Gallery lightbox ---- */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Steam: staggered start via JS (already handled by CSS delays) ---- */

  /* ---- Active nav highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav a[href^="#"], #mobile-menu a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? '#E67E22' : '';
    });
  }, { passive: true });

});
