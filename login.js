const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const validEmail = "admin@example.com";
const validPassword = "123456";

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === validEmail && password === validPassword) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "admin.html";
  } else {
    loginMessage.textContent = "Login failed. Try again.";
  }
});
