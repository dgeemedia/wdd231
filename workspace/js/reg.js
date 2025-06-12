let termsRead = false;
let privacyRead = false;

// Helper function to handle scroll
function handleScroll(content, flagSetter, handler) {
  const scrolledToBottom = content.scrollHeight - content.scrollTop <= content.clientHeight + 5;
  if (scrolledToBottom) {
    flagSetter();
    content.removeEventListener('scroll', handler);
    updateAgreementCheckbox();
  }
}

// Set up scroll listener for a modal
function checkScrollComplete(modalId, contentId, flagSetter) {
  const content = document.getElementById(contentId);
  const handler = () => handleScroll(content, flagSetter, handler);
  content.addEventListener('scroll', handler);
}

// Update checkbox based on whether both modals have been read
function updateAgreementCheckbox() {
  const checkbox = document.getElementById('agree');
  if (termsRead && privacyRead) {
    checkbox.disabled = false;
  }
}

// Open Terms modal and track scrolling
document.getElementById("openTerms").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("termsModal").style.display = "block";
  checkScrollComplete("termsModal", "termsContent", () => {
    termsRead = true;
  });
});

// Open Privacy modal and track scrolling
document.getElementById("openPrivacy").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("privacyModal").style.display = "block";
  checkScrollComplete("privacyModal", "privacyContent", () => {
    privacyRead = true;
  });
});

// Close modal buttons
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", function () {
    document.getElementById(this.dataset.close).style.display = "none";
  });
});

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

// Prevent form submission if checkbox not checked
document.getElementById("register-form").addEventListener("submit", function(e) {
  if (!document.getElementById("agree").checked) {
    e.preventDefault();
    alert("Please confirm you have read and agreed to the Terms and Privacy Policy.");
  }
});
