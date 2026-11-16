const root = document.documentElement;

// Theme Initialization
const savedTheme = localStorage.getItem('zumba-theme') || 'light';
root.dataset.theme = savedTheme;

function updateThemeIcons(theme) {
  document.querySelectorAll('[data-theme-btn]').forEach(b => {
    b.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

function setTheme() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('zumba-theme', next);
  updateThemeIcons(next);
}

// Direction Initialization
const savedDir = localStorage.getItem('zumba-dir') || 'ltr';
root.dir = savedDir;
document.body && document.body.classList.toggle('rtl', savedDir === 'rtl');

function updateRTLIcons(dir) {
  document.querySelectorAll('[data-rtl-btn]').forEach(b => {
    b.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

function setDirection() {
  const next = root.dir === 'rtl' ? 'ltr' : 'rtl';
  root.dir = next;
  document.body.classList.toggle('rtl', next === 'rtl');
  localStorage.setItem('zumba-dir', next);
  updateRTLIcons(next);
}

document.addEventListener('DOMContentLoaded', () => {
  // Sync button states
  updateThemeIcons(root.dataset.theme);
  updateRTLIcons(root.dir);
  document.body.classList.toggle('rtl', root.dir === 'rtl');

  // Event Listeners for Theme & RTL
  document.querySelectorAll('[data-theme-btn]').forEach(b => {
    b.addEventListener('click', setTheme);
  });

  document.querySelectorAll('[data-rtl-btn]').forEach(b => {
    b.addEventListener('click', setDirection);
  });

  // Mobile & Tablet Hamburger Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });
  }

  // Interactive Filter Tabs (Products & Gallery)
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        const items = document.querySelectorAll('[data-category]');
        items.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Back to Top Button (Point 5)
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Testimonial Review Slider (Point 3)
  const slider = document.querySelector('.review-slider-wrap');
  if (slider) {
    const slides = slider.querySelectorAll('.review-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('[data-slide-prev]');
    const nextBtn = slider.querySelector('[data-slide-next]');
    let currentIndex = 0;
    let autoSlideTimer = null;

    function showSlide(index) {
      if (!slides.length) return;
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetAutoSlide();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        resetAutoSlide();
      });
    });

    function startAutoSlide() {
      autoSlideTimer = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000);
    }

    function resetAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      startAutoSlide();
    }

    startAutoSlide();
  }

  // FAQ Accordion Toggle (Point 15)
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      if (parentItem) {
        const isOpen = parentItem.classList.contains('open');
        // Optional: close other open faq items in the same container
        const wrap = parentItem.closest('.faq-wrap');
        if (wrap) {
          wrap.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== parentItem) openItem.classList.remove('open');
          });
        }
        parentItem.classList.toggle('open', !isOpen);
      }
    });
  });

  // Password Eye Icon Toggle (Point 16)
  const eyeButtons = document.querySelectorAll('.eye-toggle-btn');
  eyeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputWrap = btn.closest('.field-password-wrap');
      if (!inputWrap) return;
      const input = inputWrap.querySelector('input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '👁️';
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        input.type = 'password';
        btn.textContent = '🔒';
        btn.setAttribute('aria-label', 'Show password');
      }
    });
  });

  // Demo Forms Handler
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const notice = form.querySelector('[data-notice]');
      if (notice) {
        notice.hidden = false;
        setTimeout(() => {
          notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });
});
