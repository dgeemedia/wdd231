document.addEventListener("DOMContentLoaded", () => {
  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "login.html";
  } else {
    document.querySelector("h2").textContent = `Welcome, ${user.name}`;
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
