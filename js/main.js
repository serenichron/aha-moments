/**
 * Aha Moments with Liana - Main JavaScript
 * Handles navigation, smooth scrolling, form submission, and UI interactions
 */

(function() {
    'use strict';

    // =====================================================
    // DOM Elements
    // =====================================================
    const navbar = document.getElementById('mainNav');
    const backToTopBtn = document.getElementById('backToTop');
    const signupForm = document.getElementById('signupForm');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // =====================================================
    // Navigation - Scroll Effect
    // =====================================================
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // =====================================================
    // Back to Top Button
    // =====================================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // =====================================================
    // Smooth Scroll for Anchor Links
    // =====================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                // Skip if it's just "#" or empty
                if (targetId === '#' || !targetId) return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Calculate offset for fixed navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }

    // =====================================================
    // Close Mobile Nav on Link Click
    // =====================================================
    function initMobileNavClose() {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // =====================================================
    // Form Submission Handler
    // =====================================================
    function initFormHandler() {
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const firstName = document.getElementById('firstName').value.trim();
                const email = document.getElementById('email').value.trim();

                // Basic validation
                if (!firstName || !email) {
                    showFormMessage('Please fill in all fields.', 'error');
                    return;
                }

                if (!isValidEmail(email)) {
                    showFormMessage('Please enter a valid email address.', 'error');
                    return;
                }

                // Simulate form submission (replace with actual form handling)
                showFormMessage('Thank you, ' + firstName + '! Check your email for next steps.', 'success');
                signupForm.reset();

                // Here you would typically send data to your backend or email service
                // Example: sendToMailchimp({ firstName, email });
            });
        }
    }

    // =====================================================
    // Email Validation
    // =====================================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // =====================================================
    // Form Message Display
    // =====================================================
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message-' + type;
        messageEl.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + message;

        // Style the message
        messageEl.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
            ${type === 'success'
                ? 'background-color: rgba(124, 154, 146, 0.1); color: #5a7a72; border: 1px solid rgba(124, 154, 146, 0.3);'
                : 'background-color: rgba(201, 124, 124, 0.1); color: #c97c7c; border: 1px solid rgba(201, 124, 124, 0.3);'}
        `;

        // Insert after form
        signupForm.insertAdjacentElement('afterend', messageEl);

        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageEl.style.opacity = '0';
                messageEl.style.transition = 'opacity 0.3s ease';
                setTimeout(() => messageEl.remove(), 300);
            }, 5000);
        }
    }

    // =====================================================
    // Intersection Observer for Animations
    // =====================================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.process-card, .clarity-card, .testimonial-card, .category-item'
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // =====================================================
    // Active Nav Link Highlight on Scroll
    // =====================================================
    function initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');

        function highlightNav() {
            const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightNav);
    }

    // =====================================================
    // Parallax Effect for Hero Section
    // =====================================================
    function initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const decorationCircles = document.querySelectorAll('.decoration-circle');

        if (heroSection && decorationCircles.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;

                decorationCircles.forEach((circle, index) => {
                    const speed = (index + 1) * 0.1;
                    circle.style.transform = `translateY(${rate * speed}px)`;
                });
            });
        }
    }

    // =====================================================
    // Floating Cards Animation Enhancement
    // =====================================================
    function initFloatingCards() {
        const floatingCards = document.querySelectorAll('.floating-card');

        floatingCards.forEach((card, index) => {
            // Add slight random delay variation
            card.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // =====================================================
    // Add CSS for fadeIn animation
    // =====================================================
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .nav-link.active {
                color: var(--primary) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // =====================================================
    // Throttle Function for Performance
    // =====================================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // =====================================================
    // Initialize Everything
    // =====================================================
    function init() {
        // Add animation styles
        addAnimationStyles();

        // Scroll event handlers with throttling for performance
        const throttledScrollHandler = throttle(() => {
            handleNavbarScroll();
            handleBackToTop();
        }, 100);

        window.addEventListener('scroll', throttledScrollHandler);

        // Initial check for scroll position
        handleNavbarScroll();
        handleBackToTop();

        // Initialize all features
        initSmoothScroll();
        initMobileNavClose();
        initFormHandler();
        initScrollAnimations();
        initActiveNavHighlight();
        initParallax();
        initFloatingCards();

        // Log initialization
        console.log('Aha Moments - Website initialized successfully');
    }

    // =====================================================
    // Run on DOM Ready
    // =====================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
