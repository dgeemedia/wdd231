document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const output = document.getElementById("thankyou-data");

  const fields = [
    { label: "First Name", name: "fname" },
    { label: "Last Name", name: "lname" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
    { label: "Business Name", name: "bizname" },
    { label: "Submitted At", name: "timestamp" }
  ];

  output.innerHTML = fields
    .map(field => {
      const value = params.get(field.name) || "[Not Provided]";
      return `<p><strong>${field.label}:</strong> ${value}</p>`;
    })
    .join("");
});

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
