// ========================================
// YLP Website - Main JavaScript
// ========================================

// Page Navigation System
const pages = {
    home: 'home-page',
    bootcamp: 'bootcamp-page',
    about: 'about-page',
    summer: 'summer-page',
    aboutUs: 'about-us-page'
};

let currentPage = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initVideoPlayer();
    showPage('home');
});

// Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Show specific page
function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(pageId => {
        const pageElement = document.getElementById(pageId);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    // Show selected page
    const selectedPage = document.getElementById(pages[pageName]);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        currentPage = pageName;
    }

    // Trigger scroll animations for newly visible page
    setTimeout(() => {
        observeElements();
    }, 100);
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

// Video Player
function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');

    if (playButton) {
        playButton.addEventListener('click', () => {
            // Placeholder for video functionality
            alert('سيتم تشغيل الفيديو هنا\nVideo will play here');
            // In production, you would replace this with actual video player logic
            // For example: opening a modal with an embedded YouTube/Vimeo video
        });
    }
}

// Smooth scroll to section (utility function)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .bootcamp-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
