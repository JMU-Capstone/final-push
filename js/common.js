document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const user = JSON.parse(sessionStorage.getItem("user") || "null")

  if (!user || !user.isLoggedIn) {
    // Redirect to login page if not logged in
    if (!window.location.pathname.includes("index.html")) {
      window.location.href = "index.html"
    }
  } else {
    // Update user name in header
    const userNameElement = document.getElementById("user-name")
    if (userNameElement) {
      userNameElement.textContent = user.firstName
    }
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavClose = document.querySelector(".mobile-nav-close")

  if (mobileMenuBtn && mobileNav && mobileNavClose) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    mobileNavClose.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // User dropdown toggle
  const userDropdownBtn = document.querySelector(".user-dropdown-btn")
  const userDropdown = document.querySelector(".user-dropdown")

  if (userDropdownBtn && userDropdown) {
    userDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      userDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      userDropdown.classList.remove("active")
    })
  }

  // Filter dropdowns
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation()
      const dropdown = this.closest(".dropdown")
      dropdown.classList.toggle("active")
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active")
    })
  })

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn")
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn")

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    window.location.href = "index.html"
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout)
  }

  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", handleLogout)
  }
})
