document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('menu-button');
  const navMenu = document.getElementById('nav-menu');
  const modDate = document.getElementById('mod-date');
  const timestampField = document.getElementById('timestamp');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuButton.classList.toggle('open');
      navMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', menuButton.classList.contains('open'));
    });
    menuButton.setAttribute('aria-controls', 'nav-menu');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  if (modDate) {
    modDate.textContent = document.lastModified;
  }

  if (timestampField) {
    timestampField.value = new Date().toLocaleString();
  }

  // Modal Logic
  document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const modalId = trigger.closest('.card').dataset.modal;
      document.getElementById(modalId).showModal();
    });
  });

  document.querySelectorAll('dialog button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('dialog').close();
    });
  });

  // Animation: show cards with slight delay
  const cards = document.querySelectorAll('.membership-cards .card');
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, i * 200);
  });
});
