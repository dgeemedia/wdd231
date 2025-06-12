document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const rememberMe = document.getElementById("remember-me").checked;

  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    if (rememberMe) {
      // User stays logged in
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
    } else {
      // Store temporarily (session-only)
      sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
    }

    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
