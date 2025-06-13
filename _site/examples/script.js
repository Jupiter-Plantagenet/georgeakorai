"use client"

// DOM Elements
const navbar = document.getElementById("navbar")
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const portfolioGrid = document.getElementById("portfolio-grid")
const filterBtns = document.querySelectorAll(".filter-btn")
const blogGrid = document.getElementById("blog-grid")
const blogSearch = document.getElementById("blog-search")
const categoryFilter = document.getElementById("category-filter")
const blogModal = document.getElementById("blog-modal")
const blogPostContent = document.getElementById("blog-post-content")
const commentsList = document.getElementById("comments-list")
const contactForm = document.getElementById("contact-form")

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    content: `
            <h2>Getting Started with React Hooks</h2>
            <p>React Hooks revolutionized the way we write React components by allowing us to use state and other React features in functional components.</p>
            <h3>What are React Hooks?</h3>
            <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.</p>
            <h3>The useState Hook</h3>
            <p>The useState Hook lets you add state to functional components:</p>
            <pre><code>
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
            </code></pre>
            <h3>The useEffect Hook</h3>
            <p>The useEffect Hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.</p>
            <p>This is just the beginning of what you can do with React Hooks. They provide a more direct API to the React concepts you already know.</p>
        `,
    category: "react",
    date: "2024-01-15",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["react", "hooks", "javascript"],
  },
  {
    id: 2,
    title: "Modern CSS Grid Layouts",
    excerpt: "Discover the power of CSS Grid and how to create complex layouts with ease.",
    content: `
            <h2>Modern CSS Grid Layouts</h2>
            <p>CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.</p>
            <h3>Basic Grid Setup</h3>
            <p>To create a grid container, you simply set display: grid on an element:</p>
            <pre><code>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 20px;
}
            </code></pre>
            <h3>Grid Areas</h3>
            <p>You can name grid areas and place items into them:</p>
            <pre><code>
.container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
            </code></pre>
            <p>CSS Grid is incredibly powerful and flexible, making it perfect for modern web layouts.</p>
        `,
    category: "css",
    date: "2024-01-10",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["css", "grid", "layout"],
  },
  {
    id: 3,
    title: "Node.js Best Practices",
    excerpt: "Essential best practices for building scalable Node.js applications.",
    content: `
            <h2>Node.js Best Practices</h2>
            <p>Building scalable and maintainable Node.js applications requires following certain best practices. Here are some essential guidelines.</p>
            <h3>Project Structure</h3>
            <p>Organize your project with a clear structure:</p>
            <pre><code>
project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── tests/
├── config/
└── package.json
            </code></pre>
            <h3>Error Handling</h3>
            <p>Always handle errors properly:</p>
            <pre><code>
// Use try-catch for async/await
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  console.error('Error:', error);
  throw error;
}

// Use proper error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
            </code></pre>
            <h3>Environment Variables</h3>
            <p>Use environment variables for configuration:</p>
            <pre><code>
const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
};
            </code></pre>
            <p>Following these practices will help you build robust Node.js applications that are easy to maintain and scale.</p>
        `,
    category: "nodejs",
    date: "2024-01-05",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["nodejs", "backend", "best-practices"],
  },
  {
    id: 4,
    title: "JavaScript ES6+ Features",
    excerpt: "Explore the latest JavaScript features that will improve your code quality.",
    content: `
            <h2>JavaScript ES6+ Features</h2>
            <p>Modern JavaScript has introduced many powerful features that make code more readable, maintainable, and efficient.</p>
            <h3>Arrow Functions</h3>
            <p>Arrow functions provide a more concise syntax:</p>
            <pre><code>
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
            </code></pre>
            <h3>Destructuring</h3>
            <p>Extract values from arrays and objects:</p>
            <pre><code>
// Array destructuring
const [first, second] = [1, 2, 3];

// Object destructuring
const { name, age } = { name: 'John', age: 30, city: 'NYC' };
            </code></pre>
            <h3>Template Literals</h3>
            <p>Create strings with embedded expressions:</p>
            <pre><code>
const name = 'World';
const greeting = \`Hello, \${name}!\`;
            </code></pre>
            <p>These features make JavaScript more powerful and enjoyable to work with.</p>
        `,
    category: "javascript",
    date: "2024-01-01",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["javascript", "es6", "modern-js"],
  },
]

