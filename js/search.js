document.addEventListener("DOMContentLoaded", () => {
  // Get search type from URL parameter
  const urlParams = new URLSearchParams(window.location.search)
  const searchType = urlParams.get("type") || "grants"

  // Update page title based on search type
  const searchTitle = document.getElementById("search-title")
  searchTitle.textContent = `Search ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`

  // Set up table headers based on search type
  const tableHeaders = document.getElementById("table-headers")
  if (searchType === "grants") {
    tableHeaders.innerHTML = `
      <th>Grant Title</th>
      <th>Category</th>
      <th>Funding Organization</th>
      <th>Submission</th>
      <th>Award Date</th>
      <th>Amount</th>
      <th>Project Lead</th>
      <th>Status</th>
    `
  } else {
    tableHeaders.innerHTML = `
      <th>Project Title</th>
      <th>Due Date</th>
      <th>Status</th>
      <th>Project Administrator</th>
    `
  }

  // Sample data for grants
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

  // Sample data for projects
  const projects = [
    {
      id: "P001",
      title: "Early Childhood Education Research Implementation",
      dueDate: "2023-12-15",
      status: "In Progress",
      admin: {
        firstName: "Sarah",
        lastName: "Johnson",
      },
    },
    {
      id: "P002",
      title: "Community Literacy Program Rollout",
      dueDate: "2023-11-30",
      status: "Planning",
      admin: {
        firstName: "David",
        lastName: "Kim",
      },
    },
    {
      id: "P003",
      title: "Technology Integration in Special Education Pilot",
      dueDate: "2024-02-28",
      status: "Not Started",
      admin: {
        firstName: "James",
        lastName: "Wilson",
      },
    },
    {
      id: "P004",
      title: "Professional Development Workshop Series",
      dueDate: "2023-10-15",
      status: "Completed",
      admin: {
        firstName: "Lisa",
        lastName: "Patel",
      },
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

  // Get status badge class
  function getStatusBadgeClass(status) {
    switch (status) {
      case "Active":
        return "badge-active"
      case "Pending":
        return "badge-pending"
      case "Completed":
        return "badge-completed"
      case "In Progress":
        return "badge-active"
      case "Planning":
        return "badge-pending"
      case "Not Started":
        return "badge-pending"
      default:
        return ""
    }
  }

  // Populate search results
  function populateSearchResults(results) {
    const resultsBody = document.getElementById("search-results-body")
    const noResults = document.getElementById("no-results")
    const resultsCount = document.getElementById("results-count")

    resultsBody.innerHTML = ""

    if (results.length === 0) {
      noResults.classList.remove("hidden")
      resultsCount.textContent = "0"
      return
    }

    noResults.classList.add("hidden")
    resultsCount.textContent = results.length.toString()

    if (searchType === "grants") {
      results.forEach((grant) => {
        const row = document.createElement("tr")
        row.classList.add("grant-row")
        row.dataset.id = grant.id

        row.innerHTML = `
          <td class="font-medium">${grant.title}</td>
          <td>${grant.category}</td>
          <td>${grant.fundingOrg}</td>
          <td>${formatDate(grant.submissionDate)}</td>
          <td>${formatDate(grant.awardDate)}</td>
          <td>${formatCurrency(grant.awardAmount)}</td>
          <td>${grant.projectLead}</td>
          <td><span class="badge ${getStatusBadgeClass(grant.status)}">${grant.status}</span></td>
        `

        resultsBody.appendChild(row)
      })

      // Add click event to rows
      document.querySelectorAll(".grant-row").forEach((row) => {
        row.addEventListener("click", function () {
          const grantId = this.dataset.id
          window.location.href = `grant-details.html?id=${grantId}`
        })
      })
    } else {
      results.forEach((project) => {
        const row = document.createElement("tr")
        row.classList.add("project-row")
        row.dataset.id = project.id

        row.innerHTML = `
          <td class="font-medium">${project.title}</td>
          <td>${formatDate(project.dueDate)}</td>
          <td><span class="badge ${getStatusBadgeClass(project.status)}">${project.status}</span></td>
          <td>${project.admin.firstName} ${project.admin.lastName}</td>
        `

        resultsBody.appendChild(row)
      })
    }
  }

  // Initial population of results
  populateSearchResults(searchType === "grants" ? grants : projects)

  // Search functionality
  const searchBtn = document.getElementById("search-btn")
  const searchBy = document.getElementById("search-by")
  const searchValue = document.getElementById("search-value")

  searchBtn.addEventListener("click", () => {
    const searchTerm = searchValue.value.toLowerCase()
    const searchField = searchBy.value

    if (!searchTerm) {
      populateSearchResults(searchType === "grants" ? grants : projects)
      return
    }

    let filteredResults = []

    if (searchType === "grants") {
      filteredResults = grants.filter((grant) => {
        switch (searchField) {
          case "title":
            return grant.title.toLowerCase().includes(searchTerm)
          case "category":
            return grant.category.toLowerCase().includes(searchTerm)
          case "funding":
            return grant.fundingOrg.toLowerCase().includes(searchTerm)
          case "lead":
            return grant.projectLead.toLowerCase().includes(searchTerm)
          case "status":
            return grant.status.toLowerCase().includes(searchTerm)
          default:
            return (
              grant.title.toLowerCase().includes(searchTerm) ||
              grant.category.toLowerCase().includes(searchTerm) ||
              grant.fundingOrg.toLowerCase().includes(searchTerm) ||
              grant.projectLead.toLowerCase().includes(searchTerm) ||
              grant.status.toLowerCase().includes(searchTerm)
            )
        }
      })
    } else {
      filteredResults = projects.filter((project) => {
        const adminName = `${project.admin.firstName} ${project.admin.lastName}`.toLowerCase()

        switch (searchField) {
          case "title":
            return project.title.toLowerCase().includes(searchTerm)
          case "lead":
            return adminName.includes(searchTerm)
          case "status":
            return project.status.toLowerCase().includes(searchTerm)
          default:
            return (
              project.title.toLowerCase().includes(searchTerm) ||
              adminName.includes(searchTerm) ||
              project.status.toLowerCase().includes(searchTerm)
            )
        }
      })
    }

    populateSearchResults(filteredResults)
  })

  // Advanced search toggle
  const advancedSearchToggle = document.getElementById("advanced-search-toggle")
  const advancedSearch = document.getElementById("advanced-search")

  advancedSearchToggle.addEventListener("click", () => {
    advancedSearch.classList.toggle("hidden")

    // Change icon and text based on state
    if (advancedSearch.classList.contains("hidden")) {
      advancedSearchToggle.innerHTML = '<i class="fas fa-sliders-h mr-2"></i> Advanced Search'
    } else {
      advancedSearchToggle.innerHTML = '<i class="fas fa-times mr-2"></i> Hide Advanced Search'
    }
  })

  // Apply filters
  const applyFiltersBtn = document.getElementById("apply-filters-btn")
  const dateFrom = document.getElementById("date-from")
  const dateTo = document.getElementById("date-to")
  const amountMin = document.getElementById("amount-min")
  const amountMax = document.getElementById("amount-max")

  applyFiltersBtn.addEventListener("click", () => {
    const fromDate = dateFrom.value ? new Date(dateFrom.value) : null
    const toDate = dateTo.value ? new Date(dateTo.value) : null
    const minAmount = amountMin.value ? Number.parseFloat(amountMin.value) : null
    const maxAmount = amountMax.value ? Number.parseFloat(amountMax.value) : null

    let filteredResults = []

    if (searchType === "grants") {
      filteredResults = grants.filter((grant) => {
        const grantDate = new Date(grant.awardDate)
        const amount = grant.awardAmount

        let dateMatch = true
        let amountMatch = true

        if (fromDate && toDate) {
          dateMatch = grantDate >= fromDate && grantDate <= toDate
        } else if (fromDate) {
          dateMatch = grantDate >= fromDate
        } else if (toDate) {
          dateMatch = grantDate <= toDate
        }

        if (minAmount && maxAmount) {
          amountMatch = amount >= minAmount && amount <= maxAmount
        } else if (minAmount) {
          amountMatch = amount >= minAmount
        } else if (maxAmount) {
          amountMatch = amount <= maxAmount
        }

        return dateMatch && amountMatch
      })
    } else {
      filteredResults = projects.filter((project) => {
        const projectDate = new Date(project.dueDate)

        let dateMatch = true

        if (fromDate && toDate) {
          dateMatch = projectDate >= fromDate && projectDate <= toDate
        } else if (fromDate) {
          dateMatch = projectDate >= fromDate
        } else if (toDate) {
          dateMatch = projectDate <= toDate
        }

        return dateMatch
      })
    }

    populateSearchResults(filteredResults)
  })

  // Clear filters
  const clearFiltersBtn = document.getElementById("clear-filters-btn")

  clearFiltersBtn.addEventListener("click", () => {
    dateFrom.value = ""
    dateTo.value = ""
    amountMin.value = ""
    amountMax.value = ""

    populateSearchResults(searchType === "grants" ? grants : projects)
  })

  // Export functionality
  const exportBtn = document.getElementById("export-btn")

  exportBtn.addEventListener("click", () => {
    alert("Export functionality would be implemented here.")
  })
})
