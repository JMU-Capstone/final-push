document.addEventListener("DOMContentLoaded", () => {
  // Sample conversations data
  const conversations = [
    {
      id: "conv1",
      contact: {
        id: "contact1",
        name: "Dr. Sarah Johnson",
        title: "Education Department Chair",
        avatar: null,
      },
      lastMessage: "I've reviewed the grant proposal and have some feedback.",
      lastMessageTime: "2023-07-15T14:30:00Z",
      unreadCount: 2,
      messages: [
        {
          id: "msg1",
          content: "Hi Sarah, have you had a chance to review the Early Childhood Education Research grant proposal?",
          sender: "me",
          timestamp: "2023-07-15T10:15:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg2",
          content: "Yes, I've been going through it this morning. There are some interesting approaches proposed.",
          sender: "contact1",
          timestamp: "2023-07-15T10:30:00Z",
          type: "text",
        },
        {
          id: "msg3",
          content: "Great! Any initial thoughts or concerns?",
          sender: "me",
          timestamp: "2023-07-15T10:35:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg4",
          content:
            "I think the methodology section needs more detail, especially regarding the assessment tools we plan to use.",
          sender: "contact1",
          timestamp: "2023-07-15T10:45:00Z",
          type: "text",
        },
        {
          id: "msg5",
          content: "Here's a snapshot of the budget breakdown I've prepared:",
          sender: "me",
          timestamp: "2023-07-15T11:00:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg6",
          content: "This looks comprehensive. I'll need to check if we can allocate that much for equipment though.",
          sender: "contact1",
          timestamp: "2023-07-15T11:15:00Z",
          type: "text",
        },
        {
          id: "msg7",
          content: "I understand. Let me know if we need to make adjustments.",
          sender: "me",
          timestamp: "2023-07-15T11:20:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg8",
          content:
            "I've reviewed the grant proposal and have some feedback. Can we schedule a meeting tomorrow to discuss?",
          sender: "contact1",
          timestamp: "2023-07-15T14:30:00Z",
          type: "text",
        },
      ],
    },
    {
      id: "conv2",
      contact: {
        id: "contact2",
        name: "Dr. Michael Chen",
        title: "Psychology Professor",
        avatar: null,
      },
      lastMessage: "The research team is ready to begin data collection next week.",
      lastMessageTime: "2023-07-14T16:45:00Z",
      messages: [
        {
          id: "msg1",
          content: "Hello Michael, how is the preparation for the Technology Integration project coming along?",
          sender: "me",
          timestamp: "2023-07-14T09:00:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg2",
          content: "Hi there! We're making good progress. The research team has finalized the interview questions.",
          sender: "contact2",
          timestamp: "2023-07-14T09:15:00Z",
          type: "text",
        },
        {
          id: "msg3",
          content:
            "That's great to hear. Have you coordinated with the special education department for participant recruitment?",
          sender: "me",
          timestamp: "2023-07-14T09:30:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg4",
          content: "Yes, Dr. Kim has been very helpful. We've already identified 15 potential participants.",
          sender: "contact2",
          timestamp: "2023-07-14T10:00:00Z",
          type: "text",
        },
        {
          id: "msg5",
          content: "This looks like a good distribution. When do you plan to start data collection?",
          sender: "me",
          timestamp: "2023-07-14T10:20:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg6",
          content: "The research team is ready to begin data collection next week.",
          sender: "contact2",
          timestamp: "2023-07-14T16:45:00Z",
          type: "text",
        },
      ],
    },
    {
      id: "conv3",
      contact: {
        id: "contact3",
        name: "Dr. Emily Rodriguez",
        title: "Early Childhood Development Specialist",
        avatar: null,
      },
      lastMessage: "I'll send you the updated curriculum framework by Friday.",
      lastMessageTime: "2023-07-13T13:20:00Z",
      messages: [
        {
          id: "msg1",
          content: "Hi Emily, I wanted to follow up on the curriculum development for the Community Literacy Program.",
          sender: "me",
          timestamp: "2023-07-13T11:00:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg2",
          content: "Hello! I've been working on it this week. The first draft is almost complete.",
          sender: "contact3",
          timestamp: "2023-07-13T11:15:00Z",
          type: "text",
        },
        {
          id: "msg3",
          content: "That's excellent news. The Department of Education has been asking for updates.",
          sender: "me",
          timestamp: "2023-07-13T11:30:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg4",
          content: "I understand. I'm incorporating their latest guidelines on early literacy development.",
          sender: "contact3",
          timestamp: "2023-07-13T11:45:00Z",
          type: "text",
        },
        {
          id: "msg5",
          content: "Perfect. When do you think you'll have something we can share with them?",
          sender: "me",
          timestamp: "2023-07-13T12:00:00Z",
          status: "read",
          type: "text",
        },
        {
          id: "msg6",
          content: "I'll send you the updated curriculum framework by Friday.",
          sender: "contact3",
          timestamp: "2023-07-13T13:20:00Z",
          type: "text",
        },
      ],
    },
  ]

  let activeConversation = null

  // Format relative time (e.g., "2 hours ago", "Yesterday", etc.)
  function formatRelativeTime(date) {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    // Less than a minute
    if (diffInSeconds < 60) {
      return "Just now"
    }

    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes}m ago`
    }

    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours}h ago`
    }

    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      if (days === 1) return "Yesterday"
      return `${days}d ago`
    }

    // Format as date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Format message time (e.g., "10:30 AM")
  function formatMessageTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get initials from name
  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  // Group messages by date
  function groupMessagesByDate(messages) {
    const groupedMessages = {}

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })

      if (!groupedMessages[date]) {
        groupedMessages[date] = []
      }

      groupedMessages[date].push(message)
    })

    return groupedMessages
  }

  // Populate conversations list
  function populateConversationsList() {
    const conversationsList = document.getElementById("conversations-list")
    conversationsList.innerHTML = ""

    if (conversations.length === 0) {
      conversationsList.innerHTML = `
        <div class="conversation-empty">
          <p>No conversations found</p>
        </div>
      `
      return
    }

    conversations.forEach((conversation) => {
      const div = document.createElement("div")
      div.className = `conversation-item ${activeConversation && activeConversation.id === conversation.id ? "active" : ""}`
      div.dataset.id = conversation.id

      const lastMessageDate = new Date(conversation.lastMessageTime)

      div.innerHTML = `
        <div class="conversation-content">
          <div class="avatar avatar-md">${getInitials(conversation.contact.name)}</div>
          <div class="conversation-info">
            <div class="conversation-header">
              <span class="conversation-name">${conversation.contact.name}</span>
              <span class="conversation-time">${formatRelativeTime(lastMessageDate)}</span>
            </div>
            <p class="conversation-last-message">${conversation.lastMessage}</p>
          </div>
        </div>
      `

      conversationsList.appendChild(div)

      // Add click event to conversation item
      div.addEventListener("click", function () {
        const conversationId = this.dataset.id
        const selectedConversation = conversations.find((conv) => conv.id === conversationId)

        if (selectedConversation) {
          setActiveConversation(selectedConversation)
        }
      })
    })
  }

  // Set active conversation and display messages
  function setActiveConversation(conversation) {
    activeConversation = conversation

    // Update UI
    document.querySelectorAll(".conversation-item").forEach((item) => {
      item.classList.remove("active")
      if (item.dataset.id === conversation.id) {
        item.classList.add("active")
      }
    })

    // Show chat container, hide empty state
    document.getElementById("empty-state").classList.add("hidden")
    document.getElementById("chat-container").classList.remove("hidden")

    // Update chat header
    document.getElementById("chat-avatar").textContent = getInitials(conversation.contact.name)
    document.getElementById("chat-name").textContent = conversation.contact.name
    document.getElementById("chat-title").textContent = conversation.contact.title

    // Display messages
    displayMessages(conversation.messages)
  }

  // Display messages
  function displayMessages(messages) {
    const chatMessages = document.getElementById("chat-messages")
    chatMessages.innerHTML = ""

    const groupedMessages = groupMessagesByDate(messages)

    Object.entries(groupedMessages).forEach(([date, dateMessages]) => {
      // Add date header
      const dateDiv = document.createElement("div")
      dateDiv.className = "message-date"
      dateDiv.innerHTML = `
        <span class="message-date-badge">${date}</span>
      `
      chatMessages.appendChild(dateDiv)

      // Add messages
      dateMessages.forEach((message, index) => {
        const prevMessage = index > 0 ? dateMessages[index - 1] : null
        const nextMessage = index < dateMessages.length - 1 ? dateMessages[index + 1] : null

        // Determine if this message is part of a sequence from the same sender
        const isSequenceStart = !prevMessage || prevMessage.sender !== message.sender
        const isSequenceEnd = !nextMessage || nextMessage.sender !== message.sender

        const messageDiv = document.createElement("div")
        messageDiv.className = "message-group"

        const isSentByMe = message.sender === "me"

        let messageContent = ""

        if (message.type === "text") {
          messageContent = `
            <div class="message ${isSentByMe ? "message-sent" : "message-received"}">
              ${
                !isSentByMe && isSequenceStart
                  ? `
                <div class="message-avatar avatar avatar-sm">${getInitials(conversation.contact.name)}</div>
              `
                  : ""
              }
              <div class="message-content">${message.content}</div>
            </div>
          `
        } else if (message.type === "image") {
          messageContent = `
            <div class="message ${isSentByMe ? "message-sent" : "message-received"}">
              ${
                !isSentByMe && isSequenceStart
                  ? `
                <div class="message-avatar avatar avatar-sm">${getInitials(conversation.contact.name)}</div>
              `
                  : ""
              }
              <div class="message-image">
                <img src="${message.content}" alt="Image message">
              </div>
            </div>
          `
        }

        // Add time and status for sequence end
        if (isSequenceEnd) {
          const messageDate = new Date(message.timestamp)
          messageContent += `
            <div class="message-time ${isSentByMe ? "message-time-sent" : "message-time-received"}">
              <span>${formatMessageTime(messageDate)}</span>
              ${
                isSentByMe && message.status
                  ? `
                <span class="message-status">
                  ${message.status === "sent" ? '<i class="fas fa-check"></i>' : ""}
                  ${message.status === "delivered" ? '<i class="fas fa-check-double"></i>' : ""}
                  ${message.status === "read" ? '<i class="fas fa-check-double" style="color: var(--primary);"></i>' : ""}
                </span>
              `
                  : ""
              }
            </div>
          `
        }

        messageDiv.innerHTML = messageContent
        chatMessages.appendChild(messageDiv)
      })
    })

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Send message
  function sendMessage(content) {
    if (!activeConversation || !content.trim()) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      sender: "me",
      timestamp: new Date().toISOString(),
      status: "sent",
      type: "text",
    }

    // Update the active conversation with the new message
    activeConversation.messages.push(newMessage)
    activeConversation.lastMessage = content
    activeConversation.lastMessageTime = new Date().toISOString()

    // Update UI
    displayMessages(activeConversation.messages)
    populateConversationsList()

    // Clear input
    document.getElementById("message-input").value = ""

    // Simulate a reply after a delay
    setTimeout(
      () => {
        if (Math.random() > 0.7) {
          simulateReply()
        }
      },
      1000 + Math.random() * 2000,
    )
  }

  // Simulate a reply from the contact
  function simulateReply() {
    const replies = [
      "That sounds great!",
      "I'll check and get back to you.",
      "Can we discuss this further in our next meeting?",
      "Thanks for the update.",
      "I've forwarded this to the team.",
      "Let me review the documents first.",
      "Perfect, I'll make the necessary arrangements.",
      "Could you provide more details?",
      "I'll need to consult with the department head first.",
      "This aligns with our objectives.",
    ]

    const randomReply = replies[Math.floor(Math.random() * replies.length)]

    const replyMessage = {
      id: `msg-${Date.now()}`,
      content: randomReply,
      sender: activeConversation.contact.id,
      timestamp: new Date().toISOString(),
      type: "text",
    }

    // Update the conversation with the reply
    activeConversation.messages.push(replyMessage)
    activeConversation.lastMessage = randomReply
    activeConversation.lastMessageTime = new Date().toISOString()

    // Update UI
    displayMessages(activeConversation.messages)
    populateConversationsList()
  }

  // Initialize
  populateConversationsList()

  // Set first conversation as active by default
  if (conversations.length > 0) {
    setActiveConversation(conversations[0])
  }

  // Message input functionality
  const messageInput = document.getElementById("message-input")
  const sendMessageBtn = document.getElementById("send-message-btn")

  // Auto-resize textarea
  messageInput.addEventListener("input", function () {
    this.style.height = "auto"
    this.style.height = this.scrollHeight + "px"

    // Toggle send button active state
    if (this.value.trim()) {
      sendMessageBtn.classList.add("active")
    } else {
      sendMessageBtn.classList.remove("active")
    }
  })

  // Send message on button click
  sendMessageBtn.addEventListener("click", () => {
    const content = messageInput.value
    sendMessage(content)

    // Reset textarea height
    messageInput.style.height = "auto"
    sendMessageBtn.classList.remove("active")
  })

  // Send message on Enter (without Shift)
  messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const content = this.value
      sendMessage(content)

      // Reset textarea height
      this.style.height = "auto"
      sendMessageBtn.classList.remove("active")
    }
  })

  // Search functionality
  const conversationSearch = document.getElementById("conversation-search")

  conversationSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()

    const filteredConversations = conversations.filter(
      (conversation) =>
        conversation.contact.name.toLowerCase().includes(searchTerm) ||
        conversation.lastMessage.toLowerCase().includes(searchTerm),
    )

    // Re-populate conversations list with filtered results
    const conversationsList = document.getElementById("conversations-list")
    conversationsList.innerHTML = ""

    if (filteredConversations.length === 0) {
      conversationsList.innerHTML = `
        <div class="conversation-empty">
          <p>No conversations found</p>
        </div>
      `
      return
    }

    filteredConversations.forEach((conversation) => {
      const div = document.createElement("div")
      div.className = `conversation-item ${activeConversation && activeConversation.id === conversation.id ? "active" : ""}`
      div.dataset.id = conversation.id

      const lastMessageDate = new Date(conversation.lastMessageTime)

      div.innerHTML = `
        <div class="conversation-content">
          <div class="avatar avatar-md">${getInitials(conversation.contact.name)}</div>
          <div class="conversation-info">
            <div class="conversation-header">
              <span class="conversation-name">${conversation.contact.name}</span>
              <span class="conversation-time">${formatRelativeTime(lastMessageDate)}</span>
            </div>
            <p class="conversation-last-message">${conversation.lastMessage}</p>
          </div>
        </div>
      `

      conversationsList.appendChild(div)

      // Add click event to conversation item
      div.addEventListener("click", function () {
        const conversationId = this.dataset.id
        const selectedConversation = conversations.find((conv) => conv.id === conversationId)

        if (selectedConversation) {
          setActiveConversation(selectedConversation)
        }
      })
    })
  })
})
