// ========================================
// YLP Website - Main JavaScript
// ========================================

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initLoader(); // Added
    initMobileMenu();
    initScrollAnimations();
    initScrollTop(); // Added
    initVideoPlayer();
    setupNewsletter();
});

// Loading Spinner
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

// Scroll to Top Button
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    observeElements();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Intersection Observer for fade-in animations
function observeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Video Player Functionality
function initVideoPlayer() {
    const playButton = document.querySelector('.video-play-btn');
    const videoContainer = document.querySelector('.hero-video');

    if (playButton && videoContainer) {
        playButton.addEventListener('click', () => {
            // Replace placeholder with actual video
            const video = document.createElement('video');
            video.src = 'path-to-video.mp4';
            video.controls = true;
            video.autoplay = true;
            video.style.cssText = 'width: 100%; height: 100%; border-radius: var(--radius-2xl); object-fit: cover;';

            videoContainer.innerHTML = '';
            videoContainer.appendChild(video);
        });
    }
}

// Smooth scroll to section (for anchor links)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form validation helper (for future use)
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Program tabs functionality (for summer programs page)
document.addEventListener('DOMContentLoaded', () => {
    const programTabs = document.querySelectorAll('.program-tab');

    programTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            programTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');
        });
    });
});

// Newsletter Functionality
function setupNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const submitBtn = document.getElementById('newsletter-submit');

    // IMPORTANT: Replace this URL with your actual Google Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwrSKg2MD783ORlDX7Bai2xlWygMvaOyGs3sHqaIEHyZrXUg1t-vFtZYJQmaJELC6cG/exec';

    if (submitBtn && emailInput) {
        submitBtn.addEventListener('click', () => {
            const email = emailInput.value;

            if (!validateEmail(email)) {
                alert('الرجاء إدخال بريد إلكتروني صحيح');
                return;
            }

            // Placeholder check removed

            // Show loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div style="width: 18px; height: 18px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
            submitBtn.disabled = true;

            // Send data to Google Sheet
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
                .then(response => {
                    // Since mode is no-cors, we can't check response.ok or response.json()
                    // We assume if fetch completes, it worked (or reached the script)
                    alert('شكراً لاشتراكك في النشرة البريدية!');
                    emailInput.value = '';
                    submitBtn.innerHTML = '<i data-lucide="check" style="width: 18px; height: 18px; color: white;"></i>';

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                        lucide.createIcons(); // Re-initialize icons if using lucide
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('حدث خطأ أثناء الاشتراك. الرجاء المحاولة مرة أخرى.');
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                });
        });
    }

    // Add CSS for spinner if not exists
    if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}
