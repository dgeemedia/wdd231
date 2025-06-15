// Script

// Toggle mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
      toggleButton.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // Simulate login submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Normally validate input and authenticate user
      // For demo: redirect to dashboard
      window.location.href = 'dashboard.html';
    });
  }

  // Simulate register submission
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Normally create user account
      alert('Account created! Please log in.');
      window.location.href = 'login.html';
    });
  }

  // Simulate forgot password
  const forgotForm = document.getElementById('forgot-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Normally send reset email
      alert('Password reset link sent to your email.');
      window.location.href = 'login.html';
    });
  }

  // Handle upgrade form
  const upgradeForm = document.getElementById('upgrade-form');
  if (upgradeForm) {
    upgradeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const chosenPlan = document.querySelector('input[name="plan"]:checked').value;
      // Save plan to local storage (simulating user subscription)
      localStorage.setItem('plan', chosenPlan);
      alert('Thank you for upgrading!');
      window.location.href = 'dashboard.html';
    });
  }

  // Set body class based on plan
  const plan = localStorage.getItem('plan') || 'basic';
  document.body.classList.add(plan === 'basic' ? 'plan-basic' : 'plan-premium');

  // Hide premium columns if on basic plan (reinforced by JS)
  if (plan === 'basic') {
    document.querySelectorAll('.premium-col').forEach(el => {
      el.style.display = 'none';
    });
  }
}); // This is the correct, single closing brace for the DOMContentLoaded function

// Rate Calculation Logic
  document.getElementById('calc-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const tenure = parseInt(document.getElementById('tenure').value);

    if (!amount || !rate || !tenure) return;

    const interest = (amount * rate * tenure) / (100 * 365);
    const total = amount + interest;

    document.getElementById('calc-result').innerHTML = `
      <strong>Estimated Return:</strong><br>
      ₦${interest.toFixed(2)} interest<br>
      ₦${total.toFixed(2)} total
    `;
  });

//MEMBERSHIP PLAN JS MODAL
document.querySelectorAll('.modal-trigger').forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const modalId = this.closest('.card').getAttribute('data-modal');
    document.getElementById(modalId).showModal();
  });
});

document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', function () {
    this.closest('dialog').close();
  });
});

// Redirect to login.html with plan name
document.querySelectorAll('.subscribe-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const plan = this.getAttribute('data-plan');
    window.location.href = `login.html?plan=${encodeURIComponent(plan)}`;
  });
});

// First Video Explanation - Javascript module
// JSON Commercial bank display
import { commercial } from "../data/commercial.mjs";

const container = document.getElementById("commercialContainer");
const viewAllBtn = document.getElementById("viewAllBtn");

// Preview first 6 commercial banks
commercial.slice(0, 6).forEach(bank => {
  const card = document.createElement("div");
  card.classList.add("bank-card");

  const img = document.createElement("img");
  img.src = `images/${bank.logo}`;
  img.alt = `${bank.name} Logo`;
  img.loading = "lazy";

  const name = document.createElement("h3");
  name.textContent = bank.name;

  const website = document.createElement("a");
  website.href = bank.website;
  website.target = "_blank";
  website.textContent = "Visit Website";

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(website);

  container.appendChild(card);
});

// Open full list in new tab (future implementation can link to a full bank list page)
viewAllBtn.addEventListener("click", () => {
  window.open("all-commercial-banks.html", "_blank");
});

// Second Video Explanation API Fetch Using Async/Await
//FINANCIAL MODELING PREP API
async function fetchStockData() {
  const url = "https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=mCPuYk40HMZlXiJTnYl2pytlL8kFFoOF";
  const stockInfo = document.getElementById('stock-info');

  try {
    const res = await fetch(url);
    const [stock] = await res.json(); // Destructure first item

    if (stock) {
      stockInfo.innerHTML = `
        <h3>${stock.name} (${stock.symbol})</h3>
        <p>Price: $${stock.price}</p>
        <p>Change: ${stock.change} (${stock.changesPercentage}%)</p>
        <p>Updated: ${new Date(stock.timestamp * 1000).toLocaleString()}</p>
      `;
    } else {
      stockInfo.innerHTML = "<p>No stock data available.</p>";
    }
  } catch (err) {
    stockInfo.innerHTML = "<p>Error loading stock data.</p>";
    console.error("Fetch error:", err);
  }
}


fetchStockData();
