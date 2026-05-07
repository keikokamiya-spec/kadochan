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

  /* ---- Menu slideshow ---- */
  const menuSlideshow = document.querySelector('.menu-slideshow');
  if (menuSlideshow) {
    const track = menuSlideshow.querySelector('.menu-track');
    const slides = Array.from(menuSlideshow.querySelectorAll('.menu-slide'));
    const prevButton = menuSlideshow.querySelector('.menu-arrow.prev');
    const nextButton = menuSlideshow.querySelector('.menu-arrow.next');
    const dotsWrap = menuSlideshow.querySelector('.menu-dots');
    let currentSlide = 0;
    let menuTimer = null;

    function visibleCount() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(slides.length - visibleCount(), 0);
    }

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'menu-dot';
      dot.setAttribute('aria-label', `${index + 1}番目のメニューへ`);
      dot.addEventListener('click', () => {
        showMenuSlide(Math.min(index, maxIndex()));
        restartMenuSlideshow();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function showMenuSlide(index) {
      const limit = maxIndex();
      currentSlide = index > limit ? 0 : (index < 0 ? limit : index);
      track.style.transform = `translateX(-${currentSlide * (100 / visibleCount())}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentSlide);
        dot.style.display = dotIndex <= limit ? '' : 'none';
      });
    }

    function startMenuSlideshow() {
      menuTimer = setInterval(() => {
        showMenuSlide(currentSlide + 1);
      }, 3500);
    }

    function stopMenuSlideshow() {
      clearInterval(menuTimer);
    }

    function restartMenuSlideshow() {
      stopMenuSlideshow();
      startMenuSlideshow();
    }

    prevButton.addEventListener('click', () => {
      showMenuSlide(currentSlide - 1);
      restartMenuSlideshow();
    });
    nextButton.addEventListener('click', () => {
      showMenuSlide(currentSlide + 1);
      restartMenuSlideshow();
    });
    menuSlideshow.addEventListener('mouseenter', stopMenuSlideshow);
    menuSlideshow.addEventListener('mouseleave', startMenuSlideshow);
    window.addEventListener('resize', () => {
      showMenuSlide(currentSlide);
    }, { passive: true });

    showMenuSlide(0);
    startMenuSlideshow();
  }

  /* ---- Gallery lightbox ---- */
  const slideshow = document.querySelector('.gallery-slideshow');
  if (slideshow) {
    const track = slideshow.querySelector('.gallery-track');
    const slides = Array.from(slideshow.querySelectorAll('.gallery-slide'));
    const prevButton = slideshow.querySelector('.gallery-arrow.prev');
    const nextButton = slideshow.querySelector('.gallery-arrow.next');
    const dotsWrap = slideshow.querySelector('.gallery-dots');
    let currentSlide = 0;
    let slideshowTimer = null;

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery-dot';
      dot.setAttribute('aria-label', `${index + 1}枚目の写真へ`);
      dot.addEventListener('click', () => {
        showSlide(index);
        restartSlideshow();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentSlide);
      });
    }

    function startSlideshow() {
      slideshowTimer = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 3500);
    }

    function stopSlideshow() {
      clearInterval(slideshowTimer);
    }

    function restartSlideshow() {
      stopSlideshow();
      startSlideshow();
    }

    prevButton.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      restartSlideshow();
    });
    nextButton.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      restartSlideshow();
    });
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);

    showSlide(0);
    startSlideshow();
  }

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
