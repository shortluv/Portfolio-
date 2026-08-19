const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Лайтбокс: увеличение фото галереи на большую часть экрана при наведении/тапе
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const overlayImg = document.createElement('img');
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  function showLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('visible');
  }
  function hideLightbox() {
    overlay.classList.remove('visible');
  }

  document.querySelectorAll('.ozon-gallery img').forEach(el => {
    el.addEventListener('mouseenter', () => showLightbox(el.src, el.alt));
    el.addEventListener('mouseleave', hideLightbox);
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightbox(el.src, el.alt);
    });
  });

  document.addEventListener('click', hideLightbox);
})();