// Comments storage (in real app, this would be in a database)
let comments = {}

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializePortfolioFilters()
  initializeBlog()
  initializeContactForm()
  initializeScrollEffects()
  initializeComments()
})

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      // Close mobile menu after clicking
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")

      // Update active link
      updateActiveNavLink(this)
    })
  })

  // Update navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update active navigation link based on scroll position
    updateActiveNavOnScroll()
  })
}

function updateActiveNavLink(activeLink) {
  navLinks.forEach((link) => link.classList.remove("active"))
  activeLink.classList.add("active")
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Portfolio filtering functionality
function initializePortfolioFilters() {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active filter button
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // Filter portfolio items
      const portfolioItems = document.querySelectorAll(".portfolio-item")
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          item.style.animation = "fadeInUp 0.6s ease forwards"
        } else {
          item.style.display = "none"
        }
      })
    })
  })
}

// Blog functionality
function initializeBlog() {
  renderBlogPosts(blogPosts)

  // Search functionality
  blogSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const filteredPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
    renderBlogPosts(filteredPosts)
  })

  // Category filter
  categoryFilter.addEventListener("change", function () {
    const selectedCategory = this.value
    const filteredPosts =
      selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)
    renderBlogPosts(filteredPosts)
  })

  // Modal functionality
  const closeModal = document.querySelector(".close")
  closeModal.addEventListener("click", () => {
    blogModal.style.display = "none"
  })

  window.addEventListener("click", (e) => {
    if (e.target === blogModal) {
      blogModal.style.display = "none"
    }
  })
}

function renderBlogPosts(posts) {
  blogGrid.innerHTML = ""

  posts.forEach((post) => {
    const blogCard = document.createElement("div")
    blogCard.className = "blog-card"
    blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
            </div>
        `

    blogCard.addEventListener("click", () => {
      openBlogPost(post)
    })

    blogGrid.appendChild(blogCard)
  })
}

function openBlogPost(post) {
  blogPostContent.innerHTML = post.content
  blogModal.style.display = "block"
  loadComments(post.id)

  // Setup comment form for this post
  const submitBtn = document.getElementById("submit-comment")
  submitBtn.onclick = () => {
    submitComment(post.id)
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Comments functionality
function initializeComments() {
  // Load comments from localStorage
  const savedComments = localStorage.getItem("blogComments")
  if (savedComments) {
    comments = JSON.parse(savedComments)
  }
}

function loadComments(postId) {
  const postComments = comments[postId] || []
  commentsList.innerHTML = ""

  postComments.forEach((comment) => {
    const commentElement = document.createElement("div")
    commentElement.className = "comment"
    commentElement.innerHTML = `
            <div class="comment-author">${comment.name}</div>
            <div class="comment-date">${formatDate(comment.date)}</div>
            <div class="comment-text">${comment.text}</div>
        `
    commentsList.appendChild(commentElement)
  })
}

function submitComment(postId) {
  const nameInput = document.getElementById("comment-name")
  const textInput = document.getElementById("comment-text")

  const name = nameInput.value.trim()
  const text = textInput.value.trim()

  if (!name || !text) {
    alert("Please fill in both name and comment fields.")
    return
  }

  const comment = {
    name: name,
    text: text,
    date: new Date().toISOString().split("T")[0],
  }

  if (!comments[postId]) {
    comments[postId] = []
  }

  comments[postId].push(comment)

  // Save to localStorage
  localStorage.setItem("blogComments", JSON.stringify(comments))

  // Clear form
  nameInput.value = ""
  textInput.value = ""

  // Reload comments
  loadComments(postId)
}

// Contact form functionality
function initializeContactForm() {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`)
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Scroll effects and animations
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".skill-category, .timeline-item, .portfolio-item, .blog-card, .stat",
  )
  animateElements.forEach((el) => observer.observe(el))
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimizations
window.addEventListener("load", () => {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close modal with Escape key
  if (e.key === "Escape" && blogModal.style.display === "block") {
    blogModal.style.display = "none"
  }
})

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}
