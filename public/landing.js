/**
 * KSK VASU & Co - Landing Page Logic
 * Features: Mobile Menu, Sticky Header, Smart Sticky CTA, Scroll Animations, New Year Celebration, Loader
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReset(); // Force scroll to top on load
    initLoadingScreen();
    initMobileMenu();
    initStickyHeader();
    initStickyCTA();
    initScrollAnimations();
    initMarquee();
    initNewYearCelebration(); // Only active Jan 1-7
});

// =========================================
// -1. SCROLL RESET (Fix Refresh Issue)
// =========================================
function initScrollReset() {
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Force scroll to top
    window.scrollTo(0, 0);

    // Clear hash from URL without reload
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
}

// =========================================
// 0. LOADING SCREEN
// =========================================
function initLoadingScreen() {
    window.addEventListener('load', function () {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Minimum 1.5s display for animation to complete
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1500);
        }
    });
}

// =========================================
// 1. MOBILE MENU TOGGLE
// =========================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    body.appendChild(backdrop);

    if (!toggle || !navLinks) return;

    function toggleMenu() {
        navLinks.classList.toggle('active');
        backdrop.classList.toggle('active');
        // Prevent background scrolling when menu is open
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    toggle.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMenu();
        });
    });
}

// =========================================
// 2. STICKY HEADER EFFECT
// =========================================
function initStickyHeader() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// =========================================
// 3. SMART STICKY CTA (Button in Header)
// =========================================
function initStickyCTA() {
    const heroCTA = document.getElementById('hero-cta');
    const nav = document.querySelector('.nav');
    const floatingCTA = document.getElementById('floating-cta-container');

    if (!heroCTA || !nav) return;

    // Hide the floating CTA - we'll use header button instead
    if (floatingCTA) {
        floatingCTA.style.display = 'none';
    }

    // Create the header button (Desktop only - inside nav)
    const headerBtn = document.createElement('a');
    headerBtn.href = 'https://order.kskvasu.co.in';
    headerBtn.target = '_blank';
    headerBtn.className = 'btn header-cta-btn desktop-only';
    headerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>Book Your Order';
    headerBtn.style.display = 'none';
    nav.appendChild(headerBtn);

    // Create the sticky mobile button (Mobile only - inside body)
    const mobileBtn = document.createElement('a');
    mobileBtn.href = 'https://order.kskvasu.co.in';
    mobileBtn.target = '_blank';
    mobileBtn.className = 'btn mobile-sticky-btn'; // New class
    mobileBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>Book Your Order';
    mobileBtn.style.display = 'none';
    document.body.appendChild(mobileBtn);

    let ticking = false;

    function updateButtonVisibility() {
        const heroRect = heroCTA.getBoundingClientRect();
        const heroScrolledPast = heroRect.bottom < 0;
        const isMobile = window.innerWidth <= 768;

        if (heroScrolledPast) {
            if (isMobile) {
                // Mobile: Show floating bottom button, hide header button
                headerBtn.style.display = 'none';
                mobileBtn.style.display = 'flex';
                mobileBtn.classList.add('visible');
            } else {
                // Desktop: Show header button, hide mobile button
                headerBtn.style.display = 'inline-flex';
                mobileBtn.style.display = 'none';
                mobileBtn.classList.remove('visible');
            }
        } else {
            // Hero visible: Hide both
            headerBtn.style.display = 'none';
            mobileBtn.style.display = 'none';
            mobileBtn.classList.remove('visible');
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateButtonVisibility);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateButtonVisibility); // Check on resize

    // Initial check
    updateButtonVisibility();
}

// =========================================
// 4. SCROLL ANIMATIONS (Fade In)
// =========================================
function initScrollAnimations() {
    const fadeElems = document.querySelectorAll('.feature-card, .product-card, .about-content, .contact-card, .developer-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// =========================================
// 5. MARQUEE LOGIC
// =========================================
function initMarquee() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const header = document.querySelector('.header');

    if (!marqueeContainer || !header) return;

    // Function to calculate and stick position
    function updateMarqueePosition() {
        const headerHeight = header.offsetHeight;

        // Simpler logic: stick to top initially, then scroll away? 
        // Or sticky fixed? Let's make it sticky fixed below header for visibility
        // matching the "Landing Page" vibe where important info is visible.
        // If user wants it to scroll away, we can change this.
        // For now, let's keep it fixed below header which is usually better for announcements.

        // However, Script.js had scroll-away logic. Let's try to respect that if intended.
        // But marquee text suggests "Happy New Year" etc. Important.

        // Let's implement dynamic top based on header height
        if (window.getComputedStyle(marqueeContainer).position === 'fixed') {
            marqueeContainer.style.top = headerHeight + 'px';
        }
    }

    // Update on load and resize
    window.addEventListener('load', updateMarqueePosition);
    window.addEventListener('resize', updateMarqueePosition);

    // Update when header changes size (scroll)
    window.addEventListener('scroll', updateMarqueePosition);
}

// =========================================
// 6. NEW YEAR CELEBRATION
// =========================================
function initNewYearCelebration() {
    const now = new Date();
    // Month is 0-indexed (0 = Jan), Date is 1-31
    const isNewYear = (now.getMonth() === 0 && now.getDate() >= 1 && now.getDate() <= 7);

    if (!isNewYear) {
        console.log('Not New Year period');
        // Ensure marquee is visible if it was hidden by default
        return;
    }

    console.log('🎉 Happy New Year Week!');

    const overlay = document.getElementById('newyear-overlay');
    const confettiContainer = document.getElementById('confetti-container');
    const marquee = document.querySelector('.marquee-container');
    const newYearBanner = document.getElementById('newyear-banner');
    const header = document.querySelector('.header');

    if (overlay) overlay.classList.remove('newyear-hidden');

    // Hide regular marquee, show new year banner
    if (marquee) marquee.style.display = 'none';

    function positionBanner() {
        if (newYearBanner && header) {
            newYearBanner.style.top = header.offsetHeight + 'px';
        }
    }

    positionBanner();
    window.addEventListener('resize', positionBanner);
    window.addEventListener('scroll', positionBanner);

    if (confettiContainer) {
        createConfetti(confettiContainer);
        // Regenerate confetti periodically
        setInterval(() => {
            createConfetti(confettiContainer);
        }, 5000);
    }
}

function createConfetti(container) {
    if (!container) return;

    const colors = ['#ffd700', '#c0c0c0', '#ffed4e', '#ff6b6b', '#4ecdc4', '#95e1d3'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');

        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = (Math.random() * 3 + 2); // 2-5 seconds
        const delay = Math.random() * 2;
        const size = Math.random() * 6 + 4; // 4-10px

        confetti.style.left = `${left}%`;
        confetti.style.background = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${delay}s`;

        container.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + delay) * 1000);
    }
}
