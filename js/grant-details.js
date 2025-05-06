document.addEventListener("DOMContentLoaded", () => {
  // Get grant ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const grantId = urlParams.get("id")

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
      faculty: ["Dr. Michael Chen", "Dr. Emily Rodriguez"],
      status: "Active",
      description:
        "This research project aims to investigate effective teaching methods in early childhood education, focusing on ages 3-5. The study will examine various pedagogical approaches and their impact on cognitive development.",
      objectives: [
        "Evaluate the effectiveness of play-based learning in cognitive development",
        "Assess the impact of technology integration in early childhood classrooms",
        "Develop best practice guidelines for educators working with young children",
      ],
      timeline: "July 2023 - June 2025",
      budget: {
        personnel: 75000,
        equipment: 20000,
        travel: 15000,
        materials: 10000,
        other: 5000,
      },
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
      faculty: ["Dr. Lisa Patel"],
      status: "Active",
      description:
        "This program aims to improve literacy rates in underserved communities through targeted interventions and community partnerships. The initiative will establish reading centers and provide resources to families.",
      objectives: [
        "Establish 5 community reading centers in underserved neighborhoods",
        "Provide literacy training to 200 families",
        "Distribute 1,000 age-appropriate books to children",
      ],
      timeline: "June 2023 - May 2024",
      budget: {
        personnel: 40000,
        facilities: 15000,
        books: 10000,
        training: 8000,
        other: 2000,
      },
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
      faculty: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
      status: "Pending",
      description:
        "This project explores innovative ways to integrate assistive technology in special education classrooms to enhance learning outcomes for students with diverse needs.",
      objectives: [
        "Develop customized assistive technology solutions for various learning disabilities",
        "Train 50 special education teachers on effective technology integration",
        "Measure the impact of technology interventions on student achievement",
      ],
      timeline: "Pending Approval",
      budget: {
        personnel: 100000,
        technology: 60000,
        training: 25000,
        research: 10000,
        other: 5000,
      },
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
      faculty: ["Dr. Emily Rodriguez"],
      status: "Completed",
      description:
        "This initiative provided comprehensive professional development opportunities for K-12 educators, focusing on innovative teaching strategies and classroom management techniques.",
      objectives: [
        "Conduct 10 professional development workshops for 200 educators",
        "Develop online resources for continuous learning",
        "Establish mentorship programs for new teachers",
      ],
      timeline: "April 2023 - December 2023",
      budget: {
        workshops: 25000,
        materials: 10000,
        online_platform: 8000,
        mentorship: 5000,
        other: 2000,
      },
    },
  ]

  // Sample faculty list for adding collaborators
  const availableFaculty = [
    { id: "F001", name: "Dr. Sarah Johnson", department: "Education" },
    { id: "F002", name: "Dr. Michael Chen", department: "Psychology" },
    { id: "F003", name: "Dr. Emily Rodriguez", department: "Early Childhood Development" },
    { id: "F004", name: "Dr. David Kim", department: "Special Education" },
    { id: "F005", name: "Dr. Lisa Patel", department: "Educational Psychology" },
    { id: "F006", name: "Dr. James Wilson", department: "Research Methods" },
    { id: "F007", name: "Dr. Maria Garcia", department: "Curriculum Development" },
    { id: "F008", name: "Dr. Robert Lee", department: "Educational Technology" },
    { id: "F009", name: "Dr. Jennifer Taylor", department: "Child Psychology" },
    { id: "F010", name: "Dr. Thomas Brown", department: "Educational Leadership" },
  ]

  // Find the grant by ID
  const grant = grants.find((g) => g.id === grantId)

  // If grant not found, show error and return
  if (!grant) {
    document.querySelector(".grant-details-container").innerHTML = `
      <div class="card">
        <div class="card-content">
          <div class="text-center py-12">
            <h2 class="text-xl font-medium mb-2">Grant Not Found</h2>
            <p class="text-muted">The grant you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    `
    return
  }

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
      default:
        return ""
    }
  }

  // Get initials from name
  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  // Populate grant details
  document.getElementById("grant-title").textContent = grant.title
  document.getElementById("grant-category").textContent = grant.category

  const statusBadge = document.getElementById("grant-status-badge")
  statusBadge.textContent = grant.status
  statusBadge.className = `badge ${getStatusBadgeClass(grant.status)}`

  document.getElementById("grant-description").textContent = grant.description
  document.getElementById("grant-timeline").textContent = grant.timeline
  document.getElementById("grant-amount").textContent = formatCurrency(grant.awardAmount)
  document.getElementById("grant-submission-date").textContent = formatDate(grant.submissionDate)
  document.getElementById("grant-award-date").textContent = formatDate(grant.awardDate)

  // Populate objectives
  const objectivesList = document.getElementById("grant-objectives")
  grant.objectives.forEach((objective) => {
    const li = document.createElement("li")
    li.className = "objective-item"
    li.innerHTML = `
      <i class="fas fa-bullseye text-muted"></i>
      <span class="text-muted">${objective}</span>
    `
    objectivesList.appendChild(li)
  })

  // Populate budget
  const budgetTableBody = document.querySelector("#budget-table tbody")
  let budgetTotal = 0

  Object.entries(grant.budget).forEach(([category, amount]) => {
    budgetTotal += amount

    const row = document.createElement("tr")
    row.innerHTML = `
      <td class="capitalize">${category.replace("_", " ")}</td>
      <td class="text-right">${formatCurrency(amount)}</td>
    `
    budgetTableBody.appendChild(row)
  })

  document.getElementById("budget-total").textContent = formatCurrency(budgetTotal)

  // Populate project lead
  const projectLeadAvatar = document.getElementById("project-lead-avatar")
  projectLeadAvatar.textContent = getInitials(grant.projectLead)
  projectLeadAvatar.classList.add("bg-primary-light", "text-primary")

  document.getElementById("project-lead-name").textContent = grant.projectLead

  // Populate collaborators
  let collaborators = [...grant.faculty]
  const collaboratorsList = document.getElementById("collaborators-list")

  function updateCollaboratorsList() {
    collaboratorsList.innerHTML = ""

    if (collaborators.length === 0) {
      collaboratorsList.innerHTML = `
        <p class="empty-collaborators">No collaborators added yet</p>
      `
      return
    }

    collaborators.forEach((faculty) => {
      const div = document.createElement("div")
      div.className = "collaborator-item"
      div.innerHTML = `
        <div class="collaborator-info">
          <div class="avatar avatar-sm">${getInitials(faculty)}</div>
          <span>${faculty}</span>
        </div>
        <button class="btn btn-ghost btn-sm remove-collaborator" data-faculty="${faculty}">
          Remove
        </button>
      `
      collaboratorsList.appendChild(div)
    })

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-collaborator").forEach((btn) => {
      btn.addEventListener("click", function () {
        const faculty = this.dataset.faculty
        collaborators = collaborators.filter((f) => f !== faculty)
        updateCollaboratorsList()
      })
    })
  }

  updateCollaboratorsList()

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Back button functionality
  document.querySelector(".back-btn").addEventListener("click", () => {
    window.history.back()
  })

  // Add collaborator modal
  const addCollaboratorBtn = document.getElementById("add-collaborator-btn")
  const addCollaboratorModal = document.getElementById("add-collaborator-modal")
  const modalClose = document.querySelector(".modal-close")
  const facultySelect = document.getElementById("faculty-select")
  const addCollaboratorSubmit = document.getElementById("add-collaborator-submit")

  // Populate faculty select
  availableFaculty
    .filter((faculty) => !collaborators.includes(faculty.name))
    .forEach((faculty) => {
      const option = document.createElement("option")
      option.value = faculty.name
      option.textContent = `${faculty.name} - ${faculty.department}`
      facultySelect.appendChild(option)
    })

  // Open modal
  addCollaboratorBtn.addEventListener("click", () => {
    addCollaboratorModal.classList.add("active")
  })

  // Close modal
  modalClose.addEventListener("click", () => {
    addCollaboratorModal.classList.remove("active")
  })

  // Close modal when clicking outside
  addCollaboratorModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active")
    }
  })

  // Add collaborator
  addCollaboratorSubmit.addEventListener("click", () => {
    const selectedFaculty = facultySelect.value

    if (selectedFaculty && !collaborators.includes(selectedFaculty)) {
      collaborators.push(selectedFaculty)
      updateCollaboratorsList()

      // Reset and close modal
      facultySelect.value = ""
      addCollaboratorModal.classList.remove("active")
    }
  })
})
