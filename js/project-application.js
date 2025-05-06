document.addEventListener("DOMContentLoaded", () => {
  const projectForm = document.getElementById("project-application-form")
  const clearFormBtn = document.getElementById("clear-form-btn")

  // Clear form
  clearFormBtn.addEventListener("click", () => {
    projectForm.reset()

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

    // Admin name validation
    const adminName = document.getElementById("admin-name").value
    if (!adminName) {
      errors.adminName = "Admin name is required"
      isValid = false
    }

    // Project status validation
    const projectStatus = document.getElementById("project-status").value
    if (!projectStatus) {
      errors.projectStatus = "Project status is required"
      isValid = false
    }

    // Project title validation
    const projectTitle = document.getElementById("project-title").value
    if (!projectTitle) {
      errors.projectTitle = "Project title is required"
      isValid = false
    }

    // Due date validation
    const dueDate = document.getElementById("due-date").value
    if (!dueDate) {
      errors.dueDate = "Due date is required"
      isValid = false
    } else {
      const today = new Date()
      const selectedDate = new Date(dueDate)
      if (selectedDate < today) {
        errors.dueDate = "Due date cannot be in the past"
        isValid = false
      }
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
  projectForm.addEventListener("submit", (e) => {
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
    const projectData = {
      adminName: document.getElementById("admin-name").value,
      projectStatus: document.getElementById("project-status").value,
      projectTitle: document.getElementById("project-title").value,
      dueDate: document.getElementById("due-date").value,
      relatedGrant: document.getElementById("related-grant").value,
      projectDescription: document.getElementById("project-description").value,
    }

    console.log("Project created:", projectData)

    // Show success message
    const successMessage = document.createElement("div")
    successMessage.className = "bg-status-active text-status-active-text p-4 rounded-lg mt-4 flex items-center"
    successMessage.innerHTML = `
      <i class="fas fa-check-circle mr-2 text-xl"></i>
      <div>
        <p class="font-medium">Project created successfully!</p>
        <p class="text-sm">The project has been added to the system.</p>
      </div>
    `

    projectForm.appendChild(successMessage)

    // Reset form after 3 seconds
    setTimeout(() => {
      projectForm.reset()
      successMessage.remove()
    }, 3000)
  })
})
