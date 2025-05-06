document.addEventListener("DOMContentLoaded", () => {
  const reportForm = document.getElementById("report-form")
  const clearReportBtn = document.getElementById("clear-report-btn")
  const reportTable = document.getElementById("report-table")
  const reportTableBody = document.getElementById("report-table-body")
  const noReportData = document.getElementById("no-report-data")
  const reportVisualization = document.getElementById("report-visualization")
  const visualizeReportBtn = document.getElementById("visualize-report-btn")

  // Sample grant data
  const grants = [
    {
      id: "G001",
      title: "Early Childhood Education Research",
      category: "Research",
      fundingOrg: "National Science Foundation",
      submissionDate: "2023-05-15",
      awardDate: "2023-07-20",
      awardAmount: 125000,
      projectLead: "Dr. Sarah Johnson",
      status: "Active",
    },
    {
      id: "G002",
      title: "Community Literacy Program",
      category: "Community Outreach",
      fundingOrg: "Department of Education",
      submissionDate: "2023-04-10",
      awardDate: "2023-06-15",
      awardAmount: 75000,
      projectLead: "Dr. David Kim",
      status: "Active",
    },
    {
      id: "G003",
      title: "Technology Integration in Special Education",
      category: "Education",
      fundingOrg: "Gates Foundation",
      submissionDate: "2023-03-22",
      awardDate: "2023-05-30",
      awardAmount: 200000,
      projectLead: "Dr. James Wilson",
      status: "Pending",
    },
    {
      id: "G004",
      title: "Professional Development for Educators",
      category: "Professional Development",
      fundingOrg: "State Department of Education",
      submissionDate: "2023-02-18",
      awardDate: "2023-04-25",
      awardAmount: 50000,
      projectLead: "Dr. Lisa Patel",
      status: "Completed",
    },
  ]

  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Clear report form
  clearReportBtn.addEventListener("click", () => {
    reportForm.reset()
  })

  // Generate report
  reportForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const reportType = document.getElementById("report-type").value
    const startDate = document.getElementById("start-date").value
      ? new Date(document.getElementById("start-date").value)
      : null
    const endDate = document.getElementById("end-date").value
      ? new Date(document.getElementById("end-date").value)
      : null
    const statusFilter = document.getElementById("status-filter").value
    const categoryType = document.getElementById("category-type").value.toLowerCase()
    const keywordSearch = document.getElementById("keyword-search").value.toLowerCase()

    // Filter grants based on criteria
    let filteredGrants = [...grants]

    if (startDate && endDate) {
      filteredGrants = filteredGrants.filter((grant) => {
        const awardDate = new Date(grant.awardDate)
        return awardDate >= startDate && awardDate <= endDate
      })
    } else if (startDate) {
      filteredGrants = filteredGrants.filter((grant) => {
        const awardDate = new Date(grant.awardDate)
        return awardDate >= startDate
      })
    } else if (endDate) {
      filteredGrants = filteredGrants.filter((grant) => {
        const awardDate = new Date(grant.awardDate)
        return awardDate <= endDate
      })
    }

    if (statusFilter) {
      filteredGrants = filteredGrants.filter((grant) => grant.status === statusFilter)
    }

    if (categoryType) {
      filteredGrants = filteredGrants.filter((grant) => grant.category.toLowerCase().includes(categoryType))
    }

    if (keywordSearch) {
      filteredGrants = filteredGrants.filter(
        (grant) =>
          grant.title.toLowerCase().includes(keywordSearch) ||
          grant.projectLead.toLowerCase().includes(keywordSearch) ||
          grant.fundingOrg.toLowerCase().includes(keywordSearch),
      )
    }

    // Display results
    reportTableBody.innerHTML = ""

    if (filteredGrants.length === 0) {
      noReportData.style.display = "block"
      reportTable.style.display = "none"
    } else {
      noReportData.style.display = "none"
      reportTable.style.display = "table"

      filteredGrants.forEach((grant) => {
        const row = document.createElement("tr")

        row.innerHTML = `
          <td>${grant.id}</td>
          <td class="font-medium">${grant.title}</td>
          <td>${grant.category}</td>
          <td>${grant.fundingOrg}</td>
          <td>${formatDate(grant.submissionDate)}</td>
          <td>${formatDate(grant.awardDate)}</td>
          <td>${formatCurrency(grant.awardAmount)}</td>
          <td>${grant.projectLead}</td>
        `

        reportTableBody.appendChild(row)
      })
    }
  })

  // Visualization button
  visualizeReportBtn.addEventListener("click", () => {
    reportVisualization.classList.toggle("hidden")

    if (!reportVisualization.classList.contains("hidden")) {
      // In a real application, you would use a charting library like Chart.js
      // For this demo, we'll just show a placeholder
      reportVisualization.innerHTML = `
        <div class="text-center py-8">
          <i class="fas fa-chart-bar text-5xl text-primary mb-4"></i>
          <h3 class="text-lg font-medium mb-2">Bar Chart Visualization</h3>
          <p class="text-muted">This is a placeholder for a bar chart visualization</p>
        </div>
      `
    }
  })

  // Print report
  const printReportBtn = document.getElementById("print-report-btn")

  printReportBtn.addEventListener("click", () => {
    window.print()
  })

  // Export report
  const exportReportBtn = document.getElementById("export-report-btn")

  exportReportBtn.addEventListener("click", () => {
    alert("Export functionality would be implemented here.")
  })
})
