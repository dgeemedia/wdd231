let termsRead = false;
let privacyRead = false;

// Revert flags and reset agreement checkbox
function revertAgreementStatus() {
  termsRead = false;
  privacyRead = false;
  document.getElementById('agree').disabled = true;
}

// Open modals & scroll tracking
function handleScroll(content, flagSetter, handler) {
  const atBottom = content.scrollHeight - content.scrollTop <= content.clientHeight + 5;
  if (atBottom) {
    flagSetter();
    content.removeEventListener('scroll', handler);
    updateAgreementCheckbox();
  }
}

function checkScrollComplete(contentId, flagSetter) {
  const content = document.getElementById(contentId);
  const handler = () => handleScroll(content, flagSetter, handler);
  content.addEventListener('scroll', handler);
}

function updateAgreementCheckbox() {
  const checkbox = document.getElementById('agree');
  checkbox.disabled = !(termsRead && privacyRead);
}

// Modal open events
document.getElementById("openTerms").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("termsModal").style.display = "block";
  checkScrollComplete("termsContent", () => termsRead = true);
});

document.getElementById("openPrivacy").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("privacyModal").style.display = "block";
  checkScrollComplete("privacyContent", () => privacyRead = true);
});

// Close modals
document.querySelectorAll(".close").forEach(span => {
  span.onclick = () => {
    const modal = span.closest(".modal");
    if (modal) modal.style.display = "none";
  };
});

// Registration form logic with countdown
const registerForm = document.getElementById('register-form');
registerForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-password2').value;
  const agreed = document.getElementById('agree').checked;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!agreed) {
    alert("You must agree to the Terms and Privacy Policy.");
    return;
  }

  // Save to localStorage
  const userData = { name, phone, email, password, plan: 'basic' };
  localStorage.setItem("loggedInUser", JSON.stringify(userData));

  // Show success message and countdown
  const container = document.querySelector(".form-container");
  let countdown = 5;
  container.innerHTML = `
    <h2>Registration Successful!</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p>Redirecting to dashboard in <span id="countdown">${countdown}</span> seconds...</p>
  `;

  const interval = setInterval(() => {
    countdown--;
    document.getElementById("countdown").textContent = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      window.location.href = "dashboard.html";
    }
  }, 1000);
});
