// Mobile nav toggle with animation
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navMenu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

// Dark mode toggle with icon switch
const darkToggle = document.querySelector('.dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Set ARIA attributes for accessibility
menuButton.setAttribute('aria-controls', 'nav-menu');
menuButton.setAttribute('aria-expanded', 'false');

// Last modified
document.getElementById('mod-date').textContent = document.lastModified;
