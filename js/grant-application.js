document.addEventListener("DOMContentLoaded", () => {
  const grantForm = document.getElementById("grant-application-form")
  const clearFormBtn = document.getElementById("clear-form-btn")
  const awardAmountInput = document.getElementById("award-amount")

  // Format amount input to only allow numbers and decimal point
  awardAmountInput.addEventListener("input", function () {
    const value = this.value
    // Allow only numbers and decimal point
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      // Valid input, do nothing
    } else {
      // Invalid input, revert to previous valid value
      this.value = this.value.slice(0, -1)
    }
  })

  // Clear form
  clearFormBtn.addEventListener("click", () => {
    grantForm.reset()
  })

  // Form submission
  grantForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const faculty = document.getElementById("faculty").value
    const category = document.getElementById("category").value
    const fundingOrg = document.getElementById("funding-org").value
    const awardDate = document.getElementById("award-date").value
    const awardAmount = document.getElementById("award-amount").value

    // Validate form
    if (!faculty || !category || !fundingOrg || !awardDate || !awardAmount) {
      alert("Please fill in all required fields")
      return
    }

    // Process form data
    const formData = {
      faculty,
      category,
      fundingOrg,
      awardDate,
      awardAmount: Number.parseFloat(awardAmount),
    }

    console.log("Form submitted:", formData)

    // Show success message
    alert("Grant application submitted successfully!")

    // Reset form
    grantForm.reset()
  })
})
