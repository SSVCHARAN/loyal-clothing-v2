/* ============================================================
   LOYAL CLOTHING — Main JS
   Scroll reveal animations, page load stagger, smooth scroll.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal (IntersectionObserver) ───────────────── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ── Page Load Stagger ─────────────────────────────────── */
  const staggerContainers = document.querySelectorAll('.stagger');
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  /* ── Smooth Scroll for Anchor Links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Product Card Quick Add (shop page) ────────────────── */
  document.querySelectorAll('.product-card__quick-add .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const productId = parseInt(card?.dataset.productId);
      if (productId && typeof getProductById === 'function') {
        const product = getProductById(productId);
        if (product) {
          addToCart(product, product.sizes[1] || product.sizes[0], product.colors[0].name);
        }
      }
    });
  });

  /* ── Product Accordion (product detail page) ───────────── */
  document.querySelectorAll('.product-accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('is-open');

      // Close all accordions
      document.querySelectorAll('.product-accordion__trigger').forEach(t => {
        t.classList.remove('is-open');
        t.nextElementSibling.style.maxHeight = null;
      });

      // Open clicked one (if it was closed)
      if (!isOpen) {
        trigger.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ── Size Selector (product detail page) ───────────────── */
  document.querySelectorAll('.size-selector__option').forEach(option => {
    if (option.classList.contains('is-disabled')) return;

    option.addEventListener('click', () => {
      document.querySelectorAll('.size-selector__option').forEach(o =>
        o.classList.remove('is-active')
      );
      option.classList.add('is-active');
    });
  });

  /* ── Color Swatch Selector ─────────────────────────────── */
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s =>
        s.classList.remove('is-active')
      );
      swatch.classList.add('is-active');
    });
  });

  /* ── Gallery Thumbnail Selector ────────────────────────── */
  document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const mainImg = document.querySelector('.product-gallery__main img');
      const thumbImg = thumb.querySelector('img');
      if (mainImg && thumbImg) {
        mainImg.src = thumbImg.src;
        document.querySelectorAll('.product-gallery__thumb').forEach(t =>
          t.classList.remove('is-active')
        );
        thumb.classList.add('is-active');
      }
    });
  });

  /* ── Shop Filter Pills ─────────────────────────────────── */
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p =>
        p.classList.remove('is-active')
      );
      pill.classList.add('is-active');

      const category = pill.dataset.category;
      const cards = document.querySelectorAll('.product-card[data-category]');

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          // Re-trigger reveal animation
          setTimeout(() => card.classList.add('is-visible'), 50);
        } else {
          card.style.display = 'none';
          card.classList.remove('is-visible');
        }
      });

      // Update results count
      const visible = document.querySelectorAll('.product-card[data-category]:not([style*="display: none"])');
      const countEl = document.querySelector('.results-count span');
      if (countEl) countEl.textContent = visible.length;
    });
  });

  /* ── Newsletter Form ───────────────────────────────────── */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value.trim()) {
        const btn = newsletterForm.querySelector('.btn');
        if (btn) {
          btn.textContent = 'SUBSCRIBED ✓';
          btn.style.backgroundColor = 'var(--color-success)';
          input.value = '';
          setTimeout(() => {
            btn.textContent = 'SUBSCRIBE';
            btn.style.backgroundColor = '';
          }, 3000);
        }
      }
    });
  }

  /* ── Contact Form ──────────────────────────────────────── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      if (btn) {
        btn.textContent = 'MESSAGE SENT ✓';
        btn.style.backgroundColor = 'var(--color-success)';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = 'SEND MESSAGE';
          btn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }

  /* ── Product Gallery Zoom (Desktop Only) ───────────────── */
  const mainGalleryImage = document.querySelector('.product-gallery__main');
  if (mainGalleryImage) {
    mainGalleryImage.addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
    });
    mainGalleryImage.addEventListener('mouseleave', (e) => {
      e.currentTarget.style.removeProperty('--mouse-x');
      e.currentTarget.style.removeProperty('--mouse-y');
    });
  }

  /* ── Cinematic Scroll Parallax ─────────────────────────── */
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  if (parallaxBgs.length > 0 && 'IntersectionObserver' in window) {
    const parallaxObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible-scroll');
        } else {
          entry.target.classList.remove('is-visible-scroll');
        }
      });
    }, { threshold: 0.01 });

    parallaxBgs.forEach(bg => parallaxObserver.observe(bg));

    window.addEventListener('scroll', () => {
      const visibleSections = document.querySelectorAll('.is-visible-scroll');
      visibleSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Calculate scroll offset based on position relative to viewport
        const offset = rect.top * 0.12; 
        const img = section.querySelector('img');
        if (img) {
          img.style.setProperty('--scroll-offset', `${offset}px`);
        }
      });
    }, { passive: true });
  }

  /* ── Track Selected Product ────────────────────────────── */
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card && !e.target.closest('.product-card__quick-add')) {
      const id = card.dataset.productId;
      if (id) {
        localStorage.setItem('loyal_selected_product_id', id);
      }
    }
  });
});
