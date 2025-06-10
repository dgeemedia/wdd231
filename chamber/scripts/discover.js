import { places } from "../data/places.mjs";

const container = document.getElementById("discoverContainer");

places.forEach(place => {
  const card = document.createElement("div");
  card.classList.add("place-card");

  
  const grid = document.createElement("div");
  grid.classList.add("place-grid");

  const name = document.createElement("h3");
  name.textContent = place.name;
  name.classList.add("place-name");

  const img = document.createElement("img");
  img.src = `images/${place.photo_url}`;
  img.alt = place.name;
  img.classList.add("place-img");

  const desc = document.createElement("p");
  desc.textContent = place.description;
  desc.classList.add("place-description");

  const address = document.createElement("p");
  address.innerHTML = `<strong>Address:</strong> ${place.address}`;
  address.classList.add("place-address");

  const cost = document.createElement("p");
  cost.innerHTML = `<strong>Property Cost:</strong> ${place.property_cost}`;
  cost.classList.add("place-cost");

  // Append all to grid, then grid to card
  grid.appendChild(name);
  grid.appendChild(img);
  grid.appendChild(desc);
  grid.appendChild(address);
  grid.appendChild(cost);
  card.appendChild(grid);

  // Add to container
  container.appendChild(card);
});


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
  });
});
