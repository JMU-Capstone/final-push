document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Table row hover effect
  const tableRows = document.querySelectorAll("tr")

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      const cells = row.querySelectorAll("td")
      cells.forEach((cell, index) => {
        cell.style.transitionDelay = `${index * 30}ms`
      })
    })

    row.addEventListener("mouseleave", () => {
      const cells = row.querySelectorAll("td")
      cells.forEach((cell) => {
        cell.style.transitionDelay = "0ms"
      })
    })
  })

  // Button ripple effect
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - this.getBoundingClientRect().left
      const y = e.clientY - this.getBoundingClientRect().top

      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Form input animations
  const formInputs = document.querySelectorAll("input, select, textarea")

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const formGroup = input.closest(".form-group")
      if (formGroup) {
        formGroup.classList.add("focused")
      }
    })

    input.addEventListener("blur", () => {
      const formGroup = input.closest(".form-group")
      if (formGroup) {
        formGroup.classList.remove("focused")
      }
    })
  })

  // Card hover effects
  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      this.style.setProperty("--x-pos", `${x}px`)
      this.style.setProperty("--y-pos", `${y}px`)
      this.classList.add("card-hover")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("card-hover")
    })
  })

  // Tab switching animation
  const tabButtons = document.querySelectorAll(".tab-btn")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab
      const tabContent = document.getElementById(`${tabId}-tab`)

      if (tabContent) {
        // Reset animation
        tabContent.style.animation = "none"
        tabContent.offsetHeight // Trigger reflow
        tabContent.style.animation = null
      }
    })
  })
})
