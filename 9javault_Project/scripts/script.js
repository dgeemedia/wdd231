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