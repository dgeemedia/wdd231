import { fetchWeather }    from './weather.js';
import { fetchSpotlights } from './spotlight.js';
import { initSlider }      from './slider.js';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const menuButton = document.getElementById('menu-button');
  const navMenu    = document.getElementById('nav-menu');
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

  // Last-modified stamp
  const modDate = document.getElementById('mod-date');
  if (modDate) {
    modDate.textContent = document.lastModified;
  }

  // Hero slider
  initSlider();

  // Weather widget
  if (document.querySelector('.weather-section')) {
    fetchWeather().catch(err => console.warn('Weather failed:', err));
  }

  // Member spotlights
  if (document.getElementById('spotlightContainer')) {
    fetchSpotlights();
  }
});

    // --- Dynamic Creation of Login and Register Buttons in Hero Section ---
    const heroButtonContainer = document.querySelector('.hero-button');
    if (heroButtonContainer) {
      const joinBtn = document.createElement('a');
      joinBtn.href = "join.html";
      joinBtn.className = "btn";
      joinBtn.textContent = "Join Us";
      heroButtonContainer.appendChild(joinBtn);
    }