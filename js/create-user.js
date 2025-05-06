document.addEventListener("DOMContentLoaded", () => {
  const createUserForm = document.getElementById("create-user-form")
  const clearFormBtn = document.getElementById("clear-form-btn")
  const suggestUsernameBtn = document.getElementById("suggest-username-btn")
  const passwordToggles = document.querySelectorAll(".password-toggle")

  // Password visibility toggle
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Toggle icon
      const icon = this.querySelector("i")
      icon.classList.toggle("fa-eye")
      icon.classList.toggle("fa-eye-slash")
    })
  })

  // Suggest username
  suggestUsernameBtn.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").value
    const lastName = document.getElementById("last-name").value

    if (firstName && lastName) {
      const suggestion = `${firstName.toLowerCase().charAt(0)}${lastName.toLowerCase()}`.replace(/\s+/g, "")
      document.getElementById("username").value = suggestion
    } else {
      alert("Please enter first and last name to generate a username suggestion.")
    }
  })

  // Clear form
  clearFormBtn.addEventListener("click", () => {
    createUserForm.reset()

    // Clear error messages
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = ""
    })

    // Remove error classes
    document.querySelectorAll(".form-group").forEach((el) => {
      el.classList.remove("error")
    })
  })

  // Form validation
  function validateForm() {
    let isValid = true
    const errors = {}

    // First name validation
    const firstName = document.getElementById("first-name").value
    if (!firstName) {
      errors.firstName = "First name is required"
      isValid = false
    }

    // Last name validation
    const lastName = document.getElementById("last-name").value
    if (!lastName) {
      errors.lastName = "Last name is required"
      isValid = false
    }

    // Email validation
    const email = document.getElementById("email").value
    if (!email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
      isValid = false
    }

    // Username validation
    const username = document.getElementById("username").value
    if (!username) {
      errors.username = "Username is required"
      isValid = false
    }

    // Password validation
    const password = document.getElementById("password").value
    if (!password) {
      errors.password = "Password is required"
      isValid = false
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Confirm password validation
    const confirmPassword = document.getElementById("confirm-password").value
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    // Department validation
    const department = document.getElementById("department").value
    if (!department) {
      errors.department = "Department is required"
      isValid = false
    }

    // Role validation
    const role = document.getElementById("role").value
    if (!role) {
      errors.role = "Role is required"
      isValid = false
    }

    // Display errors
    Object.keys(errors).forEach((key) => {
      const errorElement = document.getElementById(`${key.replace(/([A-Z])/g, "-$1").toLowerCase()}-error`)
      const inputElement = document.getElementById(`${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`)
      const formGroup = inputElement.closest(".form-group")

      if (errorElement) {
        errorElement.textContent = errors[key]
        formGroup.classList.add("error")
      }
    })

    return isValid
  }

  // Form submission
  createUserForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = ""
    })

    // Remove error classes
    document.querySelectorAll(".form-group").forEach((el) => {
      el.classList.remove("error")
    })

    // Validate form
    if (!validateForm()) {
      return
    }

    // Get form values
    const userData = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      department: document.getElementById("department").value,
      role: document.getElementById("role").value,
    }

    console.log("User created:", userData)

    // Show success message
    alert("User created successfully!")

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  })
})
