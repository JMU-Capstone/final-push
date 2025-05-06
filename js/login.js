document.addEventListener("DOMContentLoaded", () => {
  // Password visibility toggle
  const passwordInput = document.getElementById("password")
  const passwordToggle = document.querySelector(".password-toggle")

  passwordToggle.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    // Toggle icon
    const icon = this.querySelector("i")
    icon.classList.toggle("fa-eye")
    icon.classList.toggle("fa-eye-slash")
  })

  // Login form submission
  const loginForm = document.getElementById("login-form")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // In a real application, you would validate and send the form data to a server
    alert("This is a mockup. Use the Bypass button for testing.")
  })

  // Bypass button for testing
  const bypassBtn = document.getElementById("bypass-btn")

  bypassBtn.addEventListener("click", () => {
    // Store user info in session storage for demo purposes
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        role: "Executive Director of JMU CARE",
        isLoggedIn: true,
      }),
    )

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  })
})
