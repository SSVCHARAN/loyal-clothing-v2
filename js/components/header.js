/* ============================================================
   LOYAL CLOTHING — Header Component
   Mobile menu toggle, scroll-hide nav, active link detection.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!header) return;

  /* ── Scroll: show/hide header ──────────────────────────── */
  let lastScroll = 0;
  const scrollThreshold = 80;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add shadow when scrolled
    header.classList.toggle('is-scrolled', currentScroll > 10);

    // Hide/show header based on scroll direction
    if (currentScroll > scrollThreshold) {
      if (currentScroll > lastScroll && currentScroll > 200) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    } else {
      header.classList.remove('is-hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  /* ── Mobile Menu Toggle ────────────────────────────────── */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');

      menuToggle.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');

      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active Nav Link ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
});
