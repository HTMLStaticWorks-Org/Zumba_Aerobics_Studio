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

  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
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
