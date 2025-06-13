document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.querySelector('.contact-form form');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // --- Navigation ---
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname;
            // Resolve the link's URL to compare pathnames accurately
            const linkUrl = new URL(href, window.location.origin);

            // Check if it's an anchor link for the current page
            if (linkUrl.pathname === currentPath && href.includes('#')) {
                e.preventDefault();
                const targetId = href.substring(href.lastIndexOf('#'));
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            } else if (href.startsWith('#')) { // Simple anchor like '#about' on the current page
                 e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
            // For links to other pages (e.g., 'index.html#about' from 'blog.html'),
            // or links without a hash, do not call e.preventDefault().
            // The browser will navigate, and the 'load' event listener handles scrolling for hashes.
        });
    });

    // Handle scrolling to hash on page load
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const targetId = window.location.hash;
            const navbar = document.querySelector('.navbar');
            if (!navbar) return; // Navbar might not exist on all pages or at all times
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }, 100); // Timeout for layout stability
            }
        }
    });
    
    // Update navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + navbar.offsetHeight;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- Portfolio Filtering ---
    if (filterBtns.length > 0 && portfolioGrid) {
        const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Contact Form ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const statusDiv = document.getElementById('form-status');
if (statusDiv) statusDiv.textContent = '';

const formData = new FormData(this);
const xhr = new XMLHttpRequest();
xhr.open(this.method, this.action);
xhr.setRequestHeader('Accept', 'application/json');
submitBtn.disabled = true;

xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    if (xhr.status === 200) {
        if (statusDiv) {
            statusDiv.textContent = 'Thanks! I will get back to you shortly.';
            statusDiv.style.color = '#38a169'; // green
        }
        this.reset();
    } else {
        if (statusDiv) {
            statusDiv.textContent = 'Ouch! my apologies, there seems to be some issue. Please try my email address or linkedin and I will get back to you shortly.';
            statusDiv.style.color = '#e53e3e'; // red
        }
    }
};
xhr.send(formData);
        });
    }

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.hero-content, .hero-image, .about-text, .about-stats, .skill-category, .portfolio-item, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
