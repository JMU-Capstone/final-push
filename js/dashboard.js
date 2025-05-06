document.addEventListener("DOMContentLoaded", () => {
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

  // Sample project data
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

  // Populate grants table
  const grantsTable = document.getElementById("grants-table")
  const grantsTableBody = grantsTable.querySelector("tbody")

  function populateGrantsTable(grantsData) {
    grantsTableBody.innerHTML = ""

    if (grantsData.length === 0) {
      const emptyRow = document.createElement("tr")
      emptyRow.innerHTML = `
        <td colspan="8" class="text-center py-6 text-muted">No grants found matching your search.</td>
      `
      grantsTableBody.appendChild(emptyRow)
      return
    }

    grantsData.forEach((grant) => {
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

      grantsTableBody.appendChild(row)
    })

    // Add click event to rows
    document.querySelectorAll(".grant-row").forEach((row) => {
      row.addEventListener("click", function () {
        const grantId = this.dataset.id
        window.location.href = `grant-details.html?id=${grantId}`
      })
    })
  }

  // Populate projects table
  const projectsTable = document.getElementById("projects-table")
  const projectsTableBody = projectsTable.querySelector("tbody")

  function populateProjectsTable(projectsData) {
    projectsTableBody.innerHTML = ""

    if (projectsData.length === 0) {
      const emptyRow = document.createElement("tr")
      emptyRow.innerHTML = `
        <td colspan="4" class="text-center py-6 text-muted">No projects found matching your search.</td>
      `
      projectsTableBody.appendChild(emptyRow)
      return
    }

    projectsData.forEach((project) => {
      const row = document.createElement("tr")

      row.innerHTML = `
        <td class="font-medium">${project.title}</td>
        <td>${formatDate(project.dueDate)}</td>
        <td><span class="badge ${getStatusBadgeClass(project.status)}">${project.status}</span></td>
        <td>${project.admin.firstName} ${project.admin.lastName}</td>
      `

      projectsTableBody.appendChild(row)
    })
  }

  // Initial population of tables
  populateGrantsTable(grants)
  populateProjectsTable(projects)

  // Grant search functionality
  const grantSearch = document.getElementById("grant-search")

  grantSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()

    const filteredGrants = grants.filter(
      (grant) =>
        grant.title.toLowerCase().includes(searchTerm) ||
        grant.projectLead.toLowerCase().includes(searchTerm) ||
        grant.fundingOrg.toLowerCase().includes(searchTerm) ||
        grant.status.toLowerCase().includes(searchTerm),
    )

    populateGrantsTable(filteredGrants)
  })

  // Project search functionality
  const projectSearch = document.getElementById("project-search")

  projectSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()

    const filteredProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm) ||
        `${project.admin.firstName} ${project.admin.lastName}`.toLowerCase().includes(searchTerm) ||
        project.status.toLowerCase().includes(searchTerm),
    )

    populateProjectsTable(filteredProjects)
  })

  // Grant filter functionality
  const grantFilterItems = document.querySelectorAll("#grants-table + .dropdown-menu .dropdown-item")

  grantFilterItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const filterValue = this.dataset.filter

      const filteredGrants = filterValue ? grants.filter((grant) => grant.status === filterValue) : grants

      populateGrantsTable(filteredGrants)
    })
  })

  // Project filter functionality
  const projectFilterItems = document.querySelectorAll("#projects-table + .dropdown-menu .dropdown-item")

  projectFilterItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const filterValue = this.dataset.filter

      const filteredProjects = filterValue ? projects.filter((project) => project.status === filterValue) : projects

      populateProjectsTable(filteredProjects)
    })
  })

  // Calendar functionality
  const calendarBody = document.getElementById("calendar-body")
  const calendarMonthYear = document.getElementById("calendar-month-year")
  const prevMonthBtn = document.getElementById("prev-month")
  const nextMonthBtn = document.getElementById("next-month")
  const todayBtn = document.getElementById("today-btn")

  // Sample calendar events
  const calendarEvents = [
    {
      date: "2025-04-09",
      title: "Grant Review Meeting",
      type: "meeting",
    },
    {
      date: "2025-04-15",
      title: "Project Deadline",
      type: "deadline",
    },
    {
      date: "2025-04-22",
      title: "Faculty Workshop",
      type: "workshop",
    },
  ]

  const currentDate = new Date()
  let currentMonth = currentDate.getMonth()
  let currentYear = currentDate.getFullYear()

  function generateCalendar(month, year) {
    // Clear previous calendar
    calendarBody.innerHTML = ""

    // Update month and year display
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    calendarMonthYear.textContent = `${monthNames[month]} ${year}`

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Get days from previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    // Calculate total cells needed (max 6 rows of 7 days)
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7

    // Current date for highlighting today
    const today = new Date()
    const todayDate = today.getDate()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()

    // Generate calendar cells
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div")
      cell.className = "calendar-day"

      // Calculate date to display
      let dateNum
      let dateMonth = month
      let dateYear = year
      let isOtherMonth = false

      if (i < firstDay) {
        // Previous month
        dateNum = daysInPrevMonth - (firstDay - i - 1)
        dateMonth = month - 1
        if (dateMonth < 0) {
          dateMonth = 11
          dateYear = year - 1
        }
        isOtherMonth = true
      } else if (i >= firstDay + daysInMonth) {
        // Next month
        dateNum = i - (firstDay + daysInMonth) + 1
        dateMonth = month + 1
        if (dateMonth > 11) {
          dateMonth = 0
          dateYear = year + 1
        }
        isOtherMonth = true
      } else {
        // Current month
        dateNum = i - firstDay + 1
      }

      // Create date element
      const dateElement = document.createElement("div")
      dateElement.textContent = dateNum
      dateElement.className = isOtherMonth ? "calendar-date other-month" : "calendar-date"

      // Highlight today
      if (dateNum === todayDate && dateMonth === todayMonth && dateYear === todayYear) {
        dateElement.className = "calendar-date today"
      }

      cell.appendChild(dateElement)

      // Add events for this date
      const dateString = `${dateYear}-${(dateMonth + 1).toString().padStart(2, "0")}-${dateNum.toString().padStart(2, "0")}`
      const eventsForDate = calendarEvents.filter((event) => event.date === dateString)

      eventsForDate.forEach((event) => {
        const eventElement = document.createElement("div")
        eventElement.className = "calendar-event"
        eventElement.textContent = event.title
        cell.appendChild(eventElement)
      })

      calendarBody.appendChild(cell)
    }
  }

  // Initialize calendar
  generateCalendar(currentMonth, currentYear)

  // Previous month button
  prevMonthBtn.addEventListener("click", () => {
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
    generateCalendar(currentMonth, currentYear)
  })

  // Next month button
  nextMonthBtn.addEventListener("click", () => {
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
    generateCalendar(currentMonth, currentYear)
  })

  // Today button
  todayBtn.addEventListener("click", () => {
    const today = new Date()
    currentMonth = today.getMonth()
    currentYear = today.getFullYear()
    generateCalendar(currentMonth, currentYear)
  })
})
