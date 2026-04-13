// script.js
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // ── Nav: add border on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // ── Stats: animate in when visible ──
  const stats = document.querySelectorAll('.stat');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  stats.forEach(function (el) { observer.observe(el); });

  // ── Testimonials: cycle through quotes ──
  const testimonials = [
    {
      quote: '"Forma gave us one source of truth. Our design and engineering teams finally speak the same language."',
      initials: 'SR', name: 'Sarah R.', role: 'Head of Design, Cascade'
    },
    {
      quote: '"We cut our design review cycle in half within the first month. I can\'t imagine going back."',
      initials: 'MK', name: 'Marcus K.', role: 'CTO, Fieldwork'
    },
    {
      quote: '"The token sync alone is worth it. Everything just stays consistent — it\'s almost magical."',
      initials: 'AJ', name: 'Amara J.', role: 'Lead Engineer, Velox'
    }
  ];

  let current = 0;
  const dotsEl      = document.getElementById('dots');
  const quoteEl     = document.getElementById('quote');
  const avatarEl    = document.getElementById('avatar');
  const nameEl      = document.getElementById('author-name');
  const roleEl      = document.getElementById('author-role');

  // Build dots if container exists
  if (dotsEl && testimonials.length) {
    testimonials.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.style.cssText =
        'width:7px;height:7px;border-radius:50%;border:none;padding:0;cursor:pointer;transition:background 0.2s;background:' +
        (i === 0 ? '#1a1814' : '#d0ccc4');
      dot.addEventListener('click', function () { showTestimonial(i); });
      dotsEl.appendChild(dot);
    });
  }

  function showTestimonial(index) {
    if (!quoteEl || !avatarEl || !nameEl || !roleEl) return;
    current = index;
    const t = testimonials[index];
    // Fade out animation
    quoteEl.style.opacity  = '0';
    quoteEl.style.transform = 'translateY(8px)';
    setTimeout(function () {
      quoteEl.textContent      = t.quote;
      avatarEl.textContent     = t.initials;
      nameEl.textContent       = t.name;
      roleEl.textContent       = t.role;
      quoteEl.style.transition = 'opacity 0.4s, transform 0.4s';
      quoteEl.style.opacity    = '1';
      quoteEl.style.transform  = 'translateY(0)';
    }, 200);
    // Update dots
    if (dotsEl) {
      dotsEl.querySelectorAll('button').forEach(function (d, i) {
        d.style.background = i === index ? '#1a1814' : '#d0ccc4';
      });
    }
  }

  // Auto-rotate every 5 seconds
  if (testimonials.length > 0) {
    setInterval(function () {
      showTestimonial((current + 1) % testimonials.length);
    }, 5000);
  }

  // ── Button handlers ──
  function handleCTA() {
    alert('🎉 Thanks for your interest! Sign-up flow would go here.');
  }

  function handleDemo() {
    alert('▶ A product demo video or walkthrough would launch here.');
  }

  // Attach event listeners to buttons
  const ctaButton = document.getElementById('ctaButton');
  const demoButton = document.getElementById('demoButton');
  const ctaBannerButton = document.getElementById('ctaBannerButton');

  if (ctaButton) ctaButton.addEventListener('click', handleCTA);
  if (demoButton) demoButton.addEventListener('click', handleDemo);
  if (ctaBannerButton) ctaBannerButton.addEventListener('click', handleCTA);
});