document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupform");
  const password = document.getElementById("pswd");
  const confirmPassword = document.getElementById("cnfpswd");
  const error = document.getElementById("error");

  form.addEventListener("submit", function (e) {
    if (password.value !== confirmPassword.value) {
      e.preventDefault();
      error.textContent = "Passwords do not match!";
    } else {
      error.textContent = ""; 
    }
  });
});
