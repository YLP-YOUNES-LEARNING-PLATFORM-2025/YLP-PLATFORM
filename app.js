// ========================================
// YLP Website - Main JavaScript
// ========================================

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initVideoPlayer();
});

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
