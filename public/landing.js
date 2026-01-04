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
// 3. SMART STICKY CTA (Triggers when hero button reaches marquee)
// =========================================
function initStickyCTA() {
    const heroCTA = document.getElementById('hero-cta');
    const marquee = document.querySelector('.marquee-container');
    const floatingCTA = document.getElementById('floating-cta-container');

    if (!heroCTA) return;

    // Hide the old floating CTA if exists
    if (floatingCTA) {
        floatingCTA.style.display = 'none';
    }

    // Create the universal sticky bottom button
    const stickyBtn = document.createElement('a');
    stickyBtn.href = 'https://order.kskvasu.co.in';
    stickyBtn.target = '_blank';
    stickyBtn.className = 'btn universal-sticky-btn';
    stickyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>Book Your Order';
    document.body.appendChild(stickyBtn);

    let ticking = false;

    function updateButtonVisibility() {
        const heroRect = heroCTA.getBoundingClientRect();
        const marqueeRect = marquee ? marquee.getBoundingClientRect() : null;

        // Trigger when hero button's bottom reaches the marquee's top (or passes it)
        // If no marquee, fallback to checking if hero button is scrolled past viewport
        let shouldShowSticky = false;

        if (marqueeRect) {
            // Hero button reaches the marquee when button's top goes above marquee's bottom
            shouldShowSticky = heroRect.top <= marqueeRect.bottom;
        } else {
            // Fallback: show when hero button is scrolled out of view
            shouldShowSticky = heroRect.bottom < 0;
        }

        if (shouldShowSticky) {
            heroCTA.style.opacity = '0';
            heroCTA.style.pointerEvents = 'none';
            stickyBtn.classList.add('visible');
        } else {
            heroCTA.style.opacity = '1';
            heroCTA.style.pointerEvents = 'auto';
            stickyBtn.classList.remove('visible');
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
// 5. MARQUEE LOGIC (Enhanced JavaScript Animation)
// =========================================
function initMarquee() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const marqueeContent = document.querySelector('.marquee-content');
    const marqueeText = document.querySelector('.marquee-text');
    const header = document.querySelector('.header');

    if (!marqueeContainer || !marqueeText || !header) return;

    // Remove CSS animation - we'll handle it with JavaScript
    marqueeText.style.animation = 'none';

    // Configuration
    const config = {
        speed: 1.5, // Pixels per frame (adjustable for desired speed)
        pauseOnHover: true,
        smoothness: true // Use requestAnimationFrame for smooth scrolling
    };

    let position = 0;
    let isPaused = false;
    let animationId = null;

    // Get the width of a single text span for seamless looping
    function getContentWidth() {
        const spans = marqueeText.querySelectorAll('span');
        if (spans.length > 0) {
            return spans[0].offsetWidth;
        }
        return marqueeText.scrollWidth / 2;
    }

    // Track last known header height for smooth transitions
    let lastHeaderHeight = header.offsetHeight;

    // Update marquee position below header
    function updateMarqueePosition() {
        const headerHeight = header.offsetHeight;
        if (headerHeight !== lastHeaderHeight) {
            lastHeaderHeight = headerHeight;
            marqueeContainer.style.top = headerHeight + 'px';
        }
    }

    // Smooth animation loop using requestAnimationFrame
    function animate() {
        // Update header position every frame for smooth tracking during fast scroll
        updateMarqueePosition();

        if (!isPaused) {
            position -= config.speed;

            const contentWidth = getContentWidth();

            // Reset position when first span is completely scrolled out
            if (Math.abs(position) >= contentWidth) {
                position = 0;
            }

            marqueeText.style.transform = `translateX(${position}px)`;
        }

        animationId = requestAnimationFrame(animate);
    }

    // Start animation
    function startAnimation() {
        if (!animationId) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // Stop animation
    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Pause on hover
    if (config.pauseOnHover) {
        marqueeContainer.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        marqueeContainer.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Touch support for mobile
        marqueeContainer.addEventListener('touchstart', () => {
            isPaused = true;
        }, { passive: true });

        marqueeContainer.addEventListener('touchend', () => {
            isPaused = false;
        }, { passive: true });
    }

    // Visibility-based performance optimization
    function handleVisibilityChange() {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    // Event listeners
    window.addEventListener('resize', updateMarqueePosition);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initialize position immediately
    marqueeContainer.style.top = header.offsetHeight + 'px';

    // Initialize animation
    startAnimation();
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
