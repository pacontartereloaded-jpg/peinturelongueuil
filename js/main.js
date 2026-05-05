// peinturelongueuil.com — interactions
(function () {
  'use strict';

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.mobile-menu');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  const observer = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    : null;

  document.querySelectorAll('.reveal').forEach(el => {
    if (observer) observer.observe(el);
    else el.classList.add('is-visible');
  });

  // Year stamp in footer
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  // Web3Forms contact form — AJAX submit, no page reload
  const form = document.getElementById('contactForm');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.innerHTML : '';

    const setStatus = (state, message) => {
      if (!status) return;
      status.className = 'form-status is-' + state;
      status.textContent = message;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const successMsg = form.dataset.success || 'Thank you!';
      const errorMsg = form.dataset.error || 'Something went wrong.';
      const sendingMsg = form.dataset.sending || 'Sending…';

      setStatus('pending', sendingMsg);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.success) {
          setStatus('success', successMsg);
          form.reset();
        } else {
          setStatus('error', (data && data.message) ? data.message : errorMsg);
        }
      } catch (err) {
        setStatus('error', errorMsg);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.innerHTML = originalLabel;
        }
      }
    });
  }
})();
